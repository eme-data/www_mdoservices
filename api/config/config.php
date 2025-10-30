<?php
/**
 * MDO Services API - Configuration
 *
 * IMPORTANT: Copy this file to config.local.php and update with your credentials
 * Never commit config.local.php to version control!
 */

// Error reporting configuration
// Development: Reports all errors but logs them instead of displaying
// Production: Should set error_reporting(0) for security
if (defined('ENVIRONMENT') && ENVIRONMENT === 'production') {
    error_reporting(0);
    ini_set('display_errors', 0);
} else {
    // Development/Staging: Log all errors but don't display them
    error_reporting(E_ALL);
    ini_set('display_errors', 0);
}
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/php_errors.log');

// Timezone
date_default_timezone_set('Europe/Paris');

// Load local configuration FIRST (before defining defaults)
// This allows config.local.php to define the constants
if (file_exists(__DIR__ . '/config.local.php')) {
    require_once __DIR__ . '/config.local.php';
}

// Database Configuration
// Define defaults ONLY if not already defined in config.local.php
if (!defined('DB_HOST')) define('DB_HOST', 'localhost');
if (!defined('DB_NAME')) define('DB_NAME', 'your_database_name');
if (!defined('DB_USER')) define('DB_USER', 'your_database_user');
if (!defined('DB_PASS')) define('DB_PASS', 'your_database_password');
if (!defined('DB_CHARSET')) define('DB_CHARSET', 'utf8mb4');

// JWT Secret Key for authentication tokens
// CRITICAL SECURITY WARNING:
// The default JWT_SECRET below is NOT SECURE and MUST be changed in config.local.php
// Generate a secure key with: openssl rand -base64 64
// or: php -r "echo bin2hex(random_bytes(32));"
// NEVER use the default value in production - all tokens can be forged!
if (!defined('JWT_SECRET')) define('JWT_SECRET', 'your-super-secret-jwt-key-change-this-in-production');
if (!defined('JWT_EXPIRATION')) define('JWT_EXPIRATION', 86400); // 24 hours in seconds

// Security check: Warn if using default JWT secret
if (JWT_SECRET === 'your-super-secret-jwt-key-change-this-in-production') {
    error_log('CRITICAL SECURITY WARNING: Using default JWT_SECRET! Change it in config.local.php immediately!');
}

// CORS Configuration
if (!defined('CORS_ALLOWED_ORIGINS')) {
    define('CORS_ALLOWED_ORIGINS', [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://www.mdoservices.fr',
        'https://mdoservices.fr'
    ]);
}

// Session Configuration
if (!defined('SESSION_LIFETIME')) define('SESSION_LIFETIME', 86400); // 24 hours

// File Upload Configuration
if (!defined('UPLOAD_MAX_SIZE')) define('UPLOAD_MAX_SIZE', 5242880); // 5MB
if (!defined('UPLOAD_ALLOWED_TYPES')) {
    define('UPLOAD_ALLOWED_TYPES', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
}

// API Configuration
if (!defined('API_VERSION')) define('API_VERSION', 'v1');
if (!defined('API_BASE_PATH')) define('API_BASE_PATH', '/api');
