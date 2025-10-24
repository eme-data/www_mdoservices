<?php
/**
 * MDO Services API - Configuration
 *
 * IMPORTANT: Copy this file to config.local.php and update with your credentials
 * Never commit config.local.php to version control!
 */

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Timezone
date_default_timezone_set('Europe/Paris');

// Database Configuration
// These are default values - override them in config.local.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASS', 'your_database_password');
define('DB_CHARSET', 'utf8mb4');

// JWT Secret Key for authentication tokens
// IMPORTANT: Generate a strong random key for production!
define('JWT_SECRET', 'your-super-secret-jwt-key-change-this-in-production');
define('JWT_EXPIRATION', 86400); // 24 hours in seconds

// CORS Configuration
define('CORS_ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://www.mdoservices.fr',
    'https://mdoservices.fr'
]);

// Session Configuration
define('SESSION_LIFETIME', 86400); // 24 hours

// File Upload Configuration
define('UPLOAD_MAX_SIZE', 5242880); // 5MB
define('UPLOAD_ALLOWED_TYPES', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);

// API Configuration
define('API_VERSION', 'v1');
define('API_BASE_PATH', '/api');

// Load local configuration if exists
if (file_exists(__DIR__ . '/config.local.php')) {
    require_once __DIR__ . '/config.local.php';
}
