-- Tables pour les statistiques SharePoint
-- Création des tables pour stocker et gérer les statistiques d'utilisation SharePoint

-- Table: sharepoint_sites
-- Stocke les informations sur les sites SharePoint des clients
CREATE TABLE IF NOT EXISTS `sharepoint_sites` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `site_name` VARCHAR(200) NOT NULL,
  `site_url` VARCHAR(500),
  `site_type` ENUM('team', 'communication', 'onedrive', 'other') DEFAULT 'team',
  `total_storage_gb` DECIMAL(10, 2) DEFAULT 0,
  `used_storage_gb` DECIMAL(10, 2) DEFAULT 0,
  `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `is_active` BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_user` (`user_id`),
  INDEX `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: sharepoint_folders
-- Stocke les statistiques par dossier/bibliothèque
CREATE TABLE IF NOT EXISTS `sharepoint_folders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `site_id` INT NOT NULL,
  `folder_name` VARCHAR(500) NOT NULL,
  `folder_path` VARCHAR(1000),
  `folder_type` ENUM('library', 'folder', 'list', 'onedrive') DEFAULT 'folder',
  `size_gb` DECIMAL(10, 4) NOT NULL,
  `size_mb` DECIMAL(10, 2) GENERATED ALWAYS AS (`size_gb` * 1024) STORED,
  `file_count` INT DEFAULT 0,
  `last_modified` DATETIME,
  `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`site_id`) REFERENCES `sharepoint_sites`(`id`) ON DELETE CASCADE,
  INDEX `idx_site` (`site_id`),
  INDEX `idx_size` (`size_gb` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: sharepoint_stats_history
-- Historique des statistiques pour suivre l'évolution dans le temps
CREATE TABLE IF NOT EXISTS `sharepoint_stats_history` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `site_id` INT NOT NULL,
  `snapshot_date` DATE NOT NULL,
  `total_storage_gb` DECIMAL(10, 2) NOT NULL,
  `used_storage_gb` DECIMAL(10, 2) NOT NULL,
  `total_files` INT DEFAULT 0,
  `total_folders` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`site_id`) REFERENCES `sharepoint_sites`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `unique_snapshot` (`site_id`, `snapshot_date`),
  INDEX `idx_site_date` (`site_id`, `snapshot_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: sharepoint_file_types
-- Répartition par type de fichier
CREATE TABLE IF NOT EXISTS `sharepoint_file_types` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `site_id` INT NOT NULL,
  `file_extension` VARCHAR(50) NOT NULL,
  `file_count` INT DEFAULT 0,
  `total_size_gb` DECIMAL(10, 4) DEFAULT 0,
  `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`site_id`) REFERENCES `sharepoint_sites`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `unique_site_extension` (`site_id`, `file_extension`),
  INDEX `idx_site` (`site_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Vue: v_sharepoint_overview
-- Vue d'ensemble des statistiques SharePoint par utilisateur
CREATE OR REPLACE VIEW `v_sharepoint_overview` AS
SELECT
    u.id AS user_id,
    u.username,
    u.email,
    COUNT(DISTINCT s.id) AS total_sites,
    SUM(s.total_storage_gb) AS total_storage_gb,
    SUM(s.used_storage_gb) AS used_storage_gb,
    ROUND((SUM(s.used_storage_gb) / NULLIF(SUM(s.total_storage_gb), 0)) * 100, 2) AS usage_percentage,
    COUNT(f.id) AS total_folders,
    MAX(s.last_updated) AS last_updated
FROM users u
LEFT JOIN sharepoint_sites s ON u.id = s.user_id AND s.is_active = TRUE
LEFT JOIN sharepoint_folders f ON s.id = f.site_id
GROUP BY u.id, u.username, u.email;

-- Vue: v_top_folders_by_size
-- Top des dossiers les plus volumineux
CREATE OR REPLACE VIEW `v_top_folders_by_size` AS
SELECT
    f.id,
    f.site_id,
    s.site_name,
    s.user_id,
    f.folder_name,
    f.folder_path,
    f.folder_type,
    f.size_gb,
    f.size_mb,
    f.file_count,
    f.last_modified,
    ROUND((f.size_gb / NULLIF(s.used_storage_gb, 0)) * 100, 2) AS percentage_of_site
FROM sharepoint_folders f
JOIN sharepoint_sites s ON f.site_id = s.id
WHERE s.is_active = TRUE
ORDER BY f.size_gb DESC;

-- Données de test (optionnel)
-- Vous pouvez commenter cette section en production

-- Exemple: Insérer un site SharePoint de test
-- INSERT INTO sharepoint_sites (user_id, site_name, site_url, site_type, total_storage_gb, used_storage_gb)
-- VALUES (1, 'Site Équipe Principale', 'https://mdoservices.sharepoint.com/sites/equipe', 'team', 100.00, 65.50);

-- Exemple: Insérer des dossiers de test
-- INSERT INTO sharepoint_folders (site_id, folder_name, folder_path, folder_type, size_gb, file_count)
-- VALUES
-- (1, 'Documents partagés', '/Shared Documents', 'library', 25.50, 1250),
-- (1, 'Projets 2024', '/Shared Documents/Projets 2024', 'folder', 15.75, 450),
-- (1, 'Archives', '/Shared Documents/Archives', 'folder', 20.30, 800);
