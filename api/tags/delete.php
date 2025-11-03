<?php
/**
 * Tags Endpoint - Delete Tag
 *
 * POST /api/tags/delete
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

// Only admin users can delete tags
if (!$auth['user']['is_admin']) {
    sendError('Admin access required', 403);
}

try {
    // Get and validate input
    $input = getJsonInput();
    validateRequired($input, ['id']);

    $id = intval($input['id']);
    $db = new Database();

    // Check if tag exists
    $tag = $db->queryOne("SELECT * FROM tags WHERE id = :id", ['id' => $id]);
    if (!$tag) {
        sendError('Tag not found', 404);
    }

    // Delete tag (post_tags will be deleted automatically due to CASCADE)
    $db->execute("DELETE FROM tags WHERE id = :id", ['id' => $id]);

    logMessage("Tag deleted: {$tag['name']} (ID: {$id}) by user {$auth['user']['username']}", 'INFO');

    sendSuccess(null, 'Tag deleted successfully');

} catch (Exception $e) {
    logMessage("Error deleting tag: " . $e->getMessage(), 'ERROR');
    sendError('Failed to delete tag', 500);
}
