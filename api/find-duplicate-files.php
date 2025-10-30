<?php
/**
 * Find Duplicate Files - Diagnostic Tool
 * Searches for multiple index.html and other duplicate files
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Find Duplicate Files</title>";
echo "<style>
body{font-family:sans-serif;max-width:1200px;margin:20px auto;padding:20px;background:#f5f5f5;}
.card{background:white;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);margin-bottom:20px;}
.success{color:green;font-weight:bold;}
.error{color:red;font-weight:bold;}
.warning{color:orange;font-weight:bold;}
.info{color:blue;}
table{width:100%;border-collapse:collapse;margin:10px 0;}
th,td{padding:10px;border:1px solid #ddd;text-align:left;}
th{background:#f8f9fa;}
pre{background:#f4f4f4;padding:10px;border-radius:5px;overflow-x:auto;font-size:11px;}
.file-duplicate{background:#fff3cd;}
.file-recent{background:#d4edda;}
</style></head><body>";

echo "<h1>🔍 Recherche de Fichiers Dupliqués</h1>";

$rootDir = dirname(__DIR__);

// Files to search for
$searchFiles = [
    'index.html',
    'index.php',
    '.htaccess'
];

echo "<div class='card'>";
echo "<h2>📁 Racine du Site</h2>";
echo "<p><strong>Dossier analysé :</strong> <code>" . htmlspecialchars($rootDir) . "</code></p>";
echo "</div>";

foreach ($searchFiles as $searchFile) {
    echo "<div class='card'>";
    echo "<h2>🔎 Recherche : <code>$searchFile</code></h2>";

    $command = "find " . escapeshellarg($rootDir) . " -name " . escapeshellarg($searchFile) . " -type f 2>/dev/null";
    $output = [];
    exec($command, $output);

    if (empty($output)) {
        echo "<p class='warning'>⚠️ Aucun fichier <code>$searchFile</code> trouvé</p>";
    } else {
        echo "<p class='info'>✅ <strong>" . count($output) . " fichier(s) trouvé(s)</strong></p>";

        if (count($output) > 1) {
            echo "<p class='error'>❌ <strong>ATTENTION : FICHIERS DUPLIQUÉS DÉTECTÉS !</strong></p>";
        }

        echo "<table>";
        echo "<tr><th>Fichier</th><th>Taille</th><th>Modifié</th><th>Permissions</th></tr>";

        foreach ($output as $file) {
            if (file_exists($file)) {
                $size = filesize($file);
                $modified = date('Y-m-d H:i:s', filemtime($file));
                $perms = substr(sprintf('%o', fileperms($file)), -4);

                // Check if this is the most recent file
                $isRecent = true;
                foreach ($output as $otherFile) {
                    if ($file !== $otherFile && file_exists($otherFile)) {
                        if (filemtime($file) < filemtime($otherFile)) {
                            $isRecent = false;
                            break;
                        }
                    }
                }

                $rowClass = '';
                if (count($output) > 1) {
                    $rowClass = $isRecent ? 'file-recent' : 'file-duplicate';
                }

                echo "<tr class='$rowClass'>";
                echo "<td style='font-size:11px;'>" . htmlspecialchars($file) . ($isRecent && count($output) > 1 ? ' <span class="success">← PLUS RÉCENT</span>' : '') . "</td>";
                echo "<td>" . number_format($size) . " octets</td>";
                echo "<td>$modified</td>";
                echo "<td>$perms</td>";
                echo "</tr>";
            }
        }

        echo "</table>";

        // If multiple index.html found, show content preview
        if ($searchFile === 'index.html' && count($output) > 1) {
            echo "<h3 class='error'>⚠️ Multiples index.html détectés - Vérification du Contenu</h3>";

            foreach ($output as $file) {
                if (file_exists($file)) {
                    $content = file_get_contents($file);
                    $preview = substr($content, 0, 500);

                    echo "<div style='margin:15px 0;padding:10px;background:#f8f9fa;border-left:3px solid #0066cc;'>";
                    echo "<p><strong>Fichier :</strong> <code>" . htmlspecialchars($file) . "</code></p>";

                    // Detect version
                    if (stripos($content, 'tekup') !== false || stripos($content, 'Tekup') !== false) {
                        echo "<p class='success'>✅ VERSION TEKUP détectée</p>";
                    } else {
                        echo "<p class='error'>❌ VERSION ORIGINALE (pas Tekup)</p>";
                    }

                    // Extract title
                    if (preg_match('/<title>(.*?)<\/title>/i', $content, $matches)) {
                        echo "<p><strong>Titre :</strong> " . htmlspecialchars($matches[1]) . "</p>";
                    }

                    echo "<p><strong>Aperçu (500 premiers caractères) :</strong></p>";
                    echo "<pre>" . htmlspecialchars($preview) . "...</pre>";
                    echo "</div>";
                }
            }
        }
    }

    echo "</div>";
}

// Check for common problematic directories
echo "<div class='card'>";
echo "<h2>📂 Vérification des Dossiers Suspects</h2>";

$suspectDirs = [
    $rootDir . '/old',
    $rootDir . '/backup',
    $rootDir . '/dist-old',
    $rootDir . '/public_html',
    $rootDir . '/www',
    $rootDir . '/htdocs',
];

echo "<table>";
echo "<tr><th>Dossier</th><th>Existe?</th><th>Contient index.html?</th></tr>";

foreach ($suspectDirs as $dir) {
    $exists = is_dir($dir);
    $hasIndex = file_exists($dir . '/index.html');

    echo "<tr>";
    echo "<td><code>" . htmlspecialchars($dir) . "</code></td>";
    echo "<td>" . ($exists ? '<span class="warning">⚠️ OUI</span>' : '<span class="success">✅ NON</span>') . "</td>";
    echo "<td>" . ($hasIndex ? '<span class="error">❌ OUI (PROBLÈME!)</span>' : '✅ NON') . "</td>";
    echo "</tr>";
}

echo "</table>";
echo "</div>";

// Recommendations
echo "<div class='card' style='background:#fff3cd;border-left:4px solid #ffc107;'>";
echo "<h2>🎯 Recommandations</h2>";
echo "<h3>Si vous avez trouvé des fichiers dupliqués :</h3>";
echo "<ol>";
echo "<li>Identifiez le fichier le PLUS RÉCENT (en vert) - c'est probablement le bon</li>";
echo "<li>Renommez ou supprimez les anciens fichiers (ajoutez .old à la fin)</li>";
echo "<li>Purgez le cache CDN Hostinger via le panel de contrôle</li>";
echo "<li>Testez à nouveau le site</li>";
echo "</ol>";

echo "<h3>Pour purger le cache Hostinger :</h3>";
echo "<ol>";
echo "<li>Connectez-vous au panel Hostinger</li>";
echo "<li>Allez dans <strong>Sites Web</strong> → Votre site</li>";
echo "<li>Cherchez <strong>Cache Manager</strong> ou <strong>CDN</strong></li>";
echo "<li>Cliquez sur <strong>Purge All</strong> ou <strong>Clear Cache</strong></li>";
echo "</ol>";
echo "</div>";

echo "<div class='card' style='background:#f8d7da;border-left:4px solid #dc3545;'>";
echo "<h2>⚠️ SÉCURITÉ</h2>";
echo "<p><strong>SUPPRIMEZ CE FICHIER après utilisation !</strong></p>";
echo "<p>Fichier : <code>/public_html/api/find-duplicate-files.php</code></p>";
echo "</div>";

echo "</body></html>";
