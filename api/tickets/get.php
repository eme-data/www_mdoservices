<?php
/**
 * API Endpoint: Récupérer les détails d'un ticket avec ses commentaires
 * GET /api/tickets/get.php?id=123
 *
 * Query params:
 * - id: ID du ticket (requis)
 */

header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Methods: GET, OPTIONS');
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
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError(405, "Méthode non autorisée. Utilisez GET.");
}

// Vérifier le paramètre ID
if (!isset($_GET['id']) || empty($_GET['id'])) {
    sendError(400, "Le paramètre 'id' est requis.");
}

$ticketId = (int)$_GET['id'];

try {
    // Vérifier que l'utilisateur a accès à ce ticket
    if (!canAccessTicket($pdo, $ticketId, $user['user_id'], $user['is_admin'])) {
        sendError(403, "Accès refusé. Vous n'avez pas les droits pour accéder à ce ticket.");
    }

    // Récupérer le ticket
    $stmt = $pdo->prepare("
        SELECT
            t.id,
            t.ticket_number,
            t.user_id,
            u.username,
            u.email,
            t.title,
            t.description,
            t.category,
            t.priority,
            t.status,
            t.created_at,
            t.updated_at,
            t.resolved_at,
            t.closed_at
        FROM tickets t
        INNER JOIN users u ON t.user_id = u.id
        WHERE t.id = ?
    ");
    $stmt->execute([$ticketId]);
    $ticket = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$ticket) {
        sendError(404, "Ticket non trouvé.");
    }

    // Récupérer les commentaires du ticket
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
        WHERE ticket_id = ?
        AND is_internal = FALSE
        ORDER BY created_at ASC
    ");
    $stmt->execute([$ticketId]);
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    sendJsonResponse(200, [
        'success' => true,
        'ticket' => $ticket,
        'comments' => $comments
    ]);

} catch (Exception $e) {
    error_log("Erreur récupération ticket: " . $e->getMessage());
    sendError(500, "Erreur lors de la récupération du ticket: " . $e->getMessage());
}
