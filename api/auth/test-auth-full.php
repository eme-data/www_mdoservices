<?php
/**
 * Complete Authentication Diagnostic
 * Tests the entire auth flow step by step
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Auth Complete Diagnostic</title>";
echo "<style>
body{font-family:sans-serif;max-width:1000px;margin:20px auto;padding:20px;background:#f5f5f5;}
.card{background:white;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);margin-bottom:20px;}
.success{color:green;font-weight:bold;}
.error{color:red;font-weight:bold;}
.info{color:blue;}
.warning{color:orange;font-weight:bold;}
pre{background:#f4f4f4;padding:10px;border-radius:5px;overflow-x:auto;font-size:12px;}
table{width:100%;border-collapse:collapse;}
table td,table th{padding:8px;border:1px solid #ddd;text-align:left;}
table th{background:#f8f9fa;}
button{background:#0066cc;color:white;padding:10px 20px;border:none;border-radius:4px;cursor:pointer;margin:5px;}
button:hover{background:#0052a3;}
.test-section{border-left:4px solid #0066cc;padding-left:15px;margin:15px 0;}
</style>";
echo "<script>
function testLogin(domain) {
  const result = document.getElementById('login-result-' + domain);
  result.innerHTML = '<p class=\"info\">⏳ Test en cours...</p>';

  const url = 'https://' + domain + '/api/auth/login.php';

  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: 'admin', password: 'ChangeMe123!'})
  })
  .then(response => response.json())
  .then(data => {
    result.innerHTML = '<p class=\"success\">✅ Succès !</p><pre>' + JSON.stringify(data, null, 2) + '</pre>';
  })
  .catch(error => {
    result.innerHTML = '<p class=\"error\">❌ Erreur: ' + error.message + '</p>';
  });
}
</script>";
echo "</head><body>";

echo "<h1>🔍 Diagnostic Complet d'Authentification</h1>";

// Test 1: Domaine actuel
echo "<div class='card'>";
echo "<h2>Test 1: Informations du Domaine Actuel</h2>";
echo "<table>";
echo "<tr><th>Propriété</th><th>Valeur</th></tr>";
echo "<tr><td>HTTP_HOST</td><td>" . htmlspecialchars($_SERVER['HTTP_HOST']) . "</td></tr>";
echo "<tr><td>SERVER_NAME</td><td>" . htmlspecialchars($_SERVER['SERVER_NAME']) . "</td></tr>";
echo "<tr><td>REQUEST_URI</td><td>" . htmlspecialchars($_SERVER['REQUEST_URI']) . "</td></tr>";
echo "<tr><td>HTTPS</td><td>" . (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? '✅ ON' : '❌ OFF') . "</td></tr>";
echo "<tr><td>REQUEST_METHOD</td><td>" . htmlspecialchars($_SERVER['REQUEST_METHOD']) . "</td></tr>";
echo "</table>";
echo "</div>";

// Test 2: Vérifier fichiers
echo "<div class='card'>";
echo "<h2>Test 2: Fichiers API</h2>";
$files = [
    'login.php' => __DIR__ . '/login.php',
    'config.php' => __DIR__ . '/../config/config.php',
    'config.local.php' => __DIR__ . '/../config/config.local.php',
    'Database.php' => __DIR__ . '/../config/Database.php',
    'utils.php' => __DIR__ . '/../config/utils.php',
    '.htaccess (racine)' => dirname(dirname(__DIR__)) . '/.htaccess'
];

echo "<table>";
echo "<tr><th>Fichier</th><th>Statut</th><th>Chemin</th></tr>";
foreach ($files as $name => $path) {
    $exists = file_exists($path);
    $status = $exists ? '<span class="success">✅ Existe</span>' : '<span class="error">❌ Manquant</span>';
    echo "<tr><td>$name</td><td>$status</td><td style='font-size:11px;'>$path</td></tr>";
}
echo "</table>";
echo "</div>";

// Test 3: Configuration
echo "<div class='card'>";
echo "<h2>Test 3: Configuration</h2>";
require_once __DIR__ . '/../config/config.php';

echo "<table>";
echo "<tr><th>Constante</th><th>Valeur</th></tr>";
echo "<tr><td>DB_HOST</td><td>" . (defined('DB_HOST') ? htmlspecialchars(DB_HOST) : '<span class="error">Non définie</span>') . "</td></tr>";
echo "<tr><td>DB_NAME</td><td>" . (defined('DB_NAME') ? htmlspecialchars(DB_NAME) : '<span class="error">Non définie</span>') . "</td></tr>";
echo "<tr><td>DB_USER</td><td>" . (defined('DB_USER') ? htmlspecialchars(DB_USER) : '<span class="error">Non définie</span>') . "</td></tr>";
echo "<tr><td>DB_PASS</td><td>" . (defined('DB_PASS') ? '✅ Défini (' . strlen(DB_PASS) . ' caractères)' : '<span class="error">Non défini</span>') . "</td></tr>";
echo "<tr><td>JWT_SECRET</td><td>" . (defined('JWT_SECRET') ? '✅ Défini (' . strlen(JWT_SECRET) . ' caractères)' : '<span class="error">Non défini</span>') . "</td></tr>";
echo "</table>";

// Check CORS
if (defined('CORS_ALLOWED_ORIGINS')) {
    echo "<h3>CORS Origins Autorisés:</h3>";
    echo "<pre>" . htmlspecialchars(print_r(CORS_ALLOWED_ORIGINS, true)) . "</pre>";
}
echo "</div>";

// Test 4: Database
echo "<div class='card'>";
echo "<h2>Test 4: Base de Données</h2>";
try {
    require_once __DIR__ . '/../config/Database.php';
    $db = new Database();
    echo "<p class='success'>✅ Connexion Database réussie</p>";

    $user = $db->queryOne("SELECT id, username, email, is_admin, is_active, password_hash FROM users WHERE username = 'admin'");

    if ($user) {
        echo "<p class='success'>✅ Utilisateur admin trouvé</p>";
        echo "<table>";
        echo "<tr><th>Propriété</th><th>Valeur</th></tr>";
        echo "<tr><td>ID</td><td>" . $user['id'] . "</td></tr>";
        echo "<tr><td>Username</td><td>" . htmlspecialchars($user['username']) . "</td></tr>";
        echo "<tr><td>Email</td><td>" . htmlspecialchars($user['email']) . "</td></tr>";
        echo "<tr><td>is_admin</td><td>" . ($user['is_admin'] ? '✅ OUI' : '❌ NON') . "</td></tr>";
        echo "<tr><td>is_active</td><td>" . ($user['is_active'] ? '✅ OUI' : '❌ NON') . "</td></tr>";
        echo "<tr><td>password_hash</td><td style='font-size:10px;word-break:break-all;'>" . htmlspecialchars($user['password_hash']) . "</td></tr>";
        echo "</table>";

        // Test password
        echo "<h3>Test du Mot de Passe</h3>";
        $testPassword = 'ChangeMe123!';
        if (password_verify($testPassword, $user['password_hash'])) {
            echo "<p class='success'>✅ Le mot de passe '$testPassword' fonctionne !</p>";
        } else {
            echo "<p class='error'>❌ Le mot de passe '$testPassword' ne fonctionne PAS</p>";
            echo "<p class='warning'>⚠️ Vous devez réinitialiser le mot de passe avec reset-admin-password.php</p>";
        }
    } else {
        echo "<p class='error'>❌ Utilisateur admin NON trouvé</p>";
    }
} catch (Exception $e) {
    echo "<p class='error'>❌ Erreur BDD: " . htmlspecialchars($e->getMessage()) . "</p>";
}
echo "</div>";

// Test 5: .htaccess content
echo "<div class='card'>";
echo "<h2>Test 5: Contenu .htaccess</h2>";
$htaccessPath = dirname(dirname(__DIR__)) . '/.htaccess';
if (file_exists($htaccessPath)) {
    $content = file_get_contents($htaccessPath);
    echo "<pre>" . htmlspecialchars($content) . "</pre>";

    // Check for API exclusion
    if (strpos($content, '!^/api/') !== false) {
        echo "<p class='success'>✅ La règle d'exclusion /api/ est présente</p>";
    } else {
        echo "<p class='error'>❌ La règle d'exclusion /api/ est ABSENTE</p>";
        echo "<p class='warning'>⚠️ Les requêtes API POST seront redirigées et perdront leur body !</p>";
    }
} else {
    echo "<p class='error'>❌ Fichier .htaccess NON trouvé</p>";
}
echo "</div>";

// Test 6: Test JavaScript depuis le navigateur
echo "<div class='card'>";
echo "<h2>Test 6: Test Login depuis le Navigateur (JavaScript)</h2>";
echo "<p>Ces tests simulent exactement ce que fait le frontend React.</p>";

echo "<div class='test-section'>";
echo "<h3>Test avec www.mdoservices.fr</h3>";
echo "<button onclick=\"testLogin('www.mdoservices.fr')\">🧪 Tester www.mdoservices.fr</button>";
echo "<div id='login-result-www.mdoservices.fr'></div>";
echo "</div>";

echo "<div class='test-section'>";
echo "<h3>Test avec mdoservices.fr</h3>";
echo "<button onclick=\"testLogin('mdoservices.fr')\">🧪 Tester mdoservices.fr</button>";
echo "<div id='login-result-mdoservices.fr'></div>";
echo "</div>";
echo "</div>";

// Test 7: CURL examples
echo "<div class='card'>";
echo "<h2>Test 7: Commandes CURL pour Tests Manuels</h2>";
echo "<p>Testez ces commandes dans votre terminal :</p>";

echo "<h3>Test 1: Avec www</h3>";
echo "<pre>curl -X POST https://www.mdoservices.fr/api/auth/login.php \\
  -H 'Content-Type: application/json' \\
  -d '{\"username\":\"admin\",\"password\":\"ChangeMe123!\"}'</pre>";

echo "<h3>Test 2: Sans www</h3>";
echo "<pre>curl -X POST https://mdoservices.fr/api/auth/login.php \\
  -H 'Content-Type: application/json' \\
  -d '{\"username\":\"admin\",\"password\":\"ChangeMe123!\"}'</pre>";

echo "<h3>Test 3: Verbose (pour voir les redirections)</h3>";
echo "<pre>curl -v -X POST https://www.mdoservices.fr/api/auth/login.php \\
  -H 'Content-Type: application/json' \\
  -d '{\"username\":\"admin\",\"password\":\"ChangeMe123!\"}'</pre>";
echo "</div>";

// Recommendations
echo "<div class='card' style='background:#fff3cd;border-left:4px solid #ffc107;'>";
echo "<h2>🎯 Recommandations</h2>";
echo "<ol>";
echo "<li>Vérifiez que le .htaccess contient la ligne <code>RewriteCond %{REQUEST_URI} !^/api/</code></li>";
echo "<li>Si le mot de passe ne fonctionne pas, utilisez <strong>reset-admin-password.php</strong></li>";
echo "<li>Testez les boutons JavaScript ci-dessus pour voir les erreurs exactes</li>";
echo "<li>Si les tests JavaScript échouent, partagez le message d'erreur exact</li>";
echo "</ol>";
echo "</div>";

echo "<div class='card' style='background:#f8d7da;border-left:4px solid #dc3545;'>";
echo "<h2>⚠️ SÉCURITÉ</h2>";
echo "<p><strong>SUPPRIMEZ CE FICHIER après utilisation !</strong></p>";
echo "<p>Fichier : <code>/public_html/api/auth/test-auth-full.php</code></p>";
echo "</div>";

echo "</body></html>";
