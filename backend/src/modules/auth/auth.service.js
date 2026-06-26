import prisma from "../../config/prisma.js";
import env from "../../config/env.js";
import ApiError from "../../utils/ApiError.js";
import { signToken } from "../../utils/jwt.js";
import { comparePassword, hashPassword } from "../../utils/password.js";

const googleUserInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
const googleTokenUrl = "https://oauth2.googleapis.com/token";
const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

const getPublicUser = (user) => ({
  email: user.email,
  id: user.id.toString(),
  name: user.name,
  role: user.role,
});

const buildAuthResponse = (user) => ({
  token: signToken({
    id: user.id.toString(),
    role: user.role,
  }),
  user: getPublicUser(user),
});

const ensureGoogleOAuthConfig = () => {
  if (!env.googleClientId || !env.googleClientSecret) {
    throw new ApiError(
      500,
      "Google OAuth belum dikonfigurasi",
      null,
      "GOOGLE_OAUTH_NOT_CONFIGURED",
    );
  }
};

const getGoogleAuthUrl = () => {
  ensureGoogleOAuthConfig();

  const params = new URLSearchParams({
    access_type: "online",
    client_id: env.googleClientId,
    prompt: "select_account",
    redirect_uri: env.googleRedirectUri,
    response_type: "code",
    scope: "openid email profile",
  });

  return `${googleAuthUrl}?${params.toString()}`;
};

const exchangeGoogleCode = async (code) => {
  ensureGoogleOAuthConfig();

  const response = await fetch(googleTokenUrl, {
    body: new URLSearchParams({
      client_id: env.googleClientId,
      client_secret: env.googleClientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: env.googleRedirectUri,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const tokenData = await response.json();

  if (!response.ok || !tokenData.access_token) {
    throw new ApiError(401, "Kode Google tidak valid", null, "GOOGLE_CODE_INVALID");
  }

  return tokenData.access_token;
};

const register = async ({ email, name, password }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new ApiError(
      409,
      "Email sudah terdaftar",
      null,
      "EMAIL_ALREADY_REGISTERED",
    );
  }

  const user = await prisma.user.create({
    data: {
      authProviders: {
        create: {
          provider: "EMAIL",
          providerEmail: email,
          providerUserId: email,
        },
      },
      email,
      name,
      password: await hashPassword(password),
    },
  });

  return buildAuthResponse(user);
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    throw new ApiError(
      401,
      "Email atau password salah",
      null,
      "INVALID_CREDENTIALS",
    );
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(
      401,
      "Email atau password salah",
      null,
      "INVALID_CREDENTIALS",
    );
  }

  return buildAuthResponse(user);
};

const getGoogleProfile = async (accessToken) => {
  const response = await fetch(googleUserInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new ApiError(
      401,
      "Token Google tidak valid",
      null,
      "GOOGLE_TOKEN_INVALID",
    );
  }

  const profile = await response.json();

  if (!profile.sub || !profile.email) {
    throw new ApiError(
      401,
      "Profil Google tidak valid",
      null,
      "GOOGLE_PROFILE_INVALID",
    );
  }

  if (profile.email_verified === false) {
    throw new ApiError(
      401,
      "Email Google belum terverifikasi",
      null,
      "GOOGLE_EMAIL_NOT_VERIFIED",
    );
  }

  return {
    email: profile.email,
    name: profile.name ?? profile.email.split("@")[0],
    providerUserId: profile.sub,
  };
};

const loginWithGoogle = async ({ accessToken }) => {
  const { email, name, providerUserId } = await getGoogleProfile(accessToken);
  const authProvider = await prisma.userAuthProvider.findFirst({
    include: { user: true },
    where: {
      provider: "GOOGLE",
      providerUserId,
    },
  });

  if (authProvider) {
    return buildAuthResponse(authProvider.user);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    const existingGoogleProvider = await prisma.userAuthProvider.findFirst({
      where: {
        provider: "GOOGLE",
        userId: existingUser.id,
      },
    });

    if (existingGoogleProvider) {
      return buildAuthResponse(existingUser);
    }
  }

  const user = existingUser
    ? await prisma.user.update({
        data: {
          authProviders: {
            create: {
              provider: "GOOGLE",
              providerEmail: email,
              providerUserId,
            },
          },
        },
        where: { id: existingUser.id },
      })
    : await prisma.user.create({
        data: {
          authProviders: {
            create: {
              provider: "GOOGLE",
              providerEmail: email,
              providerUserId,
            },
          },
          email,
          name,
        },
      });

  return buildAuthResponse(user);
};

const loginWithGoogleCode = async ({ code }) => {
  const accessToken = await exchangeGoogleCode(code);

  return loginWithGoogle({ accessToken });
};

export default {
  getPublicUser,
  getGoogleAuthUrl,
  login,
  loginWithGoogleCode,
  loginWithGoogle,
  register,
};
