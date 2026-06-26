import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/response.js";
import packageService from "./package.service.js";

const findAll = asyncHandler(async (_req, res) => {
  const packages = await packageService.findAll();

  sendResponse(res, { data: packages });
});

const create = asyncHandler(async (req, res) => {
  const plan = await packageService.create(req.validated.body);

  sendResponse(res, {
    data: plan,
    message: "Paket berhasil dibuat",
    statusCode: 201,
  });
});

const update = asyncHandler(async (req, res) => {
  const plan = await packageService.update(
    req.validated.params.id,
    req.validated.body,
  );

  sendResponse(res, {
    data: plan,
    message: "Paket berhasil diperbarui",
  });
});

const remove = asyncHandler(async (req, res) => {
  await packageService.remove(req.validated.params.id);

  sendResponse(res, { message: "Paket berhasil dihapus" });
});

export default {
  create,
  findAll,
  remove,
  update,
};
