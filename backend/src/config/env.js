import "dotenv/config";

const requiredEnvKeys = ["DATABASE_URL", "JWT_SECRET"];

for (const key of requiredEnvKeys) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const port = Number(process.env.PORT ?? 5000);

const env = {
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  databaseUrl: process.env.DATABASE_URL,
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  googleRedirectUri:
    process.env.GOOGLE_REDIRECT_URI ??
    `http://localhost:${port}/api/v1/auth/google/callback`,
  isProduction: process.env.NODE_ENV === "production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV ?? "development",
  port,
};

export default env;
