<?php
/**
 * Test de débogage pour l'API tickets
 * Accéder à : /api/tickets/test-debug.php
 */

// Ne pas démarrer la session pour ce test
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Credentials: true');

$debug = [
    'test' => 'API Tickets Debug',
    'timestamp' => date('Y-m-d H:i:s'),
    'method' => $_SERVER['REQUEST_METHOD'],
    'php_version' => phpversion(),
    'request_uri' => $_SERVER['REQUEST_URI'],
    'script_filename' => $_SERVER['SCRIPT_FILENAME'],
    'document_root' => $_SERVER['DOCUMENT_ROOT'],
    'session_status' => session_status() == PHP_SESSION_NONE ? 'not_started' : 'started',
    'config_loaded' => false,
    'db_constants' => [],
    'session_data' => []
];

// Tester le chargement de config
try {
    require_once __DIR__ . '/../config/config.php';
    $debug['config_loaded'] = true;
    $debug['db_constants'] = [
        'DB_HOST' => defined('DB_HOST') ? DB_HOST : 'NOT_DEFINED',
        'DB_NAME' => defined('DB_NAME') ? DB_NAME : 'NOT_DEFINED',
        'DB_USER' => defined('DB_USER') ? DB_USER : 'NOT_DEFINED',
        'DB_PASS' => defined('DB_PASS') ? 'HIDDEN' : 'NOT_DEFINED',
    ];
} catch (Exception $e) {
    $debug['config_error'] = $e->getMessage();
}

// Tester la session
try {
    session_start();
    $debug['session_id'] = session_id();
    $debug['session_data'] = [
        'user_id' => $_SESSION['user_id'] ?? 'NOT_SET',
        'username' => $_SESSION['username'] ?? 'NOT_SET',
        'authenticated' => $_SESSION['authenticated'] ?? false,
    ];
} catch (Exception $e) {
    $debug['session_error'] = $e->getMessage();
}

// Tester la connexion BDD
if ($debug['config_loaded']) {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . (defined('DB_CHARSET') ? DB_CHARSET : 'utf8mb4');
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);
        $debug['database'] = 'CONNECTED';

        // Tester si les tables existent
        $tables = ['users', 'tickets', 'ticket_comments', 'ticket_counter'];
        $debug['tables'] = [];
        foreach ($tables as $table) {
            $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
            $debug['tables'][$table] = $stmt->rowCount() > 0 ? 'EXISTS' : 'NOT_FOUND';
        }
    } catch (PDOException $e) {
        $debug['database_error'] = $e->getMessage();
    }
}

echo json_encode($debug, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
