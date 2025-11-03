# Configuration du système de blog avancé

Ce document explique comment installer et utiliser le nouveau système de blog avec toutes ses fonctionnalités avancées.

## 🎯 Fonctionnalités

### Backend PHP
- ✅ Catégories pour organiser les articles
- ✅ Tags pour classification flexible
- ✅ Bibliothèque de médias avec upload d'images
- ✅ Import en masse depuis JSON
- ✅ API REST complète

### Frontend React
- ✅ Éditeur WYSIWYG Tiptap (style Notion)
- ✅ Upload d'images par drag & drop
- ✅ Galerie de médias réutilisables
- ✅ Sélecteur de tags avec auto-complétion
- ✅ Interface de gestion des catégories
- ✅ Interface de gestion des tags
- ✅ Outil d'import en masse
- ✅ Recherche et filtres avancés

## 📦 Installation

### 1. Exécuter la migration de base de données

**Option A : Via PHP (Recommandé)**
```bash
cd api/migrations
php run-blog-enhancements.php
```

**Option B : Via MySQL**
```bash
cd api/migrations
mysql -u your_username -p your_database < blog_enhancements.sql
```

**Option C : Via phpMyAdmin**
1. Ouvrez phpMyAdmin
2. Sélectionnez votre base de données
3. Allez dans l'onglet "Import"
4. Uploadez le fichier `api/migrations/blog_enhancements.sql`
5. Cliquez sur "Go"

### 2. Créer le répertoire d'upload

```bash
mkdir -p uploads/blog
chmod 755 uploads/blog
```

### 3. Les dépendances npm sont déjà installées

Les packages suivants ont été installés :
- `@tiptap/react` - Éditeur WYSIWYG
- `@tiptap/starter-kit` - Extensions de base
- `@tiptap/extension-*` - Extensions spécialisées
- `react-dropzone` - Upload drag & drop
- `marked` - Parser Markdown
- `lowlight` - Coloration syntaxique

## 🚀 Utilisation

### Accéder à l'administration du blog

1. Connectez-vous à l'espace partenaire : `/partner`
2. Allez dans "Blog" dans le menu

### Créer un article

1. Cliquez sur "Nouvel Article"
2. Remplissez le titre (le slug se génère automatiquement)
3. Sélectionnez une catégorie (optionnel)
4. Ajoutez des tags
5. Utilisez l'éditeur Tiptap pour rédiger le contenu :
   - Formatage riche (gras, italique, titres, etc.)
   - Insertion d'images, liens, tableaux
   - Raccourcis clavier (Ctrl+B pour gras, etc.)
6. Uploadez une image de couverture
7. Cliquez sur "Enregistrer en brouillon" ou "Publier"

### Gérer les catégories

1. Dans BlogAdmin, cliquez sur "Catégories"
2. Créez des catégories avec :
   - Nom et slug
   - Description
   - Couleur personnalisée

### Gérer les tags

1. Dans BlogAdmin, cliquez sur "Tags"
2. Créez des tags avec nom et slug
3. Les tags sont automatiquement créés lors de l'import

### Import en masse

1. Dans BlogAdmin, cliquez sur "Import"
2. Téléchargez le modèle JSON
3. Remplissez le fichier JSON avec vos articles
4. Uploadez le fichier
5. Choisissez d'ignorer ou non les doublons
6. Lancez l'import

**Format JSON attendu :**
```json
[
  {
    "title": "Mon article",
    "slug": "mon-article",
    "excerpt": "Résumé",
    "content": "<p>Contenu HTML...</p>",
    "category_slug": "actualites",
    "tags": ["tech", "blog"],
    "cover_image_url": "https://...",
    "author_name": "Auteur",
    "published_at": "2024-01-15 10:00:00"
  }
]
```

### Rechercher et filtrer

Dans BlogAdmin :
- **Barre de recherche** : Recherche dans titre, extrait, auteur
- **Filtre statut** : Tous / Publiés / Brouillons
- **Compteur** : Affiche X / Y articles

## 🎨 Éditeur Tiptap

### Fonctionnalités de l'éditeur

**Formatage de texte :**
- Gras (Ctrl+B)
- Italique (Ctrl+I)
- Souligné (Ctrl+U)
- Barré
- Code inline
- Surlignage

**Titres :**
- H1, H2, H3 (boutons dédiés)

**Listes :**
- Liste à puces
- Liste numérotée
- Citations

**Alignement :**
- Gauche, centre, droite

**Éléments :**
- Liens
- Images
- Tableaux

**Actions :**
- Annuler (Ctrl+Z)
- Refaire (Ctrl+Y)

### Upload d'images

**Deux options :**

1. **Upload direct** : Glissez-déposez ou cliquez pour sélectionner
   - Max 10MB
   - Formats : PNG, JPG, GIF, WebP, SVG
   - Aperçu immédiat
   - Informations sur le fichier

2. **Galerie** : Sélectionnez depuis les images déjà uploadées
   - Navigation en grille
   - Aperçu en grand
   - Suppression possible
   - Réutilisation facile

## 📡 API Endpoints

### Catégories
- `GET /api/categories/list` - Liste
- `POST /api/categories/create` - Création (admin)
- `POST /api/categories/update` - Modification (admin)
- `POST /api/categories/delete` - Suppression (admin)

### Tags
- `GET /api/tags/list` - Liste avec usage_count
- `POST /api/tags/create` - Création (admin)
- `POST /api/tags/delete` - Suppression (admin)

### Media
- `POST /api/media/upload` - Upload (multipart/form-data)
- `GET /api/media/list?limit=50&offset=0` - Liste paginée
- `POST /api/media/delete` - Suppression (admin)

### Import
- `POST /api/import/bulk` - Import JSON en masse (admin)

### Posts (modifiés)
Les endpoints posts existants incluent maintenant :
- `category_id` et infos catégorie
- `tags[]` avec ID et slug
- Support tag_ids dans create/update

## 🗄️ Structure de la base de données

### Table `categories`
```sql
- id (INT, PK)
- name (VARCHAR)
- slug (VARCHAR, UNIQUE)
- description (TEXT)
- color (VARCHAR) - Hex color
- display_order (INT)
- created_at, updated_at (TIMESTAMP)
```

### Table `tags`
```sql
- id (INT, PK)
- name (VARCHAR, UNIQUE)
- slug (VARCHAR, UNIQUE)
- created_at (TIMESTAMP)
```

### Table `post_tags` (relation many-to-many)
```sql
- id (INT, PK)
- post_id (INT, FK → posts)
- tag_id (INT, FK → tags)
- created_at (TIMESTAMP)
```

### Table `media`
```sql
- id (INT, PK)
- filename (VARCHAR)
- original_filename (VARCHAR)
- file_path (VARCHAR)
- file_url (VARCHAR)
- file_size (INT)
- mime_type (VARCHAR)
- width, height (INT, NULL)
- uploaded_by (VARCHAR)
- created_at (TIMESTAMP)
```

### Table `posts` (modifiée)
Ajout de la colonne :
- `category_id` (INT, NULL, FK → categories)

## 🎯 Catégories par défaut

La migration crée 5 catégories par défaut :

1. **Actualités** (`actualites`) - Bleu #3B82F6
2. **Tutoriels** (`tutoriels`) - Vert #10B981
3. **Cybersécurité** (`cybersecurite`) - Rouge #EF4444
4. **Cloud & Infrastructure** (`cloud-infrastructure`) - Violet #8B5CF6
5. **Télécom** (`telecom`) - Orange #F59E0B

Vous pouvez les modifier ou en créer de nouvelles.

## 🔧 Composants React créés

### Components blog/
- `TiptapEditor.jsx` - Éditeur WYSIWYG complet
- `ImageUploader.jsx` - Upload drag & drop
- `MediaGallery.jsx` - Galerie modale
- `TagSelector.jsx` - Sélection tags avec auto-complétion

### Pages partner/
- `BlogPostForm.jsx` - Formulaire article (modifié)
- `BlogAdmin.jsx` - Liste articles (modifié avec filtres)
- `CategoriesAdmin.jsx` - Gestion catégories
- `TagsAdmin.jsx` - Gestion tags
- `BlogImport.jsx` - Import en masse

## 🐛 Troubleshooting

### Erreur "Table already exists"
Normal si vous relancez la migration. Le script gère les doublons.

### Erreur d'upload d'images
1. Vérifiez que le dossier `uploads/blog/` existe
2. Vérifiez les permissions (755)
3. Vérifiez la limite PHP `upload_max_filesize` (min 10MB)

### Tags non sauvegardés
1. Vérifiez que la table `post_tags` existe
2. Vérifiez les clés étrangères

### Éditeur Tiptap ne s'affiche pas
1. Vérifiez que les dépendances npm sont installées
2. Vérifiez la console pour les erreurs
3. Relancez `npm install` si nécessaire

## 📚 Ressources

- Documentation Tiptap : https://tiptap.dev/
- API Backend : Voir `/api/migrations/README.md`
- Support : Consultez les logs dans la console navigateur

## ✅ Checklist post-installation

- [ ] Migration DB exécutée
- [ ] Dossier uploads/blog créé avec bonnes permissions
- [ ] Catégories par défaut visibles
- [ ] Possibilité de créer un article
- [ ] Éditeur Tiptap fonctionne
- [ ] Upload d'images fonctionne
- [ ] Tags sélectionnables
- [ ] Import JSON testé

## 🎉 C'est prêt !

Vous disposez maintenant d'un système de blog professionnel avec :
- Éditeur moderne type Notion
- Organisation par catégories et tags
- Bibliothèque de médias
- Import en masse
- Recherche et filtres

Bonne rédaction ! ✍️
