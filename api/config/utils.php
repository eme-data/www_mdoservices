<?php
/**
 * API Utility Functions
 */

/**
 * Set CORS headers
 */
function setCorsHeaders() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, CORS_ALLOWED_ORIGINS)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        header("Access-Control-Allow-Origin: " . CORS_ALLOWED_ORIGINS[0]);
    }

    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 3600");

    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

/**
 * Send JSON response
 * @param mixed $data Data to send
 * @param int $statusCode HTTP status code
 */
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

/**
 * Send error response
 * @param string $message Error message
 * @param int $statusCode HTTP status code
 */
function sendError($message, $statusCode = 400) {
    sendResponse([
        'success' => false,
        'error' => $message
    ], $statusCode);
}

/**
 * Send success response
 * @param mixed $data Data to send
 * @param string $message Optional success message
 */
function sendSuccess($data = null, $message = null) {
    $response = ['success' => true];

    if ($message !== null) {
        $response['message'] = $message;
    }

    if ($data !== null) {
        $response['data'] = $data;
    }

    sendResponse($response, 200);
}

/**
 * Get JSON input from request body
 * @return mixed
 */
function getJsonInput() {
    $input = file_get_contents('php://input');
    if (empty($input)) {
        return null;
    }

    $data = json_decode($input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendError('Invalid JSON input', 400);
    }

    return $data;
}

/**
 * Validate required fields in data
 * @param array $data Input data
 * @param array $requiredFields List of required field names
 * @return bool
 */
function validateRequired($data, $requiredFields) {
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || trim($data[$field]) === '') {
            sendError("Field '$field' is required", 400);
        }
    }
    return true;
}

/**
 * Sanitize string input
 * @param string $input
 * @return string
 */
function sanitizeString($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

/**
 * Generate JWT token
 * @param array $payload Token payload
 * @return string
 */
function generateJWT($payload) {
    $header = [
        'typ' => 'JWT',
        'alg' => 'HS256'
    ];

    $payload['iat'] = time();
    $payload['exp'] = time() + JWT_EXPIRATION;

    $base64Header = base64UrlEncode(json_encode($header));
    $base64Payload = base64UrlEncode(json_encode($payload));

    $signature = hash_hmac('sha256', "$base64Header.$base64Payload", JWT_SECRET, true);
    $base64Signature = base64UrlEncode($signature);

    return "$base64Header.$base64Payload.$base64Signature";
}

/**
 * Verify and decode JWT token
 * @param string $token JWT token
 * @return array|null Decoded payload or null if invalid
 */
function verifyJWT($token) {
    if (empty($token)) {
        return null;
    }

    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return null;
    }

    list($base64Header, $base64Payload, $base64Signature) = $parts;

    // Verify signature
    $signature = base64UrlDecode($base64Signature);
    $expectedSignature = hash_hmac('sha256', "$base64Header.$base64Payload", JWT_SECRET, true);

    if (!hash_equals($signature, $expectedSignature)) {
        return null;
    }

    // Decode payload
    $payload = json_decode(base64UrlDecode($base64Payload), true);

    // Check expiration
    if (isset($payload['exp']) && $payload['exp'] < time()) {
        return null;
    }

    return $payload;
}

/**
 * Get JWT token from Authorization header
 * @return string|null
 */
function getAuthToken() {
    $headers = getallheaders();

    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
        if (preg_match('/Bearer\s+(.+)/', $authHeader, $matches)) {
            return $matches[1];
        }
    }

    return null;
}

/**
 * Require authentication and return user data
 * @return array User data from JWT
 */
function requireAuth() {
    $token = getAuthToken();
    $payload = verifyJWT($token);

    if (!$payload) {
        sendError('Unauthorized - Invalid or expired token', 401);
    }

    return $payload;
}

/**
 * Require admin privileges
 * @return array User data from JWT
 */
function requireAdmin() {
    $user = requireAuth();

    if (empty($user['is_admin'])) {
        sendError('Forbidden - Admin privileges required', 403);
    }

    return $user;
}

/**
 * Base64 URL encode
 * @param string $data
 * @return string
 */
function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

/**
 * Base64 URL decode
 * @param string $data
 * @return string
 */
function base64UrlDecode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

/**
 * Log message to file
 * @param string $message
 * @param string $level
 */
function logMessage($message, $level = 'INFO') {
    $logDir = __DIR__ . '/../logs';
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }

    $logFile = $logDir . '/api.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$level] $message" . PHP_EOL;

    file_put_contents($logFile, $logEntry, FILE_APPEND);
}
