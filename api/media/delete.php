<?php
/**
 * Media Endpoint - Delete Media
 *
 * POST /api/media/delete
 * Body: { "id": 1 }
 * Returns: { "success": true }
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../config/utils.php';

setCorsHeaders();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

// Verify authentication
$auth = verifyAuth();
if (!$auth['valid']) {
    sendError($auth['error'], 401);
}

// Only admin users can delete media
if (!$auth['user']['is_admin']) {
    sendError('Admin access required', 403);
}

try {
    // Get and validate input
    $input = getJsonInput();
    validateRequired($input, ['id']);

    $id = intval($input['id']);
    $db = new Database();

    // Check if media exists
    $media = $db->queryOne("SELECT * FROM media WHERE id = :id", ['id' => $id]);
    if (!$media) {
        sendError('Media not found', 404);
    }

    // Delete physical file
    if (file_exists($media['file_path'])) {
        if (!unlink($media['file_path'])) {
            logMessage("Warning: Failed to delete file {$media['file_path']}", 'WARNING');
        }
    }

    // Delete from database
    $db->execute("DELETE FROM media WHERE id = :id", ['id' => $id]);

    logMessage("Media deleted: {$media['original_filename']} (ID: {$id}) by user {$auth['user']['username']}", 'INFO');

    sendSuccess(null, 'Media deleted successfully');

} catch (Exception $e) {
    logMessage("Error deleting media: " . $e->getMessage(), 'ERROR');
    sendError('Failed to delete media', 500);
}
