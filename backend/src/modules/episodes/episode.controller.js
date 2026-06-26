import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/response.js";
import episodeService from "./episode.service.js";

const findAll = asyncHandler(async (req, res) => {
  const episodes = await episodeService.findAll(req.validated.query);

  sendResponse(res, { data: episodes });
});

const create = asyncHandler(async (req, res) => {
  const episode = await episodeService.create(req.validated.body);

  sendResponse(res, {
    data: episode,
    message: "Episode berhasil dibuat",
    statusCode: 201,
  });
});

const update = asyncHandler(async (req, res) => {
  const episode = await episodeService.update(
    req.validated.params.id,
    req.validated.body,
  );

  sendResponse(res, {
    data: episode,
    message: "Episode berhasil diperbarui",
  });
});

const remove = asyncHandler(async (req, res) => {
  await episodeService.remove(req.validated.params.id);

  sendResponse(res, { message: "Episode berhasil dihapus" });
});

export default {
  create,
  findAll,
  remove,
  update,
};
