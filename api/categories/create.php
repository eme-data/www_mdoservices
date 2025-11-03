<?php
/**
 * Categories Endpoint - Create New Category
 *
 * POST /api/categories/create
 * Body: {
 *   "name": "Category Name",
 *   "slug": "category-slug",
 *   "description": "Description",
 *   "color": "#3B82F6"
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

// Only admin users can create categories
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
    $description = isset($input['description']) ? sanitizeString($input['description']) : null;
    $color = isset($input['color']) ? sanitizeString($input['color']) : '#3B82F6';

    // Validate slug format (lowercase, hyphens, no spaces)
    if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
        sendError('Slug must contain only lowercase letters, numbers and hyphens', 400);
    }

    // Validate color format (hex color)
    if (!preg_match('/^#[0-9A-F]{6}$/i', $color)) {
        sendError('Color must be a valid hex color (e.g., #3B82F6)', 400);
    }

    $db = new Database();

    // Check if slug already exists
    $existing = $db->queryOne("SELECT id FROM categories WHERE slug = :slug", ['slug' => $slug]);
    if ($existing) {
        sendError('A category with this slug already exists', 400);
    }

    // Get max display_order
    $maxOrder = $db->queryOne("SELECT MAX(display_order) as max_order FROM categories");
    $displayOrder = ($maxOrder['max_order'] ?? 0) + 1;

    // Insert category
    $sql = "INSERT INTO categories (name, slug, description, color, display_order)
            VALUES (:name, :slug, :description, :color, :display_order)";

    $params = [
        'name' => $name,
        'slug' => $slug,
        'description' => $description,
        'color' => $color,
        'display_order' => $displayOrder
    ];

    $db->execute($sql, $params);
    $categoryId = $db->lastInsertId();

    // Get created category
    $category = $db->queryOne("SELECT * FROM categories WHERE id = :id", ['id' => $categoryId]);

    logMessage("Category created: {$name} (ID: {$categoryId}) by user {$auth['user']['username']}", 'INFO');

    sendSuccess($category, 'Category created successfully');

} catch (Exception $e) {
    logMessage("Error creating category: " . $e->getMessage(), 'ERROR');
    sendError('Failed to create category', 500);
}
