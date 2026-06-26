import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/response.js";
import userService from "./user.service.js";

const getMe = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user.id);

  sendResponse(res, { data: user });
});

const updateMe = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user.id, req.validated.body);

  sendResponse(res, {
    data: user,
    message: "Profil berhasil diperbarui",
  });
});

export default {
  getMe,
  updateMe,
};
