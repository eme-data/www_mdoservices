<?php
/**
 * Tags Endpoint - List All Tags
 *
 * GET /api/tags/list
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

    // Query to get all tags with usage count
    $sql = "SELECT t.id, t.name, t.slug, t.created_at,
                   COUNT(pt.post_id) as usage_count
            FROM tags t
            LEFT JOIN post_tags pt ON t.id = pt.tag_id
            GROUP BY t.id
            ORDER BY t.name ASC";

    $tags = $db->query($sql);

    // Return tags
    sendSuccess($tags);

} catch (Exception $e) {
    logMessage("Error fetching tags: " . $e->getMessage(), 'ERROR');
    sendError('Failed to fetch tags', 500);
}
