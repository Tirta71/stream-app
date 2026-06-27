ALTER TABLE `users`
  ADD COLUMN `email_verification_expires_at` DATETIME(3) NULL;

UPDATE `users`
SET `email_verification_expires_at` = DATE_ADD(COALESCE(`updated_at`, NOW(3)), INTERVAL 24 HOUR)
WHERE `email_verified_at` IS NULL
  AND `email_verification_token` IS NOT NULL
  AND `email_verification_expires_at` IS NULL;

CREATE INDEX `users_email_verification_expires_at_idx`
ON `users`(`email_verification_expires_at`);
