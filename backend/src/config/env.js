import "dotenv/config";

const requiredEnvKeys = ["DATABASE_URL", "JWT_SECRET"];

for (const key of requiredEnvKeys) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const port = Number(process.env.PORT ?? 5000);
const emailVerificationTtlHours = Number(
  process.env.EMAIL_VERIFICATION_TTL_HOURS ?? 24,
);

const env = {
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  databaseUrl: process.env.DATABASE_URL,
  emailVerificationTtlHours: Number.isFinite(emailVerificationTtlHours)
    ? emailVerificationTtlHours
    : 24,
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  googleRedirectUri:
    process.env.GOOGLE_REDIRECT_URI ??
    `http://localhost:${port}/api/v1/auth/google/callback`,
  isProduction: process.env.NODE_ENV === "production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  jwtSecret: process.env.JWT_SECRET,
  mailFrom: process.env.MAIL_FROM || "CHILL App <no-reply@chill.test>",
  midtransClientKey: process.env.MIDTRANS_CLIENT_KEY ?? "",
  midtransIsProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  midtransServerKey: process.env.MIDTRANS_SERVER_KEY ?? "",
  nodeEnv: process.env.NODE_ENV ?? "development",
  port,
  smtpHost: process.env.SMTP_HOST ?? "",
  smtpPass: process.env.SMTP_PASS ?? "",
  smtpPort: Number(process.env.SMTP_PORT ?? 587),
  smtpSecure: process.env.SMTP_SECURE === "true",
  smtpUser: process.env.SMTP_USER ?? "",
};

export default env;
