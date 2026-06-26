import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import myListController from "./my-list.controller.js";
import { myListParamSchema, myListSchema } from "./my-list.validation.js";

const router = Router();

router.use(authMiddleware);
router.get("/", myListController.findAll);
router.post("/", validate(myListSchema), myListController.add);
router.delete(
  "/:seriesFilmId",
  validate(myListParamSchema),
  myListController.remove,
);

export default router;
