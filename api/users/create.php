<?php
/**
 * Create User API
 * Créer un nouvel utilisateur
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
    if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
        throw new Exception('Username, email et password sont requis');
    }

    $username = trim($data['username']);
    $email = trim($data['email']);
    $password = $data['password'];
    $isAdmin = isset($data['is_admin']) ? (bool)$data['is_admin'] : false;
    $isActive = isset($data['is_active']) ? (bool)$data['is_active'] : true;

    // Valider l'email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Email invalide');
    }

    // Valider la longueur du mot de passe
    if (strlen($password) < 8) {
        throw new Exception('Le mot de passe doit contenir au moins 8 caractères');
    }

    // Connexion BDD
    require_once __DIR__ . '/../config/config.php';

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Vérifier si le username existe déjà
    $checkStmt = $pdo->prepare("SELECT id FROM users WHERE username = :username");
    $checkStmt->execute(['username' => $username]);
    if ($checkStmt->fetch()) {
        throw new Exception('Ce nom d\'utilisateur existe déjà');
    }

    // Vérifier si l'email existe déjà
    $checkStmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
    $checkStmt->execute(['email' => $email]);
    if ($checkStmt->fetch()) {
        throw new Exception('Cet email existe déjà');
    }

    // Hacher le mot de passe
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // Insérer l'utilisateur (avec le même rôle que l'admin connecté)
    $stmt = $pdo->prepare("
        INSERT INTO users (username, email, password_hash, role, is_admin, is_active, created_at)
        VALUES (:username, :email, :password_hash, :role, :is_admin, :is_active, NOW())
    ");

    $stmt->execute([
        'username' => $username,
        'email' => $email,
        'password_hash' => $passwordHash,
        'role' => $currentUser['role'], // Même rôle que l'admin
        'is_admin' => $isAdmin ? 1 : 0,
        'is_active' => $isActive ? 1 : 0
    ]);

    $userId = $pdo->lastInsertId();

    // Récupérer l'utilisateur créé
    $stmt = $pdo->prepare("
        SELECT id, username, email, role, is_admin, is_active, created_at
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
        'message' => 'Utilisateur créé avec succès',
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
