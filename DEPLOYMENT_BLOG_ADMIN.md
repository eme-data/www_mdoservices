# 🚀 Procédure de Déploiement - Interface Admin Blog

Guide complet pour déployer l'interface d'administration du blog sur Hostinger.

---

## 📋 **Prérequis**

✅ Accès à votre compte Hostinger
✅ Node.js et npm installés sur votre PC
✅ Git installé
✅ Dossier projet cloné : `www_mdoservices`

---

## 🔄 **ÉTAPE 1 : Merger la Pull Request sur GitHub**

### Option A : Via l'Interface GitHub (Recommandé)

1. **Ouvrez le lien de la Pull Request** :
   ```
   https://github.com/mdoservices/www_mdoservices/compare/main...claude/blog-admin-interface-011CUVbinkyyeDUp8YgokWo5?expand=1
   ```

2. **Créer la PR** :
   - Titre : `Ajout interface d'administration du blog`
   - Description (copiez-collez) :
   ```markdown
   ## 🎯 Fonctionnalités ajoutées

   ### Backend API (PHP)
   - `POST /api/posts/create` - Créer un article
   - `POST /api/posts/update` - Modifier un article
   - `POST /api/posts/delete` - Supprimer un article
   - `GET /api/posts/list-all` - Lister tous les articles (admin)

   ### Frontend React
   - `/partner/blog` - Liste des articles avec gestion
   - `/partner/blog/new` - Créer un article
   - `/partner/blog/edit/:id` - Éditer un article
   - Navigation partenaire avec menu Blog + Tarifs

   ### Fonctionnalités
   - ✅ Éditeur HTML/Markdown avec prévisualisation
   - ✅ Gestion brouillon/publié
   - ✅ Génération automatique du slug
   - ✅ Upload image de couverture (URL)
   - ✅ CRUD complet sécurisé (admin uniquement)

   ## 📚 Documentation
   - Guide utilisateur complet : `BLOG_ADMIN_GUIDE.md`

   ## ✅ Tests
   - [x] Backend API fonctionnel
   - [x] Frontend responsive
   - [x] Authentification admin requise
   - [x] Prévisualisation fonctionnelle

   Prêt pour production ! 🚀
   ```

3. **Merger** :
   - Cliquez sur **"Create pull request"**
   - Puis **"Merge pull request"**
   - Puis **"Confirm merge"**

✅ **Changements maintenant dans `main` !**

---

## 💻 **ÉTAPE 2 : Récupérer les Changements sur Votre PC**

Ouvrez **PowerShell** dans votre dossier projet :

```powershell
# 1. Se placer sur la branche main
git checkout main

# 2. Récupérer les dernières modifications
git pull origin main

# 3. Vérifier que vous avez bien les nouveaux fichiers
ls api/posts/
ls src/pages/partner/
```

**Vérification attendue** :
- `api/posts/` doit contenir : `create.php`, `update.php`, `delete.php`, `list-all.php`
- `src/pages/partner/` doit contenir : `BlogAdmin.jsx`, `BlogPostForm.jsx`

---

## 🔨 **ÉTAPE 3 : Builder le Projet**

Dans PowerShell :

```powershell
# 1. Installer les dépendances (si pas déjà fait)
npm install

# 2. Builder pour la production
npm run build
```

**Attendu** :
```
✓ built in X.XXs
dist/index.html                   X.XX kB
dist/assets/index-XXXXXXXX.css   XX.XX kB
dist/assets/index-XXXXXXXX.js   XXX.XX kB
```

**Vérification** :
```powershell
# Vérifier que dist/ contient les fichiers
ls dist/
ls dist/assets/
```

✅ **Build réussi !**

---

## 📤 **ÉTAPE 4 : Upload sur Hostinger**

### A. Connexion à Hostinger

1. Allez sur **https://www.hostinger.fr**
2. Connectez-vous à votre compte
3. Cliquez sur **"Sites web"** → Sélectionnez **mdoservices.fr**
4. Cliquez sur **"File Manager"** (Gestionnaire de fichiers)

---

### B. Upload du Frontend (Fichiers React)

#### 1. Naviguer vers public_html

Dans le File Manager :
- Cliquez sur `public_html/` pour l'ouvrir

#### 2. Sauvegarder l'ancien (optionnel mais recommandé)

**Créer une sauvegarde** :
- Sélectionnez `index.html` et le dossier `assets/`
- Clic droit → **"Compress"** → Nommez : `backup_frontend_DATE.zip`
- Cliquez sur **"Compress"**

#### 3. Supprimer les anciens fichiers

Sélectionnez et supprimez :
- ✅ `index.html` (ancien)
- ✅ Dossier `assets/` (ancien)

⚠️ **NE PAS SUPPRIMER** :
- ❌ Dossier `api/`
- ❌ Dossier `database/`
- ❌ Autres fichiers existants

#### 4. Uploader les nouveaux fichiers

**Option 1 : Upload par glisser-déposer**

1. Dans le File Manager, assurez-vous d'être dans `/public_html/`
2. Cliquez sur **"Upload Files"** ou **"Télécharger"**
3. **Glissez-déposez** ou sélectionnez **TOUS les fichiers** de votre dossier `dist/` local :
   - `index.html`
   - Dossier `assets/` (complet)
   - Dossier `images/`
   - Fichier `.htaccess`
   - Dossier `.well-known/`
   - Fichier `bimi-logo.svg`
4. Attendez la fin de l'upload (barre de progression)

**Option 2 : Upload ZIP puis décompresser**

1. Sur votre PC, compressez le contenu de `dist/` en ZIP :
   ```powershell
   Compress-Archive -Path dist\* -DestinationPath frontend.zip
   ```
2. Dans File Manager, uploadez `frontend.zip` vers `/public_html/`
3. Clic droit sur `frontend.zip` → **"Extract"**
4. Supprimez `frontend.zip` après extraction

**Vérification** :
```
/public_html/
├── index.html          ← Nouveau
├── assets/             ← Nouveau
│   ├── index-XXXXX.js
│   └── index-XXXXX.css
├── images/
├── .htaccess
└── api/               ← Existant (ne pas toucher)
```

✅ **Frontend uploadé !**

---

### C. Upload du Backend API (Fichiers PHP)

#### 1. Naviguer vers /public_html/api/

Dans le File Manager :
- Ouvrez le dossier `api/`

#### 2. Créer le dossier posts (si inexistant)

Si le dossier `posts/` n'existe pas :
- Cliquez sur **"New Folder"**
- Nom : `posts`
- Cliquez sur **"Create"**

#### 3. Uploader les fichiers PHP

Ouvrez le dossier `posts/` et uploadez depuis votre PC local `api/posts/` :
- `create.php`
- `update.php`
- `delete.php`
- `list-all.php`

**Note** : Les fichiers `get.php` et `list.php` existent déjà, ne les touchez pas.

**Vérification** :
```
/public_html/api/posts/
├── get.php          ← Existant
├── list.php         ← Existant
├── create.php       ← NOUVEAU
├── update.php       ← NOUVEAU
├── delete.php       ← NOUVEAU
└── list-all.php     ← NOUVEAU
```

✅ **Backend API uploadé !**

---

## 🧪 **ÉTAPE 5 : Tests de Validation**

### A. Test du Site Public

1. **Ouvrez votre navigateur en navigation privée** :
   - Chrome : `Ctrl + Shift + N`
   - Firefox : `Ctrl + Shift + P`

2. **Allez sur** : `https://www.mdoservices.fr`

3. **Vérifications** :
   - ✅ Design Tekup s'affiche (gradient bleu/violet)
   - ✅ Footer affiche **05.82.95.22.77** et **06.66.03.03.61**
   - ✅ Navigation fonctionne
   - ✅ Page `/blog` accessible

4. **Si l'ancien design s'affiche** :
   - Videz le cache : `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)
   - Attendez 2-3 minutes (propagation CDN)

---

### B. Test de l'Espace Partenaire

1. **Allez sur** : `https://www.mdoservices.fr/partner`

2. **Connectez-vous** :
   - Username : `admin`
   - Password : `votre_mot_de_passe`

3. **Vérifications** :
   - ✅ Connexion réussie
   - ✅ Redirection vers `/partner/pricing`
   - ✅ Menu en haut affiche : **Tarifs | Blog | Déconnexion**

---

### C. Test de l'Interface Blog

1. **Cliquez sur "Blog"** dans le menu

2. **Vérifications** :
   - ✅ Page `/partner/blog` s'affiche
   - ✅ Liste des articles visible
   - ✅ Bouton **"Nouvel Article"** visible
   - ✅ Article de démo "Bienvenue sur notre blog" s'affiche

3. **Test : Créer un article**

   a. Cliquez sur **"Nouvel Article"**

   b. Remplissez :
   ```
   Titre: Test de déploiement
   Slug: test-deploiement
   Extrait: Article de test pour vérifier le déploiement
   Contenu: <p>Ceci est un test de l'interface d'administration.</p>
   Auteur: Admin
   ```

   c. Cliquez sur **"Prévisualiser"**
   - ✅ Prévisualisation s'affiche correctement

   d. Cliquez sur **"Éditer"** pour revenir au formulaire

   e. Cliquez sur **"Publier"**

   f. **Attendu** : Message de confirmation "Article créé !"

4. **Vérification de la publication** :
   - Allez sur `https://www.mdoservices.fr/blog`
   - ✅ Votre article de test s'affiche dans la liste

5. **Test : Éditer un article**
   - Retournez sur `/partner/blog`
   - Cliquez sur l'icône **✏️** (Éditer) de votre article
   - Modifiez le titre : `Test de déploiement - Modifié`
   - Cliquez sur **"Enregistrer le brouillon"**
   - ✅ Modification enregistrée

6. **Test : Dépublier**
   - Cliquez sur l'icône **🚫** (œil barré)
   - ✅ Statut passe à "Brouillon"
   - Allez sur `/blog` → L'article n'est plus visible

7. **Test : Supprimer**
   - Retournez sur `/partner/blog`
   - Cliquez sur l'icône **🗑️** (Poubelle)
   - Confirmez la suppression
   - ✅ Article supprimé de la liste

---

## ✅ **ÉTAPE 6 : Checklist Finale**

Cochez chaque élément une fois testé :

### Frontend
- [ ] Site accessible sur `https://www.mdoservices.fr`
- [ ] Design Tekup s'affiche (gradient, header moderne)
- [ ] Numéros de téléphone corrects dans le footer
- [ ] Navigation fonctionne (Solutions, Blog, Contact)
- [ ] Page `/blog` affiche les articles
- [ ] Responsive sur mobile

### Espace Partenaire
- [ ] Connexion `/partner` fonctionne
- [ ] Navigation partenaire visible (Tarifs | Blog | Déconnexion)
- [ ] Page `/partner/blog` affiche la liste des articles
- [ ] Bouton "Nouvel Article" visible et fonctionnel

### Interface Blog Admin
- [ ] Création d'article fonctionne
- [ ] Prévisualisation fonctionne
- [ ] Publication d'article fonctionne
- [ ] Article publié visible sur `/blog`
- [ ] Édition d'article fonctionne
- [ ] Dépublier/Publier rapidement fonctionne
- [ ] Suppression d'article fonctionne
- [ ] Génération automatique du slug fonctionne

### Backend API
- [ ] Aucune erreur 500 lors des opérations CRUD
- [ ] Authentification requise (impossible d'accéder sans login)
- [ ] Messages d'erreur appropriés si slug existe déjà

---

## 🎯 **ÉTAPE 7 : Créer Votre Premier Vrai Article**

Maintenant que tout fonctionne, créez un vrai article :

1. **Allez sur** `/partner/blog`
2. Cliquez sur **"Nouvel Article"**
3. Exemple d'article d'accueil :

```
Titre: Bienvenue sur le blog de MDO Services
Slug: bienvenue-blog-mdo-services

Extrait:
Découvrez nos conseils, actualités et expertises en solutions IT, Cloud et Télécom pour les entreprises en Occitanie.

Contenu:
<h2>Un nouveau canal d'information</h2>
<p>Nous sommes ravis de lancer notre blog officiel ! Vous y trouverez des articles sur nos domaines d'expertise :</p>

<ul>
  <li><strong>Cloud Computing</strong> : Microsoft 365, Google Workspace, solutions cloud entreprise</li>
  <li><strong>Cybersécurité</strong> : Sentinel One, MailInBlack, Bitwarden, bonnes pratiques</li>
  <li><strong>Solutions Télécom</strong> : 3CX, Aircall, téléphonie cloud</li>
  <li><strong>Infogérance</strong> : NinjaRMM, monitoring, support IT</li>
</ul>

<h2>Restez connectés</h2>
<p>Suivez notre blog pour ne rien manquer de nos actualités et bénéficier de conseils d'experts.</p>

<p>Des questions ? <a href="/contact">Contactez-nous</a> !</p>

Image de couverture:
https://images.unsplash.com/photo-1499750310107-5fef28a66643

Auteur: Équipe MDO Services
```

4. Cliquez sur **"Publier"**
5. Allez sur `https://www.mdoservices.fr/blog`
6. ✅ Votre article est en ligne !

---

## 📱 **ÉTAPE 8 : Partager**

Partagez votre nouveau blog :

1. **Sur les réseaux sociaux** :
   - Facebook, LinkedIn, Twitter
   - Lien : `https://www.mdoservices.fr/blog`

2. **Dans vos emails** :
   - Signature email
   - Newsletter

3. **Sur votre site** :
   - Le lien "Blog" existe déjà dans la navigation ✅

---

## 🔧 **Dépannage**

### Problème : "Erreur 404" sur /partner/blog

**Cause** : `.htaccess` manquant ou mal configuré

**Solution** :
1. Vérifiez que `.htaccess` existe dans `/public_html/`
2. Contenu attendu :
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### Problème : "Erreur lors de la création d'article"

**Cause** : Backend API non uploadé ou config BDD incorrecte

**Solutions** :
1. Vérifiez que les fichiers PHP sont bien uploadés dans `/api/posts/`
2. Vérifiez que `config.local.php` existe avec les bons credentials
3. Vérifiez les logs PHP : `/api/logs/error.log`

---

### Problème : "Article créé mais invisible sur /blog"

**Cause** : Article en mode brouillon

**Solution** :
1. Allez sur `/partner/blog`
2. Cliquez sur l'icône **👁️** pour publier
3. Ou éditez l'article et cliquez sur **"Publier"**

---

### Problème : Images ne s'affichent pas

**Cause** : URL d'image incorrecte

**Solution** :
1. Utilisez des URLs complètes : `https://...`
2. Testez l'URL dans votre navigateur
3. Utilisez Unsplash, Pexels ou votre propre hébergement

---

## 📞 **Support**

Besoin d'aide ?

- **Email** : contact@mdoservices.fr
- **Téléphone** : 05.82.95.22.77
- **Mobile** : 06.66.03.03.61

---

## 🎉 **Félicitations !**

Votre interface d'administration de blog est maintenant en production ! 🚀

Vous pouvez gérer vos articles facilement sans toucher au code.

**Prochaines étapes recommandées** :
1. ✅ Créer 2-3 articles de qualité
2. ✅ Partager votre blog sur les réseaux sociaux
3. ✅ Publier régulièrement (1-2 articles/mois minimum)
4. ✅ Optimiser pour le SEO (titres, extraits, images)

**Bonne rédaction ! ✍️**
