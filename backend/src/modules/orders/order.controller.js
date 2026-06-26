import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/response.js";
import orderService from "./order.service.js";

const findAll = asyncHandler(async (req, res) => {
  const orders = await orderService.findAll(req.user.id);

  sendResponse(res, { data: orders });
});

const findById = asyncHandler(async (req, res) => {
  const order = await orderService.findById(
    req.user.id,
    req.validated.params.id,
  );

  sendResponse(res, { data: order });
});

const create = asyncHandler(async (req, res) => {
  const order = await orderService.create(
    req.user.id,
    req.validated.body.packageId,
  );

  sendResponse(res, {
    data: order,
    message: "Order berhasil dibuat",
    statusCode: 201,
  });
});

export default {
  create,
  findAll,
  findById,
};
