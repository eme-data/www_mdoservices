<?php
/**
 * Test de l'API de Login
 * Diagnostique les problèmes de JSON
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Test API Login - MDO Services</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
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
        pre { background: #f8f9fa; padding: 15px; border-radius: 6px; overflow-x: auto; font-size: 12px; border: 1px solid #dee2e6; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; }
        button { background: #667eea; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 5px; }
        button:hover { background: #5568d3; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🧪 Test API de Login</h1>
            <p style="color: #666; margin-bottom: 20px;">Diagnostic des erreurs de connexion</p>

            <h2>1️⃣ Test Direct de la Base de Données</h2>
            <?php
            require_once __DIR__ . '/../config/config.php';
            require_once __DIR__ . '/../config/Database.php';

            try {
                $db = new Database();

                // Test de récupération d'un utilisateur
                $testUser = 'admin_partner';
                $sql = "SELECT id, username, email, password_hash, is_admin, is_active, role
                        FROM users
                        WHERE username = :username
                        LIMIT 1";

                $user = $db->queryOne($sql, ['username' => $testUser]);

                if ($user) {
                    echo "<div class='success'>";
                    echo "<h3>✅ Utilisateur trouvé dans la BDD</h3>";
                    echo "<pre>" . json_encode([
                        'id' => $user['id'],
                        'username' => $user['username'],
                        'email' => $user['email'],
                        'has_password' => !empty($user['password_hash']),
                        'is_admin' => $user['is_admin'],
                        'is_active' => $user['is_active'],
                        'role' => $user['role'] ?? 'N/A'
                    ], JSON_PRETTY_PRINT) . "</pre>";
                    echo "</div>";

                    // Test du mot de passe
                    $testPassword = 'MDOPartner2024!';
                    if (password_verify($testPassword, $user['password_hash'])) {
                        echo "<div class='success'><p>✅ Le mot de passe <code>$testPassword</code> est correct</p></div>";
                    } else {
                        echo "<div class='error'><p>❌ Le mot de passe ne correspond pas</p></div>";
                    }

                } else {
                    echo "<div class='error'><p>❌ Utilisateur '$testUser' non trouvé</p></div>";
                }

            } catch (Exception $e) {
                echo "<div class='error'>";
                echo "<h3>❌ Erreur BDD</h3>";
                echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
                echo "</div>";
            }
            ?>

            <h2>2️⃣ Test de l'API Login (via cURL)</h2>
            <div id="api-test-results">
                <button onclick="testLogin('admin_partner', 'MDOPartner2024!')">Tester admin_partner</button>
                <button onclick="testLogin('admin_client', 'MDOClient2024!')">Tester admin_client</button>
                <button onclick="testLogin('demo_partner', 'DemoPartner2024')">Tester demo_partner</button>
                <button onclick="testLogin('demo_client', 'DemoClient2024')">Tester demo_client</button>
                <div id="results" style="margin-top: 20px;"></div>
            </div>

            <h2>3️⃣ Test Manuel PHP (Simulation)</h2>
            <?php
            // Simuler un appel à l'API
            $_SERVER['REQUEST_METHOD'] = 'POST';
            $_SERVER['CONTENT_TYPE'] = 'application/json';

            $testCredentials = [
                'username' => 'admin_partner',
                'password' => 'MDOPartner2024!'
            ];

            echo "<div class='info'>";
            echo "<h3>Test avec : <code>" . htmlspecialchars(json_encode($testCredentials)) . "</code></h3>";

            // Capturer la sortie de l'API
            ob_start();

            // Simuler l'input JSON
            $GLOBALS['test_input'] = json_encode($testCredentials);

            try {
                // Inclure directement le fichier login (attention aux headers)
                // On va plutôt faire un test cURL
                echo "<p>🔄 Utilisez les boutons ci-dessus pour tester l'API en temps réel</p>";

            } catch (Exception $e) {
                echo "<p class='error'>Erreur : " . htmlspecialchars($e->getMessage()) . "</p>";
            }

            $apiOutput = ob_get_clean();

            if ($apiOutput) {
                echo "<h4>Sortie API :</h4>";
                echo "<pre>" . htmlspecialchars($apiOutput) . "</pre>";
            }

            echo "</div>";
            ?>

            <h2>4️⃣ Vérification de la Configuration</h2>
            <?php
            echo "<div class='info'>";
            echo "<h3>Variables d'environnement :</h3>";
            echo "<ul style='margin-left: 20px;'>";
            echo "<li><strong>API_BASE_URL:</strong> " . (defined('API_BASE_URL') ? htmlspecialchars(API_BASE_URL) : '❌ Non défini') . "</li>";
            echo "<li><strong>JWT_SECRET:</strong> " . (defined('JWT_SECRET') ? '****** (défini)' : '❌ Non défini') . "</li>";
            echo "<li><strong>JWT_EXPIRY:</strong> " . (defined('JWT_EXPIRY') ? JWT_EXPIRY : '❌ Non défini') . "</li>";
            echo "</ul>";
            echo "</div>";
            ?>

        </div>

        <div class="card">
            <h2>💡 Solutions Possibles</h2>
            <div class="info">
                <h3>Si l'erreur persiste :</h3>
                <ol style="margin-left: 20px; line-height: 2;">
                    <li>Vérifiez que le fichier <code>/api/auth/login.php</code> ne contient pas d'espaces ou de caractères avant <code>&lt;?php</code></li>
                    <li>Vérifiez que <code>/api/config/config.php</code> ne fait pas d'echo ou de print</li>
                    <li>Vérifiez que <code>/api/config/utils.php</code> n'affiche rien</li>
                    <li>Activez les logs d'erreur PHP dans votre panneau Hostinger</li>
                    <li>Testez l'URL directement : <code>POST /api/auth/login</code></li>
                </ol>
            </div>
        </div>
    </div>

    <script>
    async function testLogin(username, password) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '<p>⏳ Test en cours pour <strong>' + username + '</strong>...</p>';

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            // Récupérer le texte brut d'abord
            const rawText = await response.text();

            resultsDiv.innerHTML = '<div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin-top: 10px;">';
            resultsDiv.innerHTML += '<h3>Réponse pour ' + username + ':</h3>';
            resultsDiv.innerHTML += '<p><strong>Status:</strong> ' + response.status + ' ' + response.statusText + '</p>';
            resultsDiv.innerHTML += '<p><strong>Texte brut reçu:</strong></p>';
            resultsDiv.innerHTML += '<pre style="background: white; padding: 10px; border: 1px solid #ddd; overflow-x: auto;">' + rawText + '</pre>';

            // Essayer de parser en JSON
            try {
                const data = JSON.parse(rawText);
                resultsDiv.innerHTML += '<div style="background: #d4edda; padding: 10px; margin-top: 10px; border-radius: 4px;">';
                resultsDiv.innerHTML += '<p style="color: #155724;"><strong>✅ JSON valide !</strong></p>';
                resultsDiv.innerHTML += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                resultsDiv.innerHTML += '</div>';
            } catch (jsonError) {
                resultsDiv.innerHTML += '<div style="background: #f8d7da; padding: 10px; margin-top: 10px; border-radius: 4px;">';
                resultsDiv.innerHTML += '<p style="color: #721c24;"><strong>❌ Erreur de parsing JSON:</strong> ' + jsonError.message + '</p>';
                resultsDiv.innerHTML += '<p>La réponse n\'est pas du JSON valide. Il y a probablement un warning PHP ou du HTML avant le JSON.</p>';
                resultsDiv.innerHTML += '</div>';
            }

            resultsDiv.innerHTML += '</div>';

        } catch (error) {
            resultsDiv.innerHTML = '<div style="background: #f8d7da; padding: 15px; border-radius: 6px;">';
            resultsDiv.innerHTML += '<p style="color: #721c24;"><strong>❌ Erreur de requête:</strong> ' + error.message + '</p>';
            resultsDiv.innerHTML += '</div>';
        }
    }
    </script>
</body>
</html>
