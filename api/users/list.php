<?php
/**
 * List Users API
 * Liste tous les utilisateurs selon le rôle de l'admin
 */

// Démarrer la session
session_start();

// Headers CORS et JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
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
    // Vérifier la méthode GET
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        throw new Exception('Method not allowed');
    }

    // Charger l'helper d'authentification
    require_once __DIR__ . '/_auth-helper.php';

    // Vérifier que l'utilisateur est admin
    $currentUser = requireAdminSession();

    // Connexion BDD
    require_once __DIR__ . '/../config/config.php';

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Récupérer les utilisateurs selon le rôle de l'admin connecté
    $stmt = $pdo->prepare("
        SELECT
            id,
            username,
            email,
            role,
            is_admin,
            is_active,
            created_at,
            last_login
        FROM users
        WHERE role = :role
        ORDER BY created_at DESC
    ");

    $stmt->execute(['role' => $currentUser['role']]);
    $users = $stmt->fetchAll();

    // Convertir les booléens
    foreach ($users as &$user) {
        $user['id'] = (int)$user['id'];
        $user['is_admin'] = (bool)$user['is_admin'];
        $user['is_active'] = (bool)$user['is_active'];
    }

    // Nettoyer le buffer de sortie
    ob_end_clean();

    // Retourner la réponse
    echo json_encode([
        'success' => true,
        'users' => $users,
        'count' => count($users)
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
