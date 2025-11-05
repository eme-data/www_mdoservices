# Système de Tickets de Support - MDO Services

## 📋 Vue d'ensemble

Ce système de tickets intégré permet aux clients de MDO Services de créer et suivre leurs demandes de support directement depuis leur espace client, sans avoir besoin d'une plateforme externe.

## 🎯 Fonctionnalités

### Pour les Clients
- ✅ Créer des tickets de support avec catégorie et priorité
- ✅ Suivre l'état de leurs tickets en temps réel
- ✅ Ajouter des commentaires aux tickets
- ✅ Recevoir un numéro de ticket unique (format: TK-2024-00001)
- ✅ Filtrer les tickets par statut (ouverts, en cours, résolus, fermés)
- ✅ Voir les statistiques de leurs tickets
- ✅ Marquer des tickets comme résolus ou fermés

### Statuts des Tickets
- `open` - Nouveau ticket ouvert
- `in_progress` - Ticket en cours de traitement par le support
- `waiting_client` - En attente de réponse du client
- `resolved` - Ticket résolu
- `closed` - Ticket fermé

### Priorités
- `low` - Basse priorité
- `normal` - Priorité normale
- `high` - Haute priorité
- `urgent` - Urgence

### Catégories Disponibles
- Problème Technique
- Facturation
- Gestion de Compte
- Réseau & Connectivité
- Email & Messagerie
- Sécurité
- Services Cloud
- Téléphonie
- Autre

## 🚀 Installation

### 1. Créer les tables dans la base de données

Exécutez le script SQL pour créer les tables nécessaires:

```bash
mysql -u votre_utilisateur -p votre_base_de_donnees < api/tickets/create-tickets-tables.sql
```

Ou manuellement dans phpMyAdmin/MySQL:
```sql
SOURCE /chemin/vers/api/tickets/create-tickets-tables.sql
```

Ce script créera:
- Table `tickets` - Stocke les tickets
- Table `ticket_comments` - Stocke les commentaires
- Table `ticket_counter` - Gère la numérotation automatique
- Vue `tickets_with_user` - Vue pour les jointures

### 2. Vérifier les permissions des fichiers

Assurez-vous que le serveur web peut lire les fichiers PHP:

```bash
chmod 644 api/tickets/*.php
chmod 755 api/tickets/
```

### 3. Configurer la base de données

Vérifiez que le fichier `api/config/database.php` contient les bonnes informations de connexion:

```php
$host = 'localhost';
$dbname = 'votre_base_de_donnees';
$username = 'votre_utilisateur';
$password = 'votre_mot_de_passe';
```

### 4. Tester l'installation

1. Connectez-vous à votre espace client
2. Cliquez sur "Support Client" dans le dashboard
3. Créez un ticket de test
4. Vérifiez que vous recevez un numéro de ticket

## 📁 Structure des Fichiers

```
api/tickets/
├── README.md                      # Ce fichier
├── create-tickets-tables.sql      # Script de création des tables
├── _ticket-helper.php             # Fonctions helper (génération numéro, auth)
├── create.php                     # Créer un ticket
├── list.php                       # Lister les tickets
├── get.php                        # Récupérer un ticket spécifique
├── add-comment.php                # Ajouter un commentaire
└── update-status.php              # Mettre à jour le statut

src/
├── lib/
│   └── tickets-api.js             # Bibliothèque API côté client
├── pages/client/
│   ├── Tickets.jsx                # Page principale
│   ├── TicketList.jsx             # Liste des tickets
│   ├── CreateTicketModal.jsx     # Modal de création
│   └── TicketDetail.jsx          # Détails et commentaires
└── components/ui/
    └── badge.jsx                  # Composant Badge pour les statuts
```

## 🔌 API Endpoints

### POST /api/tickets/create.php
Créer un nouveau ticket

**Body:**
```json
{
  "title": "Impossible de se connecter à mon email",
  "description": "Depuis ce matin, je ne peux plus accéder...",
  "category": "email",
  "priority": "high"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Ticket créé avec succès.",
  "ticket": {
    "id": 1,
    "ticket_number": "TK-2024-00001",
    "title": "...",
    "status": "open",
    ...
  }
}
```

### GET /api/tickets/list.php
Récupérer la liste des tickets de l'utilisateur connecté

**Query params (optionnels):**
- `status` - Filtrer par statut
- `category` - Filtrer par catégorie
- `priority` - Filtrer par priorité
- `limit` - Nombre de résultats (défaut: 50)
- `offset` - Offset pour pagination (défaut: 0)

**Response:**
```json
{
  "success": true,
  "tickets": [...],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "total": 10
  },
  "stats": {
    "total": 10,
    "open_count": 3,
    "in_progress_count": 2,
    "resolved_count": 5,
    "closed_count": 0
  }
}
```

### GET /api/tickets/get.php?id=123
Récupérer les détails d'un ticket avec ses commentaires

**Response:**
```json
{
  "success": true,
  "ticket": {...},
  "comments": [
    {
      "id": 1,
      "author_name": "Client",
      "author_type": "client",
      "message": "...",
      "created_at": "2024-11-05 10:30:00"
    }
  ]
}
```

### POST /api/tickets/add-comment.php
Ajouter un commentaire à un ticket

**Body:**
```json
{
  "ticket_id": 123,
  "message": "Voici plus d'informations..."
}
```

### PUT /api/tickets/update-status.php
Mettre à jour le statut d'un ticket

**Body:**
```json
{
  "ticket_id": 123,
  "status": "resolved"
}
```

## 🔐 Sécurité

- ✅ Authentification requise via sessions PHP
- ✅ Vérification que l'utilisateur ne peut accéder qu'à ses propres tickets
- ✅ Requêtes préparées PDO pour prévenir les injections SQL
- ✅ Validation des entrées côté serveur
- ✅ CORS configuré
- ✅ Credentials inclus dans les requêtes fetch

## 🎨 Interface Utilisateur

L'interface utilise:
- **React** avec React Router
- **Framer Motion** pour les animations
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Shadcn/ui** components (Button, Input, Textarea, Dialog, Toast)

## 📊 Base de Données

### Table: tickets
```sql
id                INT PRIMARY KEY AUTO_INCREMENT
ticket_number     VARCHAR(20) UNIQUE  -- TK-2024-00001
user_id           INT (FK → users.id)
title             VARCHAR(200)
description       TEXT
category          VARCHAR(50)
priority          ENUM('low','normal','high','urgent')
status            ENUM('open','in_progress','waiting_client','resolved','closed')
created_at        TIMESTAMP
updated_at        TIMESTAMP
resolved_at       TIMESTAMP NULL
closed_at         TIMESTAMP NULL
```

### Table: ticket_comments
```sql
id              INT PRIMARY KEY AUTO_INCREMENT
ticket_id       INT (FK → tickets.id)
user_id         INT NULL (FK → users.id)
author_name     VARCHAR(100)
author_type     ENUM('client','support')
message         TEXT
is_internal     BOOLEAN
created_at      TIMESTAMP
```

### Table: ticket_counter
```sql
year       INT PRIMARY KEY
counter    INT
updated_at TIMESTAMP
```

## 🔄 Workflow

1. **Client crée un ticket**
   - Remplit le formulaire avec titre, description, catégorie, priorité
   - Le système génère un numéro unique (TK-2024-00001)
   - Le ticket est créé avec le statut `open`

2. **Support traite le ticket**
   - Le support voit tous les tickets dans leur interface admin
   - Change le statut à `in_progress` quand il commence à traiter
   - Ajoute des commentaires pour communiquer avec le client

3. **Échange client-support**
   - Le client reçoit les commentaires du support
   - Peut répondre en ajoutant ses propres commentaires
   - Si le support attend une réponse, statut → `waiting_client`

4. **Résolution**
   - Le support marque le ticket comme `resolved`
   - Le client peut confirmer et fermer (`closed`)
   - Ou rouvrir si le problème persiste

## 🛠️ Maintenance

### Voir les derniers tickets
```sql
SELECT * FROM tickets_with_user ORDER BY created_at DESC LIMIT 10;
```

### Statistiques globales
```sql
SELECT
  status,
  COUNT(*) as count,
  AVG(TIMESTAMPDIFF(HOUR, created_at, resolved_at)) as avg_resolution_hours
FROM tickets
WHERE resolved_at IS NOT NULL
GROUP BY status;
```

### Nettoyer les vieux tickets fermés (optionnel)
```sql
-- Archiver les tickets fermés depuis plus de 2 ans
DELETE FROM tickets
WHERE status = 'closed'
AND closed_at < DATE_SUB(NOW(), INTERVAL 2 YEAR);
```

## 📝 TODO / Améliorations Futures

- [ ] Notifications email automatiques à la création/mise à jour de tickets
- [ ] Pièces jointes dans les tickets
- [ ] Interface admin pour le support (voir et gérer tous les tickets)
- [ ] Templates de réponses pour le support
- [ ] SLA (Service Level Agreement) avec alertes
- [ ] Export des tickets en PDF/CSV
- [ ] Recherche full-text dans les tickets
- [ ] Tags personnalisés
- [ ] Attribution automatique des tickets selon la catégorie

## 🤝 Support

Pour toute question sur l'installation ou l'utilisation:
- Email: contact@mdoservices.fr
- Créez un ticket dans votre espace client (une fois le système installé 😊)

## 📜 Licence

© 2024 MDO Services. Tous droits réservés.
