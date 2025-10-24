<?php
/**
 * Verify Reset Token Endpoint
 *
 * GET /api/auth/verify-reset-token?token=...
 * Returns: { "success": true, "data": { "email": "...", "valid": true } }
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
    // Get token parameter
    if (!isset($_GET['token']) || empty($_GET['token'])) {
        sendError('Token parameter is required', 400);
    }

    $token = sanitizeString($_GET['token']);

    $db = new Database();

    // Find token
    $sql = "SELECT id, email, expires_at, used
            FROM password_resets
            WHERE token = :token
            LIMIT 1";

    $resetRequest = $db->queryOne($sql, ['token' => $token]);

    // Check if token exists
    if (!$resetRequest) {
        sendSuccess([
            'valid' => false,
            'reason' => 'invalid',
            'message' => 'Lien de réinitialisation invalide'
        ]);
    }

    // Check if token has been used
    if ($resetRequest['used']) {
        sendSuccess([
            'valid' => false,
            'reason' => 'used',
            'message' => 'Ce lien a déjà été utilisé'
        ]);
    }

    // Check if token is expired
    if (strtotime($resetRequest['expires_at']) < time()) {
        sendSuccess([
            'valid' => false,
            'reason' => 'expired',
            'message' => 'Ce lien a expiré. Veuillez demander un nouveau lien'
        ]);
    }

    // Token is valid
    sendSuccess([
        'valid' => true,
        'email' => $resetRequest['email']
    ]);

} catch (Exception $e) {
    logMessage("Token verification error: " . $e->getMessage(), 'ERROR');
    sendError('Erreur lors de la vérification du lien', 500);
}
