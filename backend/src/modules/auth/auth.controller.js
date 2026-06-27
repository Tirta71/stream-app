import asyncHandler from "../../utils/asyncHandler.js";
import env from "../../config/env.js";
import sendResponse from "../../utils/response.js";
import authService from "./auth.service.js";

const googleCallbackPath = "/auth/google/callback";
const authCookieName = "chill_token";

const authCookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: env.isProduction ? "none" : "lax",
  secure: env.isProduction,
};

const buildGoogleCallbackUrl = (params) => {
  const hash = new URLSearchParams(params).toString();

  return `${env.clientUrl}${googleCallbackPath}?${hash}`;
};

const setAuthCookie = (res, token) => {
  res.cookie(authCookieName, token, authCookieOptions);
};

const clearAuthCookie = (res) => {
  res.clearCookie(authCookieName, {
    httpOnly: true,
    sameSite: authCookieOptions.sameSite,
    secure: authCookieOptions.secure,
  });
};

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.validated.body);

  if (result.token) {
    setAuthCookie(res, result.token);
  }

  sendResponse(res, {
    data: {
      requiresEmailVerification: Boolean(result.requiresEmailVerification),
      user: result.user,
    },
    message: result.requiresEmailVerification
      ? "Pendaftaran berhasil. Kami telah mengirim tautan verifikasi ke email Anda."
      : "Pendaftaran berhasil",
    statusCode: 201,
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.validated.body);
  setAuthCookie(res, result.token);

  sendResponse(res, {
    data: {
      user: result.user,
    },
    message: "Login berhasil",
  });
});

const googleLogin = asyncHandler(async (req, res) => {
  const result = await authService.loginWithGoogle(req.validated.body);

  if (result.token) {
    setAuthCookie(res, result.token);
  }

  sendResponse(res, {
    data: {
      requiresEmailVerification: Boolean(result.requiresEmailVerification),
      user: result.user,
    },
    message: result.requiresEmailVerification
      ? "Login Google berhasil. Kami telah mengirim tautan verifikasi ke email Anda."
      : "Login Google berhasil",
  });
});

const redirectToGoogle = asyncHandler(async (_req, res) => {
  res.redirect(authService.getGoogleAuthUrl());
});

const googleCallback = async (req, res) => {
  try {
    const { code, error } = req.query;

    if (error) {
      res.redirect(
        buildGoogleCallbackUrl({
          error: "Login Google dibatalkan",
        }),
      );
      return;
    }

    if (!code) {
      res.redirect(
        buildGoogleCallbackUrl({
          error: "Kode Google tidak ditemukan",
        }),
      );
      return;
    }

    const result = await authService.loginWithGoogleCode({ code });

    if (result.requiresEmailVerification) {
      res.redirect(
        buildGoogleCallbackUrl({
          email: result.user.email,
          verification: "required",
        }),
      );
      return;
    }

    setAuthCookie(res, result.token);

    res.redirect(
      buildGoogleCallbackUrl({
        success: "1",
      }),
    );
  } catch (callbackError) {
    res.redirect(
      buildGoogleCallbackUrl({
        error: callbackError.message ?? "Login Google gagal",
      }),
    );
  }
};

const me = asyncHandler(async (req, res) => {
  sendResponse(res, {
    data: {
      user: authService.getPublicUser(req.user),
    },
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const result = await authService.verifyEmail(req.validated.query);

  if (result.token) {
    setAuthCookie(res, result.token);
  }

  sendResponse(res, {
    data: {
      user: result.user,
    },
    message: "Email berhasil diverifikasi. Anda akan dialihkan ke halaman utama.",
  });
});

const resendVerification = asyncHandler(async (req, res) => {
  const result = await authService.resendVerification(req.validated.body);

  sendResponse(res, {
    data: {
      emailVerificationExpiresAt: result.emailVerificationExpiresAt ?? null,
      user: result.user ?? null,
    },
    message: result.message,
  });
});

const logout = asyncHandler(async (_req, res) => {
  clearAuthCookie(res);

  sendResponse(res, {
    message: "Logout berhasil",
  });
});

export default {
  googleCallback,
  googleLogin,
  login,
  logout,
  me,
  redirectToGoogle,
  register,
  resendVerification,
  verifyEmail,
};
