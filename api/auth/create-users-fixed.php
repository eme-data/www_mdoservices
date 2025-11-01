<?php
/**
 * Script de Migration et Création d'Utilisateurs
 * Adapte la table existante et crée les comptes
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../config/config.php';

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Migration BDD - MDO Services</title>
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
        .success { background: #d4edda; border-left: 4px solid #28a745; color: #155724; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .error { background: #f8d7da; border-left: 4px solid #dc3545; color: #721c24; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .warning { background: #fff3cd; border-left: 4px solid #ffc107; color: #856404; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .info { background: #d1ecf1; border-left: 4px solid #17a2b8; color: #0c5460; padding: 15px; border-radius: 6px; margin: 15px 0; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; font-weight: 600; }
        .credential-box {
            background: #f8f9fa;
            border: 2px solid #28a745;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🔧 Migration et Création Utilisateurs</h1>
            <p style="color: #666; margin-bottom: 20px;">Adaptation de la table existante</p>

<?php

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    echo "<div class='success'><h2>✅ Connexion établie</h2></div>";

    // Vérifier la structure actuelle
    $stmt = $pdo->query("DESCRIBE users");
    $columns = $stmt->fetchAll();
    $existingColumns = array_column($columns, 'Field');

    echo "<h2>📋 Structure Actuelle de la Table</h2>";
    echo "<div class='info'>";
    echo "<p>Colonnes existantes : <code>" . implode(', ', $existingColumns) . "</code></p>";
    echo "</div>";

    // Ajouter la colonne 'role' si elle n'existe pas
    if (!in_array('role', $existingColumns)) {
        echo "<div class='warning'>";
        echo "<h3>⚙️ Ajout de la colonne 'role'</h3>";
        $pdo->exec("ALTER TABLE users ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'client' AFTER password_hash");
        $pdo->exec("ALTER TABLE users ADD INDEX idx_role (role)");
        echo "<p class='success'>✅ Colonne 'role' ajoutée avec succès</p>";
        echo "</div>";
    } else {
        echo "<div class='success'><p>✅ Colonne 'role' déjà présente</p></div>";
    }

    echo "<h2>👥 Création des Utilisateurs</h2>";

    $users = [
        [
            'username' => 'admin_partner',
            'password' => 'MDOPartner2024!',
            'email' => 'admin@mdoservices.fr',
            'role' => 'partner',
            'is_admin' => 1,
            'description' => 'Admin Espace Partenaire'
        ],
        [
            'username' => 'admin_client',
            'password' => 'MDOClient2024!',
            'email' => 'client@mdoservices.fr',
            'role' => 'client',
            'is_admin' => 0,
            'description' => 'Admin Espace Client'
        ],
        [
            'username' => 'demo_partner',
            'password' => 'DemoPartner2024',
            'email' => 'demo.partner@mdoservices.fr',
            'role' => 'partner',
            'is_admin' => 0,
            'description' => 'Demo Partenaire'
        ],
        [
            'username' => 'demo_client',
            'password' => 'DemoClient2024',
            'email' => 'demo.client@mdoservices.fr',
            'role' => 'client',
            'is_admin' => 0,
            'description' => 'Demo Client'
        ]
    ];

    $created = [];

    foreach ($users as $user) {
        try {
            // Vérifier si existe
            $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
            $stmt->execute([$user['username']]);
            $exists = $stmt->fetch();

            $hash = password_hash($user['password'], PASSWORD_BCRYPT);

            if ($exists) {
                // Mise à jour
                $stmt = $pdo->prepare("
                    UPDATE users
                    SET password_hash = ?, email = ?, role = ?, is_admin = ?, is_active = 1
                    WHERE username = ?
                ");
                $stmt->execute([
                    $hash,
                    $user['email'],
                    $user['role'],
                    $user['is_admin'],
                    $user['username']
                ]);
                $user['status'] = '🔄 Mis à jour';
            } else {
                // Insertion
                $stmt = $pdo->prepare("
                    INSERT INTO users (username, password_hash, email, role, is_admin, is_active)
                    VALUES (?, ?, ?, ?, ?, 1)
                ");
                $stmt->execute([
                    $user['username'],
                    $hash,
                    $user['email'],
                    $user['role'],
                    $user['is_admin']
                ]);
                $user['status'] = '🆕 Créé';
            }

            $created[] = $user;

        } catch (PDOException $e) {
            echo "<div class='error'>";
            echo "<p><strong>" . htmlspecialchars($user['username']) . " :</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
            echo "</div>";
        }
    }

    if (!empty($created)) {
        echo "<div class='success'>";
        echo "<h3>✅ " . count($created) . " utilisateur(s) créé(s)/mis à jour</h3>";
        echo "</div>";

        echo "<h2>🔑 Identifiants de Connexion</h2>";

        foreach ($created as $u) {
            $loginUrl = $u['role'] === 'partner' ? '/partner' : '/client';
            $bgColor = $u['role'] === 'partner' ? '#e3f2fd' : '#e8f5e9';

            echo "<div class='credential-box' style='background: $bgColor;'>";
            echo "<h3>" . htmlspecialchars($u['description']) . " " . $u['status'] . "</h3>";
            echo "<table style='margin-top: 10px;'>";
            echo "<tr><td><strong>URL :</strong></td><td><a href='$loginUrl' target='_blank'>https://mdoservices.fr$loginUrl</a></td></tr>";
            echo "<tr><td><strong>Username :</strong></td><td><code style='font-size: 16px; color: #28a745;'>" . htmlspecialchars($u['username']) . "</code></td></tr>";
            echo "<tr><td><strong>Password :</strong></td><td><code style='font-size: 16px; color: #28a745;'>" . htmlspecialchars($u['password']) . "</code></td></tr>";
            echo "<tr><td><strong>Email :</strong></td><td>" . htmlspecialchars($u['email']) . "</td></tr>";
            echo "<tr><td><strong>Rôle :</strong></td><td>" . htmlspecialchars($u['role']) . ($u['is_admin'] ? ' (Admin)' : '') . "</td></tr>";
            echo "</table>";
            echo "</div>";
        }
    }

    echo "<h2>📊 Tous les Utilisateurs</h2>";

    $stmt = $pdo->query("SELECT id, username, email, role, is_admin, is_active, created_at FROM users ORDER BY id DESC");
    $allUsers = $stmt->fetchAll();

    echo "<table>";
    echo "<tr><th>ID</th><th>Username</th><th>Email</th><th>Rôle</th><th>Admin</th><th>Actif</th><th>Créé</th></tr>";
    foreach ($allUsers as $u) {
        echo "<tr>";
        echo "<td>" . $u['id'] . "</td>";
        echo "<td><strong>" . htmlspecialchars($u['username']) . "</strong></td>";
        echo "<td>" . htmlspecialchars($u['email']) . "</td>";
        echo "<td>" . htmlspecialchars($u['role']) . "</td>";
        echo "<td>" . ($u['is_admin'] ? '✅' : '❌') . "</td>";
        echo "<td>" . ($u['is_active'] ? '✅' : '❌') . "</td>";
        echo "<td>" . htmlspecialchars($u['created_at']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";

} catch (PDOException $e) {
    echo "<div class='error'>";
    echo "<h3>❌ Erreur</h3>";
    echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
    echo "</div>";
}

?>

        </div>

        <div class="card" style="background: #d4edda;">
            <h2>✅ C'est Terminé !</h2>
            <ol style="margin-left: 20px; line-height: 2;">
                <li>✅ Colonne 'role' ajoutée à la table</li>
                <li>✅ 4 comptes utilisateurs créés/mis à jour</li>
                <li>🔐 Notez les identifiants dans un gestionnaire de mots de passe</li>
                <li>🧪 Testez la connexion sur <a href="/partner">/partner</a> et <a href="/client">/client</a></li>
                <li>🗑️ <strong>SUPPRIMEZ ce fichier : /api/auth/create-users-debug.php</strong></li>
            </ol>
        </div>

        <div class="card" style="background: #fff3cd;">
            <h2>⚠️ SÉCURITÉ</h2>
            <p><strong style="color: #856404;">Fichiers à supprimer immédiatement après utilisation :</strong></p>
            <ul style="margin: 15px 0 0 20px; line-height: 2;">
                <li><code>/api/auth/create-users.php</code></li>
                <li><code>/api/auth/create-users-debug.php</code></li>
                <li><code>/api/auth/create-users.sql</code></li>
                <li><code>/COMPTES_ADMIN.md</code></li>
            </ul>
        </div>
    </div>
</body>
</html>
