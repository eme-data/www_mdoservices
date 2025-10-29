<?php
/**
 * Posts Endpoint - List All Posts (including drafts)
 * For admin use only
 *
 * GET /api/posts/list-all
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

// Only admin users can list all posts
if (!$auth['user']['is_admin']) {
    sendError('Admin access required', 403);
}

try {
    $db = new Database();

    // Query to get ALL posts (published and drafts)
    // Ordered by created_at descending (most recent first)
    $sql = "SELECT id, slug, title, excerpt, content, cover_image_url,
                   author_name, published_at, created_at, updated_at
            FROM posts
            ORDER BY created_at DESC";

    $posts = $db->query($sql);

    // Add status field for easier frontend handling
    foreach ($posts as &$post) {
        $post['status'] = $post['published_at'] ? 'published' : 'draft';
    }

    sendSuccess($posts);

} catch (Exception $e) {
    logMessage("Error fetching all posts: " . $e->getMessage(), 'ERROR');
    sendError('Failed to fetch posts', 500);
}
