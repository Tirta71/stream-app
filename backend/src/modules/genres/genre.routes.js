import { Router } from "express";
import adminMiddleware from "../../middlewares/admin.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import genreController from "./genre.controller.js";
import {
  createGenreSchema,
  slugParamSchema,
  updateGenreSchema,
} from "./genre.validation.js";

const router = Router();

router.get("/", genreController.findAll);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createGenreSchema),
  genreController.create,
);
router.patch(
  "/:slug",
  authMiddleware,
  adminMiddleware,
  validate(updateGenreSchema),
  genreController.update,
);
router.delete(
  "/:slug",
  authMiddleware,
  adminMiddleware,
  validate(slugParamSchema),
  genreController.remove,
);

export default router;
