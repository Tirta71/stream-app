import prisma from "../../config/prisma.js";
import ApiError from "../../utils/ApiError.js";

const adminFee = 3000;

const generateOrderCode = () =>
  `CHILL-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

const findAll = async (userId) =>
  prisma.order.findMany({
    include: {
      package: true,
      payments: true,
      subscription: true,
    },
    orderBy: { createdAt: "desc" },
    where: { userId: BigInt(userId) },
  });

const findById = async (userId, id) => {
  const order = await prisma.order.findFirst({
    include: {
      package: true,
      payments: true,
      subscription: true,
    },
    where: {
      id,
      userId: BigInt(userId),
    },
  });

  if (!order) {
    throw new ApiError(404, "Order tidak ditemukan", null, "ORDER_NOT_FOUND");
  }

  return order;
};

const create = async (userId, packageId) => {
  const plan = await prisma.package.findFirst({
    where: {
      id: packageId,
      isActive: true,
    },
  });

  if (!plan) {
    throw new ApiError(404, "Paket tidak ditemukan", null, "PACKAGE_NOT_FOUND");
  }

  return prisma.order.create({
    data: {
      orderCode: generateOrderCode(),
      packageId: plan.id,
      paymentExpiredAt: new Date(Date.now() + 15 * 60 * 1000),
      totalPrice: Number(plan.price) + adminFee,
      userId: BigInt(userId),
    },
    include: {
      package: true,
    },
  });
};

export default {
  create,
  findAll,
  findById,
};
