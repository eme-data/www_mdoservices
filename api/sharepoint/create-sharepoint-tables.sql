-- Tables pour les statistiques SharePoint
-- Création des tables pour stocker et gérer les statistiques d'utilisation SharePoint
-- Architecture multi-tenant : Chaque client dispose de son propre tenant SharePoint

-- Table: sharepoint_tenants
-- Stocke les informations sur le tenant Office 365 de chaque client
CREATE TABLE IF NOT EXISTS `sharepoint_tenants` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `tenant_name` VARCHAR(200) NOT NULL COMMENT 'Nom du tenant (ex: mdoservices)',
  `tenant_url` VARCHAR(500) COMMENT 'URL du tenant (ex: https://mdoservices.sharepoint.com)',
  `tenant_admin_url` VARCHAR(500) COMMENT 'URL admin (ex: https://mdoservices-admin.sharepoint.com)',
  `total_storage_gb` DECIMAL(10, 2) DEFAULT 0 COMMENT 'Quota total du tenant',
  `used_storage_gb` DECIMAL(10, 2) DEFAULT 0 COMMENT 'Stockage utilisé total',
  `license_type` VARCHAR(100) COMMENT 'Type de licence (Business Basic, Standard, Premium, E3, E5...)',
  `user_count` INT DEFAULT 0 COMMENT 'Nombre d\'utilisateurs actifs',
  `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `is_active` BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_user` (`user_id`),
  INDEX `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tenants SharePoint - un tenant par client';

-- Table: sharepoint_sites
-- Stocke les informations sur les sites SharePoint au sein de chaque tenant
CREATE TABLE IF NOT EXISTS `sharepoint_sites` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `tenant_id` INT NOT NULL COMMENT 'ID du tenant parent',
  `user_id` INT NOT NULL COMMENT 'ID du propriétaire (redondant pour faciliter les requêtes)',
  `site_name` VARCHAR(200) NOT NULL,
  `site_url` VARCHAR(500),
  `site_type` ENUM('team', 'communication', 'onedrive', 'other') DEFAULT 'team',
  `total_storage_gb` DECIMAL(10, 2) DEFAULT 0,
  `used_storage_gb` DECIMAL(10, 2) DEFAULT 0,
  `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `is_active` BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (`tenant_id`) REFERENCES `sharepoint_tenants`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_tenant` (`tenant_id`),
  INDEX `idx_user` (`user_id`),
  INDEX `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Sites SharePoint au sein de chaque tenant';

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
-- Vue d'ensemble des statistiques SharePoint par utilisateur avec infos tenant
CREATE OR REPLACE VIEW `v_sharepoint_overview` AS
SELECT
    u.id AS user_id,
    u.username,
    u.email,
    t.id AS tenant_id,
    t.tenant_name,
    t.tenant_url,
    t.license_type,
    t.user_count AS tenant_users,
    t.total_storage_gb AS tenant_quota_gb,
    t.used_storage_gb AS tenant_used_gb,
    ROUND((t.used_storage_gb / NULLIF(t.total_storage_gb, 0)) * 100, 2) AS tenant_usage_percentage,
    COUNT(DISTINCT s.id) AS total_sites,
    SUM(s.total_storage_gb) AS sites_total_storage_gb,
    SUM(s.used_storage_gb) AS sites_used_storage_gb,
    COUNT(f.id) AS total_folders,
    MAX(s.last_updated) AS last_updated
FROM users u
LEFT JOIN sharepoint_tenants t ON u.id = t.user_id AND t.is_active = TRUE
LEFT JOIN sharepoint_sites s ON t.id = s.tenant_id AND s.is_active = TRUE
LEFT JOIN sharepoint_folders f ON s.id = f.site_id
GROUP BY u.id, u.username, u.email, t.id, t.tenant_name, t.tenant_url, t.license_type, t.user_count, t.total_storage_gb, t.used_storage_gb;

-- Vue: v_top_folders_by_size
-- Top des dossiers les plus volumineux avec infos tenant
CREATE OR REPLACE VIEW `v_top_folders_by_size` AS
SELECT
    f.id,
    f.site_id,
    s.site_name,
    s.tenant_id,
    s.user_id,
    t.tenant_name,
    f.folder_name,
    f.folder_path,
    f.folder_type,
    f.size_gb,
    f.size_mb,
    f.file_count,
    f.last_modified,
    ROUND((f.size_gb / NULLIF(s.used_storage_gb, 0)) * 100, 2) AS percentage_of_site,
    ROUND((f.size_gb / NULLIF(t.used_storage_gb, 0)) * 100, 2) AS percentage_of_tenant
FROM sharepoint_folders f
JOIN sharepoint_sites s ON f.site_id = s.id
JOIN sharepoint_tenants t ON s.tenant_id = t.id
WHERE s.is_active = TRUE AND t.is_active = TRUE
ORDER BY f.size_gb DESC;

-- Données de test (optionnel)
-- Vous pouvez commenter cette section en production

-- Exemple: Insérer un tenant SharePoint de test
-- INSERT INTO sharepoint_tenants (user_id, tenant_name, tenant_url, tenant_admin_url, total_storage_gb, used_storage_gb, license_type, user_count)
-- VALUES (1, 'clientabc', 'https://clientabc.sharepoint.com', 'https://clientabc-admin.sharepoint.com', 1024.00, 650.50, 'Microsoft 365 Business Standard', 25);

-- Exemple: Insérer un site SharePoint de test
-- INSERT INTO sharepoint_sites (tenant_id, user_id, site_name, site_url, site_type, total_storage_gb, used_storage_gb)
-- VALUES (1, 1, 'Site Équipe Principale', 'https://clientabc.sharepoint.com/sites/equipe', 'team', 100.00, 65.50);

-- Exemple: Insérer des dossiers de test
-- INSERT INTO sharepoint_folders (site_id, folder_name, folder_path, folder_type, size_gb, file_count)
-- VALUES
-- (1, 'Documents partagés', '/Shared Documents', 'library', 25.50, 1250),
-- (1, 'Projets 2024', '/Shared Documents/Projets 2024', 'folder', 15.75, 450),
-- (1, 'Archives', '/Shared Documents/Archives', 'folder', 20.30, 800);

-- Note: Chaque client (user_id) a un tenant SharePoint unique
-- L'architecture est : Client → Tenant → Sites → Dossiers
