import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import subscriptionController from "./subscription.controller.js";
import { subscriptionParamSchema } from "./subscription.validation.js";

const router = Router();

router.use(authMiddleware);
router.get("/", subscriptionController.findAll);
router.get("/current", subscriptionController.findCurrent);
router.patch(
  "/:id/cancel",
  validate(subscriptionParamSchema),
  subscriptionController.cancel,
);

export default router;
