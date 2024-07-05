-- Table definations

-- Users and their related tables
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `alternate_emails` text DEFAULT NULL COMMENT "JSON column",
  `alternate_phone` text DEFAULT NULL COMMENT "JSON column",
  `languages_known` text DEFAULT NULL COMMENT "JSON column",
  `password` varchar(255) DEFAULT NULL,
  `google_id` text DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `gender` enum('male', 'female', 'not specified') NOT NULL DEFAULT 'not specified',
  `date_of_birth` date DEFAULT NULL,
  `status` enum('deactive','active','suspended','banned') NOT NULL DEFAULT 'active',
  `status_updated_at` datetime DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `verified_by` bigint(20) UNSIGNED DEFAULT NULL,
  `have_password` BOOLEAN NOT NULL DEFAULT 1 COMMENT '0 for social login, guest, 1 for general web login',
  `user_login_type` enum('web','social','guest') NOT NULL DEFAULT 'web',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `roles` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` varchar(50) DEFAULT NULL,
    `meta` varchar(200) DEFAULT NULL COMMENT 'Detail about the role',
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `permissions` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` varchar(50) DEFAULT NULL,
    `meta` varchar(200) DEFAULT NUll COMMENT 'Details abour the permission made for',
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `role_have_permissions` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `role_id` bigint(20) UNSIGNED NOT NULL,
    `permission_id` bigint(20) UNSIGNED NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_have_roles` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `role_id` bigint(20) UNSIGNED NOT NULL,
    `user_id` bigint(20) UNSIGNED NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_login_logs` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(20) UNSIGNED NOT NULL,
    `login_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `device_IP` varchar(50) DEFAULT NULL,
    `system_info` varchar(300) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- subjects and courses
CREATE TABLE `subjects` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`varchar(50) DEFAULT NULL,
    `meta` varchar(200) DEFAULT NULL,
    `created_by_user_id` bigint(20) UNSIGNED NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `levels` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `level_name` varchar(50) NOT NULL,
    `experties_as` enum('beginner', 'intermediate', 'expert', 'professional') DEFAULT 'beginner',
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_have_subjects` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(20) UNSIGNED NOT NULL,
    `subject_id` bigint(20) UNSIGNED NOT NULL,
    `level_from_id` bigint(20) UNSIGNED NOT NULL,
    `level_to_id` bigint(20) UNSIGNED NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_have_experiences` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `organisation_name` varchar(100) DEFAULT NULL,
    `organisation_type` varchar(40) DEFAULT NULL,
    `designation` varchar(70) DEFAULT NULL,
    `experience_in_years` int(4) UNSIGNED DEFAULT NULL,
    `experience_in_months` int(2) UNSIGNED DEFAULT NULL,
    `description_about_role` TEXT DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_qualifications` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(20) UNSIGNED NOT NULL,
    `name` varchar(70) NOT NULL,
    `started_at` date DEFAULT NULL,
    `ended_at` date DEFAULT NULL,
    `institute_name` varchar(100) DEFAULT NULL,
    `obtained_score` int(10) DEFAULT NULL,
    `max_score`int(10) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_tutering_details` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(20) UNSIGNED NOT NULL,
    `duration_period` enum('hourly', 'daily', 'monthly', 'quaterly', 'yearly'),
    `min_price` UNSIGNED DECIMAL(10,2) DEFAULT NULL,
    `max_price` UNSIGNED DECIMAL(10,2) DEFAULT NULL,
    `prive_varing_description` TEXT DEFAULT NULL,
    `total_experience` DECIMAL(3,1) DEFAULT 0,
    `online_experience` DECIMAL(3,1) DEFAULT 0,
    `offline_experience` DECIMAL(3,1) DEFAULT 0,
    `can_travel`BOOLEAN DEFAULT 0,
    `travel_kms` UNSIGNED DECIMAL(7, 2) DEFAULT 0,
    `can_teach_online` BOOLEAN DEFAULT 0,
    `have_digital_pen` BOOLEAN DEFAULT 0,
    `can_help_with_homework` BOOLEAN DEFAULT 0,
    `currently_working` BOOLEAN DEFAULT 0,
    `looking_for_duration` enum('part-time', 'full-time', 'both') DEFAULT 'full-time',
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- Posts and related tables

CREATE TABLE `posts` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` varchar(100) NOT NULL,
    `description` TEXT DEFAULT NULL,
    `created_by_user_id` bigint(20) UNSIGNED NOT NULL,
    `purpose` enum('assignment_help', 'homework_help', 'tutions', 'guidance') NULL DEFAULT NULL,
    `subject_id` bigint(20) UNSIGNED NOT NULL,
    `experties` enum('beginner', 'intermediate', 'expert', 'professional') DEFAULT NULL,
    `level_id` bigint(20) UNSIGNED DEFAULT NUL
    `gender_preferrance` enum('male', 'female', 'any') DEFAULT 'any',
    `status` enum('open', 'on-hold', 'fullfilled', 'cancel') DEFAULT 'open',
    `min_budget` UNSIGNED DECIMAL(7, 2) DEFAULT 0,
    `max_budget` UNSIGNED DECIMAL(7, 2) DEFAULT 0,
    `budget_currency_code` varchar(10) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Add On tables

CREATE TABLE `medias` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT , 
    `model_name` VARCHAR(255) NOT NULL , 
    `model_id` BIGINT UNSIGNED NOT NULL , 
    'model_column' VARCHAR(255) NOT NULL,
    `file_name` TEXT NOT NULL , 
    `source` enum('storage', 'web') DEFAULT 'storage',
    `original_file_name` TEXT NOT NULL,
    `file_path` VARCHAR(255) NULL , 
    `file_extension` VARCHAR(10) NULL DEFAULT NULL , 
    `file_mime` VARCHAR(20) NULL DEFAULT NULL , 
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- Table Modification and keying up

ALTER TABLE `users`
  ADD CONSTRAINT `users_have_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_have_verifier` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,

ALTER TABLE `user_have_roles`
  ADD CONSTRAINT `user_have_roles_have_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  ADD CONSTRAINT `user_have_roles_have_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,

ALTER TABLE `user_login_logs`
  ADD CONSTRAINT `users_have_login_logs` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,

ALTER TABLE `role_have_permissions`
  ADD CONSTRAINT `role_have_permissions_have_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  ADD CONSTRAINT `role_have_permissions_have_permissions` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,




