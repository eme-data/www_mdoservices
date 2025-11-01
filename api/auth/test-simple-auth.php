<?php
/**
 * Test du Système d'Authentification Simplifié
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Test Authentification Simplifiée - MDO Services</title>
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
        h3 { color: #555; font-size: 18px; margin: 15px 0 10px; }
        .success { background: #d4edda; border-left: 4px solid #28a745; color: #155724; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .error { background: #f8d7da; border-left: 4px solid #dc3545; color: #721c24; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .info { background: #d1ecf1; border-left: 4px solid #17a2b8; color: #0c5460; padding: 15px; border-radius: 6px; margin: 15px 0; }
        pre { background: #f8f9fa; padding: 15px; border-radius: 6px; overflow-x: auto; font-size: 12px; border: 1px solid #dee2e6; white-space: pre-wrap; word-wrap: break-word; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; }
        button { background: #667eea; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 5px; }
        button:hover { background: #5568d3; }
        button.danger { background: #dc3545; }
        button.danger:hover { background: #c82333; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; font-size: 14px; }
        th { background: #f8f9fa; font-weight: 600; }
        .test-section { margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🧪 Test Authentification Simplifiée</h1>
            <p style="color: #666; margin-bottom: 20px;">Nouveau système d'authentification par sessions PHP</p>

            <h2>1️⃣ Vérification de la Base de Données</h2>
            <?php
            require_once __DIR__ . '/../config/config.php';

            try {
                $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
                $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);

                echo "<div class='success'><p>✅ Connexion BDD réussie</p></div>";

                // Lister tous les utilisateurs
                $stmt = $pdo->query("SELECT id, username, email, role, is_admin, is_active FROM users ORDER BY id ASC");
                $users = $stmt->fetchAll();

                echo "<h3>👥 Utilisateurs Disponibles</h3>";
                echo "<table>";
                echo "<tr><th>ID</th><th>Username</th><th>Email</th><th>Rôle</th><th>Admin</th><th>Actif</th></tr>";
                foreach ($users as $u) {
                    echo "<tr>";
                    echo "<td>" . $u['id'] . "</td>";
                    echo "<td><code>" . htmlspecialchars($u['username']) . "</code></td>";
                    echo "<td>" . htmlspecialchars($u['email']) . "</td>";
                    echo "<td>" . htmlspecialchars($u['role']) . "</td>";
                    echo "<td>" . ($u['is_admin'] ? '✅' : '❌') . "</td>";
                    echo "<td>" . ($u['is_active'] ? '✅' : '❌') . "</td>";
                    echo "</tr>";
                }
                echo "</table>";

            } catch (PDOException $e) {
                echo "<div class='error'>";
                echo "<h3>❌ Erreur BDD</h3>";
                echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
                echo "</div>";
            }
            ?>

            <h2>2️⃣ Test des Endpoints API</h2>

            <div class="test-section">
                <h3>Test Login (POST /api/auth/simple-login.php)</h3>
                <div style="margin: 15px 0;">
                    <button onclick="testLogin('admin_partner', 'MDOPartner2024!')">Test admin_partner</button>
                    <button onclick="testLogin('admin_client', 'MDOClient2024!')">Test admin_client</button>
                    <button onclick="testLogin('demo_partner', 'DemoPartner2024')">Test demo_partner</button>
                    <button onclick="testLogin('demo_client', 'DemoClient2024')">Test demo_client</button>
                </div>
                <div id="login-result" style="margin-top: 15px;"></div>
            </div>

            <div class="test-section">
                <h3>Test Verify (GET /api/auth/simple-verify.php)</h3>
                <div style="margin: 15px 0;">
                    <button onclick="testVerify()">Vérifier Session</button>
                </div>
                <div id="verify-result" style="margin-top: 15px;"></div>
            </div>

            <div class="test-section">
                <h3>Test Logout (POST /api/auth/simple-logout.php)</h3>
                <div style="margin: 15px 0;">
                    <button class="danger" onclick="testLogout()">Se Déconnecter</button>
                </div>
                <div id="logout-result" style="margin-top: 15px;"></div>
            </div>

            <h2>3️⃣ Test Complet du Flux</h2>
            <div class="test-section">
                <button onclick="testFullFlow()">Tester le Flux Complet (Login → Verify → Logout)</button>
                <div id="flow-result" style="margin-top: 15px;"></div>
            </div>

        </div>

        <div class="card">
            <h2>📚 Documentation API</h2>

            <h3>Login</h3>
            <pre>POST /api/auth/simple-login.php
Content-Type: application/json

{
  "username": "admin_partner",
  "password": "MDOPartner2024!"
}

Réponse (200):
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin_partner",
    "email": "admin.partner@mdoservices.fr",
    "role": "partner",
    "is_admin": true
  },
  "message": "Login successful"
}</pre>

            <h3>Verify</h3>
            <pre>GET /api/auth/simple-verify.php

Réponse (200):
{
  "success": true,
  "authenticated": true,
  "user": {
    "id": 1,
    "username": "admin_partner",
    "role": "partner",
    "is_admin": true
  }
}</pre>

            <h3>Logout</h3>
            <pre>POST /api/auth/simple-logout.php

Réponse (200):
{
  "success": true,
  "message": "Logged out successfully"
}</pre>

        </div>
    </div>

    <script>
    async function testLogin(username, password) {
        const resultDiv = document.getElementById('login-result');
        resultDiv.innerHTML = '<p>⏳ Test de connexion pour <strong>' + username + '</strong>...</p>';

        try {
            const response = await fetch('/api/auth/simple-login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });

            const rawText = await response.text();

            resultDiv.innerHTML = '<div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">';
            resultDiv.innerHTML += '<p><strong>Status:</strong> ' + response.status + ' ' + response.statusText + '</p>';
            resultDiv.innerHTML += '<p><strong>Réponse Brute:</strong></p>';
            resultDiv.innerHTML += '<pre>' + rawText + '</pre>';

            try {
                const data = JSON.parse(rawText);
                if (data.success) {
                    resultDiv.innerHTML += '<div style="background: #d4edda; padding: 10px; margin-top: 10px; border-radius: 4px; color: #155724;">';
                    resultDiv.innerHTML += '<p><strong>✅ Login Réussi !</strong></p>';
                    resultDiv.innerHTML += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                    resultDiv.innerHTML += '</div>';
                } else {
                    resultDiv.innerHTML += '<div style="background: #f8d7da; padding: 10px; margin-top: 10px; border-radius: 4px; color: #721c24;">';
                    resultDiv.innerHTML += '<p><strong>❌ Login Échoué</strong></p>';
                    resultDiv.innerHTML += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                    resultDiv.innerHTML += '</div>';
                }
            } catch (e) {
                resultDiv.innerHTML += '<div style="background: #f8d7da; padding: 10px; margin-top: 10px; border-radius: 4px; color: #721c24;">';
                resultDiv.innerHTML += '<p><strong>❌ Erreur JSON:</strong> ' + e.message + '</p>';
                resultDiv.innerHTML += '</div>';
            }

            resultDiv.innerHTML += '</div>';

        } catch (error) {
            resultDiv.innerHTML = '<div style="background: #f8d7da; padding: 15px; border-radius: 6px; color: #721c24;">';
            resultDiv.innerHTML += '<p><strong>❌ Erreur:</strong> ' + error.message + '</p>';
            resultDiv.innerHTML += '</div>';
        }
    }

    async function testVerify() {
        const resultDiv = document.getElementById('verify-result');
        resultDiv.innerHTML = '<p>⏳ Vérification de la session...</p>';

        try {
            const response = await fetch('/api/auth/simple-verify.php', {
                credentials: 'include'
            });

            const data = await response.json();

            resultDiv.innerHTML = '<div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">';
            resultDiv.innerHTML += '<p><strong>Status:</strong> ' + response.status + '</p>';

            if (data.authenticated) {
                resultDiv.innerHTML += '<div style="background: #d4edda; padding: 10px; margin-top: 10px; border-radius: 4px; color: #155724;">';
                resultDiv.innerHTML += '<p><strong>✅ Session Active</strong></p>';
                resultDiv.innerHTML += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                resultDiv.innerHTML += '</div>';
            } else {
                resultDiv.innerHTML += '<div style="background: #fff3cd; padding: 10px; margin-top: 10px; border-radius: 4px; color: #856404;">';
                resultDiv.innerHTML += '<p><strong>⚠️ Pas de session active</strong></p>';
                resultDiv.innerHTML += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                resultDiv.innerHTML += '</div>';
            }

            resultDiv.innerHTML += '</div>';

        } catch (error) {
            resultDiv.innerHTML = '<div style="background: #f8d7da; padding: 15px; border-radius: 6px; color: #721c24;">';
            resultDiv.innerHTML += '<p><strong>❌ Erreur:</strong> ' + error.message + '</p>';
            resultDiv.innerHTML += '</div>';
        }
    }

    async function testLogout() {
        const resultDiv = document.getElementById('logout-result');
        resultDiv.innerHTML = '<p>⏳ Déconnexion...</p>';

        try {
            const response = await fetch('/api/auth/simple-logout.php', {
                method: 'POST',
                credentials: 'include'
            });

            const data = await response.json();

            resultDiv.innerHTML = '<div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">';
            if (data.success) {
                resultDiv.innerHTML += '<div style="background: #d4edda; padding: 10px; border-radius: 4px; color: #155724;">';
                resultDiv.innerHTML += '<p><strong>✅ Déconnexion réussie</strong></p>';
                resultDiv.innerHTML += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                resultDiv.innerHTML += '</div>';
            }
            resultDiv.innerHTML += '</div>';

        } catch (error) {
            resultDiv.innerHTML = '<div style="background: #f8d7da; padding: 15px; border-radius: 6px; color: #721c24;">';
            resultDiv.innerHTML += '<p><strong>❌ Erreur:</strong> ' + error.message + '</p>';
            resultDiv.innerHTML += '</div>';
        }
    }

    async function testFullFlow() {
        const resultDiv = document.getElementById('flow-result');
        resultDiv.innerHTML = '<p>⏳ Test du flux complet...</p>';
        let log = '';

        try {
            // 1. Login
            log += '1️⃣ Login...\n';
            const loginRes = await fetch('/api/auth/simple-login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username: 'demo_client', password: 'DemoClient2024' })
            });
            const loginData = await loginRes.json();
            log += loginData.success ? '✅ Login OK\n' : '❌ Login Failed\n';

            // 2. Verify
            log += '\n2️⃣ Verify...\n';
            const verifyRes = await fetch('/api/auth/simple-verify.php', { credentials: 'include' });
            const verifyData = await verifyRes.json();
            log += verifyData.authenticated ? '✅ Session OK\n' : '❌ No Session\n';

            // 3. Logout
            log += '\n3️⃣ Logout...\n';
            const logoutRes = await fetch('/api/auth/simple-logout.php', { method: 'POST', credentials: 'include' });
            const logoutData = await logoutRes.json();
            log += logoutData.success ? '✅ Logout OK\n' : '❌ Logout Failed\n';

            // 4. Verify again
            log += '\n4️⃣ Verify (après logout)...\n';
            const verify2Res = await fetch('/api/auth/simple-verify.php', { credentials: 'include' });
            const verify2Data = await verify2Res.json();
            log += !verify2Data.authenticated ? '✅ Session détruite OK\n' : '❌ Session encore active\n';

            resultDiv.innerHTML = '<div style="background: #d4edda; padding: 15px; border-radius: 6px; color: #155724;">';
            resultDiv.innerHTML += '<p><strong>✅ Flux Complet Testé</strong></p>';
            resultDiv.innerHTML += '<pre>' + log + '</pre>';
            resultDiv.innerHTML += '</div>';

        } catch (error) {
            resultDiv.innerHTML = '<div style="background: #f8d7da; padding: 15px; border-radius: 6px; color: #721c24;">';
            resultDiv.innerHTML += '<p><strong>❌ Erreur:</strong> ' + error.message + '</p>';
            resultDiv.innerHTML += '<pre>' + log + '</pre>';
            resultDiv.innerHTML += '</div>';
        }
    }
    </script>
</body>
</html>
