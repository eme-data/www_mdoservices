<?php
/**
 * Reset Admin Password Tool
 * À uploader dans /public_html/api/auth/
 * ⚠️ À SUPPRIMER IMMÉDIATEMENT après utilisation !
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Reset Admin Password</title>";
echo "<style>
body{font-family:sans-serif;max-width:800px;margin:40px auto;padding:20px;background:#f5f5f5;}
.card{background:white;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);margin-bottom:20px;}
.success{color:green;font-weight:bold;}
.error{color:red;font-weight:bold;}
.info{color:blue;}
.warning{color:orange;font-weight:bold;}
pre{background:#f4f4f4;padding:10px;border-radius:5px;overflow-x:auto;}
button{background:#0066cc;color:white;padding:10px 20px;border:none;border-radius:4px;cursor:pointer;font-size:16px;}
button:hover{background:#0052a3;}
input[type=text],input[type=password]{width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:4px;box-sizing:border-box;}
label{font-weight:bold;display:block;margin-top:10px;}
</style>";
echo "</head><body>";

echo "<div class='card'>";
echo "<h1>🔐 Réinitialisation du Mot de Passe Admin</h1>";
echo "<p class='warning'>⚠️ ATTENTION : Cet outil est TRÈS sensible. Supprimez-le après utilisation !</p>";
echo "</div>";

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';

$db = new Database();

// Get current admin user
$admin = $db->queryOne("SELECT * FROM users WHERE username = 'admin'");

if (!$admin) {
    echo "<div class='card'><p class='error'>❌ Utilisateur admin non trouvé !</p></div>";
    echo "</body></html>";
    exit;
}

echo "<div class='card'>";
echo "<h2>📊 Informations Actuelles</h2>";
echo "<p><strong>Username:</strong> " . htmlspecialchars($admin['username']) . "</p>";
echo "<p><strong>Email:</strong> " . htmlspecialchars($admin['email']) . "</p>";
echo "<p><strong>Hash actuel:</strong> <code style='font-size:11px;word-break:break-all;'>" . htmlspecialchars($admin['password_hash']) . "</code></p>";
echo "</div>";

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {

    echo "<div class='card'>";

    if ($_POST['action'] === 'reset_default') {
        // Reset to default password
        $defaultHash = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

        try {
            $sql = "UPDATE users SET password_hash = :hash WHERE username = 'admin'";
            $db->execute($sql, ['hash' => $defaultHash]);

            echo "<h2 class='success'>✅ Mot de passe réinitialisé avec succès !</h2>";
            echo "<p><strong>Nouveau mot de passe :</strong> <code>ChangeMe123!</code></p>";
            echo "<p class='info'>Vous pouvez maintenant vous connecter sur /partner avec :</p>";
            echo "<ul>";
            echo "<li><strong>Username:</strong> admin</li>";
            echo "<li><strong>Password:</strong> ChangeMe123!</li>";
            echo "</ul>";

            // Verify the hash was saved correctly
            $updated = $db->queryOne("SELECT password_hash FROM users WHERE username = 'admin'");
            if ($updated['password_hash'] === $defaultHash) {
                echo "<p class='success'>✅ Vérification : Le hash a été correctement enregistré</p>";
            } else {
                echo "<p class='error'>❌ ATTENTION : Le hash n'a pas été enregistré correctement</p>";
            }

        } catch (Exception $e) {
            echo "<p class='error'>❌ Erreur : " . htmlspecialchars($e->getMessage()) . "</p>";
        }

    } elseif ($_POST['action'] === 'set_custom' && !empty($_POST['new_password'])) {
        // Set custom password
        $newPassword = $_POST['new_password'];

        if (strlen($newPassword) < 8) {
            echo "<p class='error'>❌ Le mot de passe doit contenir au moins 8 caractères</p>";
        } else {
            try {
                $newHash = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => 10]);

                $sql = "UPDATE users SET password_hash = :hash WHERE username = 'admin'";
                $db->execute($sql, ['hash' => $newHash]);

                echo "<h2 class='success'>✅ Nouveau mot de passe défini avec succès !</h2>";
                echo "<p><strong>Votre nouveau mot de passe :</strong> <code>" . htmlspecialchars($newPassword) . "</code></p>";
                echo "<p class='warning'>⚠️ Notez-le bien quelque part !</p>";
                echo "<p class='info'>Vous pouvez maintenant vous connecter sur /partner avec :</p>";
                echo "<ul>";
                echo "<li><strong>Username:</strong> admin</li>";
                echo "<li><strong>Password:</strong> " . htmlspecialchars($newPassword) . "</li>";
                echo "</ul>";

                // Verify
                if (password_verify($newPassword, $newHash)) {
                    echo "<p class='success'>✅ Vérification : Le mot de passe fonctionne</p>";
                }

            } catch (Exception $e) {
                echo "<p class='error'>❌ Erreur : " . htmlspecialchars($e->getMessage()) . "</p>";
            }
        }

    } elseif ($_POST['action'] === 'test_password' && !empty($_POST['test_password'])) {
        // Test a password
        $testPassword = $_POST['test_password'];

        if (password_verify($testPassword, $admin['password_hash'])) {
            echo "<p class='success'>✅ Ce mot de passe fonctionne !</p>";
            echo "<p>Vous pouvez vous connecter avec : <code>" . htmlspecialchars($testPassword) . "</code></p>";
        } else {
            echo "<p class='error'>❌ Ce mot de passe ne correspond pas au hash actuel</p>";
        }
    }

    echo "</div>";
}

// Display forms
?>

<div class="card">
    <h2>🧪 Option 1 : Tester un Mot de Passe</h2>
    <p>Testez si un mot de passe correspond au hash actuel</p>
    <form method="POST">
        <input type="hidden" name="action" value="test_password">
        <label>Entrez un mot de passe à tester :</label>
        <input type="text" name="test_password" placeholder="Ex: ChangeMe123!" required>
        <button type="submit">🧪 Tester</button>
    </form>
</div>

<div class="card">
    <h2>🔄 Option 2 : Réinitialiser au Mot de Passe par Défaut</h2>
    <p>Réinitialise le mot de passe à : <code>ChangeMe123!</code></p>
    <form method="POST" onsubmit="return confirm('Êtes-vous sûr de vouloir réinitialiser le mot de passe ?');">
        <input type="hidden" name="action" value="reset_default">
        <button type="submit">🔄 Réinitialiser</button>
    </form>
</div>

<div class="card">
    <h2>🆕 Option 3 : Définir un Nouveau Mot de Passe</h2>
    <p>Créez un nouveau mot de passe personnalisé (minimum 8 caractères)</p>
    <form method="POST" onsubmit="return confirm('Définir ce nouveau mot de passe ?');">
        <input type="hidden" name="action" value="set_custom">
        <label>Nouveau mot de passe :</label>
        <input type="password" name="new_password" placeholder="Minimum 8 caractères" required minlength="8">
        <button type="submit">🆕 Définir</button>
    </form>
</div>

<div class="card" style="background:#fff3cd;border:2px solid #ffc107;">
    <h2 style="color:#856404;">⚠️ IMPORTANT - SÉCURITÉ</h2>
    <p style="color:#856404;"><strong>SUPPRIMEZ CE FICHIER IMMÉDIATEMENT après avoir réinitialisé le mot de passe !</strong></p>
    <p style="color:#856404;">Ce fichier permet à quiconque de changer le mot de passe admin.</p>
    <p style="color:#856404;">Fichier à supprimer : <code>/public_html/api/auth/reset-admin-password.php</code></p>
</div>

</body>
</html>
