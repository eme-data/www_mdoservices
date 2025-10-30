<?php
/**
 * Diagnostic pour l'endpoint /api/posts/list.php
 * À uploader dans /public_html/api/posts/
 * À supprimer après résolution du problème
 */

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Diagnostic Posts API</title>";
echo "<style>body{font-family:sans-serif;max-width:800px;margin:40px auto;padding:20px;}";
echo ".success{color:green;} .error{color:red;} .info{color:blue;} pre{background:#f4f4f4;padding:10px;border-radius:5px;overflow-x:auto;}</style>";
echo "</head><body><h1>🔍 Diagnostic Posts API</h1>";

// Test 1: Vérifier que config.php existe et est lisible
echo "<h2>Test 1: Vérification des fichiers de configuration</h2>";
$configPath = dirname(__DIR__) . '/config/config.php';
if (file_exists($configPath)) {
    echo "<p class='success'>✅ config.php trouvé: " . $configPath . "</p>";
} else {
    echo "<p class='error'>❌ config.php NON trouvé: " . $configPath . "</p>";
    exit;
}

// Test 2: Inclure le fichier de configuration
echo "<h2>Test 2: Inclusion de la configuration</h2>";
try {
    require_once $configPath;
    echo "<p class='success'>✅ Configuration incluse avec succès</p>";
} catch (Exception $e) {
    echo "<p class='error'>❌ Erreur lors de l'inclusion: " . htmlspecialchars($e->getMessage()) . "</p>";
    exit;
}

// Test 3: Vérifier les constantes
echo "<h2>Test 3: Vérification des constantes de BDD</h2>";
if (defined('DB_NAME')) {
    echo "<p class='success'>✅ DB_NAME: " . htmlspecialchars(DB_NAME) . "</p>";
} else {
    echo "<p class='error'>❌ DB_NAME non définie</p>";
}

if (defined('DB_USER')) {
    echo "<p class='success'>✅ DB_USER: " . htmlspecialchars(DB_USER) . "</p>";
} else {
    echo "<p class='error'>❌ DB_USER non définie</p>";
}

if (defined('DB_PASS')) {
    echo "<p class='success'>✅ DB_PASS: défini (longueur: " . strlen(DB_PASS) . " caractères)</p>";
} else {
    echo "<p class='error'>❌ DB_PASS non définie</p>";
}

if (defined('DB_HOST')) {
    echo "<p class='success'>✅ DB_HOST: " . htmlspecialchars(DB_HOST) . "</p>";
} else {
    echo "<p class='error'>❌ DB_HOST non définie</p>";
}

// Test 4: Test de connexion PDO
echo "<h2>Test 4: Connexion à la base de données</h2>";
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    echo "<p class='info'>📌 DSN: " . htmlspecialchars($dsn) . "</p>";

    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
    echo "<p class='success'>✅ Connexion PDO réussie</p>";
} catch (PDOException $e) {
    echo "<p class='error'>❌ Erreur de connexion PDO: " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p class='info'>Code d'erreur: " . htmlspecialchars($e->getCode()) . "</p>";
    exit;
}

// Test 5: Vérifier que la table posts existe
echo "<h2>Test 5: Vérification de la table posts</h2>";
try {
    $stmt = $pdo->query("SHOW TABLES LIKE 'posts'");
    $tableExists = $stmt->fetch();
    if ($tableExists) {
        echo "<p class='success'>✅ Table 'posts' existe</p>";
    } else {
        echo "<p class='error'>❌ Table 'posts' n'existe pas</p>";
        exit;
    }
} catch (PDOException $e) {
    echo "<p class='error'>❌ Erreur: " . htmlspecialchars($e->getMessage()) . "</p>";
    exit;
}

// Test 6: Exécuter la requête exacte de list.php
echo "<h2>Test 6: Exécution de la requête list.php</h2>";
try {
    $query = "SELECT id, title, slug, excerpt, content, cover_image_url, author_name, published_at, created_at
              FROM posts
              WHERE published_at IS NOT NULL
              ORDER BY published_at DESC";

    echo "<p class='info'>📌 Requête SQL:</p><pre>" . htmlspecialchars($query) . "</pre>";

    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $posts = $stmt->fetchAll();

    echo "<p class='success'>✅ Requête exécutée avec succès</p>";
    echo "<p class='info'>📊 Nombre d'articles publiés trouvés: " . count($posts) . "</p>";

    if (count($posts) > 0) {
        echo "<h3>Articles publiés:</h3><pre>" . htmlspecialchars(print_r($posts, true)) . "</pre>";
    }
} catch (PDOException $e) {
    echo "<p class='error'>❌ Erreur lors de l'exécution de la requête: " . htmlspecialchars($e->getMessage()) . "</p>";
    exit;
}

// Test 7: Vérifier le fichier utils.php
echo "<h2>Test 7: Vérification des fonctions utilitaires</h2>";
$utilsPath = dirname(__DIR__) . '/config/utils.php';
if (file_exists($utilsPath)) {
    echo "<p class='success'>✅ utils.php trouvé</p>";
    require_once $utilsPath;

    if (function_exists('sendSuccess')) {
        echo "<p class='success'>✅ Fonction sendSuccess() disponible</p>";
    } else {
        echo "<p class='error'>❌ Fonction sendSuccess() non disponible</p>";
    }

    if (function_exists('sendError')) {
        echo "<p class='success'>✅ Fonction sendError() disponible</p>";
    } else {
        echo "<p class='error'>❌ Fonction sendError() non disponible</p>";
    }
} else {
    echo "<p class='error'>❌ utils.php NON trouvé: " . $utilsPath . "</p>";
}

// Test 8: Simuler le code exact de list.php
echo "<h2>Test 8: Simulation complète de list.php</h2>";
try {
    // Réinitialiser la connexion pour être sûr
    $pdo = null;
    require_once dirname(__DIR__) . '/config/Database.php';

    echo "<p class='info'>📌 Utilisation de la classe Database</p>";

    $db = new Database();
    $conn = $db->getConnection();

    echo "<p class='success'>✅ Database class instanciée</p>";

    $query = "SELECT id, title, slug, excerpt, content, cover_image_url, author_name, published_at, created_at
              FROM posts
              WHERE published_at IS NOT NULL
              ORDER BY published_at DESC";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $posts = $stmt->fetchAll();

    echo "<p class='success'>✅ Requête via Database class réussie</p>";
    echo "<p class='info'>📊 Nombre d'articles: " . count($posts) . "</p>";

} catch (Exception $e) {
    echo "<p class='error'>❌ Erreur avec Database class: " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p class='info'>Stack trace:</p><pre>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
}

echo "<hr><h2>🎯 Conclusion</h2>";
echo "<p>Si tous les tests ci-dessus sont ✅ verts, alors le problème vient probablement de:</p>";
echo "<ul>";
echo "<li>Headers HTTP incorrects</li>";
echo "<li>Fichier list.php corrompu ou incomplet</li>";
echo "<li>Problème de permissions sur list.php</li>";
echo "<li>Fichier .htaccess qui interfère ailleurs</li>";
echo "</ul>";

echo "<p class='info'><strong>Prochaine étape:</strong> Partagez tous les résultats de cette page avec Claude.</p>";
echo "</body></html>";
