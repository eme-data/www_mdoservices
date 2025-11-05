<?php
/**
 * API Endpoint: Créer un nouveau ticket de support
 * POST /api/tickets/create.php
 *
 * Body (JSON):
 * {
 *   "title": "string",
 *   "description": "string",
 *   "category": "string",
 *   "priority": "low|normal|high|urgent" (optionnel, défaut: normal)
 * }
 */

// Capturer toutes les erreurs PHP
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Gestionnaire d'erreurs global
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => 'PHP Error',
        'message' => $errstr,
        'file' => basename($errfile),
        'line' => $errline
    ], JSON_UNESCAPED_UNICODE);
    exit;
});

// Gestionnaire d'exceptions global
set_exception_handler(function($exception) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => 'Exception',
        'message' => $exception->getMessage(),
        'file' => basename($exception->getFile()),
        'line' => $exception->getLine()
    ], JSON_UNESCAPED_UNICODE);
    exit;
});

header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Methods: POST, OPTIONS');
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
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError(405, "Méthode non autorisée. Utilisez POST.");
}

// Récupérer les données JSON
$input = json_decode(file_get_contents('php://input'), true);

// Validation des champs requis
$requiredFields = ['title', 'description', 'category'];
foreach ($requiredFields as $field) {
    if (!isset($input[$field]) || trim($input[$field]) === '') {
        sendError(400, "Le champ '$field' est requis.");
    }
}

$title = trim($input['title']);
$description = trim($input['description']);
$category = trim($input['category']);
$priority = $input['priority'] ?? 'normal';

// Valider la longueur
if (strlen($title) > 200) {
    sendError(400, "Le titre ne doit pas dépasser 200 caractères.");
}

// Valider la priorité
$validPriorities = ['low', 'normal', 'high', 'urgent'];
if (!in_array($priority, $validPriorities)) {
    sendError(400, "Priorité invalide. Valeurs acceptées: " . implode(', ', $validPriorities));
}

try {
    // Générer le numéro de ticket
    $ticketNumber = generateTicketNumber($pdo);

    // Insérer le ticket
    $stmt = $pdo->prepare("
        INSERT INTO tickets (ticket_number, user_id, title, description, category, priority, status)
        VALUES (:ticket_number, :user_id, :title, :description, :category, :priority, 'open')
    ");

    $stmt->execute([
        'ticket_number' => $ticketNumber,
        'user_id' => $user['user_id'],
        'title' => $title,
        'description' => $description,
        'category' => $category,
        'priority' => $priority
    ]);

    $ticketId = $pdo->lastInsertId();

    // Récupérer le ticket créé
    $stmt = $pdo->prepare("
        SELECT
            id,
            ticket_number,
            user_id,
            title,
            description,
            category,
            priority,
            status,
            created_at,
            updated_at
        FROM tickets
        WHERE id = ?
    ");
    $stmt->execute([$ticketId]);
    $ticket = $stmt->fetch(PDO::FETCH_ASSOC);

    // Ajouter un premier commentaire automatique (optionnel)
    $stmt = $pdo->prepare("
        INSERT INTO ticket_comments (ticket_id, user_id, author_name, author_type, message, is_internal)
        VALUES (:ticket_id, :user_id, :author_name, 'client', :message, FALSE)
    ");
    $stmt->execute([
        'ticket_id' => $ticketId,
        'user_id' => $user['user_id'],
        'author_name' => $user['username'],
        'message' => "Ticket créé par le client."
    ]);

    sendJsonResponse(201, [
        'success' => true,
        'message' => 'Ticket créé avec succès.',
        'ticket' => $ticket
    ]);

} catch (Exception $e) {
    error_log("Erreur création ticket: " . $e->getMessage());
    sendError(500, "Erreur lors de la création du ticket: " . $e->getMessage());
}
