import prisma from "../../config/prisma.js";

const findAll = async ({ seriesFilmId }) =>
  prisma.episodeMovie.findMany({
    orderBy: [{ seasonNumber: "asc" }, { episodeNumber: "asc" }],
    where: {
      seriesFilmId,
    },
  });

const create = async (payload) => prisma.episodeMovie.create({ data: payload });

const update = async (id, payload) =>
  prisma.episodeMovie.update({
    data: payload,
    where: { id },
  });

const remove = async (id) =>
  prisma.episodeMovie.delete({
    where: { id },
  });

export default {
  create,
  findAll,
  remove,
  update,
};
