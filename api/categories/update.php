<?php
/**
 * Categories Endpoint - Update Category
 *
 * POST /api/categories/update
 * Body: {
 *   "id": 1,
 *   "name": "Updated Name",
 *   "slug": "updated-slug",
 *   "description": "Updated description",
 *   "color": "#10B981"
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

// Only admin users can update categories
if (!$auth['user']['is_admin']) {
    sendError('Admin access required', 403);
}

try {
    // Get and validate input
    $input = getJsonInput();

    // Validate required fields
    validateRequired($input, ['id']);

    $id = intval($input['id']);
    $db = new Database();

    // Check if category exists
    $category = $db->queryOne("SELECT * FROM categories WHERE id = :id", ['id' => $id]);
    if (!$category) {
        sendError('Category not found', 404);
    }

    // Build update query dynamically
    $updates = [];
    $params = ['id' => $id];

    if (isset($input['name'])) {
        $updates[] = "name = :name";
        $params['name'] = sanitizeString($input['name']);
    }

    if (isset($input['slug'])) {
        $slug = sanitizeString($input['slug']);
        if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
            sendError('Slug must contain only lowercase letters, numbers and hyphens', 400);
        }
        // Check if slug already exists (excluding current category)
        $existing = $db->queryOne(
            "SELECT id FROM categories WHERE slug = :slug AND id != :id",
            ['slug' => $slug, 'id' => $id]
        );
        if ($existing) {
            sendError('A category with this slug already exists', 400);
        }
        $updates[] = "slug = :slug";
        $params['slug'] = $slug;
    }

    if (isset($input['description'])) {
        $updates[] = "description = :description";
        $params['description'] = sanitizeString($input['description']);
    }

    if (isset($input['color'])) {
        $color = sanitizeString($input['color']);
        if (!preg_match('/^#[0-9A-F]{6}$/i', $color)) {
            sendError('Color must be a valid hex color (e.g., #3B82F6)', 400);
        }
        $updates[] = "color = :color";
        $params['color'] = $color;
    }

    if (isset($input['display_order'])) {
        $updates[] = "display_order = :display_order";
        $params['display_order'] = intval($input['display_order']);
    }

    if (empty($updates)) {
        sendError('No fields to update', 400);
    }

    // Execute update
    $sql = "UPDATE categories SET " . implode(', ', $updates) . " WHERE id = :id";
    $db->execute($sql, $params);

    // Get updated category
    $updated = $db->queryOne("SELECT * FROM categories WHERE id = :id", ['id' => $id]);

    logMessage("Category updated: ID {$id} by user {$auth['user']['username']}", 'INFO');

    sendSuccess($updated, 'Category updated successfully');

} catch (Exception $e) {
    logMessage("Error updating category: " . $e->getMessage(), 'ERROR');
    sendError('Failed to update category', 500);
}
