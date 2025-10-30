<?php
/**
 * Test Login Endpoint
 * À uploader dans /public_html/api/auth/
 * À supprimer après test
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Test Login</title>";
echo "<style>body{font-family:sans-serif;max-width:800px;margin:40px auto;padding:20px;}";
echo ".success{color:green;} .error{color:red;} .info{color:blue;} pre{background:#f4f4f4;padding:10px;border-radius:5px;}</style>";
echo "</head><body><h1>🔐 Test Login Endpoint</h1>";

// Test 1: Vérifier que login.php existe
echo "<h2>Test 1: Vérification du fichier login.php</h2>";
$loginPath = __DIR__ . '/login.php';
if (file_exists($loginPath)) {
    echo "<p class='success'>✅ login.php trouvé : $loginPath</p>";
} else {
    echo "<p class='error'>❌ login.php NON trouvé : $loginPath</p>";
    echo "</body></html>";
    exit;
}

// Test 2: Vérifier config
echo "<h2>Test 2: Vérification de la configuration</h2>";
require_once __DIR__ . '/../config/config.php';

if (defined('JWT_SECRET')) {
    echo "<p class='success'>✅ JWT_SECRET défini (longueur: " . strlen(JWT_SECRET) . " caractères)</p>";
    if (JWT_SECRET === 'your-super-secret-jwt-key-change-this-in-production') {
        echo "<p class='error'>⚠️ ATTENTION : JWT_SECRET utilise la valeur par défaut ! Changez-le dans config.local.php</p>";
    }
} else {
    echo "<p class='error'>❌ JWT_SECRET non défini</p>";
}

// Test 3: Vérifier la connexion DB
echo "<h2>Test 3: Connexion à la base de données</h2>";
try {
    require_once __DIR__ . '/../config/Database.php';
    $db = new Database();
    echo "<p class='success'>✅ Database class instanciée</p>";

    // Test 4: Vérifier l'utilisateur admin
    echo "<h2>Test 4: Utilisateur admin</h2>";
    $user = $db->queryOne("SELECT id, username, email, is_admin, is_active FROM users WHERE username = 'admin'");

    if ($user) {
        echo "<p class='success'>✅ Utilisateur admin trouvé</p>";
        echo "<pre>" . htmlspecialchars(print_r($user, true)) . "</pre>";

        if ($user['is_active']) {
            echo "<p class='success'>✅ Compte actif</p>";
        } else {
            echo "<p class='error'>❌ Compte inactif</p>";
        }

        if ($user['is_admin']) {
            echo "<p class='success'>✅ Privilèges admin</p>";
        } else {
            echo "<p class='error'>❌ Pas de privilèges admin</p>";
        }
    } else {
        echo "<p class='error'>❌ Utilisateur admin NON trouvé</p>";
    }

    // Test 5: Test du hash du mot de passe
    echo "<h2>Test 5: Vérification du hash du mot de passe</h2>";
    $userFull = $db->queryOne("SELECT password_hash FROM users WHERE username = 'admin'");

    if ($userFull && isset($userFull['password_hash'])) {
        echo "<p class='info'>📌 Hash présent (longueur: " . strlen($userFull['password_hash']) . " caractères)</p>";

        // Test avec le mot de passe par défaut
        $defaultPassword = 'ChangeMe123!';
        if (password_verify($defaultPassword, $userFull['password_hash'])) {
            echo "<p class='success'>✅ Le mot de passe par défaut 'ChangeMe123!' fonctionne</p>";
        } else {
            echo "<p class='error'>❌ Le mot de passe par défaut 'ChangeMe123!' ne fonctionne PAS</p>";
            echo "<p class='info'>💡 Vous avez probablement changé le mot de passe via phpMyAdmin</p>";
        }
    }

} catch (Exception $e) {
    echo "<p class='error'>❌ Erreur : " . htmlspecialchars($e->getMessage()) . "</p>";
}

// Test 6: Vérifier les fonctions utils
echo "<h2>Test 6: Fonctions utilitaires</h2>";
require_once __DIR__ . '/../config/utils.php';

if (function_exists('generateJWT')) {
    echo "<p class='success'>✅ Fonction generateJWT() disponible</p>";
} else {
    echo "<p class='error'>❌ Fonction generateJWT() NON disponible</p>";
}

if (function_exists('password_verify')) {
    echo "<p class='success'>✅ Fonction password_verify() disponible</p>";
} else {
    echo "<p class='error'>❌ Fonction password_verify() NON disponible</p>";
}

echo "<hr><h2>🎯 Conclusion</h2>";
echo "<p>Si tous les tests sont ✅ verts, le problème vient probablement de :</p>";
echo "<ul>";
echo "<li>Le frontend qui n'envoie pas les bonnes données au backend</li>";
echo "<li>Un problème de CORS</li>";
echo "<li>Le mot de passe qui a été changé et ne correspond plus</li>";
echo "</ul>";

echo "<h2>🧪 Test Manuel</h2>";
echo "<p>Pour tester l'authentification manuellement, utilisez cette commande curl :</p>";
echo "<pre>curl -X POST https://mdoservices.fr/api/auth/login.php \\
  -H 'Content-Type: application/json' \\
  -d '{\"username\":\"admin\",\"password\":\"ChangeMe123!\"}'</pre>";

echo "</body></html>";
