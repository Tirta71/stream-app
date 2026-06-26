import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import userController from "./user.controller.js";
import { updateProfileSchema } from "./user.validation.js";

const router = Router();

router.get("/me", authMiddleware, userController.getMe);
router.patch(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  userController.updateMe,
);

export default router;
