# Guide - Réinitialisation de Mot de Passe

Ce guide explique comment configurer et utiliser la fonctionnalité de réinitialisation de mot de passe.

---

## 📋 Vue d'ensemble

La fonctionnalité de mot de passe oublié permet aux utilisateurs de :
1. Demander un lien de réinitialisation par email
2. Recevoir un email avec un lien sécurisé (valide 1 heure)
3. Définir un nouveau mot de passe
4. Se connecter avec le nouveau mot de passe

---

## 🔧 Installation

### Étape 1 : Créer la table dans la base de données

Connectez-vous à **phpMyAdmin** et exécutez ce script SQL :

```sql
-- Table for password reset tokens
CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    used TINYINT(1) DEFAULT 0,
    INDEX idx_token (token),
    INDEX idx_email (email),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Alternative :** Importez le fichier `database/password-reset-migration.sql` via phpMyAdmin.

### Étape 2 : Uploader les fichiers API sur Hostinger

Uploadez ces nouveaux fichiers dans `public_html/api/auth/` :
- `request-reset.php`
- `verify-reset-token.php`
- `reset-password.php`

### Étape 3 : Compiler et uploader le frontend

```bash
# Compiler le site
npm run build

# Uploader le contenu de /dist vers public_html/
```

---

## 📧 Configuration de l'envoi d'emails

### Option 1 : PHP mail() (par défaut)

La fonction utilise `mail()` de PHP. Sur Hostinger, cela fonctionne généralement directement.

**Configuration dans `api/auth/request-reset.php` :**

```php
// Headers actuels (ligne ~140)
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: MDO Services <noreply@mdoservices.fr>',  // ← CHANGEZ CETTE ADRESSE
    'Reply-To: contact@mdoservices.fr',              // ← CHANGEZ CETTE ADRESSE
    'X-Mailer: PHP/' . phpversion()
];
```

**⚠️ Important :** Remplacez `noreply@mdoservices.fr` par une adresse email valide de votre domaine.

### Option 2 : SMTP (recommandé pour production)

Si les emails ne partent pas avec `mail()`, utilisez PHPMailer avec SMTP.

**Installation :**

```bash
composer require phpmailer/phpmailer
```

**Exemple de configuration SMTP :**

```php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendPasswordResetEmail($email, $username, $resetUrl, $token) {
    $mail = new PHPMailer(true);

    try {
        // Configuration SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com'; // Serveur SMTP Hostinger
        $mail->SMTPAuth = true;
        $mail->Username = 'noreply@votredomaine.com'; // Votre email
        $mail->Password = 'VotreMotDePasse'; // Mot de passe email
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';

        // Destinataire
        $mail->setFrom('noreply@votredomaine.com', 'MDO Services');
        $mail->addAddress($email, $username);

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = 'Réinitialisation de votre mot de passe - MDO Services';
        $mail->Body = "..."; // Le HTML de l'email

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Email error: {$mail->ErrorInfo}");
        return false;
    }
}
```

---

## 🧪 Test de la fonctionnalité

### Test 1 : Demande de réinitialisation

1. **Allez sur :** `https://votredomaine.com/partner`
2. **Cliquez sur :** "Mot de passe oublié ?"
3. **Entrez :** l'email de votre compte admin (`admin@mdoservices.fr` par défaut)
4. **Cliquez sur :** "Envoyer le lien de réinitialisation"

✅ Vous devriez voir : "Email envoyé !"

### Test 2 : Vérifier l'email

1. **Vérifiez votre boîte mail** (et les spams)
2. ✅ Vous devriez recevoir un email avec :
   - Un bouton "Réinitialiser mon mot de passe"
   - Un lien cliquable
   - Un message d'expiration (1 heure)

### Test 3 : Réinitialiser le mot de passe

1. **Cliquez sur le lien** dans l'email
2. **Vous arrivez sur :** `/partner/reset-password?token=...`
3. **Entrez un nouveau mot de passe** (minimum 8 caractères)
4. **Confirmez** le mot de passe
5. **Cliquez sur :** "Réinitialiser le mot de passe"

✅ Vous devriez voir : "Mot de passe réinitialisé !"

### Test 4 : Connexion avec le nouveau mot de passe

1. **Redirection automatique** vers `/partner`
2. **Connectez-vous** avec votre nouveau mot de passe

✅ La connexion devrait fonctionner !

---

## 🔍 Tests API directs

### Test 1 : Demander une réinitialisation

```bash
curl -X POST https://votredomaine.com/api/auth/request-reset \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mdoservices.fr"}'
```

**Réponse attendue :**
```json
{
  "success": true,
  "message": "Si cette adresse email existe, un lien de réinitialisation a été envoyé."
}
```

### Test 2 : Vérifier un token

```bash
curl "https://votredomaine.com/api/auth/verify-reset-token?token=VOTRE_TOKEN"
```

**Réponse si valide :**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "email": "admin@mdoservices.fr"
  }
}
```

### Test 3 : Réinitialiser le mot de passe

```bash
curl -X POST https://votredomaine.com/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"VOTRE_TOKEN","password":"NouveauMotDePasse123!"}'
```

**Réponse attendue :**
```json
{
  "success": true,
  "message": "Votre mot de passe a été réinitialisé avec succès."
}
```

---

## 🛠️ Résolution de problèmes

### Problème : "Email non reçu"

**Causes possibles :**
1. Email dans les spams
2. Fonction `mail()` désactivée
3. Email "From" invalide

**Solutions :**
1. Vérifiez les spams
2. Consultez les logs : `api/logs/api.log`
3. Vérifiez la configuration SMTP d'Hostinger dans hPanel
4. Utilisez PHPMailer avec SMTP (voir Option 2)

### Problème : "Lien invalide ou expiré"

**Causes possibles :**
1. Token expiré (> 1 heure)
2. Token déjà utilisé
3. Token incorrect

**Solutions :**
1. Demandez un nouveau lien
2. Vérifiez dans phpMyAdmin :
   ```sql
   SELECT * FROM password_resets ORDER BY created_at DESC LIMIT 5;
   ```

### Problème : "Erreur lors de la réinitialisation"

**Causes possibles :**
1. Mot de passe trop court (< 8 caractères)
2. Erreur de base de données

**Solutions :**
1. Utilisez un mot de passe de 8+ caractères
2. Consultez les logs : `api/logs/error.log`
3. Vérifiez les permissions de la table `users`

---

## 🔐 Sécurité

### Bonnes pratiques implémentées

✅ **Token sécurisé** : 64 caractères aléatoires (random_bytes)
✅ **Expiration** : Tokens valides 1 heure seulement
✅ **Usage unique** : Token marqué comme utilisé après réinitialisation
✅ **Pas d'énumération d'emails** : Même message si l'email n'existe pas
✅ **Logging** : Toutes les tentatives sont enregistrées
✅ **Validation** : Mot de passe minimum 8 caractères
✅ **Hashing** : Password hashed avec bcrypt

### Recommandations supplémentaires

1. **Limitez les demandes** : Ajoutez un rate limiting (max 3 demandes/heure)
2. **Email SSL/TLS** : Utilisez SMTP avec chiffrement
3. **Monitoring** : Surveillez les logs pour détecter les abus
4. **Nettoyage** : Créez un cron job pour supprimer les tokens expirés

**Exemple de cron (tous les jours à 3h du matin) :**
```sql
DELETE FROM password_resets WHERE expires_at < NOW() OR used = 1;
```

---

## 📊 Maintenance

### Nettoyage automatique des tokens

**Via phpMyAdmin** (manuel) :
```sql
-- Supprimer les tokens expirés ou utilisés
DELETE FROM password_resets
WHERE expires_at < NOW() OR used = 1;
```

**Via Cron Job** (automatique) :

Créez un fichier `api/cron/cleanup-reset-tokens.php` :

```php
<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';

$db = new Database();
$sql = "DELETE FROM password_resets WHERE expires_at < NOW() OR used = 1";
$db->execute($sql);

echo "Cleanup completed at " . date('Y-m-d H:i:s') . "\n";
```

Puis configurez un cron job dans hPanel :
```
0 3 * * * /usr/bin/php /home/user/public_html/api/cron/cleanup-reset-tokens.php
```

---

## 📝 Personnalisation de l'email

### Modifier le template d'email

Éditez `api/auth/request-reset.php` ligne ~60 :

**Variables disponibles :**
- `$email` - Email du destinataire
- `$username` - Nom d'utilisateur
- `$resetUrl` - Lien de réinitialisation
- `$token` - Token (pour debug, ne pas afficher à l'utilisateur)

**Exemple de personnalisation :**

```php
$message = "
<html>
<head>
    <style>
        /* Vos styles CSS personnalisés */
        .custom-button { background: #your-color; }
    </style>
</head>
<body>
    <div class='container'>
        <h1>Bonjour $username,</h1>
        <p>Votre message personnalisé...</p>
        <a href='$resetUrl' class='custom-button'>Réinitialiser</a>
    </div>
</body>
</html>
";
```

---

## ✅ Checklist de déploiement

Avant de déployer en production :

- [ ] Table `password_resets` créée dans MySQL
- [ ] Fichiers API uploadés sur Hostinger
- [ ] Email "From" configuré avec votre domaine
- [ ] Test d'envoi d'email réussi
- [ ] Token de test validé et expiré après 1h
- [ ] Réinitialisation testée avec succès
- [ ] Connexion testée avec nouveau mot de passe
- [ ] Logs vérifiés (pas d'erreurs)
- [ ] Cron job de nettoyage configuré (optionnel)

---

## 🎉 Terminé !

Votre système de réinitialisation de mot de passe est maintenant opérationnel !

**Pages disponibles :**
- Login : `/partner`
- Mot de passe oublié : `/partner/forgot-password`
- Réinitialisation : `/partner/reset-password?token=...`

**API Endpoints :**
- `POST /api/auth/request-reset`
- `GET /api/auth/verify-reset-token`
- `POST /api/auth/reset-password`

**Besoin d'aide ?** Consultez les logs dans `api/logs/api.log` et `api/logs/error.log`
