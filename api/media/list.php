<?php
/**
 * Media Endpoint - List All Media
 *
 * GET /api/media/list
 * Optional query params:
 *   ?limit=50
 *   ?offset=0
 * Returns: { "success": true, "data": [...] }
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../config/utils.php';

setCorsHeaders();

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

// Verify authentication
$auth = verifyAuth();
if (!$auth['valid']) {
    sendError($auth['error'], 401);
}

try {
    $db = new Database();

    // Get pagination params
    $limit = isset($_GET['limit']) ? min(intval($_GET['limit']), 100) : 50;
    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

    // Query to get media files
    $sql = "SELECT id, filename, original_filename, file_url, file_size, mime_type,
                   width, height, uploaded_by, created_at
            FROM media
            ORDER BY created_at DESC
            LIMIT :limit OFFSET :offset";

    $media = $db->query($sql, ['limit' => $limit, 'offset' => $offset]);

    // Get total count
    $totalCount = $db->queryOne("SELECT COUNT(*) as count FROM media");

    sendSuccess([
        'items' => $media,
        'total' => $totalCount['count'],
        'limit' => $limit,
        'offset' => $offset
    ]);

} catch (Exception $e) {
    logMessage("Error fetching media: " . $e->getMessage(), 'ERROR');
    sendError('Failed to fetch media', 500);
}
