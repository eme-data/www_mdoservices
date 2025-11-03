-- ============================================
-- Blog Enhancements Migration
-- Creates tables for categories, tags, and media
-- ============================================

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Post-Tags relationship (many-to-many)
CREATE TABLE IF NOT EXISTS post_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    tag_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE KEY unique_post_tag (post_id, tag_id),
    INDEX idx_post_id (post_id),
    INDEX idx_tag_id (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Media library table
CREATE TABLE IF NOT EXISTS media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    width INT DEFAULT NULL,
    height INT DEFAULT NULL,
    uploaded_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add category_id column to posts table if it doesn't exist
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS category_id INT DEFAULT NULL AFTER author_name,
ADD FOREIGN KEY IF NOT EXISTS fk_posts_category (category_id) REFERENCES categories(id) ON DELETE SET NULL;

-- Add index on category_id
ALTER TABLE posts ADD INDEX IF NOT EXISTS idx_category_id (category_id);

-- Insert default categories
INSERT IGNORE INTO categories (name, slug, description, color, display_order) VALUES
('Actualités', 'actualites', 'Dernières actualités et nouveautés IT', '#3B82F6', 1),
('Tutoriels', 'tutoriels', 'Guides et tutoriels techniques', '#10B981', 2),
('Cybersécurité', 'cybersecurite', 'Actualités et conseils en cybersécurité', '#EF4444', 3),
('Cloud & Infrastructure', 'cloud-infrastructure', 'Solutions cloud et infrastructure IT', '#8B5CF6', 4),
('Télécom', 'telecom', 'Téléphonie et communications unifiées', '#F59E0B', 5);
