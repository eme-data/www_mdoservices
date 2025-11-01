<?php
/**
 * Delete User API
 * Supprimer un utilisateur
 */

// Démarrer la session
session_start();

// Headers CORS et JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Gérer les requêtes OPTIONS (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ne rien afficher avant le JSON
ob_start();

try {
    // Vérifier la méthode DELETE
    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        throw new Exception('Method not allowed');
    }

    // Charger l'helper d'authentification
    require_once __DIR__ . '/_auth-helper.php';

    // Vérifier que l'utilisateur est admin
    $currentUser = requireAdminSession();

    // Récupérer l'ID depuis l'URL
    $userId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

    if (empty($userId)) {
        throw new Exception('ID utilisateur requis');
    }

    // Empêcher la suppression de soi-même
    if ($userId === $currentUser['user_id']) {
        throw new Exception('Vous ne pouvez pas supprimer votre propre compte');
    }

    // Connexion BDD
    require_once __DIR__ . '/../config/config.php';

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Vérifier que l'utilisateur existe et appartient au bon rôle
    $checkStmt = $pdo->prepare("SELECT id, username FROM users WHERE id = :id AND role = :role");
    $checkStmt->execute(['id' => $userId, 'role' => $currentUser['role']]);
    $existingUser = $checkStmt->fetch();

    if (!$existingUser) {
        throw new Exception('Utilisateur non trouvé ou accès refusé');
    }

    // Supprimer l'utilisateur
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
    $stmt->execute(['id' => $userId]);

    // Nettoyer le buffer de sortie
    ob_end_clean();

    // Retourner la réponse
    echo json_encode([
        'success' => true,
        'message' => 'Utilisateur supprimé avec succès'
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    ob_end_clean();
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    ob_end_clean();
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Error',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
