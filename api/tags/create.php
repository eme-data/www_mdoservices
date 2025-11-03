<?php
/**
 * Tags Endpoint - Create New Tag
 *
 * POST /api/tags/create
 * Body: {
 *   "name": "Tag Name",
 *   "slug": "tag-slug"
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

// Only admin users can create tags
if (!$auth['user']['is_admin']) {
    sendError('Admin access required', 403);
}

try {
    // Get and validate input
    $input = getJsonInput();

    // Validate required fields
    validateRequired($input, ['name', 'slug']);

    // Sanitize inputs
    $name = sanitizeString($input['name']);
    $slug = sanitizeString($input['slug']);

    // Validate slug format (lowercase, hyphens, no spaces)
    if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
        sendError('Slug must contain only lowercase letters, numbers and hyphens', 400);
    }

    $db = new Database();

    // Check if slug already exists
    $existing = $db->queryOne("SELECT id FROM tags WHERE slug = :slug", ['slug' => $slug]);
    if ($existing) {
        sendError('A tag with this slug already exists', 400);
    }

    // Insert tag
    $sql = "INSERT INTO tags (name, slug) VALUES (:name, :slug)";
    $params = ['name' => $name, 'slug' => $slug];

    $db->execute($sql, $params);
    $tagId = $db->lastInsertId();

    // Get created tag
    $tag = $db->queryOne("SELECT * FROM tags WHERE id = :id", ['id' => $tagId]);

    logMessage("Tag created: {$name} (ID: {$tagId}) by user {$auth['user']['username']}", 'INFO');

    sendSuccess($tag, 'Tag created successfully');

} catch (Exception $e) {
    logMessage("Error creating tag: " . $e->getMessage(), 'ERROR');
    sendError('Failed to create tag', 500);
}
