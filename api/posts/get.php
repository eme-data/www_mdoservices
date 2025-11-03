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

    // Query to get post by slug with category info
    $sql = "SELECT p.id, p.slug, p.title, p.excerpt, p.content, p.cover_image_url,
                   p.author_name, p.category_id, p.published_at, p.created_at, p.updated_at,
                   c.name as category_name, c.slug as category_slug, c.color as category_color
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.slug = :slug
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

    // Get tags
    $tags = $db->query(
        "SELECT t.id, t.name, t.slug
         FROM tags t
         INNER JOIN post_tags pt ON t.id = pt.tag_id
         WHERE pt.post_id = :post_id
         ORDER BY t.name ASC",
        ['post_id' => $post['id']]
    );
    $post['tags'] = $tags;

    // Return post
    sendSuccess($post);

} catch (Exception $e) {
    logMessage("Error fetching post by slug: " . $e->getMessage(), 'ERROR');
    sendError('Failed to fetch post', 500);
}
