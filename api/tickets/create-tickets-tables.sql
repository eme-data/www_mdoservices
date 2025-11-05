-- =====================================================
-- Schéma de base de données pour le système de tickets
-- MDO Services - Support Client Intégré
-- =====================================================

-- Table des tickets
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ticket_number` VARCHAR(20) UNIQUE NOT NULL COMMENT 'Numéro de ticket (ex: TK-2024-00001)',
  `user_id` INT NOT NULL COMMENT 'ID de l\'utilisateur qui a créé le ticket',
  `title` VARCHAR(200) NOT NULL COMMENT 'Titre du ticket',
  `description` TEXT NOT NULL COMMENT 'Description détaillée du problème',
  `category` VARCHAR(50) NOT NULL COMMENT 'Catégorie du ticket',
  `priority` ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal' COMMENT 'Priorité du ticket',
  `status` ENUM('open', 'in_progress', 'waiting_client', 'resolved', 'closed') DEFAULT 'open' COMMENT 'Statut du ticket',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Date de dernière mise à jour',
  `resolved_at` TIMESTAMP NULL COMMENT 'Date de résolution',
  `closed_at` TIMESTAMP NULL COMMENT 'Date de fermeture',

  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,

  INDEX `idx_user` (`user_id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_priority` (`priority`),
  INDEX `idx_category` (`category`),
  INDEX `idx_ticket_number` (`ticket_number`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des commentaires/réponses sur les tickets
CREATE TABLE IF NOT EXISTS `ticket_comments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ticket_id` INT NOT NULL COMMENT 'ID du ticket',
  `user_id` INT NULL COMMENT 'ID de l\'utilisateur (NULL si commentaire admin/support)',
  `author_name` VARCHAR(100) NOT NULL COMMENT 'Nom de l\'auteur (client ou support)',
  `author_type` ENUM('client', 'support') NOT NULL COMMENT 'Type d\'auteur',
  `message` TEXT NOT NULL COMMENT 'Contenu du commentaire',
  `is_internal` BOOLEAN DEFAULT FALSE COMMENT 'Commentaire interne (visible uniquement par le support)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création',

  FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,

  INDEX `idx_ticket` (`ticket_id`),
  INDEX `idx_user` (`user_id`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table pour stocker le compteur de tickets (pour générer les numéros)
CREATE TABLE IF NOT EXISTS `ticket_counter` (
  `year` INT NOT NULL PRIMARY KEY COMMENT 'Année',
  `counter` INT NOT NULL DEFAULT 0 COMMENT 'Compteur de tickets pour l\'année',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initialiser le compteur pour l'année en cours
INSERT INTO `ticket_counter` (`year`, `counter`)
VALUES (YEAR(NOW()), 0)
ON DUPLICATE KEY UPDATE `counter` = `counter`;

-- Vue pour afficher les tickets avec informations utilisateur
CREATE OR REPLACE VIEW `tickets_with_user` AS
SELECT
  t.`id`,
  t.`ticket_number`,
  t.`user_id`,
  u.`username`,
  u.`email`,
  t.`title`,
  t.`description`,
  t.`category`,
  t.`priority`,
  t.`status`,
  t.`created_at`,
  t.`updated_at`,
  t.`resolved_at`,
  t.`closed_at`,
  (SELECT COUNT(*) FROM `ticket_comments` WHERE `ticket_id` = t.`id`) AS `comment_count`,
  (SELECT `created_at` FROM `ticket_comments` WHERE `ticket_id` = t.`id` ORDER BY `created_at` DESC LIMIT 1) AS `last_comment_at`
FROM `tickets` t
INNER JOIN `users` u ON t.`user_id` = u.`id`;
