import prisma from "../../config/prisma.js";
import env from "../../config/env.js";
import ApiError from "../../utils/ApiError.js";
import { signToken } from "../../utils/jwt.js";
import sendEmail from "../../utils/mailer.js";
import { comparePassword, hashPassword } from "../../utils/password.js";
import { v4 as uuidv4 } from "uuid";

const googleUserInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
const googleTokenUrl = "https://oauth2.googleapis.com/token";
const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const verificationTtlMs = env.emailVerificationTtlHours * 60 * 60 * 1000;

const getPublicUser = (user) => ({
  email: user.email,
  emailVerifiedAt: user.emailVerifiedAt ?? null,
  id: user.id.toString(),
  isEmailVerified: Boolean(user.emailVerifiedAt),
  name: user.name,
  photoUrl: user.photoUrl ?? null,
  role: user.role,
});

const buildAuthResponse = (user) => ({
  token: signToken({
    id: user.id.toString(),
    role: user.role,
  }),
  user: getPublicUser(user),
});

const buildVerificationRequiredResponse = (user) => ({
  emailVerificationExpiresAt: user.emailVerificationExpiresAt ?? null,
  requiresEmailVerification: true,
  user: getPublicUser(user),
});

const createVerificationToken = () => uuidv4();

const getVerificationExpiresAt = () => new Date(Date.now() + verificationTtlMs);

const createVerificationData = () => ({
  emailVerificationExpiresAt: getVerificationExpiresAt(),
  emailVerificationToken: createVerificationToken(),
});

const isVerificationExpired = (user) =>
  Boolean(
    user?.emailVerificationExpiresAt &&
      user.emailVerificationExpiresAt.getTime() <= Date.now(),
  );

const deleteUnverifiedUser = async (user) => {
  if (!user || user.emailVerifiedAt) {
    return;
  }

  await prisma.user.delete({
    where: { id: user.id },
  });
};

const cleanupExpiredUnverifiedUsers = async () =>
  prisma.user.deleteMany({
    where: {
      emailVerificationExpiresAt: {
        lte: new Date(),
      },
      emailVerifiedAt: null,
    },
  });

const throwVerificationExpired = () => {
  throw new ApiError(
    410,
    "Masa verifikasi akun sudah kedaluwarsa. Silakan daftar ulang untuk membuat tautan verifikasi baru.",
    null,
    "EMAIL_VERIFICATION_EXPIRED",
  );
};

const buildEmailVerificationUrl = (token) =>
  `${env.clientUrl}/auth/verifikasi-email?token=${encodeURIComponent(token)}`;

const sendVerificationEmail = async (user, { rotateToken = false } = {}) => {
  if (user.emailVerifiedAt) {
    return user;
  }

  const shouldCreateNewToken =
    rotateToken ||
    !user.emailVerificationToken ||
    !user.emailVerificationExpiresAt;
  const targetUser = shouldCreateNewToken
    ? await prisma.user.update({
        data: createVerificationData(),
        where: { id: user.id },
      })
    : user;
  const verificationUrl = buildEmailVerificationUrl(
    targetUser.emailVerificationToken,
  );

  await sendEmail({
    html: `
      <h2>Verifikasi Email CHILL</h2>
      <p>Halo ${targetUser.name},</p>
      <p>Terima kasih sudah mendaftar di CHILL.</p>
      <p>Untuk mengaktifkan akun, silakan klik tombol verifikasi di bawah ini.</p>
      <p>
        <a href="${verificationUrl}" style="display:inline-block;background:#0f1e93;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:700;">
          Verifikasi Email
        </a>
      </p>
      <p>Tautan ini berlaku selama ${env.emailVerificationTtlHours} jam. Jika tautan kedaluwarsa, akun yang belum terverifikasi akan dihapus dan kamu perlu daftar ulang.</p>
      <p>Jika tombol tidak dapat dibuka, salin tautan berikut ke browser:</p>
      <p>${verificationUrl}</p>
      <p>Jika kamu tidak merasa membuat akun ini, abaikan email ini.</p>
    `,
    subject: "Verifikasi Email CHILL",
    text: `Halo ${targetUser.name},\n\nKlik tautan berikut untuk verifikasi email kamu:\n${verificationUrl}\n\nTautan ini berlaku selama ${env.emailVerificationTtlHours} jam. Jika tautan kedaluwarsa, akun yang belum terverifikasi akan dihapus dan kamu perlu daftar ulang.\n\nJika kamu tidak merasa membuat akun ini, abaikan email ini.`,
    to: targetUser.email,
  });

  return targetUser;
};

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
    if (!existingUser.emailVerifiedAt) {
      if (isVerificationExpired(existingUser)) {
        await deleteUnverifiedUser(existingUser);
      } else {
        const targetUser = await sendVerificationEmail(existingUser, {
          rotateToken: true,
        });

        return buildVerificationRequiredResponse(targetUser);
      }
    } else {
      throw new ApiError(
        409,
        "Email sudah terdaftar",
        null,
        "EMAIL_ALREADY_REGISTERED",
      );
    }
  }

  const user = await prisma.user.create({
    data: {
      ...createVerificationData(),
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

  await sendVerificationEmail(user);

  return buildVerificationRequiredResponse(user);
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

  if (!user.emailVerifiedAt) {
    if (isVerificationExpired(user)) {
      await deleteUnverifiedUser(user);
      throwVerificationExpired();
    }

    await sendVerificationEmail(user, { rotateToken: true });
    throw new ApiError(
      403,
      "Email belum diverifikasi. Kami telah mengirim ulang tautan verifikasi ke email kamu.",
      null,
      "EMAIL_NOT_VERIFIED",
    );
  }

  return buildAuthResponse(user);
};

const resendVerification = async ({ email }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError(
      404,
      "Akun tidak ditemukan. Silakan daftar terlebih dahulu.",
      null,
      "USER_NOT_FOUND",
    );
  }

  if (user.emailVerifiedAt) {
    return {
      message: "Email sudah terverifikasi. Silakan login menggunakan akun kamu.",
      user: getPublicUser(user),
    };
  }

  if (isVerificationExpired(user)) {
    await deleteUnverifiedUser(user);
    throwVerificationExpired();
  }

  const targetUser = await sendVerificationEmail(user, { rotateToken: true });

  return {
    emailVerificationExpiresAt: targetUser.emailVerificationExpiresAt,
    message:
      "Tautan verifikasi baru telah dikirim. Silakan periksa inbox, spam, atau folder promosi.",
    user: getPublicUser(targetUser),
  };
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
    photoUrl: profile.picture ?? null,
    providerUserId: profile.sub,
  };
};

const loginWithGoogle = async ({ accessToken }) => {
  const { email, name, photoUrl, providerUserId } =
    await getGoogleProfile(accessToken);
  const authProvider = await prisma.userAuthProvider.findFirst({
    include: { user: true },
    where: {
      provider: "GOOGLE",
      providerUserId,
    },
  });

  if (authProvider) {
    if (!authProvider.user.emailVerifiedAt) {
      if (isVerificationExpired(authProvider.user)) {
        await deleteUnverifiedUser(authProvider.user);

        return loginWithGoogle({ accessToken });
      }

      const targetUser = await sendVerificationEmail(authProvider.user, {
        rotateToken: true,
      });

      return buildVerificationRequiredResponse(targetUser);
    }

    return buildAuthResponse(authProvider.user);
  }

  let existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser && !existingUser.emailVerifiedAt && isVerificationExpired(existingUser)) {
    await deleteUnverifiedUser(existingUser);
    existingUser = null;
  }

  if (existingUser) {
    const existingGoogleProvider = await prisma.userAuthProvider.findFirst({
      where: {
        provider: "GOOGLE",
        userId: existingUser.id,
      },
    });

    if (existingGoogleProvider) {
      if (!existingUser.emailVerifiedAt) {
        const targetUser = await sendVerificationEmail(existingUser, {
          rotateToken: true,
        });

        return buildVerificationRequiredResponse(targetUser);
      }

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
          ...(existingUser.emailVerifiedAt ? {} : createVerificationData()),
          ...(existingUser.photoUrl || !photoUrl ? {} : { photoUrl }),
        },
        where: { id: existingUser.id },
      })
    : await prisma.user.create({
        data: {
          ...createVerificationData(),
          authProviders: {
            create: {
              provider: "GOOGLE",
              providerEmail: email,
              providerUserId,
            },
          },
          email,
          name,
          photoUrl,
        },
      });

  if (!user.emailVerifiedAt) {
    await sendVerificationEmail(user);

    return buildVerificationRequiredResponse(user);
  }

  return buildAuthResponse(user);
};

const loginWithGoogleCode = async ({ code }) => {
  const accessToken = await exchangeGoogleCode(code);

  return loginWithGoogle({ accessToken });
};

const verifyEmail = async ({ token }) => {
  const user = await prisma.user.findFirst({
    where: {
      emailVerificationToken: token,
    },
  });

  if (!user) {
    throw new ApiError(
      400,
      "Tautan verifikasi tidak valid. Silakan gunakan tautan terbaru atau kirim ulang verifikasi.",
      null,
      "INVALID_VERIFICATION_TOKEN",
    );
  }

  if (isVerificationExpired(user)) {
    await deleteUnverifiedUser(user);
    throwVerificationExpired();
  }

  const verifiedUser = await prisma.user.update({
    data: {
      emailVerificationExpiresAt: null,
      emailVerificationToken: null,
      emailVerifiedAt: new Date(),
    },
    where: { id: user.id },
  });

  return {
    token: buildAuthResponse(verifiedUser).token,
    message: "Email berhasil diverifikasi. Anda akan dialihkan ke halaman utama.",
    user: getPublicUser(verifiedUser),
  };
};

export default {
  cleanupExpiredUnverifiedUsers,
  getPublicUser,
  getGoogleAuthUrl,
  login,
  loginWithGoogleCode,
  loginWithGoogle,
  register,
  resendVerification,
  verifyEmail,
};
