import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/response.js";
import contentService from "./content.service.js";

const findAll = asyncHandler(async (req, res) => {
  const result = await contentService.findAll(req.validated.query);

  sendResponse(res, {
    data: result.items,
    meta: result.meta,
  });
});

const findById = asyncHandler(async (req, res) => {
  const content = await contentService.findById(req.validated.params.id);

  sendResponse(res, { data: content });
});

const create = asyncHandler(async (req, res) => {
  const content = await contentService.create(req.validated.body);

  sendResponse(res, {
    data: content,
    message: "Konten berhasil dibuat",
    statusCode: 201,
  });
});

const update = asyncHandler(async (req, res) => {
  const content = await contentService.update(
    req.validated.params.id,
    req.validated.body,
  );

  sendResponse(res, {
    data: content,
    message: "Konten berhasil diperbarui",
  });
});

const remove = asyncHandler(async (req, res) => {
  await contentService.remove(req.validated.params.id);

  sendResponse(res, {
    message: "Konten berhasil dihapus",
  });
});

export default {
  create,
  findAll,
  findById,
  remove,
  update,
};
