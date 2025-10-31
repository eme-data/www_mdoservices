<?php
/**
 * Generate Password Hash Tool
 * Generates a bcrypt hash for any password
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Generate Password Hash</title>";
echo "<style>
body{font-family:sans-serif;max-width:800px;margin:20px auto;padding:20px;background:#f5f5f5;}
.card{background:white;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);margin-bottom:20px;}
.success{color:green;font-weight:bold;}
.error{color:red;font-weight:bold;}
.info{color:blue;}
input[type=text]{width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:4px;box-sizing:border-box;}
button{background:#0066cc;color:white;padding:12px 24px;border:none;border-radius:4px;cursor:pointer;font-size:16px;}
button:hover{background:#0052a3;}
pre{background:#f4f4f4;padding:15px;border-radius:5px;overflow-x:auto;font-size:12px;word-break:break-all;}
.copy-btn{background:#28a745;padding:8px 16px;font-size:14px;margin-top:10px;}
</style>";
echo "<script>
function copyHash() {
  const hashText = document.getElementById('generated-hash').textContent;
  navigator.clipboard.writeText(hashText).then(() => {
    alert('Hash copié dans le presse-papier !');
  });
}
</script>";
echo "</head><body>";

echo "<h1>🔐 Générateur de Hash de Mot de Passe</h1>";

// Test common passwords
echo "<div class='card'>";
echo "<h2>🧪 Test des Mots de Passe Communs</h2>";
echo "<p>Testons si le hash actuel correspond à des mots de passe courants :</p>";

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';

$db = new Database();
$currentUser = $db->queryOne("SELECT password_hash FROM users WHERE username = 'admin'");
$currentHash = $currentUser['password_hash'];

echo "<p class='info'><strong>Hash actuel :</strong><br><code style='font-size:10px;'>" . htmlspecialchars($currentHash) . "</code></p>";

$commonPasswords = [
    'password',
    'Password',
    'PASSWORD',
    'ChangeMe123!',
    'changeme123!',
    'admin',
    'Admin123',
    'Admin123!',
    '123456',
    'admin123',
];

$found = false;
foreach ($commonPasswords as $testPass) {
    if (password_verify($testPass, $currentHash)) {
        echo "<p class='success'>✅ TROUVÉ ! Le mot de passe actuel est : <strong>$testPass</strong></p>";
        echo "<p class='success'>Vous pouvez vous connecter avec ce mot de passe !</p>";
        $found = true;
        break;
    }
}

if (!$found) {
    echo "<p class='error'>❌ Aucun des mots de passe courants ne correspond</p>";
    echo "<p class='info'>Utilisez le formulaire ci-dessous pour générer un nouveau hash</p>";
}
echo "</div>";

// Handle hash generation
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['password'])) {
    $password = $_POST['password'];
    $newHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);

    echo "<div class='card' style='background:#d4edda;border-left:4px solid #28a745;'>";
    echo "<h2>✅ Hash Généré avec Succès</h2>";
    echo "<p><strong>Mot de passe :</strong> <code>" . htmlspecialchars($password) . "</code></p>";
    echo "<p><strong>Hash généré :</strong></p>";
    echo "<pre id='generated-hash'>" . htmlspecialchars($newHash) . "</pre>";
    echo "<button class='copy-btn' onclick='copyHash()'>📋 Copier le Hash</button>";

    // Verify it works
    if (password_verify($password, $newHash)) {
        echo "<p class='success'>✅ Vérification : Le hash fonctionne correctement</p>";
    } else {
        echo "<p class='error'>⚠️ Attention : Problème de vérification</p>";
    }

    echo "<hr>";
    echo "<h3>🔧 Prochaines Étapes</h3>";
    echo "<ol>";
    echo "<li>Copiez le hash ci-dessus (bouton 📋)</li>";
    echo "<li>Allez dans <strong>phpMyAdmin</strong></li>";
    echo "<li>Sélectionnez la base <code>u442378820_site_mdo_2026</code></li>";
    echo "<li>Ouvrez la table <code>users</code></li>";
    echo "<li>Éditez la ligne de l'utilisateur <code>admin</code></li>";
    echo "<li>Remplacez le champ <code>password_hash</code> par le hash copié</li>";
    echo "<li>Sauvegardez</li>";
    echo "<li>Testez la connexion sur /partner avec votre nouveau mot de passe</li>";
    echo "</ol>";

    // Try to update directly
    echo "<hr>";
    echo "<h3>🚀 Mise à Jour Automatique</h3>";
    try {
        $sql = "UPDATE users SET password_hash = :hash WHERE username = 'admin'";
        $db->execute($sql, ['hash' => $newHash]);
        echo "<p class='success'>✅ Le hash a été mis à jour automatiquement dans la base de données !</p>";
        echo "<p class='success'>Vous pouvez maintenant vous connecter avec :</p>";
        echo "<ul>";
        echo "<li><strong>Username:</strong> admin</li>";
        echo "<li><strong>Password:</strong> " . htmlspecialchars($password) . "</li>";
        echo "</ul>";

        // Verify the update
        $verify = $db->queryOne("SELECT password_hash FROM users WHERE username = 'admin'");
        if (password_verify($password, $verify['password_hash'])) {
            echo "<p class='success'>🎉 PARFAIT ! Vérification réussie - le mot de passe fonctionne !</p>";
        }
    } catch (Exception $e) {
        echo "<p class='error'>❌ Mise à jour automatique échouée : " . htmlspecialchars($e->getMessage()) . "</p>";
        echo "<p class='info'>Utilisez la méthode manuelle (phpMyAdmin) ci-dessus</p>";
    }

    echo "</div>";
}

// Display form
echo "<div class='card'>";
echo "<h2>🆕 Générer un Nouveau Hash</h2>";
echo "<form method='POST'>";
echo "<label><strong>Entrez le mot de passe souhaité :</strong></label>";
echo "<input type='text' name='password' placeholder='Ex: MonMotDePasseSecurise2024!' required>";
echo "<p class='info' style='font-size:14px;'>💡 Recommandation : Minimum 12 caractères, avec majuscules, minuscules, chiffres et symboles</p>";
echo "<button type='submit'>🔐 Générer le Hash</button>";
echo "</form>";
echo "</div>";

echo "<div class='card' style='background:#f8d7da;border-left:4px solid #dc3545;'>";
echo "<h2>⚠️ SÉCURITÉ</h2>";
echo "<p><strong>SUPPRIMEZ CE FICHIER après utilisation !</strong></p>";
echo "<p>Fichier : <code>/public_html/api/auth/generate-hash.php</code></p>";
echo "</div>";

echo "</body></html>";
