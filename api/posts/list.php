<?php
/**
 * Posts Endpoint - List Published Posts
 *
 * GET /api/posts/list
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

try {
    $db = new Database();

    // Query to get all published posts (only posts with published_at set)
    // Ordered by published_at descending (most recent first)
    $sql = "SELECT id, slug, title, excerpt, content, cover_image_url,
                   author_name, published_at, created_at, updated_at
            FROM posts
            WHERE published_at IS NOT NULL
            ORDER BY published_at DESC";

    $posts = $db->query($sql);

    // Return posts
    sendSuccess($posts);

} catch (Exception $e) {
    logMessage("Error fetching posts: " . $e->getMessage(), 'ERROR');
    sendError('Failed to fetch posts', 500);
}
