<?php
/**
 * Posts Endpoint - Update Existing Post
 *
 * POST /api/posts/update
 * Body: {
 *   "id": 1,
 *   "title": "Updated Title",
 *   "slug": "updated-slug",
 *   "excerpt": "Updated excerpt",
 *   "content": "Updated content",
 *   "cover_image_url": "https://...",
 *   "author_name": "Author Name",
 *   "published_at": "2024-01-01 10:00:00" or null
 * }
 * Returns: { "success": true, "data": {...} }
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

// Only admin users can update posts
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
    $existing = $db->queryOne("SELECT * FROM posts WHERE id = :id", ['id' => $postId]);
    if (!$existing) {
        sendError('Post not found', 404);
    }

    // Build update query dynamically based on provided fields
    $updates = [];
    $params = ['id' => $postId];

    if (isset($input['title'])) {
        $updates[] = "title = :title";
        $params['title'] = sanitizeString($input['title']);
    }

    if (isset($input['slug'])) {
        $slug = sanitizeString($input['slug']);

        // Validate slug format
        if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
            sendError('Slug must contain only lowercase letters, numbers and hyphens', 400);
        }

        // Check if slug already exists (except for current post)
        $slugExists = $db->queryOne(
            "SELECT id FROM posts WHERE slug = :slug AND id != :id",
            ['slug' => $slug, 'id' => $postId]
        );
        if ($slugExists) {
            sendError('An article with this slug already exists', 400);
        }

        $updates[] = "slug = :slug";
        $params['slug'] = $slug;
    }

    if (isset($input['excerpt'])) {
        $updates[] = "excerpt = :excerpt";
        $params['excerpt'] = sanitizeString($input['excerpt']);
    }

    if (isset($input['content'])) {
        $updates[] = "content = :content";
        $params['content'] = $input['content']; // Allow HTML
    }

    if (isset($input['cover_image_url'])) {
        $updates[] = "cover_image_url = :cover_image_url";
        $params['cover_image_url'] = sanitizeString($input['cover_image_url']);
    }

    if (isset($input['author_name'])) {
        $updates[] = "author_name = :author_name";
        $params['author_name'] = sanitizeString($input['author_name']);
    }

    if (isset($input['published_at'])) {
        $updates[] = "published_at = :published_at";
        $params['published_at'] = !empty($input['published_at']) ? $input['published_at'] : null;
    }

    // If no fields to update
    if (empty($updates)) {
        sendError('No fields to update', 400);
    }

    // Execute update
    $sql = "UPDATE posts SET " . implode(', ', $updates) . " WHERE id = :id";
    $db->execute($sql, $params);

    // Get updated post
    $post = $db->queryOne("SELECT * FROM posts WHERE id = :id", ['id' => $postId]);

    logMessage("Post updated: {$post['title']} (ID: {$postId}) by user {$auth['user']['username']}", 'INFO');

    sendSuccess($post, 'Post updated successfully');

} catch (Exception $e) {
    logMessage("Error updating post: " . $e->getMessage(), 'ERROR');
    sendError('Failed to update post', 500);
}
