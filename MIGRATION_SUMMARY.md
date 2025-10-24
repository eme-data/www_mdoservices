# Résumé de la Migration - Supabase vers Hostinger

## 📊 Vue d'ensemble

Ce projet a été migré de **Supabase (PostgreSQL + API Serverless)** vers **Hostinger (MySQL + PHP)**.

---

## 🔄 Changements effectués

### 1. Backend API

**Avant :** Supabase avec auto-génération d'API REST

**Après :** API REST PHP personnalisée avec :
- Authentification JWT sécurisée
- Endpoints RESTful pour posts et pricing
- Gestion des erreurs et logging
- Protection CORS
- Validation des données

**Fichiers créés :**
```
/api/
  ├── config/
  │   ├── config.php              # Configuration principale
  │   ├── config.local.example.php # Template de configuration
  │   ├── Database.php             # Classe de connexion MySQL
  │   └── utils.php                # Fonctions utilitaires (JWT, réponses, etc.)
  ├── auth/
  │   ├── login.php                # Endpoint de connexion
  │   └── verify.php               # Vérification de token
  ├── posts/
  │   ├── list.php                 # Liste des articles publiés
  │   └── get.php                  # Article par slug
  ├── pricing/
  │   ├── list.php                 # Liste des pricing items
  │   ├── create.php               # Créer un item
  │   ├── update.php               # Modifier un item
  │   ├── delete.php               # Supprimer un item
  │   └── reorder.php              # Réorganiser l'ordre
  └── .htaccess                    # Configuration Apache
```

### 2. Base de données

**Avant :** PostgreSQL (Supabase)

**Après :** MySQL avec schéma équivalent

**Tables créées :**
- `users` - Authentification des partenaires/admins
- `posts` - Articles de blog (identique à Supabase)
- `pricing_items` - Tarifs partenaires (identique à Supabase)

**Scripts SQL :**
- `/database/schema.sql` - Schéma MySQL complet
- `/database/export-from-supabase.js` - Script d'export des données

### 3. Frontend React

**Modifications :**

#### Fichiers modifiés :
- `src/lib/api.js` - **NOUVEAU** : Client API remplaçant Supabase
- `src/pages/BlogPage.jsx` - Import changé de supabase → api
- `src/pages/BlogPostPage.jsx` - Import changé de supabase → api
- `src/pages/PartnerSpace.jsx` - Authentification JWT au lieu de mots de passe en dur
- `src/hooks/usePartnerPricing.js` - Import changé de supabase → api

#### API Client (`src/lib/api.js`)

Fonctions disponibles :

**Authentification :**
```javascript
login(username, password)      // Connexion
verifyToken()                  // Vérifier le token
logout()                       // Déconnexion
isAuthenticated()              // Vérifier si connecté
```

**Posts :**
```javascript
fetchPublishedPosts()          // Liste des articles
fetchPostBySlug(slug)          // Article par slug
```

**Pricing :**
```javascript
fetchPricingItems()            // Liste des items
createPricingItem(item)        // Créer un item
updatePricingItem(id, updates) // Modifier un item
deletePricingItem(id)          // Supprimer un item
updatePricingOrder(items)      // Réorganiser
```

### 4. Authentification

**Avant :**
- Mots de passe en dur dans le code
- localStorage uniquement
- Aucune sécurité réelle

**Après :**
- Base de données `users` avec bcrypt
- JWT (JSON Web Tokens)
- Token stocké dans localStorage
- Expiration automatique (24h par défaut)
- Vérification côté serveur

**Identifiants par défaut :**
- Username : `admin`
- Password : `ChangeMe123!` (À CHANGER !)

### 5. Configuration

**Nouveaux fichiers de configuration :**

- `.env.example` - Variables d'environnement React
- `.gitignore` - Protection des fichiers sensibles
- `api/config/config.local.example.php` - Configuration API
- `deployment/.htaccess-root` - Configuration Apache racine
- `api/.htaccess` - Configuration Apache API

**Variables d'environnement importantes :**

```bash
# .env (React)
VITE_API_URL=/api
```

```php
// api/config/config.local.php
DB_HOST=localhost
DB_NAME=votre_base
DB_USER=votre_user
DB_PASS=votre_password
JWT_SECRET=cle-secrete-longue
```

---

## 📦 Dépendances

### Supprimées :
```json
"@supabase/supabase-js": "2.39.7"  ❌ Plus nécessaire
```

### Conservées :
Toutes les autres dépendances React restent inchangées.

---

## 🔐 Sécurité

### Améliorations de sécurité :

1. **Authentification robuste** avec JWT et bcrypt
2. **Protection CSRF** via tokens
3. **Validation côté serveur** de toutes les entrées
4. **Prepared statements** (PDO) pour prévenir les injections SQL
5. **Headers de sécurité** (X-Content-Type-Options, X-XSS-Protection, etc.)
6. **Configuration séparée** (config.local.php ignoré par git)
7. **Logging des erreurs** sans exposer les détails

### Points à sécuriser lors du déploiement :

- [ ] Changer le mot de passe admin par défaut
- [ ] Générer une clé JWT_SECRET aléatoire
- [ ] Activer HTTPS/SSL
- [ ] Vérifier les permissions des fichiers
- [ ] Configurer display_errors=Off en production
- [ ] Mettre en place des backups

---

## 🧪 Tests

### Endpoints API à tester :

**Posts :**
```bash
# Liste des posts
curl https://votredomaine.com/api/posts/list

# Post par slug
curl https://votredomaine.com/api/posts/get?slug=test-article
```

**Authentification :**
```bash
# Login
curl -X POST https://votredomaine.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"ChangeMe123!"}'

# Vérifier token
curl https://votredomaine.com/api/auth/verify \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

**Pricing (nécessite authentification admin) :**
```bash
# Liste
curl https://votredomaine.com/api/pricing/list

# Créer (admin)
curl -X POST https://votredomaine.com/api/pricing/create \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"solution","solution":"Test","prix_partenaire":"10,00","commission":"15,00"}'
```

---

## 📂 Structure du déploiement

### Sur Hostinger (`public_html/`) :

```
public_html/
├── index.html                  # React app
├── assets/                     # CSS, JS compilés
│   ├── index-[hash].js
│   └── index-[hash].css
├── api/                        # Backend PHP
│   ├── config/
│   │   ├── config.php
│   │   ├── config.local.php   # À CRÉER (avec vos identifiants)
│   │   ├── Database.php
│   │   └── utils.php
│   ├── auth/
│   ├── posts/
│   ├── pricing/
│   ├── logs/                   # Logs API
│   └── .htaccess
└── .htaccess                   # Routing React SPA
```

---

## 🚀 Commandes

### Développement local :

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build
```

### Export de données Supabase :

```bash
# Exporter les données actuelles de Supabase
node database/export-from-supabase.js
```

---

## 🔄 Compatibilité

### Rétrocompatibilité :

Le code conserve une compatibilité avec l'ancien système :
- localStorage `partner-authenticated` et `partner-admin` toujours utilisés
- Interface identique pour les hooks et composants
- Aucun changement visible pour l'utilisateur final

### Migration transparente :

Les utilisateurs ne verront aucune différence dans l'interface. Seul le backend change.

---

## 📝 Notes importantes

### Différences PostgreSQL → MySQL :

1. **Types de données :**
   - `TEXT` → `LONGTEXT` (pour le contenu des articles)
   - `TIMESTAMP` → `DATETIME`
   - `SERIAL` → `INT AUTO_INCREMENT`

2. **Formatage des prix :**
   - Les prix utilisent `DECIMAL(10,2)` en base
   - Conversion automatique virgule ↔ point entre frontend et backend

3. **Dates :**
   - MySQL utilise `NOW()` au lieu de `CURRENT_TIMESTAMP`
   - Format de date identique : `YYYY-MM-DD HH:MM:SS`

---

## 🆘 Dépannage

### Si l'API ne répond pas :

1. Vérifiez `api/config/config.local.php`
2. Consultez `api/logs/error.log`
3. Vérifiez les permissions (644 pour fichiers, 755 pour dossiers)
4. Testez la connexion MySQL avec le script de test

### Si le frontend ne charge pas :

1. Vérifiez que `.htaccess` racine est présent
2. Videz le cache du navigateur
3. Vérifiez que `assets/` est bien uploadé

### Si l'authentification échoue :

1. Vérifiez que la table `users` existe
2. Vérifiez que le mot de passe est correct
3. Consultez les logs API

---

## 📚 Documentation

- **Guide de déploiement complet** : `DEPLOYMENT_GUIDE.md`
- **Configuration PHP** : `api/config/config.local.example.php`
- **Schéma de base de données** : `database/schema.sql`

---

## ✅ Checklist de migration

- [x] API PHP créée avec tous les endpoints
- [x] Schéma MySQL créé
- [x] Script d'export Supabase créé
- [x] Frontend migré vers fetch API
- [x] Authentification JWT implémentée
- [x] Configuration .htaccess créée
- [x] Guide de déploiement rédigé
- [ ] Données exportées de Supabase
- [ ] Base MySQL créée sur Hostinger
- [ ] Données importées dans MySQL
- [ ] Fichiers uploadés sur Hostinger
- [ ] Configuration API configurée
- [ ] Tests effectués
- [ ] Mot de passe admin changé
- [ ] SSL activé

---

**Migration effectuée avec succès ! 🎉**
