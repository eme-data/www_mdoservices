<?php
/**
 * API d'envoi de formulaire de contact
 *
 * Envoie un email depuis le formulaire de contact du site
 * Utilise la fonction mail() de PHP (peut être remplacé par PHPMailer pour plus de robustesse)
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
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = !empty($data['phone']) ? htmlspecialchars(strip_tags($data['phone'])) : 'Non renseigné';
$message = htmlspecialchars(strip_tags($data['message']));

// Configuration de l'email
$to = 'contact@mdoservices.fr'; // Email destinataire
$subject = 'Nouveau message depuis le formulaire de contact - MDO Services';

// Corps de l'email (HTML)
$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #2563eb; }
        .label { font-weight: bold; color: #2563eb; }
        .footer { background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>📧 Nouveau Message de Contact</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Nom :</div>
                <div>$name</div>
            </div>
            <div class='field'>
                <div class='label'>📧 Email :</div>
                <div>$email</div>
            </div>
            <div class='field'>
                <div class='label'>📱 Téléphone :</div>
                <div>$phone</div>
            </div>
            <div class='field'>
                <div class='label'>💬 Message :</div>
                <div>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            MDO Services - " . date('d/m/Y à H:i') . "
        </div>
    </div>
</body>
</html>
";

// Headers de l'email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: MDO Services <noreply@mdoservices.fr>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Tentative d'envoi de l'email
try {
    $sent = mail($to, $subject, $emailBody, $headers);

    if ($sent) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
        ]);
    } else {
        throw new Exception('Échec de l\'envoi de l\'email');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer ou nous contacter directement.',
        'error' => $e->getMessage()
    ]);
}
