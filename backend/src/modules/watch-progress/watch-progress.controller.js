import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/response.js";
import watchProgressService from "./watch-progress.service.js";

const findAll = asyncHandler(async (req, res) => {
  const progress = await watchProgressService.findAll(req.user.id);

  sendResponse(res, { data: progress });
});

const upsert = asyncHandler(async (req, res) => {
  const progress = await watchProgressService.upsert(
    req.user.id,
    req.validated.body,
  );

  sendResponse(res, {
    data: progress,
    message: "Progress menonton berhasil disimpan",
  });
});

export default {
  findAll,
  upsert,
};
