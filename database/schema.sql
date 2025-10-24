-- ================================================
-- MDO Services - MySQL Database Schema
-- Migration from Supabase PostgreSQL to MySQL
-- ================================================

-- Drop tables if they exist (for clean installation)
DROP TABLE IF EXISTS pricing_items;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

-- ================================================
-- Table: users
-- Purpose: Store partner/admin authentication
-- ================================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_admin TINYINT(1) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME NULL,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: posts
-- Purpose: Blog posts management
-- ================================================
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    cover_image_url VARCHAR(500),
    author_name VARCHAR(100),
    published_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_published (published_at),
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: pricing_items
-- Purpose: Partner pricing management
-- ================================================
CREATE TABLE pricing_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    solution VARCHAR(255) NOT NULL,
    prix_partenaire DECIMAL(10,2),
    commission DECIMAL(5,2),
    prix_revendeur DECIMAL(10,2),
    prix_public DECIMAL(10,2),
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order),
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Default Admin User
-- Username: admin
-- Password: ChangeMe123! (PLEASE CHANGE THIS!)
-- Password hash generated with: password_hash('ChangeMe123!', PASSWORD_DEFAULT)
-- ================================================
INSERT INTO users (username, email, password_hash, is_admin, is_active)
VALUES (
    'admin',
    'admin@mdoservices.fr',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    1,
    1
);

-- ================================================
-- Sample Data for Testing
-- ================================================

-- Sample blog posts
INSERT INTO posts (slug, title, excerpt, content, author_name, published_at) VALUES
(
    'bienvenue-sur-notre-blog',
    'Bienvenue sur le blog MDO Services',
    'Découvrez nos actualités et conseils sur les solutions IT, Cloud et Télécom.',
    '<p>Bienvenue sur le blog officiel de MDO Services. Nous partageons ici nos expertises en solutions IT, Cloud et Télécom pour les entreprises en Occitanie.</p><p>Restez informés des dernières tendances et innovations technologiques.</p>',
    'Équipe MDO Services',
    NOW()
);

-- Sample pricing items (you can customize these)
INSERT INTO pricing_items (type, solution, prix_partenaire, commission, prix_revendeur, prix_public, display_order) VALUES
('subtitle', 'Microsoft 365', NULL, NULL, NULL, NULL, 1),
('solution', 'Microsoft 365 Business Basic', 4.20, 15.00, 4.83, 5.80, 2),
('solution', 'Microsoft 365 Business Standard', 10.50, 15.00, 12.08, 14.50, 3),
('subtitle', 'Google Workspace', NULL, NULL, NULL, NULL, 4),
('solution', 'Google Workspace Business Starter', 5.20, 15.00, 5.98, 7.18, 5),
('solution', 'Google Workspace Business Standard', 10.40, 15.00, 11.96, 14.35, 6);

-- ================================================
-- End of Schema
-- ================================================
