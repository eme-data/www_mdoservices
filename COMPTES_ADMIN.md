# 🔐 Comptes Administrateur - MDO Services

Ce document contient les identifiants des comptes administrateur pour les espaces Partenaire et Client.

## 📋 Table des Matières
1. [Comptes Créés](#comptes-créés)
2. [Méthode de Création](#méthode-de-création)
3. [Utilisation](#utilisation)
4. [Sécurité](#sécurité)

---

## 🔑 Comptes Créés

### 🔹 Espace Partenaire

#### Admin Partenaire (Accès Complet)
- **URL** : https://mdoservices.fr/partner
- **Username** : `admin_partner`
- **Password** : `MDOPartner2024!`
- **Email** : admin@mdoservices.fr
- **Rôle** : Partner Admin
- **Accès** :
  - Grille tarifaire partenaires
  - Gestion des solutions
  - Import CSV
  - Toutes fonctionnalités admin

#### Demo Partenaire (Accès Lecture)
- **URL** : https://mdoservices.fr/partner
- **Username** : `demo_partner`
- **Password** : `DemoPartner2024`
- **Email** : demo.partner@mdoservices.fr
- **Rôle** : Partner (non-admin)
- **Accès** :
  - Consultation grille tarifaire
  - Pas de modification

---

### 🔹 Espace Client

#### Admin Client
- **URL** : https://mdoservices.fr/client
- **Username** : `admin_client`
- **Password** : `MDOClient2024!`
- **Email** : client@mdoservices.fr
- **Rôle** : Client
- **Accès** :
  - Dashboard client complet
  - Support Client (https://support.mdoservices.fr)
  - Suivi Télécom (https://portail.mdoservices.fr)
  - Services à venir (SharePoint, Factures, etc.)

#### Demo Client
- **URL** : https://mdoservices.fr/client
- **Username** : `demo_client`
- **Password** : `DemoClient2024`
- **Email** : demo.client@mdoservices.fr
- **Rôle** : Client
- **Accès** :
  - Mêmes accès que admin_client
  - Pour démonstrations

---

## 🛠️ Méthode de Création

### Option A : Script PHP Automatique (Recommandé)

1. Uploadez le fichier `/api/auth/create-users.php` sur votre serveur
2. Accédez à : `https://mdoservices.fr/api/auth/create-users.php`
3. Le script va automatiquement :
   - Créer la table `users` si elle n'existe pas
   - Créer les 4 comptes utilisateurs
   - Afficher tous les identifiants
   - Lister les utilisateurs existants
4. **⚠️ IMPORTANT** : Supprimez le fichier après utilisation !

### Option B : Import SQL Manuel

1. Accédez à phpMyAdmin sur Hostinger
2. Sélectionnez votre base de données (`u442378820_site_mdo_2026`)
3. Cliquez sur "Importer"
4. Uploadez le fichier `/api/auth/create-users.sql`
5. Exécutez l'import
6. **⚠️ IMPORTANT** : Supprimez le fichier SQL après utilisation !

---

## 📚 Utilisation

### Se Connecter à l'Espace Partenaire

```
1. Allez sur https://mdoservices.fr/partner
2. Entrez : admin_partner
3. Mot de passe : MDOPartner2024!
4. Cliquez sur "Se connecter"
5. Vous serez redirigé vers /partner/pricing
```

### Se Connecter à l'Espace Client

```
1. Allez sur https://mdoservices.fr/client (ou /espace-client)
2. Entrez : admin_client
3. Mot de passe : MDOClient2024!
4. Cliquez sur "Se connecter"
5. Vous serez redirigé vers /client/dashboard
6. Cliquez sur les cartes pour accéder aux services
```

### Dashboard Client - Services Disponibles

✅ **Actuellement disponibles :**
- **Support Client** → Ouvre https://support.mdoservices.fr (nouvel onglet)
- **Suivi Télécom** → Ouvre https://portail.mdoservices.fr (nouvel onglet)

⏳ **Bientôt disponibles (badge "Bientôt") :**
- Statistiques SharePoint
- Mes Factures
- Mes Services
- Gestion du Compte
- Base de Connaissances
- Reporting

---

## 🔒 Sécurité

### ⚠️ Actions Urgentes Après Création

1. **Notez les identifiants** dans un gestionnaire de mots de passe sécurisé (1Password, Bitwarden, etc.)

2. **Supprimez les fichiers sensibles** du serveur :
   ```
   /public_html/api/auth/create-users.php
   /public_html/api/auth/create-users.sql
   /public_html/COMPTES_ADMIN.md  (ce fichier)
   ```

3. **Changez les mots de passe** après la première connexion :
   - Utilisez le formulaire "Mot de passe oublié" pour réinitialiser
   - Ou créez une page de gestion de compte

4. **Ne partagez JAMAIS** ces identifiants :
   - ❌ Par email
   - ❌ Par messagerie non chiffrée
   - ❌ Sur Slack/Teams sans chiffrement
   - ✅ Uniquement via gestionnaire de mots de passe partagé

### Bonnes Pratiques

- ✅ Utilisez des mots de passe uniques et forts (minimum 12 caractères)
- ✅ Activez l'authentification à deux facteurs (à implémenter)
- ✅ Surveillez les connexions suspectes
- ✅ Changez les mots de passe tous les 90 jours
- ✅ Ne réutilisez jamais les mots de passe sur d'autres sites

### Permissions par Rôle

| Fonctionnalité | Partner Admin | Partner | Client |
|---------------|---------------|---------|--------|
| Voir grille tarifaire | ✅ | ✅ | ❌ |
| Modifier grille | ✅ | ❌ | ❌ |
| Import CSV | ✅ | ❌ | ❌ |
| Dashboard client | ❌ | ❌ | ✅ |
| Support client | ❌ | ❌ | ✅ |
| Suivi télécom | ❌ | ❌ | ✅ |

---

## 🔧 Dépannage

### Impossible de se connecter

1. Vérifiez que la table `users` existe dans la base de données
2. Vérifiez que les utilisateurs sont bien créés (via phpMyAdmin)
3. Testez avec le script PHP : `/api/auth/create-users.php`
4. Vérifiez les logs d'erreur PHP sur Hostinger

### Mot de passe oublié

Pour l'instant, utilisez le script PHP pour régénérer le mot de passe :
```
https://mdoservices.fr/api/auth/create-users.php
```

Le script mettra à jour automatiquement les mots de passe.

### Page blanche après connexion

Vérifiez que :
- La route `/client/dashboard` ou `/partner/pricing` existe
- Le build a été fait avec `npm run build`
- Le dossier `dist` a été uploadé sur Hostinger

---

## 📞 Support

En cas de problème, contactez l'administrateur technique ou créez un ticket.

**⚠️ RAPPEL FINAL : SUPPRIMEZ CE FICHIER APRÈS LECTURE ! ⚠️**

---

_Document créé le : 2024_
_Dernière mise à jour : 2024_
