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

    // Query to get ALL posts with category info
    $sql = "SELECT p.id, p.slug, p.title, p.excerpt, p.content, p.cover_image_url,
                   p.author_name, p.category_id, p.published_at, p.created_at, p.updated_at,
                   c.name as category_name, c.slug as category_slug, c.color as category_color
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.created_at DESC";

    $posts = $db->query($sql);

    // Add status field and tags for each post
    foreach ($posts as &$post) {
        $post['status'] = $post['published_at'] ? 'published' : 'draft';

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
    }

    sendSuccess($posts);

} catch (Exception $e) {
    logMessage("Error fetching all posts: " . $e->getMessage(), 'ERROR');
    sendError('Failed to fetch posts', 500);
}
