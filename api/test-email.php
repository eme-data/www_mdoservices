<?php
/**
 * Script de test d'envoi d'email
 *
 * Permet de tester si les emails arrivent bien à contact@mdoservices.fr
 * Accéder via : https://mdoservices.fr/api/test-email.php
 */

// Charger la classe Mailer
require_once __DIR__ . '/lib/SimpleMailer.php';

// Données de test
$testData = [
    'name' => 'Test Système',
    'email' => 'test@example.com',
    'phone' => '06 12 34 56 78',
    'message' => 'Ceci est un test d\'envoi d\'email pour vérifier que les notifications arrivent bien à contact@mdoservices.fr'
];

echo "<!DOCTYPE html>
<html>
<head>
    <title>Test Email MDO Services</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .error { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .info { background: #d1ecf1; border: 1px solid #bee5eb; color: #0c5460; padding: 15px; border-radius: 5px; margin: 10px 0; }
        h1 { color: #2563eb; }
        pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>🧪 Test d'envoi d'emails - MDO Services</h1>

    <div class='info'>
        <strong>Test en cours...</strong><br>
        Envoi d'un email de test à <strong>contact@mdoservices.fr</strong>
    </div>
";

try {
    $mailer = new SimpleMailer();

    echo "<h2>📧 Tentative d'envoi de la notification à l'équipe</h2>";

    // Test 1 : Envoyer la notification à l'équipe
    $notificationSent = $mailer->sendContactNotification($testData);

    if ($notificationSent) {
        echo "<div class='success'>
            ✅ <strong>Notification envoyée avec succès à contact@mdoservices.fr</strong><br>
            Reply-To configuré sur: {$testData['email']}<br>
            <small>Vérifiez votre boîte de réception ET votre dossier SPAM</small>
        </div>";
    } else {
        echo "<div class='error'>
            ❌ <strong>Échec de l'envoi de la notification</strong><br>
            La fonction mail() a retourné FALSE
        </div>";
    }

    echo "<h2>📋 Données du formulaire de test</h2>";
    echo "<pre>" . print_r($testData, true) . "</pre>";

    echo "<h2>🔧 Configuration PHP</h2>";
    echo "<pre>";
    echo "Fonction mail() disponible: " . (function_exists('mail') ? 'OUI ✅' : 'NON ❌') . "\n";
    echo "Version PHP: " . phpversion() . "\n";
    echo "SMTP (sendmail_path): " . ini_get('sendmail_path') . "\n";
    echo "</pre>";

    echo "<h2>📝 Logs (vérifiez le fichier error_log du serveur)</h2>";
    echo "<div class='info'>
        Les logs détaillés sont enregistrés dans le fichier error_log de PHP.<br>
        Sur Hostinger, vous pouvez les voir dans le panneau de contrôle > Fichiers > error_log
    </div>";

} catch (Exception $e) {
    echo "<div class='error'>
        <strong>Exception capturée :</strong><br>
        " . htmlspecialchars($e->getMessage()) . "
    </div>";
}

echo "
    <hr>
    <p><a href='/'>← Retour au site</a></p>
</body>
</html>";
