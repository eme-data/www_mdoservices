<?php
/**
 * Configuration Email pour MDO Services
 *
 * Ce fichier contient la configuration SMTP pour l'envoi d'emails
 * Créez un fichier email-config.local.php pour surcharger ces valeurs en production
 */

// Configuration par défaut (à surcharger en production)
define('SMTP_HOST', 'smtp.hostinger.com'); // Serveur SMTP Hostinger
define('SMTP_PORT', 587); // Port SMTP (587 pour TLS, 465 pour SSL)
define('SMTP_SECURE', 'tls'); // 'tls' ou 'ssl'
define('SMTP_AUTH', true); // Utiliser l'authentification SMTP
define('SMTP_USERNAME', 'noreply@mdoservices.fr'); // À configurer en production
define('SMTP_PASSWORD', ''); // À configurer en production
define('SMTP_FROM_EMAIL', 'noreply@mdoservices.fr');
define('SMTP_FROM_NAME', 'MDO Services');
define('SMTP_REPLY_TO', 'contact@mdoservices.fr');

// Charger la configuration locale si elle existe
if (file_exists(__DIR__ . '/email-config.local.php')) {
    require_once __DIR__ . '/email-config.local.php';
}
