<?php
/**
 * Password Reset Request Endpoint
 *
 * POST /api/auth/request-reset
 * Body: { "email": "user@example.com" }
 * Returns: { "success": true, "message": "Email sent" }
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
    // Check rate limit (3 attempts per 15 minutes)
    checkRateLimit('password-reset', 3, 900);

    // Validate payload size
    validateJsonInputSize();

    // Get input data
    $input = getJsonInput();

    if (!$input) {
        sendError('No input data provided', 400);
    }

    // Validate required fields
    validateRequired($input, ['email']);

    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);

    // Validate email length
    validateInputLength($email, 'email', 255);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendError('Invalid email format', 400);
    }

    $db = new Database();

    // Check if user exists
    $sql = "SELECT id, username, email, is_active FROM users WHERE email = :email LIMIT 1";
    $user = $db->queryOne($sql, ['email' => $email]);

    // For security, always return success even if user doesn't exist
    // This prevents email enumeration attacks
    if (!$user) {
        logMessage("Password reset requested for non-existent email: $email", 'WARNING');
        sendSuccess(null, 'Si cette adresse email existe, un lien de réinitialisation a été envoyé.');
    }

    // Check if user is active
    if (!$user['is_active']) {
        logMessage("Password reset requested for inactive user: {$user['username']}", 'WARNING');
        sendSuccess(null, 'Si cette adresse email existe, un lien de réinitialisation a été envoyé.');
    }

    // Generate secure token
    $token = bin2hex(random_bytes(32)); // 64 character token
    $expiresAt = date('Y-m-d H:i:s', strtotime('+1 hour')); // Token valid for 1 hour

    // Delete any existing tokens for this email
    $deleteSql = "DELETE FROM password_resets WHERE email = :email";
    $db->execute($deleteSql, ['email' => $email]);

    // Insert new token
    $insertSql = "INSERT INTO password_resets (email, token, expires_at)
                  VALUES (:email, :token, :expires_at)";
    $db->execute($insertSql, [
        'email' => $email,
        'token' => $token,
        'expires_at' => $expiresAt
    ]);

    // Build reset URL
    $resetUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http')
                . "://" . $_SERVER['HTTP_HOST'] . "/partner/reset-password?token=$token";

    // Send email
    $emailSent = sendPasswordResetEmail($email, $user['username'], $resetUrl, $token);

    if (!$emailSent) {
        logMessage("Failed to send password reset email to: $email", 'ERROR');
        // Don't reveal to user that email failed to send
    }

    logMessage("Password reset token generated for user: {$user['username']} (email: $email)", 'INFO');

    sendSuccess(null, 'Si cette adresse email existe, un lien de réinitialisation a été envoyé.');

} catch (Exception $e) {
    logMessage("Password reset request error: " . $e->getMessage(), 'ERROR');
    sendError('Une erreur est survenue. Veuillez réessayer plus tard.', 500);
}

/**
 * Send password reset email
 *
 * IMPORTANT: This function uses PHP's native mail() function which:
 * - May not work on all hosting environments (requires proper mail server configuration)
 * - Can be unreliable and emails may end up in spam folders
 * - Has no built-in error handling or retry mechanism
 *
 * RECOMMENDED ALTERNATIVES:
 * 1. PHPMailer (https://github.com/PHPMailer/PHPMailer) - Full-featured SMTP library
 * 2. Symfony Mailer - Modern email sending component
 * 3. SendGrid/Mailgun/AWS SES - Professional email services with APIs
 * 4. Hostinger's SMTP server (if using Hostinger) with proper authentication
 *
 * For production, configure SMTP settings in config.php and use a proper email library.
 *
 * @param string $email
 * @param string $username
 * @param string $resetUrl
 * @param string $token
 * @return bool
 */
function sendPasswordResetEmail($email, $username, $resetUrl, $token) {
    $subject = "Réinitialisation de votre mot de passe - MDO Services";

    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #14b8a6 100%); color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 5px 5px; }
            .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
            .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 10px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Réinitialisation de mot de passe</h1>
            </div>
            <div class='content'>
                <p>Bonjour <strong>$username</strong>,</p>

                <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte MDO Services.</p>

                <p>Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>

                <p style='text-align: center;'>
                    <a href='$resetUrl' class='button'>Réinitialiser mon mot de passe</a>
                </p>

                <div class='warning'>
                    <strong>⚠️ Important :</strong> Ce lien est valable pendant <strong>1 heure</strong> seulement.
                </div>

                <p>Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :</p>
                <p style='word-break: break-all; color: #3b82f6;'>$resetUrl</p>

                <p><strong>Vous n'avez pas demandé cette réinitialisation ?</strong><br>
                Ignorez simplement cet email. Votre mot de passe restera inchangé.</p>

                <div class='footer'>
                    <p>Cet email a été envoyé automatiquement par MDO Services.<br>
                    Pour toute question, contactez-nous à contact@mdoservices.fr</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";

    // Headers for HTML email
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: MDO Services <noreply@mdoservices.fr>',
        'Reply-To: contact@mdoservices.fr',
        'X-Mailer: PHP/' . phpversion()
    ];

    // Send email
    return mail($email, $subject, $message, implode("\r\n", $headers));
}
