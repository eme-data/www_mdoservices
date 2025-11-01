<?php
/**
 * Simple Login API - Version Simplifiée
 * Authentification sans dépendances complexes
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

    // Récupérer les données JSON
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON');
    }

    // Valider les champs requis
    if (empty($data['username']) || empty($data['password'])) {
        throw new Exception('Username and password required');
    }

    $username = trim($data['username']);
    $password = $data['password'];

    // Connexion BDD (charger la config)
    require_once __DIR__ . '/../config/config.php';

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Récupérer l'utilisateur
    $stmt = $pdo->prepare("
        SELECT id, username, email, password_hash, role, is_admin, is_active
        FROM users
        WHERE username = :username
        LIMIT 1
    ");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch();

    // Vérifier si l'utilisateur existe
    if (!$user) {
        throw new Exception('Invalid credentials');
    }

    // Vérifier si le compte est actif
    if (!$user['is_active']) {
        throw new Exception('Account disabled');
    }

    // Vérifier le mot de passe
    if (!password_verify($password, $user['password_hash'])) {
        throw new Exception('Invalid credentials');
    }

    // Mettre à jour last_login
    $updateStmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = :id");
    $updateStmt->execute(['id' => $user['id']]);

    // Créer la session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['is_admin'] = (bool)$user['is_admin'];
    $_SESSION['authenticated'] = true;

    // Nettoyer le buffer de sortie
    ob_end_clean();

    // Retourner la réponse JSON
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => (int)$user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'role' => $user['role'],
            'is_admin' => (bool)$user['is_admin']
        ],
        'message' => 'Login successful'
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    // Nettoyer le buffer
    ob_end_clean();

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    // Nettoyer le buffer
    ob_end_clean();

    http_response_code(401);
    echo json_encode([
        'success' => false,
        'error' => 'Authentication failed',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
