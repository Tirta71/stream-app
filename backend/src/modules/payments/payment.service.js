import prisma from "../../config/prisma.js";
import ApiError from "../../utils/ApiError.js";

const generateTransactionId = () =>
  Math.random().toString(36).slice(2, 11).toUpperCase();

const findAll = async (userId) =>
  prisma.payment.findMany({
    include: {
      order: true,
    },
    orderBy: { createdAt: "desc" },
    where: {
      order: {
        userId: BigInt(userId),
      },
    },
  });

const create = async (userId, payload) => {
  const order = await prisma.order.findFirst({
    include: { package: true },
    where: {
      id: payload.orderId,
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

  return prisma.payment.create({
    data: {
      amount: order.totalPrice,
      orderId: order.id,
      paymentGateway: payload.paymentGateway,
      paymentMethod: payload.paymentMethod,
      transactionId: generateTransactionId(),
    },
  });
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
  const endedAt = new Date(startedAt);
  endedAt.setDate(endedAt.getDate() + payment.order.package.durationDays);

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

    await tx.subscription.create({
      data: {
        endedAt,
        orderId: payment.orderId,
        packageId: payment.order.packageId,
        startedAt,
        status: "ACTIVE",
        userId: BigInt(userId),
      },
    });

    return paidPayment;
  });
};

export default {
  create,
  findAll,
  markAsPaid,
};
