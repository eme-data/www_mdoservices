<?php
/**
 * Authentication Endpoint - Verify Token
 *
 * GET /api/auth/verify
 * Headers: Authorization: Bearer {token}
 * Returns: { "success": true, "user": {...} }
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/utils.php';

setCorsHeaders();

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

try {
    // Verify authentication
    $user = requireAuth();

    // Return user data
    sendSuccess([
        'user' => [
            'id' => $user['user_id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'is_admin' => $user['is_admin']
        ]
    ], 'Token is valid');

} catch (Exception $e) {
    logMessage("Token verification error: " . $e->getMessage(), 'ERROR');
    sendError('Token verification failed', 401);
}
