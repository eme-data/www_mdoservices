<?php
/**
 * Pricing Endpoint - Update Pricing Item
 *
 * POST /api/pricing/update
 * Headers: Authorization: Bearer {admin-token}
 * Body: { "id": 1, "type": "solution", "solution": "Updated Name", ... }
 * Returns: { "success": true, "data": {...} }
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../config/utils.php';

setCorsHeaders();

// Accept POST and PUT requests
if (!in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT'])) {
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

    // Build update query dynamically based on provided fields
    $updateFields = [];
    $params = ['id' => $id];

    if (isset($input['type'])) {
        $updateFields[] = "type = :type";
        $params['type'] = sanitizeString($input['type']);
    }

    if (isset($input['solution'])) {
        $updateFields[] = "solution = :solution";
        $params['solution'] = sanitizeString($input['solution']);
    }

    if (isset($input['prix_partenaire'])) {
        $updateFields[] = "prix_partenaire = :prix_partenaire";
        $params['prix_partenaire'] = $input['prix_partenaire'] !== '' && $input['prix_partenaire'] !== null
            ? str_replace(',', '.', $input['prix_partenaire'])
            : null;
    }

    if (isset($input['commission'])) {
        $updateFields[] = "commission = :commission";
        $params['commission'] = $input['commission'] !== '' && $input['commission'] !== null
            ? str_replace(',', '.', $input['commission'])
            : null;
    }

    if (isset($input['prix_revendeur'])) {
        $updateFields[] = "prix_revendeur = :prix_revendeur";
        $params['prix_revendeur'] = $input['prix_revendeur'] !== '' && $input['prix_revendeur'] !== null
            ? str_replace(',', '.', $input['prix_revendeur'])
            : null;
    }

    if (isset($input['prix_public'])) {
        $updateFields[] = "prix_public = :prix_public";
        $params['prix_public'] = $input['prix_public'] !== '' && $input['prix_public'] !== null
            ? str_replace(',', '.', $input['prix_public'])
            : null;
    }

    if (isset($input['display_order'])) {
        $updateFields[] = "display_order = :display_order";
        $params['display_order'] = (int)$input['display_order'];
    }

    // If no fields to update
    if (empty($updateFields)) {
        sendError('No fields to update', 400);
    }

    // Execute update
    $sql = "UPDATE pricing_items SET " . implode(', ', $updateFields) . " WHERE id = :id";
    $db->execute($sql, $params);

    // Fetch updated item
    $fetchSql = "SELECT * FROM pricing_items WHERE id = :id";
    $updatedItem = $db->queryOne($fetchSql, ['id' => $id]);

    // Convert decimals to French format
    if ($updatedItem['prix_partenaire'] !== null) {
        $updatedItem['prix_partenaire'] = str_replace('.', ',', $updatedItem['prix_partenaire']);
    }
    if ($updatedItem['commission'] !== null) {
        $updatedItem['commission'] = str_replace('.', ',', $updatedItem['commission']);
    }
    if ($updatedItem['prix_revendeur'] !== null) {
        $updatedItem['prix_revendeur'] = str_replace('.', ',', $updatedItem['prix_revendeur']);
    }
    if ($updatedItem['prix_public'] !== null) {
        $updatedItem['prix_public'] = str_replace('.', ',', $updatedItem['prix_public']);
    }

    logMessage("Updated pricing item ID: $id", 'INFO');

    sendSuccess($updatedItem, 'Pricing item updated successfully');

} catch (Exception $e) {
    logMessage("Error updating pricing item: " . $e->getMessage(), 'ERROR');
    sendError('Failed to update pricing item', 500);
}
