<?php
/**
 * Posts Endpoint - Create New Post
 *
 * POST /api/posts/create
 * Body: {
 *   "title": "Article Title",
 *   "slug": "article-slug",
 *   "excerpt": "Short description",
 *   "content": "Full article content",
 *   "cover_image_url": "https://...",
 *   "author_name": "Author Name",
 *   "published_at": "2024-01-01 10:00:00" or null for draft
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

// Only admin users can create posts
if (!$auth['user']['is_admin']) {
    sendError('Admin access required', 403);
}

try {
    // Get and validate input
    $input = getJsonInput();

    // Validate required fields
    validateRequired($input, ['title', 'slug']);

    // Sanitize inputs
    $title = sanitizeString($input['title']);
    $slug = sanitizeString($input['slug']);
    $excerpt = isset($input['excerpt']) ? sanitizeString($input['excerpt']) : null;
    $content = isset($input['content']) ? $input['content'] : null; // Allow HTML
    $cover_image_url = isset($input['cover_image_url']) ? sanitizeString($input['cover_image_url']) : null;
    $author_name = isset($input['author_name']) ? sanitizeString($input['author_name']) : $auth['user']['username'];
    $published_at = isset($input['published_at']) && !empty($input['published_at']) ? $input['published_at'] : null;
    $category_id = isset($input['category_id']) && !empty($input['category_id']) ? intval($input['category_id']) : null;
    $tag_ids = isset($input['tag_ids']) && is_array($input['tag_ids']) ? $input['tag_ids'] : [];

    // Validate slug format (lowercase, hyphens, no spaces)
    if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
        sendError('Slug must contain only lowercase letters, numbers and hyphens', 400);
    }

    $db = new Database();

    // Check if slug already exists
    $existing = $db->queryOne("SELECT id FROM posts WHERE slug = :slug", ['slug' => $slug]);
    if ($existing) {
        sendError('An article with this slug already exists', 400);
    }

    // Insert post
    $sql = "INSERT INTO posts (slug, title, excerpt, content, cover_image_url, author_name, category_id, published_at)
            VALUES (:slug, :title, :excerpt, :content, :cover_image_url, :author_name, :category_id, :published_at)";

    $params = [
        'slug' => $slug,
        'title' => $title,
        'excerpt' => $excerpt,
        'content' => $content,
        'cover_image_url' => $cover_image_url,
        'author_name' => $author_name,
        'category_id' => $category_id,
        'published_at' => $published_at
    ];

    $db->execute($sql, $params);
    $postId = $db->lastInsertId();

    // Insert tags
    foreach ($tag_ids as $tagId) {
        $tagId = intval($tagId);
        $db->execute(
            "INSERT IGNORE INTO post_tags (post_id, tag_id) VALUES (:post_id, :tag_id)",
            ['post_id' => $postId, 'tag_id' => $tagId]
        );
    }

    // Get created post
    $post = $db->queryOne("SELECT * FROM posts WHERE id = :id", ['id' => $postId]);

    logMessage("Post created: {$title} (ID: {$postId}) by user {$auth['user']['username']}", 'INFO');

    sendSuccess($post, 'Post created successfully');

} catch (Exception $e) {
    logMessage("Error creating post: " . $e->getMessage(), 'ERROR');
    sendError('Failed to create post', 500);
}
