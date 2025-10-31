# 🔒 Guide de Sécurité - MDO Services

Ce document contient toutes les recommandations de sécurité pour le site MDO Services.

## 📋 Table des Matières

1. [Audit de Sécurité](#audit-de-sécurité)
2. [Actions Critiques Immédiates](#actions-critiques-immédiates)
3. [Configuration Sécurisée](#configuration-sécurisée)
4. [Gestion des Mots de Passe](#gestion-des-mots-de-passe)
5. [Sécurité API](#sécurité-api)
6. [Permissions Fichiers](#permissions-fichiers)
7. [Maintenance Continue](#maintenance-continue)
8. [Checklist de Sécurité](#checklist-de-sécurité)

---

## Audit de Sécurité

### Exécuter l'Audit

1. Uploadez `api/security-audit.php` sur votre serveur
2. Accédez à : `https://mdoservices.fr/api/security-audit.php?key=audit2025`
3. Lisez attentivement tous les résultats
4. Suivez les recommandations par ordre de priorité
5. **SUPPRIMEZ le fichier après usage**

### Score de Sécurité

- **90-100** : Excellent ✅
- **70-89** : Bon ⚠️ (corrections mineures)
- **50-69** : Moyen ⚠️ (corrections nécessaires)
- **< 50** : Critique ❌ (corrections urgentes)

---

## Actions Critiques Immédiates

### 🚨 PRIORITÉ 1 - À FAIRE IMMÉDIATEMENT

#### 1. Supprimer Tous les Fichiers de Diagnostic

**Option A : Script Automatique**
```bash
# Accédez à :
https://mdoservices.fr/api/cleanup-diagnostic-files.php?confirm=delete2025
```

**Option B : Suppression Manuelle via FTP**

Supprimez ces fichiers :

```
/public_html/
  ├── check-multiple-versions.html        ❌ SUPPRIMER
  ├── test-login-direct.html              ❌ SUPPRIMER
  ├── test-assets.html                    ❌ SUPPRIMER
  ├── debug-login-response.html           ❌ SUPPRIMER
  ├── verify-login-format.html            ❌ SUPPRIMER
  │
  └── api/
      ├── test-db.php                     ❌ SUPPRIMER
      ├── reset-rate-limit.php            ❌ SUPPRIMER
      ├── find-duplicate-files.php        ❌ SUPPRIMER
      ├── security-audit.php              ❌ SUPPRIMER
      ├── cleanup-diagnostic-files.php    ❌ SUPPRIMER
      │
      ├── posts/
      │   └── diagnostic-posts.php        ❌ SUPPRIMER
      │
      └── auth/
          ├── test-login.php              ❌ SUPPRIMER
          ├── test-auth-full.php          ❌ SUPPRIMER
          ├── reset-admin-password.php    ❌ SUPPRIMER
          ├── force-password-reset.php    ❌ SUPPRIMER
          └── generate-hash.php           ❌ SUPPRIMER
```

**Pourquoi ?** Ces fichiers exposent des informations sensibles et peuvent être utilisés par des attaquants.

#### 2. Changer le Mot de Passe Admin

**Via phpMyAdmin :**
```sql
-- 1. Générez un hash pour votre nouveau mot de passe fort
-- Utilisez https://bcrypt-generator.com/ avec cost=10

-- 2. Mettez à jour la base de données
UPDATE users
SET password = '$2y$10$VotreNouveauHashIci'
WHERE username = 'admin';
```

**Exigences du mot de passe :**
- ✅ Minimum 12 caractères
- ✅ Mélange de majuscules, minuscules, chiffres, symboles
- ✅ Pas de mots du dictionnaire
- ✅ Unique (jamais utilisé ailleurs)

**Exemples de mots de passe FORTS :**
```
✅ K9#mP2$vL8@qR4!xN7
✅ T@ble&Ch@ise*2025!
✅ M0nM0tDeP@sse!Secur1se
```

**Exemples de mots de passe FAIBLES :**
```
❌ password
❌ admin123
❌ ChangeMe123!
❌ mdoservices2025
```

#### 3. Générer un Nouveau JWT_SECRET

**Générer un secret fort :**
```bash
# Sur votre machine locale (Linux/Mac) :
openssl rand -base64 64

# Ou utilisez un générateur en ligne :
# https://www.random.org/strings/
# - 64 caractères
# - Alphanumeric
```

**Mettre à jour config.local.php :**
```php
<?php
// api/config/config.local.php

// JWT Configuration - CHANGEZ CETTE VALEUR
define('JWT_SECRET', 'VOTRE_NOUVEAU_SECRET_64_CARACTERES_MINIMUM_ICI');

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'u442378820_site_mdo_2026');
define('DB_USER', 'u442378820_site_mdo_2026');
define('DB_PASS', 'votre_mot_de_passe_db');
```

**⚠️ Important :** Après avoir changé JWT_SECRET, tous les tokens existants seront invalides. Les utilisateurs devront se reconnecter.

---

## Configuration Sécurisée

### Fichier .htaccess (Racine)

Vérifiez que votre `/public_html/.htaccess` contient ces protections :

```apache
# Bloquer l'accès aux fichiers sensibles
<FilesMatch "(^\.env|^config\.local\.php|^\.git|composer\.(json|lock)|package\.json)">
    Require all denied
</FilesMatch>

# Désactiver le listing de répertoires
Options -Indexes

# Protection contre injection de scripts
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:;"
</IfModule>

# Redirect www to non-www (BUT exclude /api/)
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteCond %{REQUEST_URI} !^/api/ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# SPA routing (must be AFTER www redirect)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^ index.html [L]
```

### Fichier .htaccess (API)

**NE PAS créer de fichier .htaccess dans `/public_html/api/`**

Si un fichier `.htaccess` existe dans `/api/`, **supprimez-le**. Il peut bloquer l'accès aux endpoints.

### Configuration PHP

**Recommandations php.ini (via panel Hostinger) :**

```ini
# Désactiver l'affichage des erreurs en production
display_errors = Off
log_errors = On
error_log = /home/user/logs/php_error.log

# Limiter les uploads
upload_max_filesize = 10M
post_max_size = 10M

# Sécurité sessions
session.cookie_httponly = 1
session.cookie_secure = 1
session.cookie_samesite = Strict

# Désactiver fonctions dangereuses
disable_functions = exec,passthru,shell_exec,system,proc_open,popen
```

---

## Gestion des Mots de Passe

### Politique de Mots de Passe

**Pour les administrateurs :**
- Minimum 12 caractères
- Changement tous les 3 mois
- Utiliser un gestionnaire de mots de passe (1Password, Bitwarden, LastPass)
- Activer 2FA si possible

**Hachage des mots de passe :**

Utilisez toujours `password_hash()` avec BCRYPT (cost ≥ 10) :

```php
// ✅ CORRECT
$hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);

// Vérification
if (password_verify($inputPassword, $hashedPassword)) {
    // Login réussi
}

// ❌ INCORRECT - NE JAMAIS FAIRE
$hashedPassword = md5($password);  // Cassable en secondes
$hashedPassword = sha1($password); // Cassable en secondes
```

### Stockage Sécurisé des Credentials

**✅ CORRECT :**
```
/home/user/www_mdoservices/api/config/config.local.php
(au-dessus de public_html si possible)
```

**❌ INCORRECT :**
```
Directement dans le code
Dans .env accessible via web
Dans des fichiers versionnés Git
```

---

## Sécurité API

### Authentication JWT

**Vérifications à faire :**

1. **Toutes les routes sensibles sont protégées**

```php
// ✅ CORRECT - Vérification JWT sur routes sensibles
require_once __DIR__ . '/../middleware/auth.php';

// Décoder et valider le token
$decoded = verifyJWT();
if (!$decoded) {
    sendError('Non autorisé', 401);
}

// Vérifier les permissions admin
if (!isset($decoded->data->is_admin) || !$decoded->data->is_admin) {
    sendError('Accès refusé', 403);
}
```

2. **Les endpoints publics ne divulguent pas d'informations sensibles**

```php
// ✅ CORRECT - Liste publique des posts
$query = "SELECT id, title, slug, excerpt, cover_image_url,
          author_name, published_at
          FROM posts
          WHERE published_at IS NOT NULL
          ORDER BY published_at DESC";

// ❌ INCORRECT - Divulgue des données sensibles
$query = "SELECT * FROM posts"; // Inclut brouillons, IDs auteurs, etc.
```

### Rate Limiting

Le système actuel : **5 tentatives / 15 minutes**

**Pour ajuster (si nécessaire) dans `api/auth/login.php` :**

```php
// Modifier ces constantes
define('MAX_LOGIN_ATTEMPTS', 5);     // Nombre de tentatives
define('LOCKOUT_TIME', 900);         // Durée lockout en secondes (15 min)
```

### CORS Configuration

**Configuration actuelle (permissive) :**
```php
header("Access-Control-Allow-Origin: *");
```

**Configuration recommandée (production) :**
```php
// Limitez aux domaines autorisés
$allowed_origins = ['https://mdoservices.fr', 'https://www.mdoservices.fr'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://mdoservices.fr");
}
```

**À appliquer dans tous les fichiers API :**
- `api/auth/login.php`
- `api/posts/*.php`
- `api/pricing/*.php`

### Protection SQL Injection

**✅ TOUJOURS utiliser des requêtes préparées :**

```php
// ✅ CORRECT
$query = "SELECT * FROM posts WHERE id = :id";
$stmt = $db->prepare($query);
$stmt->bindParam(':id', $postId, PDO::PARAM_INT);
$stmt->execute();

// ❌ INCORRECT - Vulnérable à SQL Injection
$query = "SELECT * FROM posts WHERE id = " . $_GET['id'];
$stmt = $db->query($query);
```

### Protection XSS

**✅ TOUJOURS échapper les sorties :**

```php
// ✅ CORRECT
echo htmlspecialchars($user_input, ENT_QUOTES, 'UTF-8');

// Pour JSON API, pas besoin d'échapper (json_encode le fait)
sendSuccess(['title' => $post['title']]); // Safe

// ❌ INCORRECT
echo $_GET['name']; // Vulnérable XSS
echo $user_input;   // Vulnérable XSS
```

---

## Permissions Fichiers

### Permissions Recommandées

```bash
# Répertoires
chmod 755 /public_html
chmod 755 /public_html/api
chmod 755 /public_html/api/*

# Fichiers PHP
chmod 644 /public_html/api/**/*.php

# Fichiers de configuration (CRITIQUE)
chmod 600 /public_html/api/config/config.local.php
chmod 644 /public_html/api/config/config.php

# Fichier .htaccess
chmod 644 /public_html/.htaccess

# Assets statiques
chmod 644 /public_html/assets/**/*
```

### Via FTP (FileZilla)

1. Clic droit sur le fichier → "File permissions..."
2. Configurez :
   - **Fichiers sensibles (config.local.php)** : `600` (rw-------)
   - **Fichiers PHP standard** : `644` (rw-r--r--)
   - **Répertoires** : `755` (rwxr-xr-x)

### Vérification Rapide

```bash
# Sur le serveur (SSH si disponible)
find /public_html -type f -perm 0777
# Ne devrait rien retourner

find /public_html -type d -perm 0777
# Ne devrait rien retourner
```

---

## Maintenance Continue

### Checklist Mensuelle

- [ ] Vérifier les logs d'erreurs PHP
- [ ] Vérifier les logs d'accès Apache (tentatives d'intrusion)
- [ ] Vérifier que les fichiers de diagnostic n'ont pas été re-uploadés
- [ ] Backup de la base de données
- [ ] Vérifier les mises à jour PHP disponibles
- [ ] Tester l'authentification admin
- [ ] Vérifier le certificat SSL (expiration)

### Checklist Trimestrielle

- [ ] Changer le mot de passe admin
- [ ] Générer un nouveau JWT_SECRET
- [ ] Audit de sécurité complet (réexécuter security-audit.php)
- [ ] Vérifier les permissions de tous les fichiers
- [ ] Réviser les logs d'accès API (détecter patterns suspects)

### Checklist Annuelle

- [ ] Revue complète du code de sécurité
- [ ] Test de pénétration (si budget disponible)
- [ ] Mise à jour de tous les composants (PHP, dépendances)
- [ ] Revue de la politique CORS
- [ ] Revue des stratégies de backup

### Monitoring Recommandé

**Services gratuits/freemium :**

1. **UptimeRobot** (https://uptimerobot.com/)
   - Monitoring uptime du site
   - Alertes email si site down

2. **Cloudflare** (https://cloudflare.com/)
   - Protection DDoS
   - Firewall applicatif
   - Analytics de sécurité
   - SSL/TLS automatique

3. **Sucuri SiteCheck** (https://sitecheck.sucuri.net/)
   - Scan malware gratuit
   - Vérification blacklists

### Backups

**Configuration recommandée :**

1. **Base de données** : Quotidienne
   - Via cPanel / phpMyAdmin : Exporter au format SQL
   - Automatisation possible via cron

2. **Fichiers** : Hebdomadaire
   - Backup complet de `/public_html`
   - Exclure `/node_modules`, `/vendor`, `/dist`

3. **Stockage** :
   - Hostinger backups automatiques (vérifier disponibilité)
   - Backup externe : Google Drive, Dropbox, AWS S3

**Script de backup SQL (exemple) :**
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u username -p'password' database_name > backup_$DATE.sql
```

---

## Checklist de Sécurité

### 🚨 Critique (À faire MAINTENANT)

- [ ] Supprimer tous les fichiers de diagnostic (voir liste ci-dessus)
- [ ] Changer le mot de passe admin (min. 12 caractères)
- [ ] Générer et configurer nouveau JWT_SECRET (64+ caractères)
- [ ] Vérifier permissions fichiers sensibles (config.local.php = 600)
- [ ] Supprimer api/security-audit.php après utilisation
- [ ] Supprimer api/cleanup-diagnostic-files.php après utilisation

### ⚠️ Important (À faire cette semaine)

- [ ] Configurer CORS spécifique (limiter à mdoservices.fr)
- [ ] Vérifier que .htaccess bloque fichiers sensibles
- [ ] Configurer logs d'erreur PHP hors de public_html
- [ ] Tester tous les endpoints API (s'assurer auth fonctionne)
- [ ] Vérifier que répertoire api/auth/rate_limits existe et est writable
- [ ] Configurer backups automatiques base de données

### ℹ️ Recommandé (À faire ce mois-ci)

- [ ] Activer monitoring uptime (UptimeRobot)
- [ ] Configurer Cloudflare pour protection DDoS
- [ ] Documenter procédures de récupération d'urgence
- [ ] Créer calendrier de maintenance sécurité
- [ ] Tester restauration backup
- [ ] Réviser code API pour XSS/SQL injection

### 🔵 Amélioration Continue

- [ ] Implémenter logging API centralisé
- [ ] Ajouter monitoring performance
- [ ] Considérer 2FA pour admin
- [ ] Implémenter Content Security Policy strict
- [ ] Ajouter HSTS header
- [ ] Planifier audits de sécurité réguliers

---

## Contacts Sécurité

**En cas d'incident de sécurité :**

1. **Immédiatement :**
   - Désactiver accès admin : commentez routes dans api/auth/login.php
   - Changer mot de passe base de données
   - Contacter support Hostinger

2. **Documentation :**
   - Noter date/heure de la découverte
   - Capturer logs d'accès
   - Identifier vecteur d'attaque
   - Lister données potentiellement compromises

3. **Récupération :**
   - Restaurer depuis backup vérifié sain
   - Changer tous les credentials
   - Appliquer correctifs
   - Réexécuter audit de sécurité

**Support Hostinger :**
- https://www.hostinger.fr/contact
- Panel d'assistance dans compte Hostinger

---

## Ressources Additionnelles

### Liens Utiles

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Vulnérabilités web courantes
- [PHP Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/PHP_Configuration_Cheat_Sheet.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Mozilla Observatory](https://observatory.mozilla.org/) - Test sécurité headers
- [SSL Labs Test](https://www.ssllabs.com/ssltest/) - Test configuration SSL

### Outils de Test

- **Générateur bcrypt** : https://bcrypt-generator.com/
- **Générateur secrets** : https://www.random.org/strings/
- **Test headers sécurité** : https://securityheaders.com/
- **Test CORS** : https://www.test-cors.org/

---

## Historique des Audits

Documentez vos audits ici :

```
| Date       | Score | Critiques | Warnings | Actions                           |
|------------|-------|-----------|----------|-----------------------------------|
| 2025-01-XX | XX/100| X         | X        | Premier audit - fichiers supprimés|
|            |       |           |          |                                   |
```

---

**🔒 Dernière mise à jour :** 30 Octobre 2025
**📝 Version :** 2.0.0

**⚠️ IMPORTANT :** Ne partagez jamais ce document s'il contient des credentials réels. Gardez-le dans un endroit sécurisé.
