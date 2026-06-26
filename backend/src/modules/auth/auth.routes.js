import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import authController from "./auth.controller.js";
import {
  googleLoginSchema,
  loginSchema,
  registerSchema,
} from "./auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", authMiddleware, authController.me);
router.post("/logout", authController.logout);
router.get("/google", authController.redirectToGoogle);
router.post(
  "/google",
  validate(googleLoginSchema),
  authController.googleLogin,
);
router.get("/google/callback", authController.googleCallback);

export default router;
