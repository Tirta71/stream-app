import ApiError from "../utils/ApiError.js";

const adminMiddleware = (req, _res, next) => {
  if (req.user?.role !== "ADMIN") {
    throw new ApiError(
      403,
      "Akses admin diperlukan",
      null,
      "ADMIN_ACCESS_REQUIRED",
    );
  }

  next();
};

export default adminMiddleware;
