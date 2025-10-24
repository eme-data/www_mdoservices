<?php
/**
 * Pricing Endpoint - Reorder Pricing Items
 *
 * POST /api/pricing/reorder
 * Headers: Authorization: Bearer {admin-token}
 * Body: { "items": [{"id": 1, "display_order": 0}, {"id": 2, "display_order": 1}, ...] }
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

try {
    // Require admin authentication
    requireAdmin();

    // Get input data
    $input = getJsonInput();

    if (!$input) {
        sendError('No input data provided', 400);
    }

    // Validate required fields
    if (!isset($input['items']) || !is_array($input['items'])) {
        sendError('Items array is required', 400);
    }

    $items = $input['items'];

    if (empty($items)) {
        sendError('Items array cannot be empty', 400);
    }

    $db = new Database();

    // Use transaction for atomic updates
    $db->beginTransaction();

    try {
        // Update each item's display_order
        $sql = "UPDATE pricing_items SET display_order = :display_order WHERE id = :id";

        foreach ($items as $item) {
            if (!isset($item['id']) || !isset($item['display_order'])) {
                throw new Exception('Each item must have id and display_order');
            }

            $params = [
                'id' => (int)$item['id'],
                'display_order' => (int)$item['display_order']
            ];

            $db->execute($sql, $params);
        }

        // Commit transaction
        $db->commit();

        logMessage("Reordered " . count($items) . " pricing items", 'INFO');

        sendSuccess(null, 'Pricing items reordered successfully');

    } catch (Exception $e) {
        // Rollback on error
        $db->rollback();
        throw $e;
    }

} catch (Exception $e) {
    logMessage("Error reordering pricing items: " . $e->getMessage(), 'ERROR');
    sendError('Failed to reorder pricing items', 500);
}
