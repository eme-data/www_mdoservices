<?php
/**
 * Change Password API
 * Changer le mot de passe d'un utilisateur
 */

// Démarrer la session
session_start();

// Headers CORS et JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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
    // Vérifier la méthode POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Method not allowed');
    }

    // Charger l'helper d'authentification
    require_once __DIR__ . '/_auth-helper.php';

    // Vérifier que l'utilisateur est admin
    $currentUser = requireAdminSession();

    // Récupérer les données JSON
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON');
    }

    // Valider les champs requis
    if (empty($data['id']) || empty($data['new_password'])) {
        throw new Exception('ID et nouveau mot de passe requis');
    }

    $userId = (int)$data['id'];
    $newPassword = $data['new_password'];

    // Valider la longueur du mot de passe
    if (strlen($newPassword) < 8) {
        throw new Exception('Le mot de passe doit contenir au moins 8 caractères');
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

    // Hacher le nouveau mot de passe
    $passwordHash = password_hash($newPassword, PASSWORD_BCRYPT);

    // Mettre à jour le mot de passe
    $stmt = $pdo->prepare("UPDATE users SET password_hash = :password_hash WHERE id = :id");
    $stmt->execute([
        'password_hash' => $passwordHash,
        'id' => $userId
    ]);

    // Nettoyer le buffer de sortie
    ob_end_clean();

    // Retourner la réponse
    echo json_encode([
        'success' => true,
        'message' => 'Mot de passe modifié avec succès'
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
