<?php
/**
 * Classe SimpleMailer - Envoi d'emails via la fonction mail() de PHP
 * Alternative simple à PHPMailer pour Hostinger
 */

class SimpleMailer {
    private $fromEmail;
    private $fromName;
    private $replyTo;

    public function __construct() {
        $this->fromEmail = 'no-reply@smtp-mdo.fr';
        $this->fromName = 'MDO Services';
        $this->replyTo = 'contact@mdoservices.fr';
    }

    /**
     * Envoie un email
     *
     * @param string $to Email du destinataire
     * @param string $toName Nom du destinataire
     * @param string $subject Sujet de l'email
     * @param string $htmlBody Corps de l'email (HTML)
     * @param string $replyToEmail Email de réponse personnalisé (optionnel)
     * @return bool
     */
    public function send($to, $toName, $subject, $htmlBody, $replyToEmail = null) {
        try {
            // Utiliser le replyTo personnalisé ou le défaut
            $replyTo = $replyToEmail ? $replyToEmail : $this->replyTo;

            // Headers de l'email
            $headers = "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $headers .= "From: " . $this->fromName . " <" . $this->fromEmail . ">\r\n";
            $headers .= "Reply-To: " . $replyTo . "\r\n";
            $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
            $headers .= "X-Priority: 1\r\n"; // Priorité haute pour notifications internes
            $headers .= "Importance: High\r\n";

            // Envoi de l'email
            $sent = mail($to, $subject, $htmlBody, $headers);

            if (!$sent) {
                error_log("SimpleMailer - Erreur lors de l'envoi d'email à: $to (Sujet: $subject)");
                return false;
            }

            error_log("SimpleMailer - Email envoyé avec succès à: $to (Sujet: $subject)");
            return true;
        } catch (Exception $e) {
            error_log("SimpleMailer - Exception lors de l'envoi d'email: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Envoie un email de confirmation de contact
     */
    public function sendContactConfirmation($to, $name) {
        $subject = "Confirmation de votre demande - MDO Services";
        $body = $this->getContactConfirmationTemplate($name);
        return $this->send($to, $name, $subject, $body);
    }

    /**
     * Envoie une notification de nouveau contact à l'équipe
     */
    public function sendContactNotification($formData) {
        $to = $this->replyTo;
        $subject = "Nouveau message depuis le formulaire de contact - MDO Services";
        $body = $this->getContactNotificationTemplate($formData);

        // Utiliser l'email du demandeur comme Reply-To pour pouvoir répondre directement
        return $this->send($to, 'Équipe MDO Services', $subject, $body, $formData['email']);
    }

    /**
     * Envoie un email de remerciement pour l'inscription newsletter
     */
    public function sendNewsletterWelcome($to) {
        $subject = "Bienvenue dans notre communauté ! - MDO Services";
        $body = $this->getNewsletterWelcomeTemplate();
        return $this->send($to, '', $subject, $body);
    }

    /**
     * Envoie une notification à l'équipe pour une nouvelle inscription newsletter
     */
    public function sendNewsletterNotification($email) {
        $to = $this->replyTo;
        $subject = "Nouvelle inscription newsletter - MDO Services";
        $body = $this->getNewsletterNotificationTemplate($email);

        // Utiliser l'email de l'abonné comme Reply-To
        return $this->send($to, 'Équipe MDO Services', $subject, $body, $email);
    }

    /**
     * Template de confirmation de contact
     */
    private function getContactConfirmationTemplate($name) {
        return "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 40px 20px; text-align: center; }
        .content { background: #f9fafb; padding: 30px 20px; }
        .message-box { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
        .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 14px; }
        .button { display: inline-block; background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
        .highlight { color: #2563eb; font-weight: bold; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1 style='margin: 0; font-size: 28px;'>✅ Message bien reçu !</h1>
        </div>
        <div class='content'>
            <div class='message-box'>
                <h2 style='color: #1f2937; margin-top: 0;'>Bonjour " . htmlspecialchars($name) . ",</h2>
                <p style='font-size: 16px;'>
                    Merci de nous avoir contactés ! Nous avons bien reçu votre message et nous vous remercions de l'intérêt que vous portez à nos services.
                </p>
                <p style='font-size: 16px;'>
                    Notre équipe d'experts va <span class='highlight'>étudier votre demande</span> et vous répondra dans les <span class='highlight'>24 heures</span>.
                </p>
                <p style='font-size: 16px;'>
                    En attendant, n'hésitez pas à :
                </p>
                <ul style='font-size: 16px;'>
                    <li>Découvrir nos <a href='https://mdoservices.fr/solutions' style='color: #2563eb;'>solutions IT & Cloud</a></li>
                    <li>Consulter notre <a href='https://mdoservices.fr/premium-management' style='color: #2563eb;'>offre d'infogérance</a></li>
                    <li>Nous appeler au <strong>05.82.95.22.77</strong></li>
                </ul>
            </div>

            <div style='text-align: center; margin: 30px 0;'>
                <a href='https://mdoservices.fr' class='button' style='color: white;'>Visiter notre site</a>
            </div>

            <div style='background: #e0e7ff; padding: 20px; border-radius: 8px; margin-top: 20px;'>
                <h3 style='margin-top: 0; color: #1f2937;'>🚀 Besoin urgent ?</h3>
                <p style='margin-bottom: 0;'>
                    <strong>Téléphone :</strong> 05.82.95.22.77<br>
                    <strong>Mobile :</strong> 06.66.03.03.61<br>
                    <strong>Email :</strong> contact@mdoservices.fr
                </p>
            </div>
        </div>
        <div class='footer'>
            <p style='margin: 5px 0;'><strong>MDO Services</strong></p>
            <p style='margin: 5px 0;'>Expert IT & Cloud en Occitanie</p>
            <p style='margin: 5px 0;'>27 rue Pierre Mazaud, 09200 Saint-Girons</p>
            <p style='margin: 15px 0 5px 0;'>
                <a href='https://mdoservices.fr' style='color: #60a5fa; text-decoration: none;'>www.mdoservices.fr</a>
            </p>
        </div>
    </div>
</body>
</html>";
    }

    /**
     * Template de notification de contact pour l'équipe
     */
    private function getContactNotificationTemplate($data) {
        $name = htmlspecialchars($data['name']);
        $email = htmlspecialchars($data['email']);
        $phone = !empty($data['phone']) ? htmlspecialchars($data['phone']) : 'Non renseigné';
        $message = htmlspecialchars($data['message']);

        return "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 15px; padding: 15px; background: white; border-left: 4px solid #2563eb; border-radius: 4px; }
        .label { font-weight: bold; color: #2563eb; margin-bottom: 5px; }
        .footer { background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='margin: 0;'>📧 Nouveau Message de Contact</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Nom complet</div>
                <div>$name</div>
            </div>
            <div class='field'>
                <div class='label'>📧 Adresse email</div>
                <div><a href='mailto:$email'>$email</a></div>
            </div>
            <div class='field'>
                <div class='label'>📱 Téléphone</div>
                <div>$phone</div>
            </div>
            <div class='field'>
                <div class='label'>💬 Message</div>
                <div style='white-space: pre-wrap;'>$message</div>
            </div>
        </div>
        <div class='footer'>
            MDO Services - " . date('d/m/Y à H:i') . "<br>
            Formulaire de contact du site web
        </div>
    </div>
</body>
</html>";
    }

    /**
     * Template de bienvenue newsletter
     */
    private function getNewsletterWelcomeTemplate() {
        return "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 40px 20px; text-align: center; }
        .content { background: #f9fafb; padding: 30px 20px; }
        .welcome-box { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .benefits { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; }
        .benefit-item { margin: 15px 0; padding: 15px; background: #f0f4ff; border-radius: 8px; }
        .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 14px; }
        .button { display: inline-block; background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1 style='margin: 0; font-size: 32px;'>🎉 Bienvenue !</h1>
            <p style='margin: 10px 0 0 0; font-size: 18px;'>Merci de vous être abonné(e) à notre newsletter</p>
        </div>
        <div class='content'>
            <div class='welcome-box'>
                <h2 style='color: #1f2937; margin-top: 0;'>Vous faites maintenant partie de notre communauté !</h2>
                <p style='font-size: 16px;'>
                    Nous sommes ravis de vous compter parmi nos abonnés. Vous recevrez désormais nos actualités, conseils IT et offres exclusives directement dans votre boîte mail.
                </p>
            </div>

            <div class='benefits'>
                <h3 style='color: #1f2937; margin-top: 0;'>Ce que vous allez recevoir :</h3>

                <div class='benefit-item'>
                    <strong>💡 Conseils d'experts</strong><br>
                    <span style='color: #666;'>Tips et bonnes pratiques en IT, cybersécurité et cloud</span>
                </div>

                <div class='benefit-item'>
                    <strong>🚀 Actualités technologiques</strong><br>
                    <span style='color: #666;'>Les dernières tendances et innovations</span>
                </div>

                <div class='benefit-item'>
                    <strong>🎁 Offres exclusives</strong><br>
                    <span style='color: #666;'>Promotions et avantages réservés à nos abonnés</span>
                </div>

                <div class='benefit-item'>
                    <strong>📊 Études de cas</strong><br>
                    <span style='color: #666;'>Retours d'expérience de nos clients</span>
                </div>
            </div>

            <div style='text-align: center; margin: 30px 0;'>
                <a href='https://mdoservices.fr/solutions' class='button' style='color: white;'>Découvrir nos solutions</a>
            </div>

            <div style='background: #e0e7ff; padding: 20px; border-radius: 8px; margin-top: 20px; text-align: center;'>
                <h3 style='margin-top: 0; color: #1f2937;'>📞 Besoin d'aide ?</h3>
                <p style='margin-bottom: 0;'>
                    Notre équipe est à votre écoute<br>
                    <strong>05.82.95.22.77</strong> • <a href='mailto:contact@mdoservices.fr' style='color: #2563eb;'>contact@mdoservices.fr</a>
                </p>
            </div>
        </div>
        <div class='footer'>
            <p style='margin: 5px 0;'><strong>MDO Services</strong></p>
            <p style='margin: 5px 0;'>Expert IT & Cloud en Occitanie</p>
            <p style='margin: 5px 0;'>27 rue Pierre Mazaud, 09200 Saint-Girons</p>
            <p style='margin: 15px 0 5px 0;'>
                <a href='https://mdoservices.fr' style='color: #60a5fa; text-decoration: none;'>www.mdoservices.fr</a>
            </p>
        </div>
    </div>
</body>
</html>";
    }

    /**
     * Template de notification newsletter pour l'équipe
     */
    private function getNewsletterNotificationTemplate($email) {
        $email = htmlspecialchars($email);

        return "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .info-box { margin-bottom: 15px; padding: 20px; background: white; border-left: 4px solid #7c3aed; border-radius: 4px; }
        .email { font-size: 18px; font-weight: bold; color: #2563eb; padding: 10px; background: #f0f4ff; border-radius: 4px; display: inline-block; }
        .label { font-weight: bold; color: #7c3aed; margin-bottom: 5px; }
        .footer { background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
        .stats { background: #e0e7ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='margin: 0;'>📧 Nouvelle Inscription Newsletter</h2>
        </div>
        <div class='content'>
            <div class='info-box'>
                <div class='label'>📩 Nouvel abonné</div>
                <div class='email'>$email</div>
            </div>

            <div class='stats'>
                <strong>📅 Date d'inscription :</strong> " . date('d/m/Y à H:i') . "<br>
                <strong>🌐 Source :</strong> Formulaire newsletter (footer du site)
            </div>

            <div style='background: white; padding: 20px; border-radius: 8px; margin-top: 15px;'>
                <h3 style='color: #1f2937; margin-top: 0;'>Actions suggérées :</h3>
                <ul style='color: #666;'>
                    <li>✅ Un email de bienvenue a été automatiquement envoyé à l'abonné</li>
                    <li>📊 Ajoutez cet email à votre liste de diffusion</li>
                    <li>📝 Préparez du contenu pertinent pour vos prochaines campagnes</li>
                </ul>
            </div>

            <div style='text-align: center; margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px;'>
                <p style='margin: 0; color: #0c5460;'>
                    💡 <strong>Astuce :</strong> Engagez rapidement avec vos nouveaux abonnés<br>
                    <small>Les premiers jours sont cruciaux pour établir une relation</small>
                </p>
            </div>
        </div>
        <div class='footer'>
            MDO Services - Notification automatique<br>
            Système de gestion newsletter
        </div>
    </div>
</body>
</html>";
    }
}
