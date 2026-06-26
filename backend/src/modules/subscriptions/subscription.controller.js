import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/response.js";
import subscriptionService from "./subscription.service.js";

const findCurrent = asyncHandler(async (req, res) => {
  const subscription = await subscriptionService.findCurrent(req.user.id);

  sendResponse(res, { data: subscription });
});

const findAll = asyncHandler(async (req, res) => {
  const subscriptions = await subscriptionService.findAll(req.user.id);

  sendResponse(res, { data: subscriptions });
});

const cancel = asyncHandler(async (req, res) => {
  const subscription = await subscriptionService.cancel(
    req.user.id,
    req.validated.params.id,
  );

  sendResponse(res, {
    data: subscription,
    message: "Subscription berhasil dibatalkan",
  });
});

export default {
  cancel,
  findAll,
  findCurrent,
};
