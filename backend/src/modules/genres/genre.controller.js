import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/response.js";
import genreService from "./genre.service.js";

const findAll = asyncHandler(async (_req, res) => {
  const genres = await genreService.findAll();

  sendResponse(res, { data: genres });
});

const create = asyncHandler(async (req, res) => {
  const genre = await genreService.create(req.validated.body);

  sendResponse(res, {
    data: genre,
    message: "Genre berhasil dibuat",
    statusCode: 201,
  });
});

const update = asyncHandler(async (req, res) => {
  const genre = await genreService.update(
    req.validated.params.slug,
    req.validated.body,
  );

  sendResponse(res, {
    data: genre,
    message: "Genre berhasil diperbarui",
  });
});

const remove = asyncHandler(async (req, res) => {
  await genreService.remove(req.validated.params.slug);

  sendResponse(res, { message: "Genre berhasil dihapus" });
});

export default {
  create,
  findAll,
  remove,
  update,
};
