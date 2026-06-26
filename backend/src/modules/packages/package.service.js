import prisma from "../../config/prisma.js";

const findAll = async () =>
  prisma.package.findMany({
    orderBy: { price: "asc" },
    where: { isActive: true },
  });

const create = async (payload) => prisma.package.create({ data: payload });

const update = async (id, payload) =>
  prisma.package.update({
    data: payload,
    where: { id },
  });

const remove = async (id) =>
  prisma.package.delete({
    where: { id },
  });

export default {
  create,
  findAll,
  remove,
  update,
};
