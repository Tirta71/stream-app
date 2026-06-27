import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jwt.js";

const authCookieName = "chill_token";

const getCookieValue = (cookieHeader, cookieName) => {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const cookiePrefix = `${cookieName}=`;
  const cookie = cookies.find((item) => item.startsWith(cookiePrefix));

  return cookie ? decodeURIComponent(cookie.slice(cookiePrefix.length)) : null;
};

const getAuthToken = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return getCookieValue(req.headers.cookie, authCookieName);
};

const authMiddleware = asyncHandler(async (req, _res, next) => {
  const token = getAuthToken(req);

  if (!token) {
    throw new ApiError(401, "Token tidak ditemukan", null, "TOKEN_NOT_FOUND");
  }

  let payload;

  try {
    payload = verifyToken(token);
  } catch {
    throw new ApiError(
      401,
      "Token tidak valid atau sudah kedaluwarsa",
      null,
      "TOKEN_INVALID",
    );
  }

  const user = await prisma.user.findUnique({
    select: {
      email: true,
      emailVerifiedAt: true,
      id: true,
      name: true,
      photoUrl: true,
      role: true,
    },
    where: { id: BigInt(payload.id) },
  });

  if (!user) {
    throw new ApiError(401, "User tidak ditemukan", null, "USER_NOT_FOUND");
  }

  req.user = user;
  next();
});

export default authMiddleware;
