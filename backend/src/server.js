import app from "./app.js";
import env from "./config/env.js";
import authService from "./modules/auth/auth.service.js";

const cleanupExpiredVerificationAccounts = () => {
  authService
    .cleanupExpiredUnverifiedUsers()
    .then((result) => {
      if (result.count > 0) {
        console.info(`Deleted ${result.count} expired unverified account(s)`);
      }
    })
    .catch((error) => {
      console.error("Failed to cleanup expired verification accounts:", error);
    });
};

cleanupExpiredVerificationAccounts();

const cleanupInterval = setInterval(
  cleanupExpiredVerificationAccounts,
  60 * 60 * 1000,
);

cleanupInterval.unref?.();

app.listen(env.port, () => {
  console.log(`CHILL API running on http://localhost:${env.port}`);
});
