<?php
/**
 * Script de Diagnostic et Création d'Utilisateurs
 * Version avec débogage détaillé
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Diagnostic BDD - MDO Services</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1000px; margin: 0 auto; }
        .card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 { color: #667eea; font-size: 32px; margin-bottom: 10px; }
        h2 { color: #333; font-size: 24px; margin: 20px 0 15px; padding-bottom: 10px; border-bottom: 2px solid #f0f0f0; }
        h3 { color: #555; font-size: 18px; margin: 15px 0 10px; }
        .success { background: #d4edda; border-left: 4px solid #28a745; color: #155724; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .error { background: #f8d7da; border-left: 4px solid #dc3545; color: #721c24; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .warning { background: #fff3cd; border-left: 4px solid #ffc107; color: #856404; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .info { background: #d1ecf1; border-left: 4px solid #17a2b8; color: #0c5460; padding: 15px; border-radius: 6px; margin: 15px 0; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; font-size: 13px; }
        pre { background: #f8f9fa; padding: 15px; border-radius: 6px; overflow-x: auto; font-size: 13px; border: 1px solid #dee2e6; margin: 10px 0; }
        .step { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; }
        .step-number { display: inline-block; width: 30px; height: 30px; background: #667eea; color: white; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold; margin-right: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; font-weight: 600; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🔍 Diagnostic Base de Données</h1>
            <p style="color: #666; margin-bottom: 20px;">Détection et résolution des problèmes de connexion</p>

<?php

echo "<h2>Étape 1️⃣ : Test de Configuration</h2>";

// Charger la configuration
try {
    require_once __DIR__ . '/../config/config.php';

    echo "<div class='success'>";
    echo "<h3>✅ Fichier de configuration chargé</h3>";
    echo "<p>Constantes définies :</p>";
    echo "<ul style='margin-left: 20px; margin-top: 10px;'>";
    echo "<li><strong>DB_HOST:</strong> " . (defined('DB_HOST') ? htmlspecialchars(DB_HOST) : '❌ Non défini') . "</li>";
    echo "<li><strong>DB_NAME:</strong> " . (defined('DB_NAME') ? htmlspecialchars(DB_NAME) : '❌ Non défini') . "</li>";
    echo "<li><strong>DB_USER:</strong> " . (defined('DB_USER') ? htmlspecialchars(DB_USER) : '❌ Non défini') . "</li>";
    echo "<li><strong>DB_PASS:</strong> " . (defined('DB_PASS') ? '****** (défini)' : '❌ Non défini') . "</li>";
    echo "<li><strong>DB_CHARSET:</strong> " . (defined('DB_CHARSET') ? htmlspecialchars(DB_CHARSET) : '❌ Non défini') . "</li>";
    echo "</ul>";
    echo "</div>";
} catch (Exception $e) {
    echo "<div class='error'>";
    echo "<h3>❌ Erreur de chargement de la configuration</h3>";
    echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
    echo "</div>";
    die();
}

echo "<h2>Étape 2️⃣ : Test de Connexion PDO</h2>";

// Test connexion directe PDO
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);

    echo "<div class='success'>";
    echo "<h3>✅ Connexion PDO réussie</h3>";
    echo "<p>Connexion établie à la base de données <code>" . htmlspecialchars(DB_NAME) . "</code></p>";
    echo "</div>";

} catch (PDOException $e) {
    echo "<div class='error'>";
    echo "<h3>❌ Erreur de connexion PDO</h3>";
    echo "<p><strong>Code d'erreur:</strong> " . $e->getCode() . "</p>";
    echo "<p><strong>Message:</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p style='margin-top: 10px;'><strong>Solutions possibles:</strong></p>";
    echo "<ul style='margin-left: 20px;'>";
    echo "<li>Vérifiez que les identifiants dans config.php sont corrects</li>";
    echo "<li>Vérifiez que la base de données existe sur Hostinger</li>";
    echo "<li>Vérifiez que l'utilisateur a les permissions nécessaires</li>";
    echo "</ul>";
    echo "</div>";
    die();
}

echo "<h2>Étape 3️⃣ : Vérification Table 'users'</h2>";

try {
    // Vérifier si la table existe
    $stmt = $pdo->query("SHOW TABLES LIKE 'users'");
    $tableExists = $stmt->fetch();

    if ($tableExists) {
        echo "<div class='success'>";
        echo "<h3>✅ Table 'users' trouvée</h3>";

        // Obtenir la structure de la table
        $stmt = $pdo->query("DESCRIBE users");
        $columns = $stmt->fetchAll();

        echo "<p><strong>Structure de la table :</strong></p>";
        echo "<table>";
        echo "<tr><th>Colonne</th><th>Type</th><th>Null</th><th>Défaut</th></tr>";
        foreach ($columns as $col) {
            echo "<tr>";
            echo "<td><code>" . htmlspecialchars($col['Field']) . "</code></td>";
            echo "<td>" . htmlspecialchars($col['Type']) . "</td>";
            echo "<td>" . htmlspecialchars($col['Null']) . "</td>";
            echo "<td>" . htmlspecialchars($col['Default'] ?? 'NULL') . "</td>";
            echo "</tr>";
        }
        echo "</table>";
        echo "</div>";

    } else {
        echo "<div class='warning'>";
        echo "<h3>⚠️ Table 'users' non trouvée</h3>";
        echo "<p>Création de la table...</p>";

        $createTable = "
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            email VARCHAR(100),
            role VARCHAR(20) NOT NULL DEFAULT 'client',
            is_admin BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP NULL,
            INDEX idx_username (username),
            INDEX idx_role (role)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ";

        $pdo->exec($createTable);

        echo "<div class='success'>";
        echo "<h3>✅ Table 'users' créée avec succès</h3>";
        echo "</div>";
        echo "</div>";
    }

} catch (PDOException $e) {
    echo "<div class='error'>";
    echo "<h3>❌ Erreur de vérification de table</h3>";
    echo "<p><strong>Message:</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "</div>";
}

echo "<h2>Étape 4️⃣ : Création des Utilisateurs</h2>";

$users = [
    [
        'username' => 'admin_partner',
        'password' => 'MDOPartner2024!',
        'email' => 'admin@mdoservices.fr',
        'role' => 'partner',
        'is_admin' => 1
    ],
    [
        'username' => 'admin_client',
        'password' => 'MDOClient2024!',
        'email' => 'client@mdoservices.fr',
        'role' => 'client',
        'is_admin' => 0
    ],
    [
        'username' => 'demo_partner',
        'password' => 'DemoPartner2024',
        'email' => 'demo.partner@mdoservices.fr',
        'role' => 'partner',
        'is_admin' => 0
    ],
    [
        'username' => 'demo_client',
        'password' => 'DemoClient2024',
        'email' => 'demo.client@mdoservices.fr',
        'role' => 'client',
        'is_admin' => 0
    ]
];

$created = [];
$errors = [];

foreach ($users as $user) {
    try {
        // Vérifier si l'utilisateur existe
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$user['username']]);
        $exists = $stmt->fetch();

        $hash = password_hash($user['password'], PASSWORD_BCRYPT);

        if ($exists) {
            // Mise à jour
            $stmt = $pdo->prepare("
                UPDATE users
                SET password_hash = ?, email = ?, role = ?, is_admin = ?
                WHERE username = ?
            ");
            $stmt->execute([
                $hash,
                $user['email'],
                $user['role'],
                $user['is_admin'],
                $user['username']
            ]);
            $user['status'] = 'updated';
        } else {
            // Insertion
            $stmt = $pdo->prepare("
                INSERT INTO users (username, password_hash, email, role, is_admin)
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $user['username'],
                $hash,
                $user['email'],
                $user['role'],
                $user['is_admin']
            ]);
            $user['status'] = 'created';
        }

        $created[] = $user;

    } catch (PDOException $e) {
        $errors[] = [
            'username' => $user['username'],
            'error' => $e->getMessage()
        ];
    }
}

if (!empty($created)) {
    echo "<div class='success'>";
    echo "<h3>✅ " . count($created) . " utilisateur(s) créé(s)/mis à jour</h3>";

    echo "<table>";
    echo "<tr><th>Username</th><th>Password</th><th>Email</th><th>Rôle</th><th>Status</th></tr>";
    foreach ($created as $u) {
        $statusIcon = $u['status'] === 'created' ? '🆕' : '🔄';
        echo "<tr>";
        echo "<td><strong>" . htmlspecialchars($u['username']) . "</strong></td>";
        echo "<td><code>" . htmlspecialchars($u['password']) . "</code></td>";
        echo "<td>" . htmlspecialchars($u['email']) . "</td>";
        echo "<td>" . htmlspecialchars($u['role']) . "</td>";
        echo "<td>" . $statusIcon . " " . $u['status'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    echo "</div>";
}

if (!empty($errors)) {
    echo "<div class='error'>";
    echo "<h3>❌ Erreurs</h3>";
    foreach ($errors as $err) {
        echo "<p><strong>" . htmlspecialchars($err['username']) . ":</strong> " . htmlspecialchars($err['error']) . "</p>";
    }
    echo "</div>";
}

echo "<h2>Étape 5️⃣ : Vérification Finale</h2>";

try {
    $stmt = $pdo->query("SELECT id, username, email, role, is_admin, created_at FROM users ORDER BY id DESC");
    $allUsers = $stmt->fetchAll();

    echo "<div class='info'>";
    echo "<h3>📋 Tous les utilisateurs (" . count($allUsers) . ")</h3>";
    echo "<table>";
    echo "<tr><th>ID</th><th>Username</th><th>Email</th><th>Rôle</th><th>Admin</th><th>Créé</th></tr>";
    foreach ($allUsers as $u) {
        echo "<tr>";
        echo "<td>" . $u['id'] . "</td>";
        echo "<td><strong>" . htmlspecialchars($u['username']) . "</strong></td>";
        echo "<td>" . htmlspecialchars($u['email']) . "</td>";
        echo "<td>" . htmlspecialchars($u['role']) . "</td>";
        echo "<td>" . ($u['is_admin'] ? '✅' : '❌') . "</td>";
        echo "<td>" . htmlspecialchars($u['created_at']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    echo "</div>";

} catch (PDOException $e) {
    echo "<div class='error'>";
    echo "<p>Erreur : " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "</div>";
}

?>

        </div>

        <div class="card" style="background: #d4edda; border-left: 4px solid #28a745;">
            <h2>✅ Prochaines Étapes</h2>
            <ol style="margin-left: 20px; line-height: 2;">
                <li>Testez la connexion sur <a href="/partner" target="_blank">/partner</a> et <a href="/client" target="_blank">/client</a></li>
                <li>Notez tous les identifiants dans un gestionnaire de mots de passe</li>
                <li><strong>Supprimez ce fichier du serveur : /api/auth/create-users-debug.php</strong></li>
            </ol>
        </div>
    </div>
</body>
</html>
