<?php
/**
 * API d'envoi de formulaire de contact
 *
 * Envoie deux emails :
 * 1. Notification à l'équipe MDO Services
 * 2. Confirmation automatique au demandeur
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

// Validation des données
$errors = [];

if (empty($data['name']) || strlen($data['name']) < 2) {
    $errors[] = 'Le nom doit contenir au moins 2 caractères';
}

if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Adresse email invalide';
}

if (empty($data['message']) || strlen($data['message']) < 10) {
    $errors[] = 'Le message doit contenir au moins 10 caractères';
}

// Si le téléphone est fourni, le valider
if (!empty($data['phone']) && !preg_match('/^[\d\s+()-]{10,}$/', $data['phone'])) {
    $errors[] = 'Numéro de téléphone invalide';
}

// Si erreurs de validation
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Erreur de validation',
        'errors' => $errors
    ]);
    exit();
}

// Nettoyer les données
$formData = [
    'name' => htmlspecialchars(strip_tags($data['name'])),
    'email' => filter_var($data['email'], FILTER_SANITIZE_EMAIL),
    'phone' => !empty($data['phone']) ? htmlspecialchars(strip_tags($data['phone'])) : '',
    'message' => htmlspecialchars(strip_tags($data['message']))
];

// Tentative d'envoi des emails
try {
    $mailer = new SimpleMailer();

    // 1. Envoyer la notification à l'équipe MDO Services
    $notificationSent = $mailer->sendContactNotification($formData);

    // 2. Envoyer la confirmation au demandeur
    $confirmationSent = $mailer->sendContactConfirmation($formData['email'], $formData['name']);

    if ($notificationSent && $confirmationSent) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès ! Un email de confirmation vous a été envoyé.'
        ]);
    } elseif ($notificationSent) {
        // Notification envoyée mais pas la confirmation
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès ! (Note: l\'email de confirmation n\'a pas pu être envoyé)'
        ]);
    } else {
        throw new Exception('Échec de l\'envoi des emails');
    }
} catch (Exception $e) {
    error_log("Erreur lors de l'envoi du formulaire de contact: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer ou nous contacter directement au 05.82.95.22.77'
    ]);
}
