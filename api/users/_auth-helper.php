<?php
/**
 * Authentication Helper for User Management
 * Vérifie que l'utilisateur est authentifié et est admin
 */

/**
 * Vérifier que l'utilisateur est admin
 * @param string $requiredRole Role requis ('client' ou 'partner') - null = tous les admins
 * @return array Session data
 */
function requireAdminSession($requiredRole = null) {
    // Démarrer la session si non démarrée
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    // Vérifier si l'utilisateur est authentifié
    if (empty($_SESSION['authenticated']) || empty($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'error' => 'Unauthorized',
            'message' => 'Vous devez être connecté'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // Vérifier si l'utilisateur est admin
    if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'error' => 'Forbidden',
            'message' => 'Accès réservé aux administrateurs'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // Vérifier le rôle si spécifié
    if ($requiredRole !== null && $_SESSION['role'] !== $requiredRole) {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'error' => 'Forbidden',
            'message' => 'Vous n\'avez pas accès à cette ressource'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    return [
        'user_id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'role' => $_SESSION['role'],
        'is_admin' => $_SESSION['is_admin']
    ];
}

/**
 * Envoyer une réponse JSON d'erreur
 */
function sendJsonError($message, $code = 400, $errorType = 'Error') {
    http_response_code($code);
    echo json_encode([
        'success' => false,
        'error' => $errorType,
        'message' => $message
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

/**
 * Envoyer une réponse JSON de succès
 */
function sendJsonSuccess($data, $message = 'Success') {
    echo json_encode([
        'success' => true,
        'message' => $message,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit();
}
