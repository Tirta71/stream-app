import { Router } from "express";
import adminMiddleware from "../../middlewares/admin.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import episodeController from "./episode.controller.js";
import {
  createEpisodeSchema,
  episodeParamSchema,
  listEpisodeSchema,
  updateEpisodeSchema,
} from "./episode.validation.js";

const router = Router();

router.get("/", validate(listEpisodeSchema), episodeController.findAll);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createEpisodeSchema),
  episodeController.create,
);
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateEpisodeSchema),
  episodeController.update,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(episodeParamSchema),
  episodeController.remove,
);

export default router;
