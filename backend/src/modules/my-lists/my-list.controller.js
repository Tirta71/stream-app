import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/response.js";
import myListService from "./my-list.service.js";

const findAll = asyncHandler(async (req, res) => {
  const items = await myListService.findAll(req.user.id);

  sendResponse(res, { data: items });
});

const add = asyncHandler(async (req, res) => {
  const item = await myListService.add(
    req.user.id,
    req.validated.body.seriesFilmId,
  );

  sendResponse(res, {
    data: item,
    message: "Konten berhasil ditambahkan ke daftar saya",
    statusCode: 201,
  });
});

const remove = asyncHandler(async (req, res) => {
  await myListService.remove(req.user.id, req.validated.params.seriesFilmId);

  sendResponse(res, { message: "Konten berhasil dihapus dari daftar saya" });
});

export default {
  add,
  findAll,
  remove,
};
