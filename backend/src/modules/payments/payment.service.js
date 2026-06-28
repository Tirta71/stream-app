import prisma from "../../config/prisma.js";
import {
  createSnapTransaction,
  getTransactionStatus,
  verifySignatureKey,
} from "../../config/midtrans.js";
import env from "../../config/env.js";
import ApiError from "../../utils/ApiError.js";

const adminFee = 3000;
const paidStatuses = new Set(["settlement", "capture"]);
const failedStatuses = new Set(["deny", "cancel", "failure"]);

const paymentMethodMap = {
  "BCA Virtual Account": "bca_va",
  "Kartu Debit/Kredit": "credit_card",
  bca_va: "bca_va",
  credit_card: "credit_card",
};

const findAll = async (userId) =>
  prisma.payment.findMany({
    include: {
      order: {
        include: {
          package: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    where: {
      order: {
        userId: BigInt(userId),
      },
    },
  });

const normalizePaymentMethod = (paymentMethod) =>
  paymentMethodMap[paymentMethod] ?? "bca_va";

const getGrossAmount = (order) => Number(order.totalPrice);

const getItemDetails = (order) => {
  const packagePrice = Number(order.package.price);
  const fee = Math.max(0, getGrossAmount(order) - packagePrice || adminFee);

  return [
    {
      id: `PACKAGE-${order.packageId}`,
      name: `Paket Premium ${order.package.name}`,
      price: packagePrice,
      quantity: 1,
    },
    fee
      ? {
          id: "ADMIN-FEE",
          name: "Biaya Admin",
          price: fee,
          quantity: 1,
        }
      : null,
  ].filter(Boolean);
};

const buildSnapPayload = (order, paymentMethod) => ({
  callbacks: {
    finish: `${env.clientUrl}/pembayaran/menunggu?order=${order.id}`,
  },
  credit_card: {
    secure: true,
  },
  customer_details: {
    email: order.user.email,
    first_name: order.user.name,
  },
  enabled_payments: [paymentMethod],
  expiry: {
    duration: 15,
    unit: "minute",
  },
  item_details: getItemDetails(order),
  transaction_details: {
    gross_amount: getGrossAmount(order),
    order_id: order.orderCode,
  },
});

const getPayableOrder = async (userId, orderId) => {
  const order = await prisma.order.findFirst({
    include: {
      package: true,
      payments: {
        orderBy: { createdAt: "desc" },
      },
      user: true,
    },
    where: {
      id: orderId,
      userId: BigInt(userId),
    },
  });

  if (!order) {
    throw new ApiError(404, "Order tidak ditemukan", null, "ORDER_NOT_FOUND");
  }

  if (order.status !== "PENDING") {
    throw new ApiError(
      400,
      "Order tidak dapat dibayar",
      null,
      "ORDER_NOT_PAYABLE",
    );
  }

  if (order.paymentExpiredAt && order.paymentExpiredAt < new Date()) {
    await prisma.order.update({
      data: { status: "EXPIRED" },
      where: { id: order.id },
    });

    throw new ApiError(400, "Order sudah kedaluwarsa", null, "ORDER_EXPIRED");
  }

  return order;
};

const create = async (userId, payload) => {
  const order = await getPayableOrder(userId, payload.orderId);
  const paymentMethod = normalizePaymentMethod(payload.paymentMethod);
  const reusablePayment = order.payments.find(
    (payment) => payment.status === "PENDING" && payment.snapToken,
  );

  if (reusablePayment) {
    return reusablePayment;
  }

  const snapTransaction = await createSnapTransaction(
    buildSnapPayload(order, paymentMethod),
  );

  const paymentData = {
    amount: order.totalPrice,
    orderId: order.id,
    paymentGateway: "midtrans",
    paymentMethod,
    redirectUrl: snapTransaction.redirect_url,
    snapToken: snapTransaction.token,
    status: "PENDING",
  };

  const legacyPendingPayment = order.payments.find(
    (payment) => payment.status === "PENDING",
  );

  if (legacyPendingPayment) {
    return prisma.payment.update({
      data: paymentData,
      where: { id: legacyPendingPayment.id },
    });
  }

  return prisma.payment.create({
    data: paymentData,
  });
};

const getNotificationPaymentStatus = (notification) => {
  const transactionStatus = notification.transaction_status;

  if (transactionStatus === "pending") {
    return "PENDING";
  }

  if (transactionStatus === "expire") {
    return "EXPIRED";
  }

  if (
    paidStatuses.has(transactionStatus) &&
    (transactionStatus !== "capture" || notification.fraud_status === "accept")
  ) {
    return "PAID";
  }

  if (failedStatuses.has(transactionStatus)) {
    return "FAILED";
  }

  return "PENDING";
};

const getOrderStatus = (paymentStatus) => {
  if (paymentStatus === "PAID") {
    return "PAID";
  }

  if (paymentStatus === "EXPIRED") {
    return "EXPIRED";
  }

  if (paymentStatus === "FAILED") {
    return "CANCELLED";
  }

  return "PENDING";
};

const getBank = (notification) => {
  if (notification.va_numbers?.[0]?.bank) {
    return notification.va_numbers[0].bank;
  }

  if (notification.permata_va_number) {
    return "permata";
  }

  return null;
};

const getVaNumber = (notification) =>
  notification.va_numbers?.[0]?.va_number ??
  notification.permata_va_number ??
  notification.bill_key ??
  null;

const createSubscriptionIfNeeded = async (tx, order, paidAt) => {
  const currentSubscription = await tx.subscription.findUnique({
    where: { orderId: order.id },
  });

  if (currentSubscription) {
    return currentSubscription;
  }

  const startedAt = paidAt ?? new Date();
  const endedAt = new Date(startedAt);
  endedAt.setDate(endedAt.getDate() + order.package.durationDays);

  return tx.subscription.create({
    data: {
      endedAt,
      orderId: order.id,
      packageId: order.packageId,
      startedAt,
      status: "ACTIVE",
      userId: order.userId,
    },
  });
};

const persistMidtransStatus = async (notification) => {
  const order = await prisma.order.findUnique({
    include: {
      package: true,
      payments: {
        orderBy: { createdAt: "desc" },
      },
    },
    where: { orderCode: notification.order_id ?? "" },
  });

  if (!order) {
    throw new ApiError(404, "Order tidak ditemukan", null, "ORDER_NOT_FOUND");
  }

  const paymentStatus = getNotificationPaymentStatus(notification);
  const paidAt = paymentStatus === "PAID" ? new Date() : null;
  const amount = Number(notification.gross_amount || order.totalPrice);
  const transactionId = notification.transaction_id || null;

  return prisma.$transaction(async (tx) => {
    const currentPayment = transactionId
      ? await tx.payment.findFirst({
          where: {
            OR: [{ transactionId }, { orderId: order.id }],
          },
        })
      : order.payments[0] ?? null;

    const effectivePaymentStatus =
      currentPayment?.status === "PAID" && paymentStatus !== "PAID"
        ? "PAID"
        : paymentStatus;
    const effectivePaidAt = currentPayment?.paidAt ?? paidAt;
    const paymentData = {
      amount,
      bank: getBank(notification),
      fraudStatus: notification.fraud_status ?? null,
      orderId: order.id,
      paidAt: effectivePaidAt,
      paymentGateway: "midtrans",
      paymentMethod: notification.payment_type ?? currentPayment?.paymentMethod ?? "snap",
      rawNotification: notification,
      status: effectivePaymentStatus,
      transactionId,
      vaNumber: getVaNumber(notification),
    };

    const payment = currentPayment
      ? await tx.payment.update({
          data: paymentData,
          where: { id: currentPayment.id },
        })
      : await tx.payment.create({
          data: paymentData,
        });

    await tx.order.update({
      data: { status: getOrderStatus(effectivePaymentStatus) },
      where: { id: order.id },
    });

    if (effectivePaymentStatus === "PAID") {
      await createSubscriptionIfNeeded(tx, order, effectivePaidAt);
    }

    return payment;
  });
};

const handleMidtransNotification = async (notification) => {
  if (!verifySignatureKey(notification)) {
    throw new ApiError(
      403,
      "Signature Midtrans tidak valid",
      null,
      "INVALID_MIDTRANS_SIGNATURE",
    );
  }

  return persistMidtransStatus(notification);
};

const syncOrderStatus = async (userId, orderId) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: BigInt(userId),
    },
  });

  if (!order) {
    throw new ApiError(404, "Order tidak ditemukan", null, "ORDER_NOT_FOUND");
  }

  const notification = await getTransactionStatus(order.orderCode);

  return persistMidtransStatus(notification);
};

const markAsPaid = async (userId, paymentId) => {
  const payment = await prisma.payment.findFirst({
    include: {
      order: {
        include: { package: true },
      },
    },
    where: {
      id: paymentId,
      order: {
        userId: BigInt(userId),
      },
    },
  });

  if (!payment) {
    throw new ApiError(404, "Payment tidak ditemukan", null, "PAYMENT_NOT_FOUND");
  }

  const startedAt = new Date();

  return prisma.$transaction(async (tx) => {
    const paidPayment = await tx.payment.update({
      data: {
        paidAt: startedAt,
        status: "PAID",
      },
      where: { id: payment.id },
    });

    await tx.order.update({
      data: { status: "PAID" },
      where: { id: payment.orderId },
    });

    await createSubscriptionIfNeeded(tx, payment.order, startedAt);

    return paidPayment;
  });
};

export default {
  create,
  findAll,
  handleMidtransNotification,
  markAsPaid,
  syncOrderStatus,
};
