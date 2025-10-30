<?php
/**
 * Security Audit Tool for MDO Services
 * Checks for common security vulnerabilities and misconfigurations
 *
 * ⚠️ DELETE THIS FILE AFTER USE ⚠️
 */

header('Content-Type: text/html; charset=utf-8');

// Prevent execution if not authorized
$secret_key = isset($_GET['key']) ? $_GET['key'] : '';
if ($secret_key !== 'audit2025') {
    die('Unauthorized access');
}

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔒 Audit de Sécurité - MDO Services</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
        .section {
            margin-bottom: 30px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            overflow: hidden;
        }
        .section-header {
            background: #f8f9fa;
            padding: 15px 20px;
            border-bottom: 2px solid #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .section-header h2 {
            font-size: 1.3em;
            color: #333;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .section-content {
            padding: 20px;
        }
        .check-item {
            padding: 12px;
            margin-bottom: 10px;
            border-radius: 8px;
            display: flex;
            align-items: flex-start;
            gap: 15px;
        }
        .check-item.critical {
            background: #fee;
            border-left: 4px solid #e53e3e;
        }
        .check-item.warning {
            background: #fffbeb;
            border-left: 4px solid #f59e0b;
        }
        .check-item.info {
            background: #eff6ff;
            border-left: 4px solid #3b82f6;
        }
        .check-item.success {
            background: #f0fdf4;
            border-left: 4px solid #10b981;
        }
        .check-icon {
            font-size: 1.5em;
            flex-shrink: 0;
        }
        .check-details {
            flex: 1;
        }
        .check-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .check-description {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 5px;
        }
        .check-path {
            font-family: 'Courier New', monospace;
            background: rgba(0,0,0,0.05);
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.85em;
            display: inline-block;
            margin-top: 5px;
        }
        .score {
            font-size: 3em;
            font-weight: bold;
            text-align: center;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        .score.good {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
        }
        .score.medium {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
        }
        .score.bad {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .stat-card {
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            color: white;
        }
        .stat-card.critical { background: #e53e3e; }
        .stat-card.warning { background: #f59e0b; }
        .stat-card.info { background: #3b82f6; }
        .stat-card.success { background: #10b981; }
        .stat-card .number {
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .stat-card .label {
            font-size: 0.9em;
            opacity: 0.9;
        }
        .file-list {
            max-height: 300px;
            overflow-y: auto;
            background: #f8f9fa;
            border-radius: 5px;
            padding: 10px;
        }
        .file-item {
            padding: 8px;
            background: white;
            margin-bottom: 5px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.85em;
        }
        .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.75em;
            font-weight: bold;
            text-transform: uppercase;
        }
        .badge.critical { background: #fee; color: #e53e3e; }
        .badge.warning { background: #fffbeb; color: #f59e0b; }
        .badge.info { background: #eff6ff; color: #3b82f6; }
        .badge.success { background: #f0fdf4; color: #10b981; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔒 Audit de Sécurité</h1>
            <p>Analyse complète de la sécurité du site MDO Services</p>
        </div>
        <div class="content">
<?php

// Initialize counters
$criticalIssues = 0;
$warningIssues = 0;
$infoIssues = 0;
$successChecks = 0;

// Store issues by category
$issues = [
    'exposed_files' => [],
    'weak_credentials' => [],
    'configuration' => [],
    'api_security' => [],
    'file_permissions' => [],
    'code_security' => []
];

// ======================
// 1. EXPOSED TEST/DIAGNOSTIC FILES
// ======================
$testFiles = [
    // Root level
    '../check-multiple-versions.html',
    '../test-login-direct.html',
    '../test-assets.html',
    '../debug-login-response.html',
    '../verify-login-format.html',
    // API level
    'test-db.php',
    'reset-rate-limit.php',
    'find-duplicate-files.php',
    'security-audit.php',
    // API subdirectories
    'posts/diagnostic-posts.php',
    'auth/test-login.php',
    'auth/test-auth-full.php',
    'auth/reset-admin-password.php',
    'auth/force-password-reset.php',
    'auth/generate-hash.php'
];

foreach ($testFiles as $file) {
    if (file_exists(__DIR__ . '/' . $file)) {
        $issues['exposed_files'][] = [
            'severity' => 'critical',
            'title' => 'Fichier de diagnostic exposé',
            'description' => 'Ce fichier de test est accessible publiquement et peut révéler des informations sensibles.',
            'path' => $file,
            'solution' => 'SUPPRIMER immédiatement ce fichier'
        ];
        $criticalIssues++;
    }
}

// ======================
// 2. EXPOSED CONFIGURATION FILES
// ======================
$configFiles = [
    'config/config.local.php',
    'config/.env',
    '../.env',
    '../.env.local',
    '../.git/config'
];

foreach ($configFiles as $file) {
    $fullPath = __DIR__ . '/' . $file;
    if (file_exists($fullPath)) {
        // Check if file is readable via web
        $webPath = str_replace($_SERVER['DOCUMENT_ROOT'], '', $fullPath);

        $issues['configuration'][] = [
            'severity' => 'warning',
            'title' => 'Fichier de configuration détecté',
            'description' => 'Vérifiez que ce fichier n\'est pas accessible via HTTP.',
            'path' => $file,
            'solution' => 'Assurez-vous que .htaccess bloque l\'accès à ce fichier'
        ];
        $warningIssues++;
    }
}

// ======================
// 3. WEAK CREDENTIALS CHECK
// ======================
if (file_exists(__DIR__ . '/config/config.local.php')) {
    $configContent = file_get_contents(__DIR__ . '/config/config.local.php');

    // Check for weak JWT secret
    if (preg_match('/JWT_SECRET.*?[\'"]([^\'"]+)[\'"]/', $configContent, $matches)) {
        $jwtSecret = $matches[1];
        if (strlen($jwtSecret) < 32 || $jwtSecret === 'your-secret-key-change-this-in-production') {
            $issues['weak_credentials'][] = [
                'severity' => 'critical',
                'title' => 'JWT_SECRET faible ou par défaut',
                'description' => 'Le secret JWT est trop court ou utilise la valeur par défaut.',
                'path' => 'config/config.local.php',
                'solution' => 'Générez un secret fort de 64+ caractères aléatoires'
            ];
            $criticalIssues++;
        } else {
            $issues['weak_credentials'][] = [
                'severity' => 'success',
                'title' => 'JWT_SECRET sécurisé',
                'description' => 'Le secret JWT a une longueur appropriée.',
                'path' => 'config/config.local.php'
            ];
            $successChecks++;
        }
    }
}

// Check database for weak admin password
try {
    require_once __DIR__ . '/config/config.php';
    require_once __DIR__ . '/config/Database.php';

    $database = new Database();
    $db = $database->getConnection();

    $query = "SELECT username, password FROM users WHERE is_admin = 1 LIMIT 1";
    $stmt = $db->query($query);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin) {
        // Test common weak passwords
        $weakPasswords = ['password', 'admin', '123456', 'admin123', 'ChangeMe123!'];
        $isWeak = false;

        foreach ($weakPasswords as $weakPass) {
            if (password_verify($weakPass, $admin['password'])) {
                $issues['weak_credentials'][] = [
                    'severity' => 'critical',
                    'title' => 'Mot de passe admin faible',
                    'description' => "Le mot de passe admin est trop simple: '$weakPass'",
                    'path' => 'database.users',
                    'solution' => 'Changez immédiatement le mot de passe admin pour un mot de passe fort'
                ];
                $criticalIssues++;
                $isWeak = true;
                break;
            }
        }

        if (!$isWeak) {
            $issues['weak_credentials'][] = [
                'severity' => 'success',
                'title' => 'Mot de passe admin robuste',
                'description' => 'Le mot de passe admin n\'est pas dans la liste des mots de passe faibles.',
                'path' => 'database.users'
            ];
            $successChecks++;
        }
    }
} catch (Exception $e) {
    $issues['weak_credentials'][] = [
        'severity' => 'warning',
        'title' => 'Impossible de vérifier le mot de passe',
        'description' => $e->getMessage(),
        'path' => 'database.users'
    ];
    $warningIssues++;
}

// ======================
// 4. API SECURITY CHECKS
// ======================

// Check CORS configuration
$corsFiles = ['auth/login.php', 'posts/list.php', 'posts/create.php'];
foreach ($corsFiles as $file) {
    if (file_exists(__DIR__ . '/' . $file)) {
        $content = file_get_contents(__DIR__ . '/' . $file);

        // Check if CORS allows all origins
        if (strpos($content, "Access-Control-Allow-Origin: *") !== false) {
            $issues['api_security'][] = [
                'severity' => 'warning',
                'title' => 'CORS trop permissif',
                'description' => 'L\'API accepte les requêtes de n\'importe quelle origine.',
                'path' => $file,
                'solution' => 'Limitez CORS à votre domaine: Access-Control-Allow-Origin: https://mdoservices.fr'
            ];
            $warningIssues++;
        }

        // Check for SQL injection protection
        if (strpos($content, 'bindParam') !== false || strpos($content, 'bindValue') !== false) {
            $issues['api_security'][] = [
                'severity' => 'success',
                'title' => 'Requêtes SQL paramétrées',
                'description' => 'Le fichier utilise des requêtes préparées (protection contre SQL injection).',
                'path' => $file
            ];
            $successChecks++;
        }
    }
}

// Check authentication middleware
if (file_exists(__DIR__ . '/middleware/auth.php')) {
    $authContent = file_get_contents(__DIR__ . '/middleware/auth.php');

    if (strpos($authContent, 'JWT::decode') !== false) {
        $issues['api_security'][] = [
            'severity' => 'success',
            'title' => 'Authentification JWT active',
            'description' => 'Le middleware d\'authentification utilise JWT.',
            'path' => 'middleware/auth.php'
        ];
        $successChecks++;
    }
} else {
    $issues['api_security'][] = [
        'severity' => 'warning',
        'title' => 'Middleware d\'authentification manquant',
        'description' => 'Aucun fichier middleware/auth.php trouvé.',
        'path' => 'middleware/auth.php'
    ];
    $warningIssues++;
}

// ======================
// 5. FILE PERMISSIONS
// ======================
$sensitiveFiles = [
    'config/config.local.php',
    'config/config.php',
    '../.htaccess'
];

foreach ($sensitiveFiles as $file) {
    $fullPath = __DIR__ . '/' . $file;
    if (file_exists($fullPath)) {
        $perms = fileperms($fullPath);
        $permsOctal = substr(sprintf('%o', $perms), -4);

        // Check if world-writable
        if ($perms & 0x0002) {
            $issues['file_permissions'][] = [
                'severity' => 'critical',
                'title' => 'Fichier accessible en écriture publique',
                'description' => "Permissions: $permsOctal - Le fichier peut être modifié par n'importe qui.",
                'path' => $file,
                'solution' => 'chmod 644 pour ce fichier'
            ];
            $criticalIssues++;
        } else {
            $issues['file_permissions'][] = [
                'severity' => 'success',
                'title' => 'Permissions correctes',
                'description' => "Permissions: $permsOctal",
                'path' => $file
            ];
            $successChecks++;
        }
    }
}

// ======================
// 6. CODE SECURITY - XSS & INPUT VALIDATION
// ======================
$apiFiles = glob(__DIR__ . '/*/*.php');
$xssVulnerable = [];
$sqlVulnerable = [];

foreach ($apiFiles as $file) {
    $content = file_get_contents($file);
    $basename = basename($file);

    // Skip config and test files
    if (strpos($basename, 'config') !== false ||
        strpos($basename, 'test-') !== false ||
        strpos($basename, 'diagnostic') !== false) {
        continue;
    }

    // Check for direct echo of user input
    if (preg_match('/echo\s+\$_(GET|POST|REQUEST)/i', $content)) {
        $xssVulnerable[] = str_replace(__DIR__ . '/', '', $file);
    }

    // Check for direct SQL queries with user input
    if (preg_match('/query\([^)]*\$_(GET|POST|REQUEST)/i', $content) &&
        strpos($content, 'bindParam') === false) {
        $sqlVulnerable[] = str_replace(__DIR__ . '/', '', $file);
    }
}

if (count($xssVulnerable) > 0) {
    $issues['code_security'][] = [
        'severity' => 'critical',
        'title' => 'Vulnérabilités XSS potentielles',
        'description' => 'Fichiers utilisant echo avec données utilisateur non échappées: ' . implode(', ', $xssVulnerable),
        'path' => 'Plusieurs fichiers',
        'solution' => 'Utilisez htmlspecialchars() pour échapper toutes les sorties'
    ];
    $criticalIssues++;
}

if (count($sqlVulnerable) > 0) {
    $issues['code_security'][] = [
        'severity' => 'critical',
        'title' => 'Vulnérabilités SQL Injection potentielles',
        'description' => 'Fichiers avec requêtes SQL non paramétrées: ' . implode(', ', $sqlVulnerable),
        'path' => 'Plusieurs fichiers',
        'solution' => 'Utilisez toujours des requêtes préparées avec bindParam()'
    ];
    $criticalIssues++;
}

if (count($xssVulnerable) === 0 && count($sqlVulnerable) === 0) {
    $issues['code_security'][] = [
        'severity' => 'success',
        'title' => 'Code sécurisé',
        'description' => 'Aucune vulnérabilité XSS ou SQL Injection évidente détectée.',
        'path' => 'Tous les fichiers API'
    ];
    $successChecks++;
}

// ======================
// 7. BACKUP FILES
// ======================
$backupPatterns = ['*.bak', '*.old', '*.backup', '*~', '*.swp'];
$backupFiles = [];

foreach ($backupPatterns as $pattern) {
    $found = glob(__DIR__ . '/../' . $pattern);
    $backupFiles = array_merge($backupFiles, $found);
}

if (count($backupFiles) > 0) {
    $issues['exposed_files'][] = [
        'severity' => 'warning',
        'title' => 'Fichiers de backup détectés',
        'description' => count($backupFiles) . ' fichier(s) de backup trouvé(s). Ces fichiers peuvent contenir du code sensible.',
        'path' => 'Racine du site',
        'solution' => 'Supprimez tous les fichiers .bak, .old, .backup, ~, .swp'
    ];
    $warningIssues++;
}

// ======================
// CALCULATE SECURITY SCORE
// ======================
$totalChecks = $criticalIssues + $warningIssues + $infoIssues + $successChecks;
$securityScore = 0;
if ($totalChecks > 0) {
    $securityScore = (($successChecks * 100) - ($criticalIssues * 30) - ($warningIssues * 10)) / $totalChecks;
    $securityScore = max(0, min(100, $securityScore));
}

$scoreClass = 'good';
if ($securityScore < 50) $scoreClass = 'bad';
elseif ($securityScore < 80) $scoreClass = 'medium';

?>

            <!-- SECURITY SCORE -->
            <div class="score <?php echo $scoreClass; ?>">
                <div>Score de Sécurité</div>
                <div><?php echo round($securityScore); ?>/100</div>
            </div>

            <!-- STATISTICS -->
            <div class="stats">
                <div class="stat-card critical">
                    <div class="number"><?php echo $criticalIssues; ?></div>
                    <div class="label">Critiques</div>
                </div>
                <div class="stat-card warning">
                    <div class="number"><?php echo $warningIssues; ?></div>
                    <div class="label">Avertissements</div>
                </div>
                <div class="stat-card info">
                    <div class="number"><?php echo $infoIssues; ?></div>
                    <div class="label">Informations</div>
                </div>
                <div class="stat-card success">
                    <div class="number"><?php echo $successChecks; ?></div>
                    <div class="label">Vérifications OK</div>
                </div>
            </div>

            <?php
            // Function to display issues
            function displayIssues($categoryName, $categoryIssues) {
                if (empty($categoryIssues)) return;

                echo '<div class="section">';
                echo '<div class="section-header"><h2>' . $categoryName . '</h2>';
                echo '<span class="badge ' . $categoryIssues[0]['severity'] . '">' . count($categoryIssues) . ' élément(s)</span>';
                echo '</div>';
                echo '<div class="section-content">';

                foreach ($categoryIssues as $issue) {
                    $icon = '❌';
                    if ($issue['severity'] === 'success') $icon = '✅';
                    elseif ($issue['severity'] === 'warning') $icon = '⚠️';
                    elseif ($issue['severity'] === 'info') $icon = 'ℹ️';

                    echo '<div class="check-item ' . $issue['severity'] . '">';
                    echo '<div class="check-icon">' . $icon . '</div>';
                    echo '<div class="check-details">';
                    echo '<div class="check-title">' . htmlspecialchars($issue['title']) . '</div>';
                    echo '<div class="check-description">' . htmlspecialchars($issue['description']) . '</div>';
                    echo '<div class="check-path">' . htmlspecialchars($issue['path']) . '</div>';
                    if (isset($issue['solution'])) {
                        echo '<div class="check-description" style="color: #059669; margin-top: 5px;"><strong>Solution:</strong> ' . htmlspecialchars($issue['solution']) . '</div>';
                    }
                    echo '</div>';
                    echo '</div>';
                }

                echo '</div>';
                echo '</div>';
            }

            // Display all categories
            displayIssues('🚨 Fichiers Exposés', $issues['exposed_files']);
            displayIssues('🔑 Identifiants & Secrets', $issues['weak_credentials']);
            displayIssues('⚙️ Configuration', $issues['configuration']);
            displayIssues('🌐 Sécurité API', $issues['api_security']);
            displayIssues('📁 Permissions Fichiers', $issues['file_permissions']);
            displayIssues('💻 Sécurité du Code', $issues['code_security']);
            ?>

            <!-- RECOMMENDATIONS -->
            <div class="section">
                <div class="section-header">
                    <h2>📋 Actions Recommandées (Par Priorité)</h2>
                </div>
                <div class="section-content">
                    <?php if ($criticalIssues > 0): ?>
                    <div class="check-item critical">
                        <div class="check-icon">🔴</div>
                        <div class="check-details">
                            <div class="check-title">URGENT - <?php echo $criticalIssues; ?> problème(s) critique(s)</div>
                            <div class="check-description">
                                1. Supprimez tous les fichiers de diagnostic/test<br>
                                2. Changez le mot de passe admin<br>
                                3. Générez un nouveau JWT_SECRET<br>
                                4. Corrigez les permissions de fichiers
                            </div>
                        </div>
                    </div>
                    <?php endif; ?>

                    <?php if ($warningIssues > 0): ?>
                    <div class="check-item warning">
                        <div class="check-icon">🟡</div>
                        <div class="check-details">
                            <div class="check-title">Important - <?php echo $warningIssues; ?> avertissement(s)</div>
                            <div class="check-description">
                                1. Vérifiez la configuration CORS<br>
                                2. Supprimez les fichiers de backup<br>
                                3. Vérifiez l'accessibilité des fichiers de config via web
                            </div>
                        </div>
                    </div>
                    <?php endif; ?>

                    <div class="check-item info">
                        <div class="check-icon">🔵</div>
                        <div class="check-details">
                            <div class="check-title">Maintenance Continue</div>
                            <div class="check-description">
                                1. Activez les logs d'erreurs PHP (en dehors de la racine web)<br>
                                2. Configurez des sauvegardes automatiques de la base de données<br>
                                3. Mettez en place un monitoring de sécurité<br>
                                4. Effectuez des audits de sécurité réguliers<br>
                                5. Gardez PHP et les dépendances à jour
                            </div>
                        </div>
                    </div>

                    <div class="check-item critical" style="margin-top: 20px;">
                        <div class="check-icon">⚠️</div>
                        <div class="check-details">
                            <div class="check-title">IMPORTANT: Supprimez ce fichier d'audit</div>
                            <div class="check-description">
                                Une fois que vous avez terminé l'audit et corrigé les problèmes, <strong>SUPPRIMEZ immédiatement ce fichier</strong>: api/security-audit.php
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</body>
</html>
