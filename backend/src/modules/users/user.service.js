import prisma from "../../config/prisma.js";
import { hashPassword } from "../../utils/password.js";

const getProfile = async (userId) =>
  prisma.user.findUnique({
    include: {
      subscriptions: {
        orderBy: { endedAt: "desc" },
        take: 1,
      },
    },
    where: { id: BigInt(userId) },
  });

const updateProfile = async (userId, payload) => {
  const data = { ...payload };

  if (payload.password) {
    data.password = await hashPassword(payload.password);
  }

  return prisma.user.update({
    data,
    where: { id: BigInt(userId) },
  });
};

export default {
  getProfile,
  updateProfile,
};
