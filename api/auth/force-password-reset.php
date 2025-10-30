<?php
/**
 * Force Password Reset with Detailed Logging
 * Identifies why password updates are failing
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Force Password Reset</title>";
echo "<style>
body{font-family:sans-serif;max-width:900px;margin:20px auto;padding:20px;background:#f5f5f5;}
.card{background:white;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);margin-bottom:20px;}
.success{color:green;font-weight:bold;}
.error{color:red;font-weight:bold;}
.info{color:blue;}
.warning{color:orange;font-weight:bold;}
pre{background:#f4f4f4;padding:10px;border-radius:5px;overflow-x:auto;font-size:12px;}
button{background:#dc3545;color:white;padding:12px 24px;border:none;border-radius:4px;cursor:pointer;font-size:16px;font-weight:bold;}
button:hover{background:#c82333;}
.step{border-left:3px solid #0066cc;padding-left:15px;margin:10px 0;}
</style></head><body>";

echo "<h1>🔧 Force Password Reset with Debug</h1>";

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';

$db = new Database();

// Get current state
$before = $db->queryOne("SELECT id, username, password_hash FROM users WHERE username = 'admin'");

echo "<div class='card'>";
echo "<h2>📊 État Actuel</h2>";
echo "<table style='width:100%;border-collapse:collapse;'>";
echo "<tr style='border:1px solid #ddd;'><th style='padding:8px;background:#f8f9fa;'>Propriété</th><th style='padding:8px;background:#f8f9fa;'>Valeur</th></tr>";
echo "<tr style='border:1px solid #ddd;'><td style='padding:8px;'>ID</td><td style='padding:8px;'>" . $before['id'] . "</td></tr>";
echo "<tr style='border:1px solid #ddd;'><td style='padding:8px;'>Username</td><td style='padding:8px;'>" . htmlspecialchars($before['username']) . "</td></tr>";
echo "<tr style='border:1px solid #ddd;'><td style='padding:8px;'>Hash actuel</td><td style='padding:8px;font-size:10px;word-break:break-all;'>" . htmlspecialchars($before['password_hash']) . "</td></tr>";
echo "</table>";

// Test if current hash works
$testPass = 'ChangeMe123!';
$works = password_verify($testPass, $before['password_hash']);
echo "<p><strong>Test mot de passe '$testPass' :</strong> ";
if ($works) {
    echo "<span class='success'>✅ Fonctionne déjà !</span></p>";
} else {
    echo "<span class='error'>❌ Ne fonctionne pas</span></p>";
}
echo "</div>";

// Handle reset
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['force_reset'])) {

    echo "<div class='card'>";
    echo "<h2>🔄 Processus de Réinitialisation Forcée</h2>";

    $defaultHash = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

    echo "<div class='step'>";
    echo "<h3>Étape 1 : Préparation</h3>";
    echo "<p class='info'>Hash par défaut à utiliser :</p>";
    echo "<pre>" . htmlspecialchars($defaultHash) . "</pre>";
    echo "<p class='info'>Longueur : " . strlen($defaultHash) . " caractères</p>";
    echo "</div>";

    echo "<div class='step'>";
    echo "<h3>Étape 2 : Tentative de mise à jour</h3>";

    try {
        // Method 1: Using Database class execute
        $sql = "UPDATE users SET password_hash = :hash WHERE username = 'admin'";
        echo "<p class='info'>SQL : <code>" . htmlspecialchars($sql) . "</code></p>";

        $result = $db->execute($sql, ['hash' => $defaultHash]);

        echo "<p class='success'>✅ Requête exécutée (method 1: Database::execute)</p>";
        echo "<p class='info'>Résultat retourné : " . var_export($result, true) . "</p>";

    } catch (Exception $e) {
        echo "<p class='error'>❌ Erreur method 1: " . htmlspecialchars($e->getMessage()) . "</p>";

        // Try method 2: Direct PDO
        echo "<p class='warning'>Tentative method 2 : PDO direct...</p>";
        try {
            $conn = $db->getConnection();
            $stmt = $conn->prepare("UPDATE users SET password_hash = ? WHERE username = 'admin'");
            $stmt->execute([$defaultHash]);
            echo "<p class='success'>✅ Method 2 réussie</p>";
        } catch (Exception $e2) {
            echo "<p class='error'>❌ Method 2 échouée : " . htmlspecialchars($e2->getMessage()) . "</p>";
        }
    }
    echo "</div>";

    echo "<div class='step'>";
    echo "<h3>Étape 3 : Vérification</h3>";

    // Read back from database
    $after = $db->queryOne("SELECT id, username, password_hash FROM users WHERE username = 'admin'");

    echo "<p class='info'>Hash après UPDATE :</p>";
    echo "<pre>" . htmlspecialchars($after['password_hash']) . "</pre>";

    // Compare
    if ($after['password_hash'] === $defaultHash) {
        echo "<p class='success'>✅ SUCCESS ! Le hash a été mis à jour correctement</p>";
    } else {
        echo "<p class='error'>❌ ÉCHEC ! Le hash n'a PAS été mis à jour</p>";
        echo "<p class='error'>Hash attendu : " . htmlspecialchars($defaultHash) . "</p>";
        echo "<p class='error'>Hash obtenu : " . htmlspecialchars($after['password_hash']) . "</p>";

        // Check if they're the same but different encoding
        if (strlen($after['password_hash']) === strlen($defaultHash)) {
            echo "<p class='warning'>⚠️ Les hashs ont la même longueur mais sont différents</p>";
            echo "<p class='info'>Comparaison byte par byte :</p>";
            for ($i = 0; $i < min(strlen($defaultHash), strlen($after['password_hash'])); $i++) {
                if ($defaultHash[$i] !== $after['password_hash'][$i]) {
                    echo "<p class='error'>Différence à la position $i : '" . $defaultHash[$i] . "' vs '" . $after['password_hash'][$i] . "'</p>";
                    if ($i < 10) break; // Only show first 10 differences
                }
            }
        }
    }

    // Test password with new hash
    if (password_verify($testPass, $after['password_hash'])) {
        echo "<p class='success'>🎉 VICTOIRE ! Le mot de passe '$testPass' fonctionne maintenant !</p>";
        echo "<p class='success'>Vous pouvez vous connecter sur /partner avec :</p>";
        echo "<ul>";
        echo "<li><strong>Username:</strong> admin</li>";
        echo "<li><strong>Password:</strong> ChangeMe123!</li>";
        echo "</ul>";
    } else {
        echo "<p class='error'>❌ Le mot de passe ne fonctionne toujours pas</p>";
    }
    echo "</div>";

    // Check database permissions
    echo "<div class='step'>";
    echo "<h3>Étape 4 : Vérification des Permissions</h3>";
    try {
        // Try to get user permissions
        $grants = $db->query("SHOW GRANTS FOR CURRENT_USER()");
        echo "<p class='info'>Permissions de l'utilisateur actuel :</p>";
        echo "<pre>" . htmlspecialchars(print_r($grants, true)) . "</pre>";
    } catch (Exception $e) {
        echo "<p class='warning'>Impossible de lire les permissions : " . htmlspecialchars($e->getMessage()) . "</p>";
    }

    // Try a simple test UPDATE
    try {
        $testSql = "UPDATE users SET last_login = NOW() WHERE username = 'admin'";
        $db->execute($testSql);
        echo "<p class='success'>✅ Test UPDATE simple réussi (last_login)</p>";
    } catch (Exception $e) {
        echo "<p class='error'>❌ Test UPDATE simple échoué : " . htmlspecialchars($e->getMessage()) . "</p>";
    }
    echo "</div>";

    echo "</div>";
}

// Display form
if (!isset($_POST['force_reset'])) {
    echo "<div class='card' style='background:#fff3cd;border-left:4px solid #ffc107;'>";
    echo "<h2>⚠️ Réinitialisation Forcée</h2>";
    echo "<p>Cet outil va :</p>";
    echo "<ol>";
    echo "<li>Afficher le hash actuel</li>";
    echo "<li>Tenter de le remplacer par le hash par défaut</li>";
    echo "<li>Vérifier que la mise à jour a réussi</li>";
    echo "<li>Tester le mot de passe</li>";
    echo "<li>Diagnostiquer les problèmes de permissions si échec</li>";
    echo "</ol>";
    echo "<form method='POST'>";
    echo "<input type='hidden' name='force_reset' value='1'>";
    echo "<button type='submit'>🔧 LANCER LA RÉINITIALISATION FORCÉE</button>";
    echo "</form>";
    echo "</div>";
}

echo "<div class='card' style='background:#f8d7da;border-left:4px solid #dc3545;'>";
echo "<h2>⚠️ SÉCURITÉ</h2>";
echo "<p><strong>SUPPRIMEZ CE FICHIER après utilisation !</strong></p>";
echo "<p>Fichier : <code>/public_html/api/auth/force-password-reset.php</code></p>";
echo "</div>";

echo "</body></html>";
