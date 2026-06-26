import { Router } from "express";
import adminMiddleware from "../../middlewares/admin.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import packageController from "./package.controller.js";
import {
  packageParamSchema,
  packageSchema,
  updatePackageSchema,
} from "./package.validation.js";

const router = Router();

router.get("/", packageController.findAll);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(packageSchema),
  packageController.create,
);
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updatePackageSchema),
  packageController.update,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(packageParamSchema),
  packageController.remove,
);

export default router;
