<?php
/**
 * Pricing Endpoint - Delete Pricing Item
 *
 * POST /api/pricing/delete
 * Headers: Authorization: Bearer {admin-token}
 * Body: { "id": 1 }
 * Returns: { "success": true }
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../config/utils.php';

setCorsHeaders();

// Accept POST and DELETE requests
if (!in_array($_SERVER['REQUEST_METHOD'], ['POST', 'DELETE'])) {
    sendError('Method not allowed', 405);
}

try {
    // Require admin authentication
    requireAdmin();

    // Get input data
    $input = getJsonInput();

    if (!$input) {
        sendError('No input data provided', 400);
    }

    // Validate required fields
    validateRequired($input, ['id']);

    $id = (int)$input['id'];

    $db = new Database();

    // Check if item exists
    $checkSql = "SELECT id FROM pricing_items WHERE id = :id";
    $existing = $db->queryOne($checkSql, ['id' => $id]);

    if (!$existing) {
        sendError('Pricing item not found', 404);
    }

    // Delete the item
    $sql = "DELETE FROM pricing_items WHERE id = :id";
    $db->execute($sql, ['id' => $id]);

    logMessage("Deleted pricing item ID: $id", 'INFO');

    sendSuccess(null, 'Pricing item deleted successfully');

} catch (Exception $e) {
    logMessage("Error deleting pricing item: " . $e->getMessage(), 'ERROR');
    sendError('Failed to delete pricing item', 500);
}
