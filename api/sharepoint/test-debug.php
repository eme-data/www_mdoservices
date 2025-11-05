<?php
/**
 * Fichier de test pour diagnostiquer les problèmes d'API SharePoint
 */

// Capturer TOUTES les sorties
ob_start();

// Gestionnaires d'erreurs pour capturer tout
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    error_log("PHP Error [$errno]: $errstr in $errfile on line $errline");
    return true; // Ne pas afficher l'erreur
});

set_exception_handler(function($exception) {
    error_log("Uncaught Exception: " . $exception->getMessage());
});

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$results = [
    'success' => true,
    'timestamp' => date('Y-m-d H:i:s'),
    'tests' => []
];

// Test 1: Session
try {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    $results['tests']['session'] = [
        'status' => 'OK',
        'session_status' => session_status(),
        'user_authenticated' => isset($_SESSION['user_id']),
        'user_id' => $_SESSION['user_id'] ?? null
    ];
} catch (Exception $e) {
    $results['tests']['session'] = [
        'status' => 'ERROR',
        'message' => $e->getMessage()
    ];
}

// Test 2: Config
try {
    require_once __DIR__ . '/../config/config.php';
    $results['tests']['config'] = [
        'status' => 'OK',
        'db_host' => defined('DB_HOST') ? 'defined' : 'not defined',
        'db_name' => defined('DB_NAME') ? 'defined' : 'not defined'
    ];
} catch (Exception $e) {
    $results['tests']['config'] = [
        'status' => 'ERROR',
        'message' => $e->getMessage()
    ];
}

// Test 3: Connexion BDD
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $results['tests']['database'] = [
        'status' => 'OK',
        'connection' => 'success'
    ];
} catch (PDOException $e) {
    $results['tests']['database'] = [
        'status' => 'ERROR',
        'message' => $e->getMessage()
    ];
}

// Test 4: Tables SharePoint
try {
    if (isset($pdo)) {
        // Vérifier sharepoint_tenants
        $stmt = $pdo->query("SHOW TABLES LIKE 'sharepoint_tenants'");
        $tenants_exists = $stmt->rowCount() > 0;

        // Vérifier sharepoint_sites
        $stmt = $pdo->query("SHOW TABLES LIKE 'sharepoint_sites'");
        $sites_exists = $stmt->rowCount() > 0;

        // Vérifier sharepoint_folders
        $stmt = $pdo->query("SHOW TABLES LIKE 'sharepoint_folders'");
        $folders_exists = $stmt->rowCount() > 0;

        $results['tests']['tables'] = [
            'status' => ($tenants_exists && $sites_exists && $folders_exists) ? 'OK' : 'MISSING',
            'sharepoint_tenants' => $tenants_exists ? 'exists' : 'missing',
            'sharepoint_sites' => $sites_exists ? 'exists' : 'missing',
            'sharepoint_folders' => $folders_exists ? 'exists' : 'missing'
        ];

        // Compter les enregistrements si les tables existent
        if ($tenants_exists) {
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM sharepoint_tenants");
            $results['tests']['tables']['tenants_count'] = $stmt->fetch()['count'];
        }
    }
} catch (Exception $e) {
    $results['tests']['tables'] = [
        'status' => 'ERROR',
        'message' => $e->getMessage()
    ];
}

// Test 5: Helper functions
try {
    require_once __DIR__ . '/_sharepoint-helper.php';
    $results['tests']['helper'] = [
        'status' => 'OK',
        'checkAuthentication' => function_exists('checkAuthentication'),
        'canAccessSite' => function_exists('canAccessSite'),
        'formatSize' => function_exists('formatSize')
    ];
} catch (Exception $e) {
    $results['tests']['helper'] = [
        'status' => 'ERROR',
        'message' => $e->getMessage()
    ];
}

// Nettoyer le buffer
ob_end_clean();

// Envoyer le JSON
echo json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
exit;
