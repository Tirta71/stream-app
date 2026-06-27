import { randomUUID } from "node:crypto";
import path from "node:path";
import multer from "multer";
import { ensureProfileUploadDir, profileUploadDir } from "../config/uploads.js";
import ApiError from "../utils/ApiError.js";

const imageMimeExtensions = {
  "image/gif": ".gif",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

ensureProfileUploadDir();

const profilePhotoStorage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, profileUploadDir);
  },
  filename: (_req, file, callback) => {
    const extension =
      imageMimeExtensions[file.mimetype] ||
      path.extname(file.originalname).toLowerCase();

    callback(null, `${Date.now()}-${randomUUID()}${extension}`);
  },
});

const profilePhotoUpload = multer({
  fileFilter: (_req, file, callback) => {
    if (!imageMimeExtensions[file.mimetype]) {
      callback(
        new ApiError(
          422,
          "Format foto harus JPG, PNG, WEBP, atau GIF",
          null,
          "INVALID_PROFILE_PHOTO_TYPE",
        ),
      );
      return;
    }

    callback(null, true);
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  storage: profilePhotoStorage,
});

export { profilePhotoUpload };
