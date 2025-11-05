<?php
/**
 * API Endpoint: Importer des données SharePoint
 * POST /api/sharepoint/import-data.php
 *
 * Body (JSON):
 * {
 *   "user_id": 123,
 *   "site_name": "Site Équipe",
 *   "site_url": "https://...",
 *   "site_type": "team|communication|onedrive|other",
 *   "total_storage_gb": 100.0,
 *   "used_storage_gb": 65.5,
 *   "folders": [
 *     {
 *       "folder_name": "Documents",
 *       "folder_path": "/Shared Documents",
 *       "folder_type": "library|folder",
 *       "size_gb": 25.5,
 *       "file_count": 1250
 *     }
 *   ]
 * }
 */

header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

// Seuls les admins peuvent importer des données
if (!$user['is_admin']) {
    sendError(403, "Accès refusé. Seuls les administrateurs peuvent importer des données.");
}

// Vérifier la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError(405, "Méthode non autorisée. Utilisez POST.");
}

// Récupérer les données JSON
$input = json_decode(file_get_contents('php://input'), true);

// Validation des champs requis
if (!isset($input['user_id']) || !isset($input['site_name'])) {
    sendError(400, "Les champs 'user_id' et 'site_name' sont requis.");
}

$userId = (int)$input['user_id'];
$siteName = trim($input['site_name']);
$siteUrl = $input['site_url'] ?? null;
$siteType = $input['site_type'] ?? 'team';
$totalStorageGb = (float)($input['total_storage_gb'] ?? 0);
$usedStorageGb = (float)($input['used_storage_gb'] ?? 0);
$folders = $input['folders'] ?? [];

try {
    $pdo->beginTransaction();

    // Vérifier que l'utilisateur existe
    $stmt = $pdo->prepare("SELECT id FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    if (!$stmt->fetch()) {
        throw new Exception("Utilisateur non trouvé.");
    }

    // Insérer ou mettre à jour le site
    $stmt = $pdo->prepare("
        INSERT INTO sharepoint_sites (user_id, site_name, site_url, site_type, total_storage_gb, used_storage_gb)
        VALUES (:user_id, :site_name, :site_url, :site_type, :total_storage_gb, :used_storage_gb)
        ON DUPLICATE KEY UPDATE
            site_url = VALUES(site_url),
            site_type = VALUES(site_type),
            total_storage_gb = VALUES(total_storage_gb),
            used_storage_gb = VALUES(used_storage_gb),
            last_updated = NOW()
    ");

    $stmt->execute([
        'user_id' => $userId,
        'site_name' => $siteName,
        'site_url' => $siteUrl,
        'site_type' => $siteType,
        'total_storage_gb' => $totalStorageGb,
        'used_storage_gb' => $usedStorageGb
    ]);

    $siteId = $pdo->lastInsertId() ?: $pdo->query("SELECT LAST_INSERT_ID()")->fetchColumn();

    // Si pas d'ID récupéré, chercher le site existant
    if (!$siteId) {
        $stmt = $pdo->prepare("SELECT id FROM sharepoint_sites WHERE user_id = ? AND site_name = ?");
        $stmt->execute([$userId, $siteName]);
        $siteId = $stmt->fetchColumn();
    }

    // Supprimer les anciens dossiers de ce site
    $stmt = $pdo->prepare("DELETE FROM sharepoint_folders WHERE site_id = ?");
    $stmt->execute([$siteId]);

    // Insérer les dossiers
    if (!empty($folders)) {
        $stmt = $pdo->prepare("
            INSERT INTO sharepoint_folders (site_id, folder_name, folder_path, folder_type, size_gb, file_count, last_modified)
            VALUES (:site_id, :folder_name, :folder_path, :folder_type, :size_gb, :file_count, :last_modified)
        ");

        foreach ($folders as $folder) {
            $stmt->execute([
                'site_id' => $siteId,
                'folder_name' => $folder['folder_name'],
                'folder_path' => $folder['folder_path'] ?? null,
                'folder_type' => $folder['folder_type'] ?? 'folder',
                'size_gb' => (float)$folder['size_gb'],
                'file_count' => (int)($folder['file_count'] ?? 0),
                'last_modified' => $folder['last_modified'] ?? null
            ]);
        }
    }

    // Ajouter un snapshot dans l'historique
    $stmt = $pdo->prepare("
        INSERT INTO sharepoint_stats_history (site_id, snapshot_date, total_storage_gb, used_storage_gb, total_files, total_folders)
        VALUES (:site_id, CURDATE(), :total_storage_gb, :used_storage_gb, :total_files, :total_folders)
        ON DUPLICATE KEY UPDATE
            total_storage_gb = VALUES(total_storage_gb),
            used_storage_gb = VALUES(used_storage_gb),
            total_files = VALUES(total_files),
            total_folders = VALUES(total_folders)
    ");

    $totalFiles = array_sum(array_column($folders, 'file_count'));
    $totalFolders = count($folders);

    $stmt->execute([
        'site_id' => $siteId,
        'total_storage_gb' => $totalStorageGb,
        'used_storage_gb' => $usedStorageGb,
        'total_files' => $totalFiles,
        'total_folders' => $totalFolders
    ]);

    $pdo->commit();

    sendJsonResponse(200, [
        'success' => true,
        'message' => 'Données importées avec succès.',
        'site_id' => $siteId,
        'folders_imported' => count($folders)
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    error_log("Erreur import données SharePoint: " . $e->getMessage());
    sendError(500, "Erreur lors de l'import des données: " . $e->getMessage());
}
