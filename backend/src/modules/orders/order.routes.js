import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import orderController from "./order.controller.js";
import { createOrderSchema, orderParamSchema } from "./order.validation.js";

const router = Router();

router.use(authMiddleware);
router.get("/", orderController.findAll);
router.get("/:id", validate(orderParamSchema), orderController.findById);
router.post("/", validate(createOrderSchema), orderController.create);

export default router;
