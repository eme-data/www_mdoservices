<?php
/**
 * Categories Endpoint - Delete Category
 *
 * POST /api/categories/delete
 * Body: { "id": 1 }
 * Returns: { "success": true }
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

// Only admin users can delete categories
if (!$auth['user']['is_admin']) {
    sendError('Admin access required', 403);
}

try {
    // Get and validate input
    $input = getJsonInput();
    validateRequired($input, ['id']);

    $id = intval($input['id']);
    $db = new Database();

    // Check if category exists
    $category = $db->queryOne("SELECT * FROM categories WHERE id = :id", ['id' => $id]);
    if (!$category) {
        sendError('Category not found', 404);
    }

    // Check if category is used by any posts
    $usageCount = $db->queryOne(
        "SELECT COUNT(*) as count FROM posts WHERE category_id = :id",
        ['id' => $id]
    );

    if ($usageCount['count'] > 0) {
        sendError("Cannot delete category: {$usageCount['count']} post(s) are using this category. Please reassign or delete those posts first.", 400);
    }

    // Delete category
    $db->execute("DELETE FROM categories WHERE id = :id", ['id' => $id]);

    logMessage("Category deleted: {$category['name']} (ID: {$id}) by user {$auth['user']['username']}", 'INFO');

    sendSuccess(null, 'Category deleted successfully');

} catch (Exception $e) {
    logMessage("Error deleting category: " . $e->getMessage(), 'ERROR');
    sendError('Failed to delete category', 500);
}
