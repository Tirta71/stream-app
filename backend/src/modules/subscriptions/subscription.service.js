import prisma from "../../config/prisma.js";

const findCurrent = async (userId) =>
  prisma.subscription.findFirst({
    include: {
      package: true,
    },
    orderBy: { endedAt: "desc" },
    where: {
      endedAt: {
        gte: new Date(),
      },
      status: "ACTIVE",
      userId: BigInt(userId),
    },
  });

const findAll = async (userId) =>
  prisma.subscription.findMany({
    include: {
      package: true,
      order: true,
    },
    orderBy: { createdAt: "desc" },
    where: { userId: BigInt(userId) },
  });

const cancel = async (userId, id) => {
  const subscription = await prisma.subscription.findFirst({
    where: {
      id,
      userId: BigInt(userId),
    },
  });

  if (!subscription) {
    return null;
  }

  return prisma.subscription.update({
    data: { status: "CANCELLED" },
    where: { id },
  });
};

export default {
  cancel,
  findAll,
  findCurrent,
};
