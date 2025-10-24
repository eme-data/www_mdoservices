<?php
/**
 * Local Configuration Template
 *
 * Copy this file to config.local.php and update with your Hostinger credentials
 *
 * Instructions:
 * 1. Copy this file: cp config.local.example.php config.local.php
 * 2. Update the values below with your Hostinger database credentials
 * 3. config.local.php is ignored by git and will not be committed
 */

// Hostinger Database Configuration
// You can find these in your Hostinger control panel under "Databases"

define('DB_HOST', 'localhost'); // Usually 'localhost' on Hostinger
define('DB_NAME', 'u123456789_mdoservices'); // Your database name
define('DB_USER', 'u123456789_mdouser'); // Your database username
define('DB_PASS', 'YourStrongPassword123!'); // Your database password

// JWT Secret Key
// Generate a random key here: https://randomkeygen.com/
define('JWT_SECRET', 'CHANGE-THIS-TO-A-RANDOM-STRING-min-32-chars');

// Production Settings
error_reporting(0);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/error.log');

// Add your production domain
define('CORS_ALLOWED_ORIGINS', [
    'https://www.mdoservices.fr',
    'https://mdoservices.fr'
]);
