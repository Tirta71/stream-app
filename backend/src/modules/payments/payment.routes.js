import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import paymentController from "./payment.controller.js";
import {
  createPaymentSchema,
  paymentParamSchema,
  syncOrderPaymentSchema,
} from "./payment.validation.js";

const router = Router();

router.post(
  "/midtrans/notification",
  paymentController.handleMidtransNotification,
);
router.use(authMiddleware);
router.get("/", paymentController.findAll);
router.post("/", validate(createPaymentSchema), paymentController.create);
router.post(
  "/orders/:orderId/sync",
  validate(syncOrderPaymentSchema),
  paymentController.syncOrderStatus,
);
router.patch(
  "/:id/paid",
  validate(paymentParamSchema),
  paymentController.markAsPaid,
);

export default router;
