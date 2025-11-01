<?php
/**
 * Update User API
 * Mettre à jour un utilisateur
 */

// Démarrer la session
session_start();

// Headers CORS et JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
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
    // Vérifier la méthode PUT
    if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
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
    if (empty($data['id'])) {
        throw new Exception('ID utilisateur requis');
    }

    $userId = (int)$data['id'];

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

    // Construire la requête UPDATE dynamiquement
    $updateFields = [];
    $params = ['id' => $userId];

    if (isset($data['username']) && !empty($data['username'])) {
        $username = trim($data['username']);
        // Vérifier si le username n'est pas déjà utilisé par un autre utilisateur
        $checkStmt = $pdo->prepare("SELECT id FROM users WHERE username = :username AND id != :id");
        $checkStmt->execute(['username' => $username, 'id' => $userId]);
        if ($checkStmt->fetch()) {
            throw new Exception('Ce nom d\'utilisateur est déjà utilisé');
        }
        $updateFields[] = "username = :username";
        $params['username'] = $username;
    }

    if (isset($data['email']) && !empty($data['email'])) {
        $email = trim($data['email']);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Email invalide');
        }
        // Vérifier si l'email n'est pas déjà utilisé par un autre utilisateur
        $checkStmt = $pdo->prepare("SELECT id FROM users WHERE email = :email AND id != :id");
        $checkStmt->execute(['email' => $email, 'id' => $userId]);
        if ($checkStmt->fetch()) {
            throw new Exception('Cet email est déjà utilisé');
        }
        $updateFields[] = "email = :email";
        $params['email'] = $email;
    }

    if (isset($data['is_admin'])) {
        $updateFields[] = "is_admin = :is_admin";
        $params['is_admin'] = (bool)$data['is_admin'] ? 1 : 0;
    }

    if (isset($data['is_active'])) {
        $updateFields[] = "is_active = :is_active";
        $params['is_active'] = (bool)$data['is_active'] ? 1 : 0;
    }

    // Si aucun champ à mettre à jour
    if (empty($updateFields)) {
        throw new Exception('Aucun champ à mettre à jour');
    }

    // Mettre à jour l'utilisateur
    $sql = "UPDATE users SET " . implode(', ', $updateFields) . " WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // Récupérer l'utilisateur mis à jour
    $stmt = $pdo->prepare("
        SELECT id, username, email, role, is_admin, is_active, created_at, last_login
        FROM users
        WHERE id = :id
    ");
    $stmt->execute(['id' => $userId]);
    $user = $stmt->fetch();

    // Convertir les booléens
    $user['id'] = (int)$user['id'];
    $user['is_admin'] = (bool)$user['is_admin'];
    $user['is_active'] = (bool)$user['is_active'];

    // Nettoyer le buffer de sortie
    ob_end_clean();

    // Retourner la réponse
    echo json_encode([
        'success' => true,
        'message' => 'Utilisateur mis à jour avec succès',
        'user' => $user
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
