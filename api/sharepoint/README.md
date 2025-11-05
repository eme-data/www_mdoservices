# API Statistiques SharePoint

Documentation de l'API pour la gestion et visualisation des statistiques SharePoint.

## 📋 Vue d'ensemble

Cette API permet de stocker et récupérer les statistiques d'utilisation SharePoint pour les clients, incluant :
- Utilisation du stockage par site
- Répartition par dossier/bibliothèque
- Types de fichiers
- Historique de l'évolution

## 🗄️ Base de données

### Tables

#### `sharepoint_sites`
Stocke les informations sur les sites SharePoint des clients.

| Champ | Type | Description |
|-------|------|-------------|
| id | INT | ID unique |
| user_id | INT | ID du client (FK vers users) |
| site_name | VARCHAR(200) | Nom du site |
| site_url | VARCHAR(500) | URL du site |
| site_type | ENUM | Type : team, communication, onedrive, other |
| total_storage_gb | DECIMAL(10,2) | Stockage total en GB |
| used_storage_gb | DECIMAL(10,2) | Stockage utilisé en GB |
| last_updated | TIMESTAMP | Dernière mise à jour |
| is_active | BOOLEAN | Site actif |

#### `sharepoint_folders`
Statistiques par dossier/bibliothèque.

| Champ | Type | Description |
|-------|------|-------------|
| id | INT | ID unique |
| site_id | INT | ID du site (FK) |
| folder_name | VARCHAR(500) | Nom du dossier |
| folder_path | VARCHAR(1000) | Chemin complet |
| folder_type | ENUM | Type : library, folder, list, onedrive |
| size_gb | DECIMAL(10,4) | Taille en GB |
| file_count | INT | Nombre de fichiers |
| last_modified | DATETIME | Dernière modification |

#### `sharepoint_stats_history`
Historique des statistiques (snapshots quotidiens).

#### `sharepoint_file_types`
Répartition par type de fichier.

### Installation

```bash
# Exécuter le script SQL
mysql -u username -p database_name < create-sharepoint-tables.sql
```

## 📡 Endpoints API

### GET /api/sharepoint/get-stats.php

Récupère les statistiques SharePoint.

**Query Parameters:**
- `site_id` (optionnel) : ID d'un site spécifique

**Sans site_id (vue d'ensemble):**
```json
{
  "success": true,
  "overview": {
    "total_sites": 3,
    "total_storage_gb": 300.00,
    "total_used_gb": 195.50,
    "usage_percentage": 65.17
  },
  "sites": [...],
  "top_folders": [...]
}
```

**Avec site_id (détails d'un site):**
```json
{
  "success": true,
  "site": {...},
  "folders": [...],
  "file_types": [...],
  "history": [...]
}
```

**Codes de réponse:**
- 200 : Succès
- 401 : Non authentifié
- 403 : Accès refusé
- 404 : Site non trouvé
- 500 : Erreur serveur

---

### POST /api/sharepoint/import-data.php

Importe des données SharePoint (admin uniquement).

**Body (JSON):**
```json
{
  "user_id": 123,
  "site_name": "Site Équipe Principale",
  "site_url": "https://mdoservices.sharepoint.com/sites/equipe",
  "site_type": "team",
  "total_storage_gb": 100.0,
  "used_storage_gb": 65.5,
  "folders": [
    {
      "folder_name": "Documents partagés",
      "folder_path": "/Shared Documents",
      "folder_type": "library",
      "size_gb": 25.5,
      "file_count": 1250
    },
    {
      "folder_name": "Projets 2024",
      "folder_path": "/Shared Documents/Projets 2024",
      "folder_type": "folder",
      "size_gb": 15.75,
      "file_count": 450
    }
  ]
}
```

**Réponse:**
```json
{
  "success": true,
  "message": "Données importées avec succès.",
  "site_id": 1,
  "folders_imported": 2
}
```

**Codes de réponse:**
- 200 : Succès
- 400 : Champs manquants
- 401 : Non authentifié
- 403 : Accès refusé (non admin)
- 500 : Erreur serveur

## 💾 Import de données

### Méthode manuelle (via API)

```php
<?php
// Exemple d'import via API
$data = [
    'user_id' => 1,
    'site_name' => 'Mon Site SharePoint',
    'site_url' => 'https://...',
    'site_type' => 'team',
    'total_storage_gb' => 100.0,
    'used_storage_gb' => 65.5,
    'folders' => [
        [
            'folder_name' => 'Documents',
            'folder_path' => '/Shared Documents',
            'folder_type' => 'library',
            'size_gb' => 25.5,
            'file_count' => 1250
        ]
    ]
];

$response = file_get_contents('https://mdoservices.fr/api/sharepoint/import-data.php', false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => json_encode($data)
    ]
]));

echo $response;
```

### PowerShell Script (collecte automatique)

```powershell
# Exemple de script PowerShell pour collecter les stats SharePoint
# À exécuter avec les droits SharePoint Online Admin

Connect-SPOService -Url "https://mdoservices-admin.sharepoint.com"

$sites = Get-SPOSite -Limit All
foreach ($site in $sites) {
    $storage = Get-SPOSite -Identity $site.Url | Select StorageQuota, StorageUsageCurrent

    # Construire le JSON et l'envoyer à l'API
    $data = @{
        user_id = 1  # À mapper selon votre logique
        site_name = $site.Title
        site_url = $site.Url
        site_type = "team"
        total_storage_gb = [math]::Round($storage.StorageQuota / 1024, 2)
        used_storage_gb = [math]::Round($storage.StorageUsageCurrent / 1024, 2)
        folders = @()  # À enrichir avec Get-PnPList
    }

    $json = $data | ConvertTo-Json
    Invoke-RestMethod -Uri "https://mdoservices.fr/api/sharepoint/import-data.php" `
                      -Method Post `
                      -Body $json `
                      -ContentType "application/json"
}
```

### CSV Import

Créez un fichier CSV avec ce format :
```csv
user_id,site_name,site_url,site_type,total_storage_gb,used_storage_gb
1,"Site Équipe","https://...","team",100.00,65.50
```

Puis utilisez un script PHP pour lire et importer :
```php
$csv = array_map('str_getcsv', file('sites.csv'));
array_shift($csv); // Supprimer l'en-tête

foreach ($csv as $row) {
    $data = [
        'user_id' => $row[0],
        'site_name' => $row[1],
        'site_url' => $row[2],
        'site_type' => $row[3],
        'total_storage_gb' => (float)$row[4],
        'used_storage_gb' => (float)$row[5],
        'folders' => []
    ];

    // Appel API pour importer...
}
```

## 🔐 Sécurité

- ✅ Authentification requise sur tous les endpoints
- ✅ Les clients ne voient que leurs propres sites
- ✅ Seuls les admins peuvent importer des données
- ✅ Validation des données côté serveur
- ✅ Protection CORS configurée
- ✅ Protection contre SQL injection (PDO prepared statements)

## 🎨 Frontend

L'interface client affiche :
- Vue d'ensemble avec KPIs (sites, stockage total, utilisation)
- Liste des sites SharePoint
- Top 10 des dossiers les plus volumineux
- Graphiques de répartition (bar chart, pie chart)
- Détails par site avec liste complète des dossiers

Route : `/client/sharepoint`

## 🔄 Évolutions futures

- [ ] Connexion API Microsoft Graph (OAuth)
- [ ] Collecte automatique des statistiques
- [ ] Alertes sur dépassement de quota
- [ ] Statistiques par utilisateur
- [ ] Export PDF/Excel des rapports
- [ ] Comparaison périodes (mois/trimestre)

## 📞 Support

Pour toute question ou problème, contactez l'équipe MDO Services.
