<?php
/**
 * Categories Endpoint - List All Categories
 *
 * GET /api/categories/list
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

    // Query to get all categories ordered by display_order
    $sql = "SELECT id, name, slug, description, color, display_order, created_at, updated_at
            FROM categories
            ORDER BY display_order ASC, name ASC";

    $categories = $db->query($sql);

    // Return categories
    sendSuccess($categories);

} catch (Exception $e) {
    logMessage("Error fetching categories: " . $e->getMessage(), 'ERROR');
    sendError('Failed to fetch categories', 500);
}
