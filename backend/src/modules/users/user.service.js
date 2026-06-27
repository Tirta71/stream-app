import prisma from "../../config/prisma.js";
import { hashPassword } from "../../utils/password.js";

const getPublicUserSelect = () => ({
  createdAt: true,
  email: true,
  id: true,
  name: true,
  photoUrl: true,
  role: true,
  subscriptions: {
    include: {
      package: true,
    },
    orderBy: { endedAt: "desc" },
    take: 1,
    where: {
      endedAt: {
        gte: new Date(),
      },
      status: "ACTIVE",
    },
  },
  updatedAt: true,
});

const getProfile = async (userId) =>
  prisma.user.findUnique({
    select: getPublicUserSelect(),
    where: { id: BigInt(userId) },
  });

const updateProfile = async (userId, payload) => {
  const data = {};

  if (payload.name) {
    data.name = payload.name;
  }

  if (payload.photoUrl) {
    data.photoUrl = payload.photoUrl;
  }

  if (payload.password) {
    data.password = await hashPassword(payload.password);
  }

  if (!Object.keys(data).length) {
    return getProfile(userId);
  }

  return prisma.user.update({
    data,
    select: getPublicUserSelect(),
    where: { id: BigInt(userId) },
  });
};

export default {
  getProfile,
  updateProfile,
};
