<?php
/**
 * Reset Rate Limit Tool
 * Clears rate limit data for login attempts
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Reset Rate Limit</title>";
echo "<style>
body{font-family:sans-serif;max-width:800px;margin:40px auto;padding:20px;background:#f5f5f5;}
.card{background:white;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);margin-bottom:20px;}
.success{color:green;font-weight:bold;}
.error{color:red;font-weight:bold;}
.info{color:blue;}
.warning{color:orange;font-weight:bold;}
button{background:#dc3545;color:white;padding:14px 28px;border:none;border-radius:4px;cursor:pointer;font-size:16px;font-weight:bold;}
button:hover{background:#c82333;}
pre{background:#f4f4f4;padding:10px;border-radius:5px;overflow-x:auto;}
</style></head><body>";

echo "<h1>🔓 Réinitialisation du Rate Limit</h1>";

// Check where rate limit data is stored
$rateLimitDir = __DIR__ . '/../rate-limit';
$rateLimitFile = $rateLimitDir . '/login_' . md5($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '.dat';
$rateLimitFilesExist = file_exists($rateLimitDir);

echo "<div class='card'>";
echo "<h2>📊 État Actuel</h2>";
echo "<p><strong>Dossier rate-limit :</strong> " . ($rateLimitFilesExist ? '<span class="success">✅ Existe</span>' : '<span class="error">❌ N\'existe pas</span>') . "</p>";

if ($rateLimitFilesExist) {
    $files = glob($rateLimitDir . '/*.dat');
    echo "<p><strong>Fichiers de rate limit :</strong> " . count($files) . " fichier(s)</p>";

    if (count($files) > 0) {
        echo "<ul>";
        foreach ($files as $file) {
            $age = time() - filemtime($file);
            $minutes = floor($age / 60);
            echo "<li>" . basename($file) . " (créé il y a $minutes minutes)</li>";
        }
        echo "</ul>";
    }
}

echo "<p><strong>Votre IP :</strong> " . ($_SERVER['REMOTE_ADDR'] ?? 'Inconnue') . "</p>";
echo "<p><strong>Fichier rate-limit pour votre IP :</strong> " . basename($rateLimitFile) . "</p>";
echo "</div>";

// Handle reset
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['reset'])) {
    echo "<div class='card'>";
    echo "<h2>🔄 Réinitialisation en cours...</h2>";

    $deleted = 0;
    $errors = [];

    if ($rateLimitFilesExist) {
        $files = glob($rateLimitDir . '/*.dat');

        foreach ($files as $file) {
            if (unlink($file)) {
                $deleted++;
                echo "<p class='success'>✅ Supprimé : " . basename($file) . "</p>";
            } else {
                $errors[] = basename($file);
                echo "<p class='error'>❌ Erreur lors de la suppression : " . basename($file) . "</p>";
            }
        }

        if ($deleted > 0) {
            echo "<div style='background:#d4edda;padding:15px;margin:20px 0;border-radius:8px;border-left:4px solid #28a745;'>";
            echo "<h3 class='success'>🎉 SUCCÈS !</h3>";
            echo "<p><strong>$deleted fichier(s) de rate limit supprimé(s)</strong></p>";
            echo "<p>Vous pouvez maintenant vous connecter sur /partner !</p>";
            echo "<p>Testez avec :</p>";
            echo "<ul>";
            echo "<li><strong>URL :</strong> https://mdoservices.fr/partner</li>";
            echo "<li><strong>Username :</strong> admin</li>";
            echo "<li><strong>Password :</strong> password</li>";
            echo "</ul>";
            echo "</div>";
        }

        if (count($errors) > 0) {
            echo "<p class='error'>Impossible de supprimer " . count($errors) . " fichier(s)</p>";
            echo "<p class='info'>Cela peut être dû aux permissions. Essayez de les supprimer manuellement via File Manager.</p>";
        }

    } else {
        echo "<p class='warning'>⚠️ Le dossier rate-limit n'existe pas</p>";
        echo "<p class='info'>Le rate limit est peut-être stocké ailleurs ou en base de données.</p>";
        echo "<p class='info'>Dans ce cas, attendez simplement 12 minutes pour que le rate limit expire.</p>";
    }

    echo "</div>";
}

// Display form
if (!isset($_POST['reset'])) {
    echo "<div class='card'>";
    echo "<h2>⚠️ Réinitialiser le Rate Limit</h2>";
    echo "<p>Cet outil va supprimer tous les fichiers de rate limit, ce qui vous permettra de vous reconnecter immédiatement.</p>";
    echo "<form method='POST'>";
    echo "<input type='hidden' name='reset' value='1'>";
    echo "<button type='submit'>🔓 RÉINITIALISER LE RATE LIMIT</button>";
    echo "</form>";
    echo "</div>";
}

echo "<div class='card' style='background:#d1ecf1;border-left:4px solid #17a2b8;'>";
echo "<h2>💡 Alternative : Attendre</h2>";
echo "<p>Si cet outil ne fonctionne pas, vous pouvez simplement :</p>";
echo "<ol>";
echo "<li>Attendre 12 minutes</li>";
echo "<li>Puis essayer de vous connecter sur /partner</li>";
echo "</ol>";
echo "</div>";

echo "<div class='card' style='background:#f8d7da;border-left:4px solid #dc3545;'>";
echo "<h2>⚠️ SÉCURITÉ</h2>";
echo "<p><strong>SUPPRIMEZ CE FICHIER après utilisation !</strong></p>";
echo "<p>Fichier : <code>/public_html/api/reset-rate-limit.php</code></p>";
echo "</div>";

echo "</body></html>";
