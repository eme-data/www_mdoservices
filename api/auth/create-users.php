<?php
/**
 * Script de Création d'Utilisateurs Admin
 * Crée des comptes pour l'espace partenaire et l'espace client
 *
 * ⚠️ SÉCURITÉ : SUPPRIMEZ CE FICHIER APRÈS UTILISATION !
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Création Comptes Admin - MDO Services</title>
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
        h1 {
            color: #667eea;
            font-size: 32px;
            margin-bottom: 10px;
        }
        h2 {
            color: #333;
            font-size: 24px;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f0f0;
        }
        h3 {
            color: #555;
            font-size: 18px;
            margin: 20px 0 10px;
        }
        .subtitle {
            color: #666;
            font-size: 16px;
            margin-bottom: 30px;
        }
        .success {
            background: #d4edda;
            border-left: 4px solid #28a745;
            color: #155724;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
        }
        .error {
            background: #f8d7da;
            border-left: 4px solid #dc3545;
            color: #721c24;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
        }
        .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            color: #856404;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
        }
        .info {
            background: #d1ecf1;
            border-left: 4px solid #17a2b8;
            color: #0c5460;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #333;
        }
        .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        .badge-partner {
            background: #e3f2fd;
            color: #1976d2;
        }
        .badge-client {
            background: #e8f5e9;
            color: #388e3c;
        }
        .badge-admin {
            background: #fff3e0;
            color: #f57c00;
        }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }
        pre {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 13px;
            border: 1px solid #dee2e6;
        }
        .credential-box {
            background: #f8f9fa;
            border: 2px solid #28a745;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .credential-item {
            margin: 10px 0;
            font-size: 16px;
        }
        .credential-label {
            font-weight: 600;
            color: #555;
            display: inline-block;
            width: 150px;
        }
        .credential-value {
            font-family: 'Courier New', monospace;
            color: #28a745;
            font-weight: bold;
        }
        button {
            background: #667eea;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s;
        }
        button:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        .btn-danger {
            background: #dc3545;
        }
        .btn-danger:hover {
            background: #c82333;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🔐 Création Comptes Administrateur</h1>
            <p class="subtitle">MDO Services - Gestion des Utilisateurs</p>

<?php

$db = new Database();

// Vérifier et créer la table users si nécessaire
try {
    $tableExists = $db->queryOne("SHOW TABLES LIKE 'users'");

    if (!$tableExists) {
        echo "<div class='warning'>";
        echo "<h3>⚠️ Table 'users' non trouvée</h3>";
        echo "<p>Création de la table users...</p>";

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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ";

        $db->execute($createTable, []);
        echo "<p class='success'>✅ Table 'users' créée avec succès</p>";
        echo "</div>";
    }
} catch (Exception $e) {
    echo "<div class='error'>";
    echo "<h3>❌ Erreur de vérification de la base de données</h3>";
    echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
    echo "</div>";
}

// Définir les utilisateurs par défaut
$defaultUsers = [
    [
        'username' => 'admin_partner',
        'password' => 'MDOPartner2024!',
        'email' => 'admin@mdoservices.fr',
        'role' => 'partner',
        'is_admin' => true,
        'description' => 'Administrateur Espace Partenaire'
    ],
    [
        'username' => 'admin_client',
        'password' => 'MDOClient2024!',
        'email' => 'client@mdoservices.fr',
        'role' => 'client',
        'is_admin' => false,
        'description' => 'Administrateur Espace Client'
    ],
    [
        'username' => 'demo_partner',
        'password' => 'DemoPartner2024',
        'email' => 'demo.partner@mdoservices.fr',
        'role' => 'partner',
        'is_admin' => false,
        'description' => 'Compte Demo Partenaire'
    ],
    [
        'username' => 'demo_client',
        'password' => 'DemoClient2024',
        'email' => 'demo.client@mdoservices.fr',
        'role' => 'client',
        'is_admin' => false,
        'description' => 'Compte Demo Client'
    ]
];

echo "<h2>📋 Création des Utilisateurs</h2>";

$createdUsers = [];
$errors = [];

foreach ($defaultUsers as $userData) {
    try {
        // Vérifier si l'utilisateur existe déjà
        $existing = $db->queryOne(
            "SELECT id, username FROM users WHERE username = :username",
            ['username' => $userData['username']]
        );

        if ($existing) {
            // Mettre à jour le mot de passe si l'utilisateur existe
            $passwordHash = password_hash($userData['password'], PASSWORD_BCRYPT, ['cost' => 10]);

            $db->execute(
                "UPDATE users SET password_hash = :hash, email = :email, role = :role, is_admin = :is_admin WHERE username = :username",
                [
                    'hash' => $passwordHash,
                    'email' => $userData['email'],
                    'role' => $userData['role'],
                    'is_admin' => $userData['is_admin'] ? 1 : 0,
                    'username' => $userData['username']
                ]
            );

            $userData['status'] = 'updated';
            $createdUsers[] = $userData;

        } else {
            // Créer un nouvel utilisateur
            $passwordHash = password_hash($userData['password'], PASSWORD_BCRYPT, ['cost' => 10]);

            $db->execute(
                "INSERT INTO users (username, password_hash, email, role, is_admin) VALUES (:username, :hash, :email, :role, :is_admin)",
                [
                    'username' => $userData['username'],
                    'hash' => $passwordHash,
                    'email' => $userData['email'],
                    'role' => $userData['role'],
                    'is_admin' => $userData['is_admin'] ? 1 : 0
                ]
            );

            $userData['status'] = 'created';
            $createdUsers[] = $userData;
        }

    } catch (Exception $e) {
        $errors[] = [
            'username' => $userData['username'],
            'error' => $e->getMessage()
        ];
    }
}

// Afficher les résultats
if (!empty($createdUsers)) {
    echo "<div class='success'>";
    echo "<h3>✅ Utilisateurs créés/mis à jour avec succès</h3>";
    echo "<p>Total : " . count($createdUsers) . " utilisateur(s)</p>";
    echo "</div>";

    echo "<h2>🔑 Identifiants de Connexion</h2>";

    foreach ($createdUsers as $user) {
        $badgeClass = $user['role'] === 'partner' ? 'badge-partner' : 'badge-client';
        $statusIcon = $user['status'] === 'created' ? '🆕' : '🔄';
        $statusText = $user['status'] === 'created' ? 'Créé' : 'Mis à jour';

        echo "<div class='credential-box'>";
        echo "<h3>" . $statusIcon . " " . htmlspecialchars($user['description']);
        echo " <span class='badge $badgeClass'>" . strtoupper($user['role']) . "</span>";
        if ($user['is_admin']) {
            echo " <span class='badge badge-admin'>ADMIN</span>";
        }
        echo " <span style='color: #999; font-size: 14px;'>($statusText)</span>";
        echo "</h3>";

        echo "<div class='credential-item'>";
        echo "<span class='credential-label'>Nom d'utilisateur :</span>";
        echo "<span class='credential-value'>" . htmlspecialchars($user['username']) . "</span>";
        echo "</div>";

        echo "<div class='credential-item'>";
        echo "<span class='credential-label'>Mot de passe :</span>";
        echo "<span class='credential-value'>" . htmlspecialchars($user['password']) . "</span>";
        echo "</div>";

        echo "<div class='credential-item'>";
        echo "<span class='credential-label'>Email :</span>";
        echo "<span class='credential-value'>" . htmlspecialchars($user['email']) . "</span>";
        echo "</div>";

        $loginUrl = $user['role'] === 'partner' ? '/partner' : '/client';
        echo "<div class='credential-item'>";
        echo "<span class='credential-label'>URL de connexion :</span>";
        echo "<span class='credential-value'><a href='$loginUrl' target='_blank'>" . htmlspecialchars($loginUrl) . "</a></span>";
        echo "</div>";

        echo "</div>";
    }
}

if (!empty($errors)) {
    echo "<div class='error'>";
    echo "<h3>❌ Erreurs rencontrées</h3>";
    foreach ($errors as $error) {
        echo "<p><strong>" . htmlspecialchars($error['username']) . "</strong> : " . htmlspecialchars($error['error']) . "</p>";
    }
    echo "</div>";
}

// Afficher tous les utilisateurs existants
echo "<h2>👥 Utilisateurs Existants</h2>";

try {
    $allUsers = $db->query("SELECT id, username, email, role, is_admin, created_at, last_login FROM users ORDER BY created_at DESC");

    if (!empty($allUsers)) {
        echo "<table>";
        echo "<thead><tr>";
        echo "<th>ID</th>";
        echo "<th>Username</th>";
        echo "<th>Email</th>";
        echo "<th>Rôle</th>";
        echo "<th>Admin</th>";
        echo "<th>Créé le</th>";
        echo "<th>Dernière connexion</th>";
        echo "</tr></thead>";
        echo "<tbody>";

        foreach ($allUsers as $user) {
            $badgeClass = $user['role'] === 'partner' ? 'badge-partner' : 'badge-client';
            echo "<tr>";
            echo "<td>" . htmlspecialchars($user['id']) . "</td>";
            echo "<td><strong>" . htmlspecialchars($user['username']) . "</strong></td>";
            echo "<td>" . htmlspecialchars($user['email']) . "</td>";
            echo "<td><span class='badge $badgeClass'>" . htmlspecialchars($user['role']) . "</span></td>";
            echo "<td>" . ($user['is_admin'] ? '✅' : '❌') . "</td>";
            echo "<td>" . htmlspecialchars($user['created_at']) . "</td>";
            echo "<td>" . ($user['last_login'] ? htmlspecialchars($user['last_login']) : '-') . "</td>";
            echo "</tr>";
        }

        echo "</tbody>";
        echo "</table>";
    } else {
        echo "<div class='info'><p>Aucun utilisateur trouvé dans la base de données.</p></div>";
    }

} catch (Exception $e) {
    echo "<div class='error'>";
    echo "<p>Erreur lors de la récupération des utilisateurs : " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "</div>";
}

?>

        </div>

        <div class="card" style="background: #fff3cd; border-left: 4px solid #ffc107;">
            <h2>⚠️ SÉCURITÉ IMPORTANTE</h2>
            <div class="warning">
                <p><strong>Ce fichier contient des informations sensibles !</strong></p>
                <p style="margin-top: 10px;">🔒 <strong>Actions à effectuer immédiatement :</strong></p>
                <ol style="margin-left: 20px; margin-top: 10px;">
                    <li>Notez tous les identifiants ci-dessus dans un gestionnaire de mots de passe sécurisé</li>
                    <li>Supprimez ce fichier du serveur : <code>/public_html/api/auth/create-users.php</code></li>
                    <li>Changez les mots de passe par défaut après la première connexion</li>
                    <li>Ne partagez jamais ces identifiants par email ou messagerie non sécurisée</li>
                </ol>
            </div>
        </div>

        <div class="card">
            <h2>📚 Guide d'Utilisation</h2>

            <h3>🔹 Espace Partenaire</h3>
            <ul style="margin-left: 20px; line-height: 1.8;">
                <li>URL : <code>https://mdoservices.fr/partner</code></li>
                <li>Compte Admin : <code>admin_partner</code></li>
                <li>Accès au dashboard partenaire après connexion</li>
            </ul>

            <h3>🔹 Espace Client</h3>
            <ul style="margin-left: 20px; line-height: 1.8;">
                <li>URL : <code>https://mdoservices.fr/client</code></li>
                <li>Compte Admin : <code>admin_client</code></li>
                <li>Accès aux services support, télécom, etc.</li>
            </ul>

            <h3>🔹 Comptes Demo</h3>
            <ul style="margin-left: 20px; line-height: 1.8;">
                <li>Utilisez <code>demo_partner</code> et <code>demo_client</code> pour les démonstrations</li>
                <li>Accès limité (non-admin)</li>
            </ul>
        </div>
    </div>
</body>
</html>
