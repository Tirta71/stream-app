import { Router } from "express";
import adminMiddleware from "../../middlewares/admin.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import contentController from "./content.controller.js";
import {
  createContentSchema,
  idParamSchema,
  listContentSchema,
  updateContentSchema,
} from "./content.validation.js";

const router = Router();

router.get("/", validate(listContentSchema), contentController.findAll);
router.get("/:id", validate(idParamSchema), contentController.findById);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createContentSchema),
  contentController.create,
);
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateContentSchema),
  contentController.update,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(idParamSchema),
  contentController.remove,
);

export default router;
