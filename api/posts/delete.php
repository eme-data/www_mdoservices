<?php
/**
 * Posts Endpoint - Delete Post
 *
 * POST /api/posts/delete
 * Body: { "id": 1 }
 * Returns: { "success": true, "message": "Post deleted successfully" }
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

// Only admin users can delete posts
if (!$auth['user']['is_admin']) {
    sendError('Admin access required', 403);
}

try {
    // Get and validate input
    $input = getJsonInput();

    // Validate required fields
    validateRequired($input, ['id']);

    $postId = (int)$input['id'];

    $db = new Database();

    // Check if post exists
    $existing = $db->queryOne("SELECT title FROM posts WHERE id = :id", ['id' => $postId]);
    if (!$existing) {
        sendError('Post not found', 404);
    }

    // Delete post
    $sql = "DELETE FROM posts WHERE id = :id";
    $db->execute($sql, ['id' => $postId]);

    logMessage("Post deleted: {$existing['title']} (ID: {$postId}) by user {$auth['user']['username']}", 'INFO');

    sendSuccess(null, 'Post deleted successfully');

} catch (Exception $e) {
    logMessage("Error deleting post: " . $e->getMessage(), 'ERROR');
    sendError('Failed to delete post', 500);
}
