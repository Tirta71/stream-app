import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import watchProgressController from "./watch-progress.controller.js";
import { upsertWatchProgressSchema } from "./watch-progress.validation.js";

const router = Router();

router.use(authMiddleware);
router.get("/", watchProgressController.findAll);
router.post(
  "/",
  validate(upsertWatchProgressSchema),
  watchProgressController.upsert,
);

export default router;
