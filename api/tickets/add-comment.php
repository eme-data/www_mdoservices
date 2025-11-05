<?php
/**
 * API Endpoint: Ajouter un commentaire à un ticket
 * POST /api/tickets/add-comment.php
 *
 * Body (JSON):
 * {
 *   "ticket_id": 123,
 *   "message": "string"
 * }
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Gérer les requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/_ticket-helper.php';

// Vérifier l'authentification
$user = checkAuthentication();
if (!$user) {
    sendError(401, "Non authentifié. Veuillez vous connecter.");
}

// Vérifier la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError(405, "Méthode non autorisée. Utilisez POST.");
}

// Récupérer les données JSON
$input = json_decode(file_get_contents('php://input'), true);

// Validation des champs requis
if (!isset($input['ticket_id']) || !isset($input['message'])) {
    sendError(400, "Les champs 'ticket_id' et 'message' sont requis.");
}

$ticketId = (int)$input['ticket_id'];
$message = trim($input['message']);

if (empty($message)) {
    sendError(400, "Le message ne peut pas être vide.");
}

try {
    // Vérifier que l'utilisateur a accès à ce ticket
    if (!canAccessTicket($pdo, $ticketId, $user['user_id'], $user['is_admin'])) {
        sendError(403, "Accès refusé. Vous n'avez pas les droits pour commenter ce ticket.");
    }

    // Vérifier que le ticket existe et n'est pas fermé
    $stmt = $pdo->prepare("SELECT id, status FROM tickets WHERE id = ?");
    $stmt->execute([$ticketId]);
    $ticket = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$ticket) {
        sendError(404, "Ticket non trouvé.");
    }

    if ($ticket['status'] === 'closed') {
        sendError(400, "Impossible d'ajouter un commentaire sur un ticket fermé.");
    }

    // Ajouter le commentaire
    $stmt = $pdo->prepare("
        INSERT INTO ticket_comments (ticket_id, user_id, author_name, author_type, message, is_internal)
        VALUES (:ticket_id, :user_id, :author_name, 'client', :message, FALSE)
    ");

    $stmt->execute([
        'ticket_id' => $ticketId,
        'user_id' => $user['user_id'],
        'author_name' => $user['username'],
        'message' => $message
    ]);

    $commentId = $pdo->lastInsertId();

    // Mettre à jour le statut du ticket si nécessaire
    // Si le ticket était "waiting_client", le repasser à "in_progress"
    if ($ticket['status'] === 'waiting_client') {
        $stmt = $pdo->prepare("UPDATE tickets SET status = 'in_progress', updated_at = NOW() WHERE id = ?");
        $stmt->execute([$ticketId]);
    } else {
        // Sinon juste mettre à jour la date de modification
        $stmt = $pdo->prepare("UPDATE tickets SET updated_at = NOW() WHERE id = ?");
        $stmt->execute([$ticketId]);
    }

    // Récupérer le commentaire créé
    $stmt = $pdo->prepare("
        SELECT
            id,
            ticket_id,
            user_id,
            author_name,
            author_type,
            message,
            is_internal,
            created_at
        FROM ticket_comments
        WHERE id = ?
    ");
    $stmt->execute([$commentId]);
    $comment = $stmt->fetch(PDO::FETCH_ASSOC);

    sendJsonResponse(201, [
        'success' => true,
        'message' => 'Commentaire ajouté avec succès.',
        'comment' => $comment
    ]);

} catch (Exception $e) {
    error_log("Erreur ajout commentaire: " . $e->getMessage());
    sendError(500, "Erreur lors de l'ajout du commentaire: " . $e->getMessage());
}
