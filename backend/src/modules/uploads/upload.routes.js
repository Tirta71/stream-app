import { Router } from "express";
import { profilePhotoUpload } from "../../middlewares/upload.middleware.js";
import uploadController from "./upload.controller.js";

const router = Router();

router.post("/", profilePhotoUpload.single("photo"), uploadController.uploadProfilePhoto);

export default router;
