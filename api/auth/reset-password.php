<?php
/**
 * Password Reset Endpoint
 *
 * POST /api/auth/reset-password
 * Body: { "token": "...", "password": "newpassword" }
 * Returns: { "success": true, "message": "Password reset successfully" }
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../config/utils.php';

setCorsHeaders();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    // Get input data
    $input = getJsonInput();

    if (!$input) {
        sendError('No input data provided', 400);
    }

    // Validate required fields
    validateRequired($input, ['token', 'password']);

    $token = sanitizeString($input['token']);
    $newPassword = $input['password'];

    // Validate password strength
    if (strlen($newPassword) < 8) {
        sendError('Le mot de passe doit contenir au moins 8 caractères', 400);
    }

    $db = new Database();

    // Find valid token
    $sql = "SELECT id, email, expires_at, used
            FROM password_resets
            WHERE token = :token
            LIMIT 1";

    $resetRequest = $db->queryOne($sql, ['token' => $token]);

    // Validate token
    if (!$resetRequest) {
        logMessage("Invalid password reset token attempted: $token", 'WARNING');
        sendError('Lien de réinitialisation invalide ou expiré', 400);
    }

    // Check if token has been used
    if ($resetRequest['used']) {
        logMessage("Used password reset token attempted: $token", 'WARNING');
        sendError('Ce lien a déjà été utilisé', 400);
    }

    // Check if token is expired
    if (strtotime($resetRequest['expires_at']) < time()) {
        logMessage("Expired password reset token attempted: $token", 'WARNING');
        sendError('Ce lien a expiré. Veuillez demander un nouveau lien', 400);
    }

    $email = $resetRequest['email'];

    // Get user
    $userSql = "SELECT id, username FROM users WHERE email = :email LIMIT 1";
    $user = $db->queryOne($userSql, ['email' => $email]);

    if (!$user) {
        logMessage("Password reset for non-existent user with email: $email", 'ERROR');
        sendError('Utilisateur introuvable', 404);
    }

    // Hash new password
    $passwordHash = password_hash($newPassword, PASSWORD_DEFAULT);

    // Update password
    $updateSql = "UPDATE users SET password_hash = :password_hash WHERE id = :id";
    $db->execute($updateSql, [
        'password_hash' => $passwordHash,
        'id' => $user['id']
    ]);

    // Mark token as used
    $markUsedSql = "UPDATE password_resets SET used = 1 WHERE id = :id";
    $db->execute($markUsedSql, ['id' => $resetRequest['id']]);

    logMessage("Password successfully reset for user: {$user['username']} (email: $email)", 'INFO');

    sendSuccess(null, 'Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.');

} catch (Exception $e) {
    logMessage("Password reset error: " . $e->getMessage(), 'ERROR');
    sendError('Une erreur est survenue lors de la réinitialisation', 500);
}
