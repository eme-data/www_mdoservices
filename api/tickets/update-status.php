<?php
/**
 * API Endpoint: Mettre à jour le statut d'un ticket
 * PUT /api/tickets/update-status.php
 *
 * Body (JSON):
 * {
 *   "ticket_id": 123,
 *   "status": "resolved|closed"
 * }
 */

header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Gérer les requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/_ticket-helper.php';

// Créer la connexion PDO
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    sendError(500, "Erreur de connexion à la base de données.");
}

// Vérifier l'authentification
$user = checkAuthentication();
if (!$user) {
    sendError(401, "Non authentifié. Veuillez vous connecter.");
}

// Vérifier la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    sendError(405, "Méthode non autorisée. Utilisez PUT.");
}

// Récupérer les données JSON
$input = json_decode(file_get_contents('php://input'), true);

// Validation des champs requis
if (!isset($input['ticket_id']) || !isset($input['status'])) {
    sendError(400, "Les champs 'ticket_id' et 'status' sont requis.");
}

$ticketId = (int)$input['ticket_id'];
$newStatus = $input['status'];

// Les clients peuvent seulement marquer comme résolu ou fermé
$allowedStatuses = ['resolved', 'closed'];
if (!in_array($newStatus, $allowedStatuses)) {
    sendError(400, "Statut invalide. Les clients peuvent seulement marquer comme 'resolved' ou 'closed'.");
}

try {
    // Vérifier que l'utilisateur a accès à ce ticket
    if (!canAccessTicket($pdo, $ticketId, $user['user_id'], $user['is_admin'])) {
        sendError(403, "Accès refusé. Vous n'avez pas les droits pour modifier ce ticket.");
    }

    // Récupérer le ticket avec toutes ses données
    $stmt = $pdo->prepare("
        SELECT t.*, u.email, u.username
        FROM tickets t
        JOIN users u ON t.user_id = u.id
        WHERE t.id = ?
    ");
    $stmt->execute([$ticketId]);
    $ticket = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$ticket) {
        sendError(404, "Ticket non trouvé.");
    }

    // Sauvegarder l'ancien statut pour la notification email
    $oldStatus = $ticket['status'];

    // Construire la requête de mise à jour
    $sql = "UPDATE tickets SET status = :status, updated_at = NOW()";
    $params = [
        'status' => $newStatus,
        'ticket_id' => $ticketId
    ];

    // Ajouter les timestamps appropriés
    if ($newStatus === 'resolved' && $ticket['status'] !== 'resolved') {
        $sql .= ", resolved_at = NOW()";
    } elseif ($newStatus === 'closed' && $ticket['status'] !== 'closed') {
        $sql .= ", closed_at = NOW()";
    }

    $sql .= " WHERE id = :ticket_id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // Ajouter un commentaire automatique
    $statusLabels = [
        'resolved' => 'résolu',
        'closed' => 'fermé'
    ];
    $statusLabel = $statusLabels[$newStatus] ?? $newStatus;

    $stmt = $pdo->prepare("
        INSERT INTO ticket_comments (ticket_id, user_id, author_name, author_type, message, is_internal)
        VALUES (:ticket_id, :user_id, :author_name, 'client', :message, FALSE)
    ");
    $stmt->execute([
        'ticket_id' => $ticketId,
        'user_id' => $user['user_id'],
        'author_name' => $user['username'],
        'message' => "Le client a marqué ce ticket comme " . $statusLabel . "."
    ]);

    // Envoyer une notification email au client
    try {
        require_once __DIR__ . '/../lib/SimpleMailer.php';
        $mailer = new SimpleMailer();

        // Mettre à jour le statut dans les données du ticket pour l'email
        $ticket['status'] = $newStatus;

        // Envoyer l'email de notification de changement de statut
        $mailer->sendTicketStatusChange(
            $ticket,
            $ticket['email'],
            $ticket['username'],
            $oldStatus,
            $newStatus
        );

        error_log("Email de changement de statut envoyé pour le ticket " . $ticket['ticket_number']);
    } catch (Exception $emailException) {
        // Ne pas bloquer la mise à jour si l'envoi d'email échoue
        error_log("Erreur lors de l'envoi de l'email de changement de statut : " . $emailException->getMessage());
    }

    sendJsonResponse(200, [
        'success' => true,
        'message' => 'Statut du ticket mis à jour avec succès.'
    ]);

} catch (Exception $e) {
    error_log("Erreur mise à jour statut: " . $e->getMessage());
    sendError(500, "Erreur lors de la mise à jour du statut: " . $e->getMessage());
}
