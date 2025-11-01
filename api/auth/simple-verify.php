<?php
/**
 * Simple Verify API - Vérification de Session
 */

session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ob_start();

try {
    // Vérifier si l'utilisateur est authentifié
    if (!isset($_SESSION['authenticated']) || !$_SESSION['authenticated']) {
        throw new Exception('Not authenticated');
    }

    ob_end_clean();

    echo json_encode([
        'success' => true,
        'authenticated' => true,
        'user' => [
            'id' => $_SESSION['user_id'] ?? null,
            'username' => $_SESSION['username'] ?? null,
            'role' => $_SESSION['role'] ?? null,
            'is_admin' => $_SESSION['is_admin'] ?? false
        ]
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    ob_end_clean();

    http_response_code(401);
    echo json_encode([
        'success' => false,
        'authenticated' => false,
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
