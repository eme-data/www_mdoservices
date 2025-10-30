<?php
/**
 * Cleanup Diagnostic Files
 * Safely removes all test and diagnostic files created during troubleshooting
 *
 * ⚠️ RUN THIS AFTER COMPLETING SECURITY AUDIT ⚠️
 * ⚠️ THEN DELETE THIS FILE TOO ⚠️
 */

header('Content-Type: text/html; charset=utf-8');

// Prevent accidental execution
$confirm_key = isset($_GET['confirm']) ? $_GET['confirm'] : '';
if ($confirm_key !== 'delete2025') {
    die('⚠️ Pour exécuter ce script, ajoutez ?confirm=delete2025 à l\'URL');
}

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🧹 Nettoyage Fichiers Diagnostic</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 2em;
            margin-bottom: 10px;
        }
        .content {
            padding: 30px;
        }
        .file-item {
            padding: 12px;
            margin-bottom: 8px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .file-item.deleted {
            background: #f0fdf4;
            border-left: 4px solid #10b981;
        }
        .file-item.not-found {
            background: #f8f9fa;
            border-left: 4px solid #9ca3af;
        }
        .file-item.error {
            background: #fee;
            border-left: 4px solid #e53e3e;
        }
        .status {
            font-weight: bold;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
        }
        .status.deleted {
            background: #10b981;
            color: white;
        }
        .status.not-found {
            background: #9ca3af;
            color: white;
        }
        .status.error {
            background: #e53e3e;
            color: white;
        }
        .summary {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-top: 30px;
            border: 2px solid #e0e0e0;
        }
        .summary h2 {
            margin-bottom: 15px;
            color: #333;
        }
        .summary .stat {
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            font-weight: bold;
        }
        .summary .stat.success {
            background: #f0fdf4;
            color: #059669;
        }
        .summary .stat.info {
            background: #eff6ff;
            color: #1e40af;
        }
        .final-warning {
            background: #fee;
            border: 3px solid #e53e3e;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            text-align: center;
        }
        .final-warning h3 {
            color: #e53e3e;
            margin-bottom: 10px;
            font-size: 1.3em;
        }
        .final-warning p {
            color: #666;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧹 Nettoyage des Fichiers de Diagnostic</h1>
            <p>Suppression sécurisée de tous les fichiers de test</p>
        </div>
        <div class="content">

<?php

$results = [
    'deleted' => [],
    'not_found' => [],
    'errors' => []
];

// List of all diagnostic files to delete
$filesToDelete = [
    // Root level HTML diagnostic files
    '../check-multiple-versions.html' => 'Détection version double',
    '../test-login-direct.html' => 'Test login direct',
    '../test-assets.html' => 'Test assets',
    '../debug-login-response.html' => 'Debug réponse login',
    '../verify-login-format.html' => 'Vérification format login',

    // API root level
    'test-db.php' => 'Test connexion DB',
    'reset-rate-limit.php' => 'Reset rate limiting',
    'find-duplicate-files.php' => 'Recherche fichiers dupliqués',
    'security-audit.php' => 'Audit de sécurité',
    'cleanup-diagnostic-files.php' => 'Ce script de nettoyage',

    // API posts
    'posts/diagnostic-posts.php' => 'Diagnostic API posts',

    // API auth
    'auth/test-login.php' => 'Test login API',
    'auth/test-auth-full.php' => 'Test auth complet',
    'auth/reset-admin-password.php' => 'Reset password admin',
    'auth/force-password-reset.php' => 'Force reset password',
    'auth/generate-hash.php' => 'Générateur de hash'
];

echo '<h2 style="margin-bottom: 20px;">📋 Suppression des Fichiers</h2>';

foreach ($filesToDelete as $file => $description) {
    $fullPath = __DIR__ . '/' . $file;
    $displayPath = 'api/' . $file;

    echo '<div class="file-item ';

    if (!file_exists($fullPath)) {
        echo 'not-found">';
        echo '<span>' . htmlspecialchars($displayPath) . '<br><small>' . htmlspecialchars($description) . '</small></span>';
        echo '<span class="status not-found">Déjà absent</span>';
        $results['not_found'][] = $file;
    } else {
        // Attempt to delete
        if (@unlink($fullPath)) {
            echo 'deleted">';
            echo '<span>' . htmlspecialchars($displayPath) . '<br><small>' . htmlspecialchars($description) . '</small></span>';
            echo '<span class="status deleted">✓ Supprimé</span>';
            $results['deleted'][] = $file;
        } else {
            echo 'error">';
            echo '<span>' . htmlspecialchars($displayPath) . '<br><small>' . htmlspecialchars($description) . '</small></span>';
            echo '<span class="status error">✗ Erreur</span>';
            $results['errors'][] = $file;
        }
    }

    echo '</div>';
}

// Check for rate limiting files
$rateLimitDir = __DIR__ . '/auth/rate_limits';
$rateLimitFilesDeleted = 0;
if (is_dir($rateLimitDir)) {
    $rateLimitFiles = glob($rateLimitDir . '/*');
    foreach ($rateLimitFiles as $file) {
        if (@unlink($file)) {
            $rateLimitFilesDeleted++;
        }
    }

    echo '<div class="file-item deleted">';
    echo '<span>auth/rate_limits/* <br><small>Fichiers de rate limiting</small></span>';
    echo '<span class="status deleted">✓ ' . $rateLimitFilesDeleted . ' fichier(s) supprimé(s)</span>';
    echo '</div>';
}

// Summary
echo '<div class="summary">';
echo '<h2>📊 Résumé</h2>';

if (count($results['deleted']) > 0) {
    echo '<div class="stat success">';
    echo '✓ ' . count($results['deleted']) . ' fichier(s) supprimé(s) avec succès';
    echo '</div>';
}

if (count($results['not_found']) > 0) {
    echo '<div class="stat info">';
    echo 'ℹ ' . count($results['not_found']) . ' fichier(s) déjà absent(s)';
    echo '</div>';
}

if (count($results['errors']) > 0) {
    echo '<div class="stat error">';
    echo '✗ ' . count($results['errors']) . ' erreur(s) de suppression';
    echo '<ul style="margin-top: 10px; margin-left: 20px;">';
    foreach ($results['errors'] as $file) {
        echo '<li>' . htmlspecialchars($file) . ' - Supprimez manuellement via FTP</li>';
    }
    echo '</ul>';
    echo '</div>';
}

echo '</div>';

// Final warning
echo '<div class="final-warning">';
echo '<h3>⚠️ DERNIÈRE ÉTAPE IMPORTANTE ⚠️</h3>';
echo '<p>';
echo '<strong>Ce script (cleanup-diagnostic-files.php) tente de se supprimer lui-même, mais cela peut échouer.</strong><br><br>';
echo 'Si le fichier existe toujours, <strong>supprimez-le manuellement via FTP</strong> :<br>';
echo '<code>/public_html/api/cleanup-diagnostic-files.php</code><br><br>';
echo 'Vérifiez également que tous les fichiers listés ci-dessus ont bien été supprimés.';
echo '</p>';
echo '</div>';

?>

        </div>
    </div>
</body>
</html>
