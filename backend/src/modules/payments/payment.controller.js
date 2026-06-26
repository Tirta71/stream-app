import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/response.js";
import paymentService from "./payment.service.js";

const findAll = asyncHandler(async (req, res) => {
  const payments = await paymentService.findAll(req.user.id);

  sendResponse(res, { data: payments });
});

const create = asyncHandler(async (req, res) => {
  const payment = await paymentService.create(req.user.id, req.validated.body);

  sendResponse(res, {
    data: payment,
    message: "Payment berhasil dibuat",
    statusCode: 201,
  });
});

const markAsPaid = asyncHandler(async (req, res) => {
  const payment = await paymentService.markAsPaid(
    req.user.id,
    req.validated.params.id,
  );

  sendResponse(res, {
    data: payment,
    message: "Payment berhasil dikonfirmasi",
  });
});

export default {
  create,
  findAll,
  markAsPaid,
};
