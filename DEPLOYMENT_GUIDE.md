# 🚀 Guide de Déploiement en Production - MDO Services

## ⚠️ QUESTION IMPORTANTE AVANT DE COMMENCER

**Voulez-vous activer le nouveau design Tekup comme design principal ?**

### Option A : Activer Tekup sur "/" (Recommandé) ✨
- Le nouveau design moderne remplace l'ancien
- Plus attractif et professionnel

### Option B : Garder les deux designs
- Design actuel sur "/"
- Design Tekup sur "/tekup"
- Permet une transition progressive

## 📋 CHECKLIST AVANT PRODUCTION (OBLIGATOIRE)

### 1. Créer config.local.php sur le serveur

Fichier : `api/config/config.local.php`

```php
<?php
define('ENVIRONMENT', 'production');
define('DB_HOST', 'localhost');
define('DB_NAME', 'votre_base');
define('DB_USER', 'votre_user');
define('DB_PASS', 'votre_pass');
define('JWT_SECRET', 'GENERER_CLE_SECURISEE_64_CARACTERES');
?>
```

**Générer JWT_SECRET** :
```bash
php -r "echo bin2hex(random_bytes(32));"
```

### 2. Changer le Mot de Passe Admin

Via phpMyAdmin :
```sql
UPDATE users 
SET password_hash = '$2y$10$VOTRE_NOUVEAU_HASH' 
WHERE username = 'admin';
```

### 3. Protéger les Dossiers

Créer `.htaccess` dans `api/config/`, `api/logs/`, `database/` :
```apache
Order allow,deny
Deny from all
```

## 🌐 DÉPLOIEMENT

### Étape 1 : Build

```powershell
npm run build
```

### Étape 2 : Upload sur Hostinger

Upload via FTP :
- `dist/*` → `/public_html/`
- `api/*` → `/public_html/api/`
- Créer `api/config/config.local.php`
- Créer base de données et importer `database/schema.sql`

### Étape 3 : Tests

- [ ] Site accessible
- [ ] Login fonctionne
- [ ] Navigation OK
- [ ] Mobile responsive

Voir le guide complet dans SECURITY.md
