<?php
/**
 * API d'inscription à la newsletter
 *
 * Enregistre l'abonné et envoie un email de bienvenue
 */

// Headers CORS et JSON
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Gestion des requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérifier que c'est bien une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit();
}

// Charger la classe Mailer
require_once __DIR__ . '/../lib/SimpleMailer.php';

// Récupérer les données JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validation de l'email
if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Adresse email invalide'
    ]);
    exit();
}

// Nettoyer l'email
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);

// TODO: Enregistrer l'abonné dans la base de données
// Pour l'instant, on envoie juste l'email de bienvenue

// Tentative d'envoi de l'email de bienvenue
try {
    $mailer = new SimpleMailer();

    // Envoyer l'email de bienvenue
    $welcomeSent = $mailer->sendNewsletterWelcome($email);

    if ($welcomeSent) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Merci de votre inscription ! Un email de bienvenue vous a été envoyé.'
        ]);

        // Logger l'inscription (optionnel)
        error_log("Nouvelle inscription newsletter: $email");
    } else {
        throw new Exception('Échec de l\'envoi de l\'email de bienvenue');
    }
} catch (Exception $e) {
    error_log("Erreur lors de l'inscription newsletter: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.'
    ]);
}
