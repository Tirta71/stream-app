import prisma from "../../config/prisma.js";

const findAll = async (userId) =>
  prisma.myList.findMany({
    include: {
      seriesFilm: true,
    },
    orderBy: { createdAt: "desc" },
    where: { userId: BigInt(userId) },
  });

const add = async (userId, seriesFilmId) => {
  const currentItem = await prisma.myList.findFirst({
    where: {
      seriesFilmId,
      userId: BigInt(userId),
    },
  });

  if (currentItem) {
    return currentItem;
  }

  return prisma.myList.create({
    data: {
      seriesFilmId,
      userId: BigInt(userId),
    },
  });
};

const remove = async (userId, seriesFilmId) => {
  const currentItem = await prisma.myList.findFirst({
    where: {
      seriesFilmId,
      userId: BigInt(userId),
    },
  });

  if (!currentItem) {
    return null;
  }

  return prisma.myList.delete({
    where: { id: currentItem.id },
  });
};

export default {
  add,
  findAll,
  remove,
};
