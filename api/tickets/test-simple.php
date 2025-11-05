<?php
/**
 * Test simple - retourne juste du JSON
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Credentials: true');

echo json_encode([
    'success' => true,
    'message' => 'API fonctionne!',
    'timestamp' => date('Y-m-d H:i:s')
]);
