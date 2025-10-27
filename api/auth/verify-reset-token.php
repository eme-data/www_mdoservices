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
        logMessage("Invalid password reset token attempted", 'WARNING');
        sendError('Lien de réinitialisation invalide', 400);
    }

    // Check if token has been used
    if ($resetRequest['used']) {
        logMessage("Used password reset token attempted", 'WARNING');
        sendError('Ce lien a déjà été utilisé', 400);
    }

    // Check if token is expired
    if (strtotime($resetRequest['expires_at']) < time()) {
        logMessage("Expired password reset token attempted", 'WARNING');
        sendError('Ce lien a expiré. Veuillez demander un nouveau lien', 400);
    }

    // Token is valid - return success with email
    sendSuccess([
        'valid' => true,
        'email' => $resetRequest['email']
    ], 'Token valide');

} catch (Exception $e) {
    logMessage("Token verification error: " . $e->getMessage(), 'ERROR');
    sendError('Erreur lors de la vérification du lien', 500);
}
