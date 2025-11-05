<?php
/**
 * API Endpoint: Récupérer les statistiques SharePoint
 * GET /api/sharepoint/get-stats.php
 *
 * Query params (optionnel):
 * - site_id: ID d'un site spécifique
 */

header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Gérer les requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/_sharepoint-helper.php';

// Créer la connexion PDO
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    sendError(500, "Erreur de connexion à la base de données.");
}

// Vérifier l'authentification
$user = checkAuthentication();
if (!$user) {
    sendError(401, "Non authentifié. Veuillez vous connecter.");
}

// Vérifier la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError(405, "Méthode non autorisée. Utilisez GET.");
}

try {
    $siteId = isset($_GET['site_id']) ? (int)$_GET['site_id'] : null;

    // Si un site spécifique est demandé
    if ($siteId) {
        // Vérifier l'accès
        if (!canAccessSite($pdo, $siteId, $user['user_id'], $user['is_admin'])) {
            sendError(403, "Accès refusé à ce site.");
        }

        // Récupérer les détails du site
        $stmt = $pdo->prepare("
            SELECT
                id,
                site_name,
                site_url,
                site_type,
                total_storage_gb,
                used_storage_gb,
                ROUND((used_storage_gb / NULLIF(total_storage_gb, 0)) * 100, 2) AS usage_percentage,
                last_updated
            FROM sharepoint_sites
            WHERE id = ? AND is_active = TRUE
        ");
        $stmt->execute([$siteId]);
        $site = $stmt->fetch();

        if (!$site) {
            sendError(404, "Site non trouvé.");
        }

        // Récupérer les dossiers du site
        $stmt = $pdo->prepare("
            SELECT
                id,
                folder_name,
                folder_path,
                folder_type,
                size_gb,
                size_mb,
                file_count,
                last_modified,
                ROUND((size_gb / NULLIF((SELECT used_storage_gb FROM sharepoint_sites WHERE id = ?), 0)) * 100, 2) AS percentage_of_site
            FROM sharepoint_folders
            WHERE site_id = ?
            ORDER BY size_gb DESC
        ");
        $stmt->execute([$siteId, $siteId]);
        $folders = $stmt->fetchAll();

        // Récupérer les types de fichiers
        $stmt = $pdo->prepare("
            SELECT
                file_extension,
                file_count,
                total_size_gb,
                ROUND(total_size_gb * 1024, 2) AS total_size_mb
            FROM sharepoint_file_types
            WHERE site_id = ?
            ORDER BY total_size_gb DESC
        ");
        $stmt->execute([$siteId]);
        $fileTypes = $stmt->fetchAll();

        // Récupérer l'historique (30 derniers jours)
        $stmt = $pdo->prepare("
            SELECT
                snapshot_date,
                total_storage_gb,
                used_storage_gb,
                total_files,
                total_folders
            FROM sharepoint_stats_history
            WHERE site_id = ?
            ORDER BY snapshot_date DESC
            LIMIT 30
        ");
        $stmt->execute([$siteId]);
        $history = $stmt->fetchAll();

        sendJsonResponse(200, [
            'success' => true,
            'site' => $site,
            'folders' => $folders,
            'file_types' => $fileTypes,
            'history' => array_reverse($history) // Ordre chronologique
        ]);
    } else {
        // Vue d'ensemble de tous les sites de l'utilisateur
        $userId = $user['is_admin'] ? null : $user['user_id'];

        if ($userId) {
            // Vue client : ses sites uniquement
            $stmt = $pdo->prepare("
                SELECT
                    id,
                    site_name,
                    site_url,
                    site_type,
                    total_storage_gb,
                    used_storage_gb,
                    ROUND((used_storage_gb / NULLIF(total_storage_gb, 0)) * 100, 2) AS usage_percentage,
                    last_updated
                FROM sharepoint_sites
                WHERE user_id = ? AND is_active = TRUE
                ORDER BY used_storage_gb DESC
            ");
            $stmt->execute([$userId]);
        } else {
            // Vue admin : tous les sites
            $stmt = $pdo->query("
                SELECT
                    s.id,
                    s.site_name,
                    s.site_url,
                    s.site_type,
                    s.total_storage_gb,
                    s.used_storage_gb,
                    ROUND((s.used_storage_gb / NULLIF(s.total_storage_gb, 0)) * 100, 2) AS usage_percentage,
                    s.last_updated,
                    u.username,
                    u.email
                FROM sharepoint_sites s
                JOIN users u ON s.user_id = u.id
                WHERE s.is_active = TRUE
                ORDER BY s.used_storage_gb DESC
            ");
        }

        $sites = $stmt->fetchAll();

        // Calculer les totaux
        $totalStorage = 0;
        $totalUsed = 0;
        foreach ($sites as $site) {
            $totalStorage += $site['total_storage_gb'];
            $totalUsed += $site['used_storage_gb'];
        }

        // Top 10 des dossiers tous sites confondus
        if ($userId) {
            $stmt = $pdo->prepare("
                SELECT
                    f.id,
                    f.folder_name,
                    f.folder_path,
                    f.size_gb,
                    f.size_mb,
                    f.file_count,
                    s.site_name,
                    s.id AS site_id
                FROM sharepoint_folders f
                JOIN sharepoint_sites s ON f.site_id = s.id
                WHERE s.user_id = ? AND s.is_active = TRUE
                ORDER BY f.size_gb DESC
                LIMIT 10
            ");
            $stmt->execute([$userId]);
        } else {
            $stmt = $pdo->query("
                SELECT
                    f.id,
                    f.folder_name,
                    f.folder_path,
                    f.size_gb,
                    f.size_mb,
                    f.file_count,
                    s.site_name,
                    s.id AS site_id,
                    u.username
                FROM sharepoint_folders f
                JOIN sharepoint_sites s ON f.site_id = s.id
                JOIN users u ON s.user_id = u.id
                WHERE s.is_active = TRUE
                ORDER BY f.size_gb DESC
                LIMIT 10
            ");
        }

        $topFolders = $stmt->fetchAll();

        sendJsonResponse(200, [
            'success' => true,
            'overview' => [
                'total_sites' => count($sites),
                'total_storage_gb' => round($totalStorage, 2),
                'total_used_gb' => round($totalUsed, 2),
                'usage_percentage' => calculatePercentage($totalUsed, $totalStorage)
            ],
            'sites' => $sites,
            'top_folders' => $topFolders
        ]);
    }

} catch (Exception $e) {
    error_log("Erreur récupération stats SharePoint: " . $e->getMessage());
    sendError(500, "Erreur lors de la récupération des statistiques: " . $e->getMessage());
}
