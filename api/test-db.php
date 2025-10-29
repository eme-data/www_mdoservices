<?php
/**
 * Page de Diagnostic - Connexion Base de Données
 *
 * ⚠️ IMPORTANT : Supprimez ce fichier après utilisation !
 * Ne le laissez JAMAIS en production (informations sensibles)
 */

// Activer l'affichage des erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diagnostic Connexion BDD - MDO Services</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            padding: 40px;
        }
        h1 {
            color: #2d3748;
            margin-bottom: 10px;
            font-size: 28px;
        }
        .warning {
            background: #fff3cd;
            border: 2px solid #ffc107;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            color: #856404;
        }
        .test-section {
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .test-section h2 {
            color: #4a5568;
            margin-bottom: 15px;
            font-size: 20px;
        }
        .result {
            padding: 12px 16px;
            margin: 10px 0;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
        }
        .success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        .error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        .info {
            background: #d1ecf1;
            border: 1px solid #bee5eb;
            color: #0c5460;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
            margin-left: 10px;
        }
        .badge.success { background: #28a745; color: white; }
        .badge.error { background: #dc3545; color: white; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
        }
        th {
            background: #e9ecef;
            font-weight: 600;
            color: #495057;
        }
        .code {
            background: #2d3748;
            color: #48bb78;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }
        .timestamp {
            color: #6c757d;
            font-size: 14px;
            margin-top: 30px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Diagnostic de Connexion Base de Données</h1>
        <p style="color: #6c757d; margin-top: 5px;">MDO Services - Test de Configuration</p>

        <div class="warning">
            <strong>⚠️ ATTENTION SÉCURITÉ</strong><br>
            Cette page contient des informations sensibles.<br>
            <strong>Supprimez-la immédiatement après utilisation !</strong><br>
            Fichier à supprimer : <code>/public_html/api/test-db.php</code>
        </div>

        <?php
        // Test 1 : Vérifier si config.local.php existe
        echo '<div class="test-section">';
        echo '<h2>📄 Test 1 : Fichier de Configuration</h2>';

        $configPath = __DIR__ . '/config/config.local.php';
        if (file_exists($configPath)) {
            echo '<div class="result success">✅ config.local.php existe</div>';
            echo '<div class="result info">📁 Chemin : ' . $configPath . '</div>';

            // Charger la config
            require_once $configPath;

            // Afficher les constantes (masquer le password)
            echo '<div class="result info">';
            echo '<strong>Configuration chargée :</strong><br>';
            echo 'DB_HOST : ' . (defined('DB_HOST') ? DB_HOST : 'NON DÉFINI') . '<br>';
            echo 'DB_NAME : ' . (defined('DB_NAME') ? DB_NAME : 'NON DÉFINI') . '<br>';
            echo 'DB_USER : ' . (defined('DB_USER') ? DB_USER : 'NON DÉFINI') . '<br>';
            echo 'DB_PASS : ' . (defined('DB_PASS') ? str_repeat('*', strlen(DB_PASS)) : 'NON DÉFINI') . '<br>';
            echo '</div>';
        } else {
            echo '<div class="result error">❌ config.local.php INTROUVABLE</div>';
            echo '<div class="result error">Chemin recherché : ' . $configPath . '</div>';
            echo '</div></div></body></html>';
            exit;
        }
        echo '</div>';

        // Test 2 : Tester la connexion
        echo '<div class="test-section">';
        echo '<h2>🔌 Test 2 : Connexion à la Base de Données</h2>';

        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);

            echo '<div class="result success">✅ CONNEXION RÉUSSIE <span class="badge success">OK</span></div>';
            echo '<div class="result info">Serveur MySQL : ' . $pdo->getAttribute(PDO::ATTR_SERVER_VERSION) . '</div>';

        } catch (PDOException $e) {
            echo '<div class="result error">❌ ÉCHEC DE CONNEXION <span class="badge error">ERREUR</span></div>';
            echo '<div class="result error">Message d\'erreur : ' . htmlspecialchars($e->getMessage()) . '</div>';

            // Diagnostics supplémentaires
            echo '<div class="result info">';
            echo '<strong>Vérifications à faire :</strong><br>';
            echo '1. Le nom de la base (DB_NAME) est-il correct ?<br>';
            echo '2. L\'utilisateur (DB_USER) existe-t-il ?<br>';
            echo '3. Le mot de passe (DB_PASS) est-il correct ?<br>';
            echo '4. L\'utilisateur a-t-il les droits sur cette base ?<br>';
            echo '</div>';

            echo '</div></div></body></html>';
            exit;
        }
        echo '</div>';

        // Test 3 : Vérifier les tables
        echo '<div class="test-section">';
        echo '<h2>📊 Test 3 : Tables de la Base de Données</h2>';

        try {
            $stmt = $pdo->query("SHOW TABLES");
            $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

            if (count($tables) > 0) {
                echo '<div class="result success">✅ ' . count($tables) . ' table(s) trouvée(s)</div>';

                echo '<table>';
                echo '<thead><tr><th>Table</th><th>Nombre de lignes</th><th>Statut</th></tr></thead>';
                echo '<tbody>';

                $requiredTables = ['users', 'posts', 'pricing_items'];

                foreach ($tables as $table) {
                    $countStmt = $pdo->query("SELECT COUNT(*) as count FROM `$table`");
                    $count = $countStmt->fetch()['count'];

                    $isRequired = in_array($table, $requiredTables);
                    $status = $isRequired ? '<span class="badge success">REQUIS</span>' : '<span class="badge" style="background:#6c757d;color:white;">OPTIONNEL</span>';

                    echo "<tr>";
                    echo "<td><strong>$table</strong></td>";
                    echo "<td>$count ligne(s)</td>";
                    echo "<td>$status</td>";
                    echo "</tr>";
                }

                echo '</tbody></table>';

                // Vérifier les tables requises
                $missingTables = array_diff($requiredTables, $tables);
                if (count($missingTables) > 0) {
                    echo '<div class="result error">❌ Tables manquantes : ' . implode(', ', $missingTables) . '</div>';
                } else {
                    echo '<div class="result success">✅ Toutes les tables requises sont présentes</div>';
                }

            } else {
                echo '<div class="result error">❌ Aucune table trouvée dans la base de données</div>';
                echo '<div class="result info">Vous devez importer le fichier schema.sql via phpMyAdmin</div>';
            }

        } catch (PDOException $e) {
            echo '<div class="result error">❌ Erreur lors de la lecture des tables : ' . htmlspecialchars($e->getMessage()) . '</div>';
        }
        echo '</div>';

        // Test 4 : Vérifier le compte admin
        echo '<div class="test-section">';
        echo '<h2>👤 Test 4 : Compte Administrateur</h2>';

        try {
            // Vérifier si la table users existe
            if (in_array('users', $tables)) {
                $stmt = $pdo->query("SELECT id, username, email, is_admin, is_active, created_at FROM users WHERE username = 'admin'");
                $admin = $stmt->fetch();

                if ($admin) {
                    echo '<div class="result success">✅ Compte admin trouvé <span class="badge success">OK</span></div>';

                    echo '<table>';
                    echo '<tr><th>Propriété</th><th>Valeur</th></tr>';
                    echo '<tr><td><strong>ID</strong></td><td>' . $admin['id'] . '</td></tr>';
                    echo '<tr><td><strong>Username</strong></td><td>' . htmlspecialchars($admin['username']) . '</td></tr>';
                    echo '<tr><td><strong>Email</strong></td><td>' . htmlspecialchars($admin['email']) . '</td></tr>';
                    echo '<tr><td><strong>Admin</strong></td><td>' . ($admin['is_admin'] ? '✅ OUI' : '❌ NON') . '</td></tr>';
                    echo '<tr><td><strong>Actif</strong></td><td>' . ($admin['is_active'] ? '✅ OUI' : '❌ NON') . '</td></tr>';
                    echo '<tr><td><strong>Créé le</strong></td><td>' . $admin['created_at'] . '</td></tr>';
                    echo '</table>';

                    echo '<div class="result info">';
                    echo '<strong>Identifiants de connexion :</strong><br>';
                    echo 'Username : <code>admin</code><br>';
                    echo 'Password : <code>ChangeMe123!</code><br>';
                    echo '<strong>⚠️ Changez ce mot de passe après la première connexion !</strong>';
                    echo '</div>';

                } else {
                    echo '<div class="result error">❌ Compte admin introuvable</div>';
                    echo '<div class="result info">Réimportez le fichier schema.sql pour créer le compte admin</div>';
                }
            } else {
                echo '<div class="result error">❌ Table "users" introuvable</div>';
            }

        } catch (PDOException $e) {
            echo '<div class="result error">❌ Erreur : ' . htmlspecialchars($e->getMessage()) . '</div>';
        }
        echo '</div>';

        // Test 5 : Tester l'API
        echo '<div class="test-section">';
        echo '<h2>🔗 Test 5 : API REST</h2>';

        echo '<div class="result info">';
        echo '<strong>URLs à tester :</strong><br><br>';

        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'];
        $baseUrl = $protocol . '://' . $host;

        $apiUrls = [
            'Liste des articles (public)' => $baseUrl . '/api/posts/list.php',
            'Article par slug (public)' => $baseUrl . '/api/posts/get.php?slug=bienvenue-sur-notre-blog',
            'Connexion (admin)' => $baseUrl . '/api/auth/login.php',
        ];

        foreach ($apiUrls as $name => $url) {
            echo '📍 <strong>' . $name . '</strong><br>';
            echo '<a href="' . $url . '" target="_blank" style="color:#667eea;word-break:break-all;">' . $url . '</a><br><br>';
        }
        echo '</div>';

        // Test direct de l'API posts/list
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM posts WHERE published_at IS NOT NULL");
            $publishedCount = $stmt->fetch()['count'];

            echo '<div class="result ' . ($publishedCount > 0 ? 'success' : 'info') . '">';
            echo '📝 Articles publiés : ' . $publishedCount;
            echo '</div>';

        } catch (PDOException $e) {
            echo '<div class="result error">❌ Erreur lecture posts : ' . htmlspecialchars($e->getMessage()) . '</div>';
        }

        echo '</div>';

        // Test 6 : Configuration PHP
        echo '<div class="test-section">';
        echo '<h2>⚙️ Test 6 : Configuration PHP</h2>';

        echo '<table>';
        echo '<tr><th>Paramètre</th><th>Valeur</th></tr>';
        echo '<tr><td><strong>Version PHP</strong></td><td>' . PHP_VERSION . '</td></tr>';
        echo '<tr><td><strong>Extension PDO</strong></td><td>' . (extension_loaded('pdo') ? '✅ Installée' : '❌ Manquante') . '</td></tr>';
        echo '<tr><td><strong>Extension PDO MySQL</strong></td><td>' . (extension_loaded('pdo_mysql') ? '✅ Installée' : '❌ Manquante') . '</td></tr>';
        echo '<tr><td><strong>Extension JSON</strong></td><td>' . (extension_loaded('json') ? '✅ Installée' : '❌ Manquante') . '</td></tr>';
        echo '<tr><td><strong>Max execution time</strong></td><td>' . ini_get('max_execution_time') . 's</td></tr>';
        echo '<tr><td><strong>Memory limit</strong></td><td>' . ini_get('memory_limit') . '</td></tr>';
        echo '</table>';

        echo '</div>';

        // Résumé final
        echo '<div class="test-section" style="border-left-color: #28a745;">';
        echo '<h2>✅ Résumé du Diagnostic</h2>';

        $allGood = true;
        $issues = [];

        // Vérifications
        if (!file_exists($configPath)) {
            $allGood = false;
            $issues[] = 'config.local.php manquant';
        }
        if (!isset($pdo)) {
            $allGood = false;
            $issues[] = 'Connexion BDD échouée';
        }
        if (!isset($tables) || count($tables) === 0) {
            $allGood = false;
            $issues[] = 'Aucune table dans la base';
        }
        if (isset($missingTables) && count($missingTables) > 0) {
            $allGood = false;
            $issues[] = 'Tables manquantes : ' . implode(', ', $missingTables);
        }

        if ($allGood) {
            echo '<div class="result success" style="font-size: 18px; padding: 20px;">';
            echo '🎉 <strong>TOUT FONCTIONNE PARFAITEMENT !</strong><br><br>';
            echo 'Vous pouvez maintenant :<br>';
            echo '1. Vous connecter sur <a href="/partner" style="color:#667eea;">/partner</a><br>';
            echo '2. Utiliser : admin / ChangeMe123!<br>';
            echo '3. Gérer le blog via l\'interface admin<br><br>';
            echo '<strong style="color:#dc3545;">⚠️ N\'OUBLIEZ PAS DE SUPPRIMER CE FICHIER !</strong>';
            echo '</div>';
        } else {
            echo '<div class="result error" style="font-size: 18px; padding: 20px;">';
            echo '❌ <strong>Problèmes détectés :</strong><br><br>';
            foreach ($issues as $issue) {
                echo '• ' . $issue . '<br>';
            }
            echo '</div>';
        }

        echo '</div>';
        ?>

        <div class="timestamp">
            📅 Test effectué le <?php echo date('d/m/Y à H:i:s'); ?><br>
            <strong style="color:#dc3545;">⚠️ SUPPRIMEZ CE FICHIER APRÈS UTILISATION !</strong>
        </div>
    </div>
</body>
</html>
