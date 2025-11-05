<?php
/**
 * Helper functions pour le système de tickets
 * MDO Services - Support Client
 */

require_once __DIR__ . '/../config/config.php';

/**
 * Génère un numéro de ticket unique au format TK-YYYY-XXXXX
 * @param PDO $pdo Connexion à la base de données
 * @return string Numéro de ticket généré
 */
function generateTicketNumber($pdo) {
    $year = date('Y');

    try {
        // Commencer une transaction
        $pdo->beginTransaction();

        // Récupérer et incrémenter le compteur de manière atomique
        $stmt = $pdo->prepare("
            INSERT INTO ticket_counter (year, counter)
            VALUES (:year, 1)
            ON DUPLICATE KEY UPDATE counter = counter + 1
        ");
        $stmt->execute(['year' => $year]);

        // Récupérer la valeur actuelle du compteur
        $stmt = $pdo->prepare("SELECT counter FROM ticket_counter WHERE year = :year FOR UPDATE");
        $stmt->execute(['year' => $year]);
        $counter = $stmt->fetchColumn();

        $pdo->commit();

        // Format: TK-2024-00001
        return sprintf('TK-%d-%05d', $year, $counter);

    } catch (Exception $e) {
        $pdo->rollBack();
        throw new Exception("Erreur lors de la génération du numéro de ticket: " . $e->getMessage());
    }
}

/**
 * Vérifie si un utilisateur est authentifié
 * @return array|false Retourne les données utilisateur ou false
 */
function checkAuthentication() {
    // Démarrer la session seulement si elle n'est pas déjà démarrée
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
 * Envoie une réponse JSON
 * @param int $status Code HTTP
 * @param mixed $data Données à retourner
 */
function sendJsonResponse($status, $data) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Retourne une erreur JSON
 * @param int $status Code HTTP
 * @param string $message Message d'erreur
 */
function sendError($status, $message) {
    sendJsonResponse($status, [
        'success' => false,
        'error' => $message
    ]);
}

/**
 * Vérifie si l'utilisateur a accès à un ticket spécifique
 * @param PDO $pdo Connexion à la base de données
 * @param int $ticketId ID du ticket
 * @param int $userId ID de l'utilisateur
 * @param bool $isAdmin Si l'utilisateur est admin
 * @return bool
 */
function canAccessTicket($pdo, $ticketId, $userId, $isAdmin = false) {
    // Les admins peuvent accéder à tous les tickets
    if ($isAdmin) {
        return true;
    }

    // Vérifier que le ticket appartient à l'utilisateur
    $stmt = $pdo->prepare("SELECT user_id FROM tickets WHERE id = ?");
    $stmt->execute([$ticketId]);
    $ticket = $stmt->fetch(PDO::FETCH_ASSOC);

    return $ticket && $ticket['user_id'] == $userId;
}
