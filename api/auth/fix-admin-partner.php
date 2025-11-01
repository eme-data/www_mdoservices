<?php
/**
 * Script de Correction - Création admin_partner
 * Change l'email pour éviter le conflit
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
    <title>Correction admin_partner - MDO Services</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 900px; margin: 0 auto; }
        .card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 { color: #667eea; font-size: 32px; margin-bottom: 10px; }
        h2 { color: #333; font-size: 24px; margin: 20px 0 15px; }
        .success { background: #d4edda; border-left: 4px solid #28a745; color: #155724; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .error { background: #f8d7da; border-left: 4px solid #dc3545; color: #721c24; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .info { background: #d1ecf1; border-left: 4px solid #17a2b8; color: #0c5460; padding: 15px; border-radius: 6px; margin: 15px 0; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; font-weight: 600; }
        .credential-box {
            background: #e3f2fd;
            border: 2px solid #1976d2;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🔧 Correction Utilisateur admin_partner</h1>
            <p style="color: #666; margin-bottom: 20px;">Résolution du conflit d'email</p>

<?php

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    echo "<h2>Analyse de la Situation</h2>";

    // Vérifier l'utilisateur existant ID 1
    $stmt = $pdo->query("SELECT * FROM users WHERE id = 1");
    $user1 = $stmt->fetch();

    if ($user1) {
        echo "<div class='info'>";
        echo "<h3>Utilisateur existant (ID 1)</h3>";
        echo "<p><strong>Username:</strong> " . htmlspecialchars($user1['username']) . "</p>";
        echo "<p><strong>Email:</strong> " . htmlspecialchars($user1['email']) . "</p>";
        echo "<p><strong>Rôle:</strong> " . htmlspecialchars($user1['role']) . "</p>";
        echo "<p><strong>Admin:</strong> " . ($user1['is_admin'] ? 'Oui' : 'Non') . "</p>";
        echo "</div>";
    }

    // Vérifier si admin_partner existe
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute(['admin_partner']);
    $adminPartner = $stmt->fetch();

    if ($adminPartner) {
        echo "<div class='success'>";
        echo "<h3>✅ admin_partner existe déjà !</h3>";
        echo "<p>Aucune action nécessaire.</p>";
        echo "</div>";
    } else {
        echo "<div class='info'>";
        echo "<h3>⚙️ Création de admin_partner</h3>";
        echo "<p>Email utilisé : <code>admin.partner@mdoservices.fr</code> (pour éviter le conflit)</p>";
        echo "</div>";

        // Créer admin_partner avec un email différent
        $hash = password_hash('MDOPartner2024!', PASSWORD_BCRYPT);

        $stmt = $pdo->prepare("
            INSERT INTO users (username, password_hash, email, role, is_admin, is_active)
            VALUES (?, ?, ?, ?, ?, 1)
        ");
        $stmt->execute([
            'admin_partner',
            $hash,
            'admin.partner@mdoservices.fr', // Email différent
            'partner',
            1 // Admin
        ]);

        echo "<div class='success'>";
        echo "<h3>✅ Utilisateur admin_partner créé avec succès !</h3>";
        echo "</div>";
    }

    echo "<h2>🔑 Identifiants admin_partner</h2>";
    echo "<div class='credential-box'>";
    echo "<h3>Admin Espace Partenaire</h3>";
    echo "<table>";
    echo "<tr><td><strong>URL :</strong></td><td><a href='/partner' target='_blank'>https://mdoservices.fr/partner</a></td></tr>";
    echo "<tr><td><strong>Username :</strong></td><td><code style='font-size: 16px; color: #1976d2;'>admin_partner</code></td></tr>";
    echo "<tr><td><strong>Password :</strong></td><td><code style='font-size: 16px; color: #1976d2;'>MDOPartner2024!</code></td></tr>";
    echo "<tr><td><strong>Email :</strong></td><td>admin.partner@mdoservices.fr</td></tr>";
    echo "<tr><td><strong>Rôle :</strong></td><td>partner (Admin)</td></tr>";
    echo "</table>";
    echo "</div>";

    echo "<h2>📊 Tous les Utilisateurs</h2>";

    $stmt = $pdo->query("SELECT id, username, email, role, is_admin, is_active FROM users ORDER BY id ASC");
    $allUsers = $stmt->fetchAll();

    echo "<table>";
    echo "<tr><th>ID</th><th>Username</th><th>Email</th><th>Rôle</th><th>Admin</th><th>Actif</th></tr>";
    foreach ($allUsers as $u) {
        $highlight = ($u['username'] === 'admin_partner') ? 'style="background: #e3f2fd;"' : '';
        echo "<tr $highlight>";
        echo "<td>" . $u['id'] . "</td>";
        echo "<td><strong>" . htmlspecialchars($u['username']) . "</strong></td>";
        echo "<td>" . htmlspecialchars($u['email']) . "</td>";
        echo "<td>" . htmlspecialchars($u['role']) . "</td>";
        echo "<td>" . ($u['is_admin'] ? '✅' : '❌') . "</td>";
        echo "<td>" . ($u['is_active'] ? '✅' : '❌') . "</td>";
        echo "</tr>";
    }
    echo "</table>";

    echo "<h2>🧪 Testez Maintenant</h2>";
    echo "<div class='success'>";
    echo "<p>✅ Vous pouvez maintenant tester la connexion :</p>";
    echo "<ol style='margin: 15px 0 0 20px; line-height: 2;'>";
    echo "<li>Testez l'API : <a href='/api/auth/test-login-api.php' target='_blank'>/api/auth/test-login-api.php</a></li>";
    echo "<li>Connectez-vous : <a href='/partner' target='_blank'>https://mdoservices.fr/partner</a></li>";
    echo "<li>Utilisez : <code>admin_partner</code> / <code>MDOPartner2024!</code></li>";
    echo "</ol>";
    echo "</div>";

} catch (PDOException $e) {
    echo "<div class='error'>";
    echo "<h3>❌ Erreur</h3>";
    echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
    echo "</div>";
}

?>

        </div>

        <div class="card" style="background: #fff3cd;">
            <h2>⚠️ Note sur les Emails</h2>
            <p>Les emails ont été ajustés pour éviter les conflits :</p>
            <ul style="margin: 15px 0 0 20px; line-height: 2;">
                <li><code>admin_partner</code> → admin.partner@mdoservices.fr</li>
                <li><code>admin_client</code> → client@mdoservices.fr</li>
                <li><code>demo_partner</code> → demo.partner@mdoservices.fr</li>
                <li><code>demo_client</code> → demo.client@mdoservices.fr</li>
            </ul>
        </div>
    </div>
</body>
</html>
