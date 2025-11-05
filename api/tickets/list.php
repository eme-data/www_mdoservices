<?php
/**
 * API Endpoint: Récupérer la liste des tickets de l'utilisateur
 * GET /api/tickets/list.php
 *
 * Query params (optionnels):
 * - status: Filtrer par statut (open, in_progress, waiting_client, resolved, closed)
 * - category: Filtrer par catégorie
 * - priority: Filtrer par priorité (low, normal, high, urgent)
 * - limit: Nombre de tickets à retourner (défaut: 50)
 * - offset: Offset pour pagination (défaut: 0)
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
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
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError(405, "Méthode non autorisée. Utilisez GET.");
}

try {
    // Construire la requête de base
    $sql = "
        SELECT
            t.id,
            t.ticket_number,
            t.user_id,
            t.title,
            t.description,
            t.category,
            t.priority,
            t.status,
            t.created_at,
            t.updated_at,
            t.resolved_at,
            t.closed_at,
            (SELECT COUNT(*) FROM ticket_comments WHERE ticket_id = t.id) AS comment_count,
            (SELECT created_at FROM ticket_comments WHERE ticket_id = t.id ORDER BY created_at DESC LIMIT 1) AS last_comment_at
        FROM tickets t
        WHERE t.user_id = :user_id
    ";

    $params = ['user_id' => $user['user_id']];

    // Filtres optionnels
    if (isset($_GET['status']) && !empty($_GET['status'])) {
        $sql .= " AND t.status = :status";
        $params['status'] = $_GET['status'];
    }

    if (isset($_GET['category']) && !empty($_GET['category'])) {
        $sql .= " AND t.category = :category";
        $params['category'] = $_GET['category'];
    }

    if (isset($_GET['priority']) && !empty($_GET['priority'])) {
        $sql .= " AND t.priority = :priority";
        $params['priority'] = $_GET['priority'];
    }

    // Tri par date de création décroissante
    $sql .= " ORDER BY t.created_at DESC";

    // Pagination
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

    $sql .= " LIMIT :limit OFFSET :offset";

    $stmt = $pdo->prepare($sql);

    // Bind des paramètres
    foreach ($params as $key => $value) {
        $stmt->bindValue(':' . $key, $value);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

    $stmt->execute();
    $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Compter le total de tickets
    $countSql = "SELECT COUNT(*) FROM tickets WHERE user_id = :user_id";
    $countParams = ['user_id' => $user['user_id']];

    if (isset($_GET['status']) && !empty($_GET['status'])) {
        $countSql .= " AND status = :status";
        $countParams['status'] = $_GET['status'];
    }

    if (isset($_GET['category']) && !empty($_GET['category'])) {
        $countSql .= " AND category = :category";
        $countParams['category'] = $_GET['category'];
    }

    if (isset($_GET['priority']) && !empty($_GET['priority'])) {
        $countSql .= " AND priority = :priority";
        $countParams['priority'] = $_GET['priority'];
    }

    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($countParams);
    $totalCount = $countStmt->fetchColumn();

    // Statistiques globales (tous les tickets de l'utilisateur)
    $statsStmt = $pdo->prepare("
        SELECT
            COUNT(*) as total,
            SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) as open_count,
            SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress_count,
            SUM(CASE WHEN status = 'waiting_client' THEN 1 ELSE 0 END) as waiting_client_count,
            SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved_count,
            SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as closed_count
        FROM tickets
        WHERE user_id = ?
    ");
    $statsStmt->execute([$user['user_id']]);
    $stats = $statsStmt->fetch(PDO::FETCH_ASSOC);

    sendJsonResponse(200, [
        'success' => true,
        'tickets' => $tickets,
        'pagination' => [
            'limit' => $limit,
            'offset' => $offset,
            'total' => (int)$totalCount
        ],
        'stats' => $stats
    ]);

} catch (Exception $e) {
    error_log("Erreur récupération tickets: " . $e->getMessage());
    sendError(500, "Erreur lors de la récupération des tickets: " . $e->getMessage());
}
