<?php
/**
 * Posts Endpoint - Get Single Post by Slug
 *
 * GET /api/posts/get?slug=post-slug
 * Returns: { "success": true, "data": {...} }
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
    // Get slug parameter
    if (!isset($_GET['slug']) || empty($_GET['slug'])) {
        sendError('Slug parameter is required', 400);
    }

    $slug = sanitizeString($_GET['slug']);

    $db = new Database();

    // Query to get post by slug
    $sql = "SELECT id, slug, title, excerpt, content, cover_image_url,
                   author_name, published_at, created_at, updated_at
            FROM posts
            WHERE slug = :slug
            LIMIT 1";

    $post = $db->queryOne($sql, ['slug' => $slug]);

    // Check if post exists
    if (!$post) {
        sendError('Post not found', 404);
    }

    // Check if post is published (optional - remove if you want drafts visible)
    if ($post['published_at'] === null) {
        sendError('Post not published', 404);
    }

    // Return post
    sendSuccess($post);

} catch (Exception $e) {
    logMessage("Error fetching post by slug: " . $e->getMessage(), 'ERROR');
    sendError('Failed to fetch post', 500);
}
