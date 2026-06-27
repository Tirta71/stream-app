ALTER TABLE `users`
  ADD COLUMN `email_verified_at` DATETIME(3) NULL,
  ADD COLUMN `email_verification_token` VARCHAR(191) NULL;

UPDATE `users`
SET `email_verified_at` = `created_at`
WHERE `email_verified_at` IS NULL;

CREATE UNIQUE INDEX `users_email_verification_token_key`
ON `users`(`email_verification_token`);
