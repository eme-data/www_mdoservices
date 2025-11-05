<?php
/**
 * Fonctions utilitaires pour l'API SharePoint Statistics
 */

require_once __DIR__ . '/../config.php';

// Gestionnaires d'erreurs globaux
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    error_log("PHP Error [$errno]: $errstr in $errfile on line $errline");
    return false;
});

set_exception_handler(function($exception) {
    error_log("Uncaught Exception: " . $exception->getMessage());
    sendError(500, "Une erreur est survenue.");
});

/**
 * Vérifie l'authentification de l'utilisateur
 * @return array|false Informations utilisateur ou false si non authentifié
 */
function checkAuthentication() {
    // Vérifier si une session existe déjà avant d'en démarrer une nouvelle
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (!isset($_SESSION['user_id'])) {
        return false;
    }

    return [
        'user_id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'] ?? '',
        'email' => $_SESSION['email'] ?? '',
        'role' => $_SESSION['role'] ?? 'client',
        'is_admin' => $_SESSION['is_admin'] ?? false
    ];
}

/**
 * Vérifie si un utilisateur peut accéder aux stats d'un site SharePoint
 * @param PDO $pdo Connexion à la base de données
 * @param int $siteId ID du site SharePoint
 * @param int $userId ID de l'utilisateur
 * @param bool $isAdmin Si l'utilisateur est admin
 * @return bool
 */
function canAccessSite($pdo, $siteId, $userId, $isAdmin) {
    // Les admins peuvent tout voir
    if ($isAdmin) {
        return true;
    }

    // Vérifier que le site appartient à l'utilisateur
    $stmt = $pdo->prepare("SELECT id FROM sharepoint_sites WHERE id = ? AND user_id = ?");
    $stmt->execute([$siteId, $userId]);
    return $stmt->fetch() !== false;
}

/**
 * Envoie une réponse JSON
 * @param int $statusCode Code HTTP
 * @param array $data Données à retourner
 */
function sendJsonResponse($statusCode, $data) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Envoie une erreur JSON
 * @param int $statusCode Code HTTP
 * @param string $message Message d'erreur
 */
function sendError($statusCode, $message) {
    sendJsonResponse($statusCode, [
        'success' => false,
        'error' => $message
    ]);
}

/**
 * Formatte la taille en unité lisible
 * @param float $sizeGb Taille en GB
 * @return string Taille formatée
 */
function formatSize($sizeGb) {
    if ($sizeGb < 0.001) {
        return round($sizeGb * 1024 * 1024, 2) . ' MB';
    } elseif ($sizeGb < 1) {
        return round($sizeGb * 1024, 2) . ' MB';
    } else {
        return round($sizeGb, 2) . ' GB';
    }
}

/**
 * Calcule le pourcentage d'utilisation
 * @param float $used Espace utilisé
 * @param float $total Espace total
 * @return float Pourcentage
 */
function calculatePercentage($used, $total) {
    if ($total == 0) {
        return 0;
    }
    return round(($used / $total) * 100, 2);
}
