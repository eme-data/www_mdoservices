# Guide de Déploiement - MDO Services
## Migration de Supabase vers Hostinger (PHP + MySQL)

Ce guide vous accompagne étape par étape pour migrer votre site de Supabase vers Hostinger avec PHP et MySQL.

---

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Étape 1 : Exporter les données de Supabase](#étape-1--exporter-les-données-de-supabase)
3. [Étape 2 : Configurer la base de données MySQL sur Hostinger](#étape-2--configurer-la-base-de-données-mysql-sur-hostinger)
4. [Étape 3 : Compiler le site React](#étape-3--compiler-le-site-react)
5. [Étape 4 : Uploader les fichiers sur Hostinger](#étape-4--uploader-les-fichiers-sur-hostinger)
6. [Étape 5 : Configurer l'API PHP](#étape-5--configurer-lapi-php)
7. [Étape 6 : Tester et vérifier](#étape-6--tester-et-vérifier)
8. [Résolution de problèmes](#résolution-de-problèmes)

---

## 🎯 Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ Un compte Hostinger actif avec accès à :
  - phpMyAdmin (pour la base de données)
  - Gestionnaire de fichiers ou accès FTP/SFTP
  - Panneau de contrôle (hPanel)
- ✅ Node.js installé sur votre ordinateur local (pour compiler React)
- ✅ Accès à votre compte Supabase (pour exporter les données)
- ✅ Un client FTP (FileZilla recommandé) OU accès SSH

---

## 📤 Étape 1 : Exporter les données de Supabase

### Option A : Utiliser le script d'export automatique (RECOMMANDÉ)

1. **Ouvrez un terminal dans le dossier du projet**

2. **Installez les dépendances si ce n'est pas déjà fait :**
   ```bash
   npm install
   ```

3. **Exécutez le script d'export :**
   ```bash
   node database/export-from-supabase.js
   ```

4. **Le fichier `database/data-export.sql` sera généré**
   - Il contient toutes vos données actuelles (posts, pricing items)

### Option B : Export manuel depuis Supabase

1. Connectez-vous à votre tableau de bord Supabase
2. Allez dans **Table Editor**
3. Pour chaque table (`posts`, `pricing_items`) :
   - Cliquez sur "..." > "Export to CSV"
   - Sauvegardez les fichiers

---

## 🗄️ Étape 2 : Configurer la base de données MySQL sur Hostinger

### 2.1 Créer la base de données

1. **Connectez-vous à hPanel Hostinger**
2. Allez dans **Bases de données > Gestion**
3. Cliquez sur **Créer une nouvelle base de données MySQL**
4. Configurez :
   - Nom de la base : `u123456789_mdoservices` (exemple)
   - Nom d'utilisateur : `u123456789_mdouser` (exemple)
   - Mot de passe : *Générez un mot de passe fort*
5. **NOTEZ CES INFORMATIONS** - vous en aurez besoin !

### 2.2 Importer le schéma et les données

1. **Accédez à phpMyAdmin** depuis hPanel
2. **Sélectionnez votre nouvelle base de données** dans la liste à gauche
3. **Cliquez sur l'onglet "Importer"**
4. **Importez les fichiers dans cet ordre :**

   a. **D'abord le schéma :**
   - Cliquez sur "Choisir un fichier"
   - Sélectionnez `database/schema.sql`
   - Cliquez sur "Exécuter"
   - ✅ Vous devriez voir : "3 tables créées"

   b. **Ensuite les données :**
   - Cliquez sur "Choisir un fichier"
   - Sélectionnez `database/data-export.sql` (généré à l'étape 1)
   - Cliquez sur "Exécuter"
   - ✅ Vos données sont importées !

### 2.3 Vérifier l'import

1. Dans phpMyAdmin, cliquez sur la table `posts`
2. Cliquez sur "Afficher" pour voir vos articles
3. Vérifiez que vos données sont présentes

### 2.4 Créer un utilisateur admin

Le schéma SQL crée automatiquement un utilisateur admin par défaut :
- **Username:** `admin`
- **Password:** `ChangeMe123!`

⚠️ **IMPORTANT :** Changez ce mot de passe immédiatement !

**Pour changer le mot de passe :**

```sql
-- Exécutez cette requête SQL dans phpMyAdmin
UPDATE users
SET password_hash = '$2y$10$VotreNouveauHashIci'
WHERE username = 'admin';
```

**Pour générer un nouveau hash de mot de passe**, créez un fichier PHP temporaire :

```php
<?php
// hash-password.php
echo password_hash('VotreNouveauMotDePasse', PASSWORD_DEFAULT);
?>
```

Puis uploadez-le sur Hostinger, visitez-le dans votre navigateur, copiez le hash et utilisez-le dans la requête SQL ci-dessus.

---

## ⚙️ Étape 3 : Compiler le site React

1. **Sur votre ordinateur local, dans le dossier du projet :**

   ```bash
   # Installer les dépendances si nécessaire
   npm install

   # Compiler le site pour la production
   npm run build
   ```

2. **Le dossier `/dist` sera créé** avec tous les fichiers compilés

---

## 📁 Étape 4 : Uploader les fichiers sur Hostinger

### 4.1 Structure des fichiers à uploader

Votre site aura cette structure sur Hostinger :

```
public_html/
├── index.html              (du dossier /dist)
├── assets/                 (du dossier /dist/assets)
│   ├── index-abc123.js
│   └── index-def456.css
├── api/                    (du dossier /api de votre projet)
│   ├── config/
│   ├── auth/
│   ├── posts/
│   ├── pricing/
│   └── .htaccess
└── .htaccess              (deployment/.htaccess-root renommé)
```

### 4.2 Upload via FTP (FileZilla)

1. **Connectez-vous à Hostinger via FTP :**
   - Hôte : `ftp.votredomaine.com` (ou IP fournie par Hostinger)
   - Utilisateur : votre nom d'utilisateur FTP
   - Mot de passe : votre mot de passe FTP
   - Port : 21

2. **Naviguez vers le dossier `public_html`**

3. **Uploadez les fichiers :**

   a. **Contenu du dossier `/dist` :**
   - Uploadez TOUT le contenu du dossier `dist/` dans `public_html/`
   - Cela inclut : `index.html`, le dossier `assets/`, etc.

   b. **API PHP :**
   - Créez un dossier `api/` dans `public_html/`
   - Uploadez TOUT le contenu du dossier `api/` de votre projet dans `public_html/api/`

   c. **.htaccess racine :**
   - Renommez `deployment/.htaccess-root` en `.htaccess`
   - Uploadez-le dans `public_html/.htaccess`

### 4.3 Vérifier les permissions

Assurez-vous que les fichiers ont les bonnes permissions :
- Fichiers PHP : `644`
- Dossiers : `755`
- .htaccess : `644`

---

## 🔧 Étape 5 : Configurer l'API PHP

### 5.1 Créer le fichier de configuration local

1. **Via le gestionnaire de fichiers Hostinger :**
   - Naviguez vers `public_html/api/config/`
   - Créez un nouveau fichier nommé `config.local.php`

2. **Copiez le contenu de `config.local.example.php` et modifiez les valeurs :**

   ```php
   <?php
   // Vos informations de base de données Hostinger (de l'étape 2.1)
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'u123456789_mdoservices'); // VOTRE nom de base
   define('DB_USER', 'u123456789_mdouser');     // VOTRE utilisateur
   define('DB_PASS', 'VotreMotDePasseMySQL');   // VOTRE mot de passe

   // Générez une clé secrète forte (32+ caractères aléatoires)
   define('JWT_SECRET', 'votre-cle-secrete-super-longue-et-aleatoire-32-chars-minimum');

   // Configuration production
   error_reporting(0);
   ini_set('display_errors', 0);
   ini_set('log_errors', 1);

   // Votre domaine
   define('CORS_ALLOWED_ORIGINS', [
       'https://www.mdoservices.fr',
       'https://mdoservices.fr'
   ]);
   ?>
   ```

3. **Sauvegardez le fichier**

### 5.2 Créer le dossier de logs

1. Dans `public_html/api/`, créez un dossier `logs/`
2. Définissez les permissions à `755`

### 5.3 Tester la connexion à la base de données

Créez un fichier temporaire `test-db.php` dans `public_html/api/` :

```php
<?php
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/Database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();
    echo "✅ Connexion à la base de données réussie !";
} catch (Exception $e) {
    echo "❌ Erreur : " . $e->getMessage();
}
?>
```

Visitez `https://votredomaine.com/api/test-db.php` dans votre navigateur.

**Si ça fonctionne :** Supprimez `test-db.php` immédiatement !

**Si ça ne fonctionne pas :** Vérifiez les identifiants dans `config.local.php`

---

## ✅ Étape 6 : Tester et vérifier

### 6.1 Tester l'API

**Test 1 : Récupérer les posts**
```
https://votredomaine.com/api/posts/list
```
Vous devriez voir vos articles en JSON.

**Test 2 : Login**
Utilisez un outil comme Postman ou curl :
```bash
curl -X POST https://votredomaine.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"ChangeMe123!"}'
```

### 6.2 Tester le site React

1. Visitez `https://votredomaine.com`
2. Le site devrait se charger normalement
3. Testez la page blog : `https://votredomaine.com/blog`
4. Testez l'espace partenaire : `https://votredomaine.com/partner`

### 6.3 Tester l'authentification

1. Allez sur `/partner`
2. Connectez-vous avec :
   - Username : `admin`
   - Password : `ChangeMe123!` (ou votre nouveau mot de passe)
3. Vous devriez accéder à `/partner/pricing`
4. Testez l'ajout/modification/suppression de pricing items

---

## 🔍 Résolution de problèmes

### Problème : "404 Not Found" sur les routes React

**Solution :** Vérifiez que le fichier `.htaccess` racine est bien présent dans `public_html/`

### Problème : "500 Internal Server Error" sur l'API

**Causes possibles :**
1. **Erreur de configuration :**
   - Vérifiez `api/config/config.local.php`
   - Assurez-vous que les identifiants MySQL sont corrects

2. **Permissions incorrectes :**
   - Fichiers PHP : `644`
   - Dossiers : `755`

3. **Logs PHP :**
   - Consultez les logs dans `api/logs/error.log`
   - Ou dans les logs PHP d'Hostinger (hPanel > Logs)

### Problème : "Access to fetch at ... from origin ... has been blocked by CORS"

**Solution :**
1. Vérifiez `api/config/config.local.php`
2. Assurez-vous que `CORS_ALLOWED_ORIGINS` contient votre domaine
3. Vérifiez que le fichier `api/.htaccess` est présent

### Problème : Les images ou CSS ne se chargent pas

**Solution :**
1. Vérifiez que le dossier `assets/` a été uploadé
2. Videz le cache de votre navigateur (Ctrl+Shift+R)
3. Vérifiez les permissions des fichiers

### Problème : "Database connection failed"

**Solution :**
1. Vérifiez les identifiants dans `config.local.php`
2. Assurez-vous que la base de données existe dans phpMyAdmin
3. Vérifiez que l'utilisateur a les permissions sur cette base

### Problème : Login ne fonctionne pas

**Solution :**
1. Vérifiez que la table `users` existe
2. Vérifiez que l'utilisateur `admin` existe :
   ```sql
   SELECT * FROM users WHERE username = 'admin';
   ```
3. Réinitialisez le mot de passe si nécessaire (voir étape 2.4)

---

## 🔐 Sécurité - Checklist Post-Déploiement

Une fois le site déployé, suivez cette checklist de sécurité :

- [ ] Changez le mot de passe admin par défaut
- [ ] Générez une clé `JWT_SECRET` aléatoire et forte
- [ ] Vérifiez que `config.local.php` n'est PAS accessible via navigateur
- [ ] Vérifiez que `display_errors` est à `Off` en production
- [ ] Supprimez le fichier `test-db.php` si créé
- [ ] Activez le SSL/HTTPS sur Hostinger
- [ ] Testez tous les endpoints de l'API
- [ ] Configurez des backups réguliers de la base de données

---

## 📝 Maintenance

### Backup de la base de données

**Via phpMyAdmin :**
1. Sélectionnez votre base de données
2. Cliquez sur "Exporter"
3. Choisissez "Rapide" et "SQL"
4. Téléchargez le fichier

**Via cron (automatique) :**
Configurez un cron job dans hPanel pour des backups automatiques.

### Ajouter un nouvel utilisateur admin

```sql
INSERT INTO users (username, email, password_hash, is_admin, is_active)
VALUES (
    'nouveau_admin',
    'admin@mdoservices.fr',
    '$2y$10$hash_genere_avec_password_hash',
    1,
    1
);
```

### Monitoring des logs

Consultez régulièrement :
- `api/logs/error.log`
- `api/logs/api.log`
- Logs PHP d'Hostinger dans hPanel

---

## 🎉 Félicitations !

Votre site est maintenant migré vers Hostinger avec PHP et MySQL !

### Prochaines étapes recommandées :

1. ✅ Configurez un certificat SSL (Let's Encrypt via hPanel)
2. ✅ Configurez des backups automatiques
3. ✅ Testez toutes les fonctionnalités
4. ✅ Mettez à jour les DNS si nécessaire
5. ✅ Surveillez les logs les premiers jours

---

## 📞 Support

En cas de problème :
- Consultez les logs dans `api/logs/`
- Vérifiez les logs PHP d'Hostinger
- Contactez le support Hostinger si problème d'infrastructure

---

**Bon déploiement ! 🚀**
