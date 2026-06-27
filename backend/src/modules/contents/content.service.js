import prisma from "../../config/prisma.js";
import ApiError from "../../utils/ApiError.js";

const normalizeType = (type) => type?.toUpperCase();

const buildContentWhere = ({ genre, isPremium, isTopTen, isTrending, search, type }) => ({
  genres: genre
    ? {
        some: {
          genre: {
            slug: genre,
          },
        },
      }
    : undefined,
  isActive: true,
  isPremium,
  isTopTen,
  isTrending,
  title: search
    ? {
        contains: search,
      }
    : undefined,
  type: normalizeType(type),
});

const contentInclude = {
  episodes: true,
  genres: {
    include: {
      genre: true,
    },
  },
  people: {
    include: {
      person: true,
    },
  },
};

const findAll = async (query) => {
  const { page, take } = query;
  const where = buildContentWhere(query);
  const skip = (page - 1) * take;

  const [items, total] = await Promise.all([
    prisma.seriesFilm.findMany({
      include: contentInclude,
      orderBy: [{ isTopTen: "desc" }, { publishedAt: "desc" }],
      skip,
      take,
      where,
    }),
    prisma.seriesFilm.count({ where }),
  ]);

  return {
    items,
    meta: {
      page,
      take,
      total,
      totalPages: Math.ceil(total / take),
    },
  };
};

const findById = async (id) => {
  const content = await prisma.seriesFilm.findUnique({
    include: contentInclude,
    where: { id },
  });

  if (!content) {
    throw new ApiError(404, "Konten tidak ditemukan", null, "CONTENT_NOT_FOUND");
  }

  return content;
};

const create = async (payload) =>
  prisma.seriesFilm.create({
    data: {
      ...payload,
      publishedAt: payload.publishedAt ?? new Date(),
      type: normalizeType(payload.type),
    },
    include: contentInclude,
  });

const update = async (id, payload) =>
  prisma.seriesFilm.update({
    data: {
      ...payload,
      type: normalizeType(payload.type),
    },
    include: contentInclude,
    where: { id },
  });

const remove = async (id) =>
  prisma.seriesFilm.delete({
    where: { id },
  });

export default {
  create,
  findAll,
  findById,
  remove,
  update,
};
