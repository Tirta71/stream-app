-- AlterTable
ALTER TABLE `payments` ADD COLUMN `bank` VARCHAR(50) NULL,
    ADD COLUMN `fraud_status` VARCHAR(50) NULL,
    ADD COLUMN `raw_notification` JSON NULL,
    ADD COLUMN `redirect_url` TEXT NULL,
    ADD COLUMN `snap_token` TEXT NULL,
    ADD COLUMN `va_number` VARCHAR(100) NULL;

-- CreateIndex
CREATE INDEX `payments_transaction_id_idx` ON `payments`(`transaction_id`);
