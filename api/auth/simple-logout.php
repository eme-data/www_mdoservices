<?php
/**
 * Simple Logout API - Déconnexion
 */

session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ob_start();

try {
    // Détruire la session
    session_unset();
    session_destroy();

    ob_end_clean();

    echo json_encode([
        'success' => true,
        'message' => 'Logged out successfully'
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    ob_end_clean();

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Logout failed',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
