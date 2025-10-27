# Guide de Sécurité - MDO Services API

## Actions Critiques à Effectuer IMMÉDIATEMENT Après Installation

### 1. Changer le Mot de Passe Admin par Défaut

Le schéma de base de données (`database/schema.sql`) crée un compte admin avec des identifiants par défaut :

- **Username**: `admin`
- **Password**: `ChangeMe123!`

**VOUS DEVEZ CHANGER CE MOT DE PASSE IMMÉDIATEMENT !**

#### Comment changer le mot de passe admin :

```sql
-- Connectez-vous à votre base de données MySQL et exécutez :
UPDATE users
SET password_hash = '$2y$10$VOTRE_NOUVEAU_HASH'
WHERE username = 'admin';
```

Pour générer un nouveau hash de mot de passe :

```php
<?php
echo password_hash('VotreNouveauMotDePasseSecurise', PASSWORD_DEFAULT);
?>
```

Ou utilisez l'API de réinitialisation de mot de passe une fois le système déployé.

### 2. Configurer une Clé JWT Sécurisée

Le fichier `api/config/config.php` contient une clé JWT par défaut qui N'EST PAS SÉCURISÉE.

**Créez le fichier `api/config/config.local.php` avec votre propre clé :**

```php
<?php
// Générez une clé sécurisée avec une des commandes suivantes :
// openssl rand -base64 64
// php -r "echo bin2hex(random_bytes(32));"

define('JWT_SECRET', 'VOTRE_CLE_SECRETE_GENEREE_ICI');
```

### 3. Configurer l'Environnement de Production

Dans `api/config/config.local.php`, définissez l'environnement :

```php
<?php
define('ENVIRONMENT', 'production');
```

Cela désactivera complètement l'affichage des erreurs pour la sécurité.

### 4. Configurer l'Envoi d'Emails

La fonction `mail()` PHP native utilisée actuellement est peu fiable. Pour la production, il est recommandé d'utiliser :

#### Option A : PHPMailer avec SMTP

```bash
composer require phpmailer/phpmailer
```

Voir la documentation dans `api/auth/request-reset.php` pour plus de détails.

#### Option B : Service d'Email Tiers

- SendGrid
- Mailgun
- AWS SES
- Service SMTP de votre hébergeur (Hostinger, etc.)

### 5. Sécuriser les Dossiers Sensibles

Assurez-vous que les dossiers suivants ne sont PAS accessibles publiquement :

- `/api/config/`
- `/api/logs/`
- `/database/`

Configuration Apache (`.htaccess`) :

```apache
<FilesMatch "\.(php|sql|md)$">
    Order allow,deny
    Deny from all
</FilesMatch>
```

Configuration Nginx :

```nginx
location ~ ^/(api/config|api/logs|database) {
    deny all;
    return 404;
}
```

### 6. Configuration Base de Données

Dans `api/config/config.local.php`, configurez vos informations de connexion :

```php
<?php
define('DB_HOST', 'votre_host');
define('DB_NAME', 'votre_base_de_donnees');
define('DB_USER', 'votre_utilisateur');
define('DB_PASS', 'votre_mot_de_passe');
```

**NE COMMITTEZ JAMAIS `config.local.php` dans Git !** (déjà dans `.gitignore`)

## Fonctionnalités de Sécurité Implémentées

### Rate Limiting

Le système implémente désormais un rate limiting pour protéger contre les attaques par force brute :

- **Login** : 5 tentatives par 15 minutes
- **Réinitialisation de mot de passe** : 3 tentatives par 15 minutes

Les limites sont stockées dans `/api/logs/rate_limit_*.json`.

### Validation des Entrées

Toutes les entrées utilisateur sont validées :
- Longueur maximale des chaînes
- Taille maximale des payloads JSON (1MB)
- Validation des types de données
- Sanitisation des chaînes

### Protection CSRF

Les endpoints utilisent des vérifications de méthodes HTTP strictes et CORS configuré.

### Authentification JWT

Les tokens JWT expirent après 24 heures (configurable via `JWT_EXPIRATION`).

## Checklist de Sécurité

- [ ] Mot de passe admin changé
- [ ] Clé JWT sécurisée configurée dans `config.local.php`
- [ ] Informations de base de données configurées dans `config.local.php`
- [ ] Variable `ENVIRONMENT` définie à `'production'`
- [ ] Système d'envoi d'emails configuré (SMTP/service tiers)
- [ ] Dossiers sensibles protégés (config, logs, database)
- [ ] Logs d'erreurs PHP configurés et non accessibles publiquement
- [ ] HTTPS activé sur le serveur de production
- [ ] Sauvegardes automatiques de la base de données configurées
- [ ] Permissions des fichiers correctes (644 pour les fichiers, 755 pour les dossiers)

## Monitoring et Logs

Les logs sont stockés dans `/api/logs/` :

- `api.log` : Logs applicatifs (authentification, erreurs, etc.)
- `php_errors.log` : Erreurs PHP
- `rate_limit_*.json` : Données de rate limiting

**Assurez-vous que ce dossier est protégé et non accessible publiquement.**

## Rapporter une Vulnérabilité

Si vous découvrez une vulnérabilité de sécurité, contactez immédiatement l'administrateur du système.

## Mises à Jour de Sécurité

Pensez à :
- Mettre à jour PHP régulièrement
- Surveiller les vulnérabilités dans les dépendances
- Revoir régulièrement les logs de sécurité
- Effectuer des audits de sécurité périodiques
