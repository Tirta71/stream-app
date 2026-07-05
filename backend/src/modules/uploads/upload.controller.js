import { getProfilePhotoPath } from "../../config/uploads.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/response.js";
import userService from "../users/user.service.js";

const uploadProfilePhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(
      422,
      "Foto profil wajib diupload",
      null,
      "PROFILE_PHOTO_REQUIRED",
    );
  }

  const user = await userService.updateProfile(req.user.id, {
    photoUrl: getProfilePhotoPath(req.file.filename),
  });

  sendResponse(res, {
    data: user,
    message: "Foto profil berhasil diupload",
  });
});

export default {
  uploadProfilePhoto,
};
