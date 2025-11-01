<?php
/**
 * Pricing Endpoint - Create New Pricing Item
 *
 * POST /api/pricing/create
 * Headers: Authorization: Bearer {admin-token}
 * Body: { "type": "solution", "solution": "Product Name", "prix_partenaire": "10,50", ... }
 * Returns: { "success": true, "data": {...} }
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../config/utils.php';

// Démarrer la session
session_start();

setCorsHeaders();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    // Vérifier l'authentification par session PHP
    if (empty($_SESSION['authenticated']) || empty($_SESSION['user_id'])) {
        sendError('Unauthorized - Authentication required', 401);
    }

    // Vérifier les privilèges admin
    if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
        sendError('Forbidden - Admin privileges required', 403);
    }

    // Get input data
    $input = getJsonInput();

    if (!$input) {
        sendError('No input data provided', 400);
    }

    // Validate required fields
    validateRequired($input, ['type', 'solution']);

    // Sanitize inputs
    $type = sanitizeString($input['type']);
    $solution = sanitizeString($input['solution']);

    // Convert comma to dot for decimal values
    $prixPartenaire = isset($input['prix_partenaire']) && $input['prix_partenaire'] !== ''
        ? str_replace(',', '.', $input['prix_partenaire'])
        : null;

    $commission = isset($input['commission']) && $input['commission'] !== ''
        ? str_replace(',', '.', $input['commission'])
        : null;

    $prixRevendeur = isset($input['prix_revendeur']) && $input['prix_revendeur'] !== ''
        ? str_replace(',', '.', $input['prix_revendeur'])
        : null;

    $prixPublic = isset($input['prix_public']) && $input['prix_public'] !== ''
        ? str_replace(',', '.', $input['prix_public'])
        : null;

    $displayOrder = isset($input['display_order']) ? (int)$input['display_order'] : 0;

    $db = new Database();

    // Insert new pricing item
    $sql = "INSERT INTO pricing_items
            (type, solution, prix_partenaire, commission, prix_revendeur, prix_public, display_order)
            VALUES
            (:type, :solution, :prix_partenaire, :commission, :prix_revendeur, :prix_public, :display_order)";

    $params = [
        'type' => $type,
        'solution' => $solution,
        'prix_partenaire' => $prixPartenaire,
        'commission' => $commission,
        'prix_revendeur' => $prixRevendeur,
        'prix_public' => $prixPublic,
        'display_order' => $displayOrder
    ];

    $db->execute($sql, $params);
    $insertedId = $db->lastInsertId();

    // Fetch the newly created item
    $fetchSql = "SELECT * FROM pricing_items WHERE id = :id";
    $newItem = $db->queryOne($fetchSql, ['id' => $insertedId]);

    // Convert decimals to French format
    if ($newItem['prix_partenaire'] !== null) {
        $newItem['prix_partenaire'] = str_replace('.', ',', $newItem['prix_partenaire']);
    }
    if ($newItem['commission'] !== null) {
        $newItem['commission'] = str_replace('.', ',', $newItem['commission']);
    }
    if ($newItem['prix_revendeur'] !== null) {
        $newItem['prix_revendeur'] = str_replace('.', ',', $newItem['prix_revendeur']);
    }
    if ($newItem['prix_public'] !== null) {
        $newItem['prix_public'] = str_replace('.', ',', $newItem['prix_public']);
    }

    logMessage("Created pricing item ID: $insertedId", 'INFO');

    sendSuccess($newItem, 'Pricing item created successfully');

} catch (Exception $e) {
    logMessage("Error creating pricing item: " . $e->getMessage(), 'ERROR');
    sendError('Failed to create pricing item', 500);
}
