<?php
/**
 * Authentication Endpoint - Login
 *
 * POST /api/auth/login
 * Body: { "username": "admin", "password": "password" }
 * Returns: { "success": true, "token": "jwt-token", "user": {...} }
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
    // Check rate limit (5 attempts per 15 minutes)
    checkRateLimit('login', 5, 900);

    // Validate payload size
    validateJsonInputSize();

    // Get input data
    $input = getJsonInput();

    if (!$input) {
        sendError('No input data provided', 400);
    }

    // Validate required fields
    validateRequired($input, ['username', 'password']);

    $username = sanitizeString($input['username']);
    $password = $input['password'];

    // Validate input lengths
    validateInputLength($username, 'username', 100);
    validateInputLength($password, 'password', 255);

    // Get user from database
    $db = new Database();
    $sql = "SELECT id, username, email, password_hash, is_admin, is_active, role
            FROM users
            WHERE username = :username
            LIMIT 1";

    $user = $db->queryOne($sql, ['username' => $username]);

    // Check if user exists
    if (!$user) {
        // Log failed login attempt
        logMessage("Failed login attempt for username: $username", 'WARNING');
        sendError('Invalid username or password', 401);
    }

    // Check if user is active
    if (!$user['is_active']) {
        logMessage("Login attempt for inactive user: $username", 'WARNING');
        sendError('Account is disabled', 403);
    }

    // Verify password
    if (!password_verify($password, $user['password_hash'])) {
        logMessage("Failed login attempt for username: $username (wrong password)", 'WARNING');
        sendError('Invalid username or password', 401);
    }

    // Update last login timestamp
    $updateSql = "UPDATE users SET last_login = NOW() WHERE id = :id";
    $db->execute($updateSql, ['id' => $user['id']]);

    // Generate JWT token
    $tokenPayload = [
        'user_id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'is_admin' => (bool)$user['is_admin'],
        'role' => $user['role'] ?? 'client'
    ];

    $token = generateJWT($tokenPayload);

    // Log successful login
    logMessage("Successful login for user: {$user['username']} (ID: {$user['id']})", 'INFO');

    // Return response (without password hash)
    // Note: Return token and user at root level (not wrapped in 'data') for frontend compatibility
    sendResponse([
        'success' => true,
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'is_admin' => (bool)$user['is_admin'],
            'role' => $user['role'] ?? 'client'
        ]
    ], 200);

} catch (Exception $e) {
    logMessage("Login error: " . $e->getMessage(), 'ERROR');
    sendError('An error occurred during login', 500);
}
