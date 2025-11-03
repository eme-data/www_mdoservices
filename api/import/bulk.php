<?php
/**
 * Import Endpoint - Bulk Import Posts
 *
 * POST /api/import/bulk
 * Body: {
 *   "posts": [
 *     {
 *       "title": "Article Title",
 *       "slug": "article-slug",
 *       "excerpt": "Description",
 *       "content": "<p>Content</p>",
 *       "category_slug": "category-slug",
 *       "tags": ["tag1", "tag2"],
 *       "cover_image_url": "https://...",
 *       "author_name": "Author",
 *       "published_at": "2024-01-01 10:00:00"
 *     }
 *   ],
 *   "skip_duplicates": true
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

// Only admin users can import
if (!$auth['user']['is_admin']) {
    sendError('Admin access required', 403);
}

try {
    // Get and validate input
    $input = getJsonInput();
    validateRequired($input, ['posts']);

    if (!is_array($input['posts'])) {
        sendError('Posts must be an array', 400);
    }

    $skipDuplicates = isset($input['skip_duplicates']) ? $input['skip_duplicates'] : true;

    $db = new Database();
    $results = [
        'total' => count($input['posts']),
        'imported' => 0,
        'skipped' => 0,
        'errors' => []
    ];

    foreach ($input['posts'] as $index => $postData) {
        try {
            // Validate required fields
            if (empty($postData['title']) || empty($postData['slug'])) {
                throw new Exception("Missing required fields (title or slug)");
            }

            $title = sanitizeString($postData['title']);
            $slug = sanitizeString($postData['slug']);

            // Validate slug format
            if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
                throw new Exception("Invalid slug format");
            }

            // Check if slug already exists
            $existing = $db->queryOne("SELECT id FROM posts WHERE slug = :slug", ['slug' => $slug]);
            if ($existing) {
                if ($skipDuplicates) {
                    $results['skipped']++;
                    continue;
                } else {
                    throw new Exception("Slug already exists");
                }
            }

            // Handle category
            $categoryId = null;
            if (isset($postData['category_slug']) && !empty($postData['category_slug'])) {
                $category = $db->queryOne(
                    "SELECT id FROM categories WHERE slug = :slug",
                    ['slug' => $postData['category_slug']]
                );
                if ($category) {
                    $categoryId = $category['id'];
                }
            }

            // Prepare post data
            $excerpt = isset($postData['excerpt']) ? sanitizeString($postData['excerpt']) : null;
            $content = isset($postData['content']) ? $postData['content'] : null;
            $coverImageUrl = isset($postData['cover_image_url']) ? sanitizeString($postData['cover_image_url']) : null;
            $authorName = isset($postData['author_name']) ? sanitizeString($postData['author_name']) : $auth['user']['username'];
            $publishedAt = isset($postData['published_at']) && !empty($postData['published_at']) ? $postData['published_at'] : null;

            // Insert post
            $sql = "INSERT INTO posts (slug, title, excerpt, content, cover_image_url, author_name, category_id, published_at)
                    VALUES (:slug, :title, :excerpt, :content, :cover_image_url, :author_name, :category_id, :published_at)";

            $params = [
                'slug' => $slug,
                'title' => $title,
                'excerpt' => $excerpt,
                'content' => $content,
                'cover_image_url' => $coverImageUrl,
                'author_name' => $authorName,
                'category_id' => $categoryId,
                'published_at' => $publishedAt
            ];

            $db->execute($sql, $params);
            $postId = $db->lastInsertId();

            // Handle tags
            if (isset($postData['tags']) && is_array($postData['tags'])) {
                foreach ($postData['tags'] as $tagName) {
                    $tagName = sanitizeString($tagName);
                    $tagSlug = strtolower(preg_replace('/[^a-z0-9]+/', '-', $tagName));

                    // Get or create tag
                    $tag = $db->queryOne("SELECT id FROM tags WHERE slug = :slug", ['slug' => $tagSlug]);
                    if (!$tag) {
                        $db->execute(
                            "INSERT INTO tags (name, slug) VALUES (:name, :slug)",
                            ['name' => $tagName, 'slug' => $tagSlug]
                        );
                        $tagId = $db->lastInsertId();
                    } else {
                        $tagId = $tag['id'];
                    }

                    // Link tag to post
                    $db->execute(
                        "INSERT IGNORE INTO post_tags (post_id, tag_id) VALUES (:post_id, :tag_id)",
                        ['post_id' => $postId, 'tag_id' => $tagId]
                    );
                }
            }

            $results['imported']++;

        } catch (Exception $e) {
            $results['errors'][] = [
                'index' => $index,
                'title' => $postData['title'] ?? 'Unknown',
                'error' => $e->getMessage()
            ];
        }
    }

    logMessage("Bulk import completed: {$results['imported']} imported, {$results['skipped']} skipped, " . count($results['errors']) . " errors by user {$auth['user']['username']}", 'INFO');

    sendSuccess($results, 'Import completed');

} catch (Exception $e) {
    logMessage("Error in bulk import: " . $e->getMessage(), 'ERROR');
    sendError('Failed to import posts', 500);
}
