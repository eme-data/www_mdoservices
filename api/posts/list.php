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

    // Query to get all published posts with category info
    $sql = "SELECT p.id, p.slug, p.title, p.excerpt, p.content, p.cover_image_url,
                   p.author_name, p.category_id, p.published_at, p.created_at, p.updated_at,
                   c.name as category_name, c.slug as category_slug, c.color as category_color
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.published_at IS NOT NULL
            ORDER BY p.published_at DESC";

    $posts = $db->query($sql);

    // Add tags to each post
    foreach ($posts as &$post) {
        $tags = $db->query(
            "SELECT t.id, t.name, t.slug
             FROM tags t
             INNER JOIN post_tags pt ON t.id = pt.tag_id
             WHERE pt.post_id = :post_id
             ORDER BY t.name ASC",
            ['post_id' => $post['id']]
        );
        $post['tags'] = $tags;
    }

    // Return posts
    sendSuccess($posts);

} catch (Exception $e) {
    logMessage("Error fetching posts: " . $e->getMessage(), 'ERROR');
    sendError('Failed to fetch posts', 500);
}
