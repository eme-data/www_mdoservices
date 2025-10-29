# 📝 Guide d'Administration du Blog

Interface complète pour gérer facilement les articles de blog de MDO Services.

---

## 🚀 Accès à l'Interface

1. **Connectez-vous à l'espace partenaire** :
   - URL : `https://www.mdoservices.fr/partner`
   - Identifiants : `admin` / votre mot de passe

2. **Accédez à la gestion du blog** :
   - Cliquez sur **"Blog"** dans la navigation en haut
   - Ou allez directement sur `/partner/blog`

---

## 📋 Liste des Articles

### Vue d'ensemble

La page principale affiche tous vos articles (publiés et brouillons) dans un tableau avec :

- **Image de couverture** (si définie)
- **Titre** et slug (URL)
- **Statut** : Publié (vert) ou Brouillon (jaune)
- **Auteur**
- **Date** de publication ou création
- **Actions rapides**

### Actions disponibles

| Icône | Action | Description |
|-------|--------|-------------|
| 👁️ | Publier | Publie un brouillon immédiatement |
| 🚫 | Dépublier | Retire un article publié (devient brouillon) |
| ✏️ | Éditer | Ouvre l'éditeur pour modifier l'article |
| 🗑️ | Supprimer | Supprime définitivement l'article (avec confirmation) |

---

## ✍️ Créer un Nouvel Article

### Étape 1 : Ouvrir le formulaire

- Cliquez sur **"Nouvel Article"** (bouton bleu en haut à droite)
- Vous arrivez sur `/partner/blog/new`

### Étape 2 : Remplir les informations

#### **Champs obligatoires** *

- **Titre** : Le titre de votre article
  - Exemple : `Les 5 Meilleures Pratiques Cloud en 2024`

- **Slug** : L'URL de l'article (généré automatiquement depuis le titre)
  - Exemple : `les-5-meilleures-pratiques-cloud-en-2024`
  - Format : lettres minuscules, chiffres, tirets uniquement
  - Prévisualisation : `/blog/votre-slug`

#### **Champs optionnels**

- **Extrait** : Résumé court (affiché dans la liste des articles)
  - 1-2 phrases maximum
  - Exemple : `Découvrez comment optimiser votre infrastructure cloud avec ces conseils d'experts.`

- **Contenu** : Le corps complet de l'article
  - Supporte **HTML** et **Markdown**
  - Utilisez `<p>`, `<h2>`, `<ul>`, `<li>`, etc.
  - Exemple :
    ```html
    <h2>Introduction</h2>
    <p>Dans cet article, nous allons explorer...</p>
    <ul>
      <li>Point 1</li>
      <li>Point 2</li>
    </ul>
    ```

- **Image de couverture (URL)** : Lien vers une image
  - Format : URL complète (https://...)
  - Exemple : `https://images.unsplash.com/photo-1451187580459-43490279c0fa`
  - L'aperçu s'affiche automatiquement

- **Auteur** : Nom de l'auteur
  - Par défaut : votre nom d'utilisateur
  - Exemple : `Équipe MDO Services`

### Étape 3 : Prévisualiser

- Cliquez sur **"Prévisualiser"** (bouton en haut à droite)
- Vérifiez le rendu final
- Cliquez sur **"Éditer"** pour revenir au formulaire

### Étape 4 : Enregistrer

Vous avez 2 options :

1. **"Enregistrer en brouillon"** (bouton blanc)
   - Sauvegarde l'article sans le publier
   - Invisible pour les visiteurs
   - Vous pouvez continuer à l'éditer

2. **"Publier"** (bouton vert)
   - Publie immédiatement l'article
   - Visible sur `/blog`
   - Date de publication : maintenant

---

## ✏️ Éditer un Article Existant

1. Dans la liste, cliquez sur l'icône **✏️ Éditer**
2. Modifiez les champs souhaités
3. Cliquez sur :
   - **"Enregistrer le brouillon"** : Met à jour sans changer le statut
   - **"Publier"** : Publie ou met à jour un article déjà publié

---

## 🗑️ Supprimer un Article

1. Cliquez sur l'icône **🗑️** à côté de l'article
2. Confirmez la suppression dans la boîte de dialogue
3. L'article est **supprimé définitivement** (impossible de récupérer)

---

## 👁️ Publier / Dépublier Rapidement

### Publier un brouillon

1. Cliquez sur l'icône **👁️** dans la ligne du brouillon
2. L'article est publié immédiatement avec la date/heure actuelle

### Dépublier un article

1. Cliquez sur l'icône **🚫** dans la ligne de l'article publié
2. L'article devient un brouillon (invisible sur le blog public)

---

## 🎨 Conseils de Rédaction

### Structure recommandée

```html
<h2>Introduction</h2>
<p>Paragraphe d'introduction captivant...</p>

<h2>Section 1 : Titre de la section</h2>
<p>Contenu de la section...</p>

<h3>Sous-section 1.1</h3>
<p>Détails...</p>

<ul>
  <li>Point important 1</li>
  <li>Point important 2</li>
</ul>

<h2>Conclusion</h2>
<p>Résumé et call-to-action...</p>
```

### Images recommandées

- **Taille** : 1200x630px (ratio 16:9)
- **Format** : JPG, PNG
- **Source** : Unsplash, Pexels (images libres de droits)
- **Exemples** :
  - Cloud : `https://images.unsplash.com/photo-1451187580459-43490279c0fa`
  - Cybersécurité : `https://images.unsplash.com/photo-1550751827-4bd374c3f58b`
  - Télécom : `https://images.unsplash.com/photo-1516321318423-f06f85e504b3`

### Slug (URL) - Bonnes pratiques

✅ **Bon** :
- `migration-vers-le-cloud-2024`
- `5-conseils-cybersecurite`
- `comparatif-microsoft-365-google-workspace`

❌ **Mauvais** :
- `Article 1` (pas descriptif)
- `MIGRATION CLOUD` (majuscules)
- `migration_cloud` (underscores)
- `migrátion-cloud` (accents)

---

## 🔧 Fonctionnalités Avancées

### Génération automatique du slug

- Tapez le titre
- Le slug est généré automatiquement
- Vous pouvez le modifier manuellement si besoin

### Markdown vs HTML

Vous pouvez utiliser les deux :

**Markdown** :
```markdown
## Titre niveau 2
### Titre niveau 3

**Texte en gras**
*Texte en italique*

- Liste à puces
- Item 2

[Lien](https://example.com)
```

**HTML** :
```html
<h2>Titre niveau 2</h2>
<h3>Titre niveau 3</h3>

<strong>Texte en gras</strong>
<em>Texte en italique</em>

<ul>
  <li>Liste à puces</li>
  <li>Item 2</li>
</ul>

<a href="https://example.com">Lien</a>
```

---

## 📊 Workflow Recommandé

1. **Créer un brouillon**
   - Rédigez votre article
   - Enregistrez-le en brouillon

2. **Relecture**
   - Utilisez la prévisualisation
   - Vérifiez l'orthographe et la mise en forme

3. **Optimisation SEO**
   - Slug descriptif
   - Titre accrocheur (< 60 caractères)
   - Extrait engageant (< 160 caractères)
   - Image de couverture attractive

4. **Publication**
   - Cliquez sur "Publier"
   - Partagez sur vos réseaux sociaux

5. **Mise à jour**
   - Vous pouvez modifier un article publié à tout moment
   - Les modifications sont immédiatement visibles

---

## ❓ Questions Fréquentes

### Comment uploader une image ?

Actuellement, vous devez :
1. Uploader l'image sur un service externe (Imgur, Unsplash, votre hébergement)
2. Copier l'URL de l'image
3. Coller l'URL dans le champ "Image de couverture"

### Peut-on planifier une publication ?

Pas encore. Pour le moment, la publication est immédiate.

### Comment voir un article avant publication ?

- Utilisez le bouton "Prévisualiser" dans le formulaire d'édition
- Ou enregistrez en brouillon et accédez à `/blog/votre-slug` (visible seulement si connecté en admin)

### Que faire si le slug existe déjà ?

Le système affiche une erreur. Modifiez le slug pour le rendre unique :
- Ajoutez l'année : `mon-article-2024`
- Ajoutez un numéro : `mon-article-2`
- Soyez plus spécifique : `mon-article-cloud-toulouse`

---

## 🎯 Exemples d'Articles

### Exemple 1 : Article de Blog Complet

```
Titre: Les 5 Tendances Cloud à Suivre en 2024
Slug: 5-tendances-cloud-2024
Extrait: Découvrez les innovations cloud qui vont transformer votre entreprise cette année.
Auteur: Équipe MDO Services
Image: https://images.unsplash.com/photo-1451187580459-43490279c0fa

Contenu:
<h2>Introduction</h2>
<p>Le cloud computing continue d'évoluer rapidement. Voici les 5 tendances majeures à surveiller en 2024.</p>

<h2>1. L'Edge Computing</h2>
<p>L'edge computing rapproche le traitement des données de leur source...</p>

<h2>2. Le Multi-Cloud Hybride</h2>
<p>De plus en plus d'entreprises adoptent une stratégie multi-cloud...</p>

... etc ...

<h2>Conclusion</h2>
<p>Ces tendances vont façonner l'avenir du cloud. <a href="/contact">Contactez-nous</a> pour en savoir plus !</p>
```

### Exemple 2 : Actualité Rapide

```
Titre: Nouvelle Offre Microsoft 365 Business Premium
Slug: nouvelle-offre-microsoft-365-premium
Extrait: Microsoft lance une nouvelle version de Business Premium avec des fonctionnalités IA avancées.
Auteur: Mathieu D'OLIVEIRA

Contenu:
<p>Microsoft vient d'annoncer une mise à jour majeure de Microsoft 365 Business Premium.</p>

<h3>Nouvelles fonctionnalités</h3>
<ul>
  <li>Copilot AI intégré</li>
  <li>Sécurité renforcée</li>
  <li>Collaboration améliorée</li>
</ul>

<p><a href="/contact">Contactez-nous</a> pour migrer vers cette nouvelle offre.</p>
```

---

## 📞 Support

Besoin d'aide ? Contactez l'équipe technique :
- Email : contact@mdoservices.fr
- Téléphone : 05.82.95.22.77
- Mobile : 06.66.03.03.61

---

**Bonne rédaction ! 🚀**
