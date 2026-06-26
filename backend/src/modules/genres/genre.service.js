import prisma from "../../config/prisma.js";

const findAll = async () =>
  prisma.genre.findMany({
    orderBy: { name: "asc" },
  });

const create = async (payload) => prisma.genre.create({ data: payload });

const update = async (slug, payload) =>
  prisma.genre.update({
    data: payload,
    where: { slug },
  });

const remove = async (slug) =>
  prisma.genre.delete({
    where: { slug },
  });

export default {
  create,
  findAll,
  remove,
  update,
};
