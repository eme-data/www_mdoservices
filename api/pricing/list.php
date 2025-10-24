<?php
/**
 * Pricing Endpoint - List All Pricing Items
 *
 * GET /api/pricing/list
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

    // Query to get all pricing items ordered by display_order
    $sql = "SELECT id, type, solution, prix_partenaire, commission,
                   prix_revendeur, prix_public, display_order,
                   created_at, updated_at
            FROM pricing_items
            ORDER BY display_order ASC, id ASC";

    $items = $db->query($sql);

    // Convert decimal values to strings with comma (French format)
    // This matches the current Supabase format
    foreach ($items as &$item) {
        if ($item['prix_partenaire'] !== null) {
            $item['prix_partenaire'] = str_replace('.', ',', $item['prix_partenaire']);
        }
        if ($item['commission'] !== null) {
            $item['commission'] = str_replace('.', ',', $item['commission']);
        }
        if ($item['prix_revendeur'] !== null) {
            $item['prix_revendeur'] = str_replace('.', ',', $item['prix_revendeur']);
        }
        if ($item['prix_public'] !== null) {
            $item['prix_public'] = str_replace('.', ',', $item['prix_public']);
        }
    }

    // Return pricing items
    sendSuccess($items);

} catch (Exception $e) {
    logMessage("Error fetching pricing items: " . $e->getMessage(), 'ERROR');
    sendError('Failed to fetch pricing items', 500);
}
