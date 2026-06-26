import prisma from "../../config/prisma.js";

const findAll = async (userId) =>
  prisma.watchProgress.findMany({
    include: {
      episodeMovie: true,
      seriesFilm: true,
    },
    orderBy: { lastWatchedAt: "desc" },
    where: { userId: BigInt(userId) },
  });

const upsert = async (userId, payload) => {
  const currentProgress = await prisma.watchProgress.findFirst({
    where: {
      episodeMovieId: payload.episodeMovieId ?? null,
      seriesFilmId: payload.seriesFilmId,
      userId: BigInt(userId),
    },
  });

  const data = {
    ...payload,
    lastWatchedAt: new Date(),
    userId: BigInt(userId),
  };

  if (currentProgress) {
    return prisma.watchProgress.update({
      data,
      where: { id: currentProgress.id },
    });
  }

  return prisma.watchProgress.create({ data });
};

export default {
  findAll,
  upsert,
};
