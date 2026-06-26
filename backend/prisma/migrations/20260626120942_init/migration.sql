-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(255) NULL,
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_auth_providers` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `provider` ENUM('email', 'google') NOT NULL,
    `provider_user_id` VARCHAR(255) NOT NULL,
    `provider_email` VARCHAR(150) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packages` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `price` DECIMAL(12, 2) NOT NULL,
    `duration_days` INTEGER NOT NULL,
    `quality` VARCHAR(50) NOT NULL,
    `max_devices` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `package_id` BIGINT NOT NULL,
    `order_code` VARCHAR(100) NOT NULL,
    `total_price` DECIMAL(12, 2) NOT NULL,
    `status` ENUM('pending', 'paid', 'expired', 'cancelled') NOT NULL DEFAULT 'pending',
    `payment_expired_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `orders_order_code_key`(`order_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT NOT NULL,
    `payment_method` VARCHAR(100) NOT NULL,
    `payment_gateway` VARCHAR(100) NULL,
    `transaction_id` VARCHAR(150) NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `status` ENUM('pending', 'paid', 'failed', 'expired') NOT NULL DEFAULT 'pending',
    `paid_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `package_id` BIGINT NOT NULL,
    `order_id` BIGINT NOT NULL,
    `status` ENUM('active', 'expired', 'cancelled') NOT NULL DEFAULT 'active',
    `started_at` DATETIME(3) NOT NULL,
    `ended_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `subscriptions_order_id_key`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `series_films` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(150) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `type` ENUM('movie', 'series') NOT NULL,
    `description` TEXT NOT NULL,
    `image` TEXT NOT NULL,
    `preview_image` TEXT NOT NULL,
    `rating` DECIMAL(3, 1) NOT NULL,
    `age_rating` VARCHAR(10) NOT NULL,
    `badge` VARCHAR(50) NULL,
    `release_year` INTEGER NULL,
    `is_top_ten` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `is_trending` BOOLEAN NOT NULL DEFAULT false,
    `is_premium` BOOLEAN NOT NULL DEFAULT false,
    `trailer_url` TEXT NULL,
    `published_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `series_films_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `episode_movies` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `series_film_id` BIGINT NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `season_number` INTEGER NULL,
    `episode_number` INTEGER NULL,
    `duration` VARCHAR(50) NOT NULL,
    `video_url` TEXT NULL,
    `thumbnail_url` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genres` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(120) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `genres_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `series_film_genres` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `series_film_id` BIGINT NOT NULL,
    `genre_id` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `people` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `photo_url` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `series_film_people` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `series_film_id` BIGINT NOT NULL,
    `people_id` BIGINT NOT NULL,
    `role` ENUM('cast', 'director', 'creator') NOT NULL,
    `character_name` VARCHAR(150) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `my_lists` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `series_film_id` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `watch_progress` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `series_film_id` BIGINT NOT NULL,
    `episode_movie_id` BIGINT NULL,
    `progress_percent` INTEGER NOT NULL DEFAULT 0,
    `last_position_seconds` INTEGER NOT NULL DEFAULT 0,
    `last_watched_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users_auth_providers` ADD CONSTRAINT `users_auth_providers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `episode_movies` ADD CONSTRAINT `episode_movies_series_film_id_fkey` FOREIGN KEY (`series_film_id`) REFERENCES `series_films`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `series_film_genres` ADD CONSTRAINT `series_film_genres_series_film_id_fkey` FOREIGN KEY (`series_film_id`) REFERENCES `series_films`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `series_film_genres` ADD CONSTRAINT `series_film_genres_genre_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `genres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `series_film_people` ADD CONSTRAINT `series_film_people_series_film_id_fkey` FOREIGN KEY (`series_film_id`) REFERENCES `series_films`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `series_film_people` ADD CONSTRAINT `series_film_people_people_id_fkey` FOREIGN KEY (`people_id`) REFERENCES `people`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `my_lists` ADD CONSTRAINT `my_lists_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `my_lists` ADD CONSTRAINT `my_lists_series_film_id_fkey` FOREIGN KEY (`series_film_id`) REFERENCES `series_films`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `watch_progress` ADD CONSTRAINT `watch_progress_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `watch_progress` ADD CONSTRAINT `watch_progress_series_film_id_fkey` FOREIGN KEY (`series_film_id`) REFERENCES `series_films`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `watch_progress` ADD CONSTRAINT `watch_progress_episode_movie_id_fkey` FOREIGN KEY (`episode_movie_id`) REFERENCES `episode_movies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
