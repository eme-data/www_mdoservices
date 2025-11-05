/**
 * API Client pour les statistiques SharePoint
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mdoservices.fr/api'

/**
 * Récupère les statistiques SharePoint
 * @param {number|null} siteId - ID du site (null pour vue d'ensemble)
 * @returns {Promise<Object>}
 */
export async function getSharePointStats(siteId = null) {
  try {
    const url = siteId
      ? `${API_BASE_URL}/sharepoint/get-stats.php?site_id=${siteId}`
      : `${API_BASE_URL}/sharepoint/get-stats.php`

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erreur lors de la récupération des statistiques')
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur getSharePointStats:', error)
    throw error
  }
}

/**
 * Importe des données SharePoint (admin uniquement)
 * @param {Object} data - Données à importer
 * @returns {Promise<Object>}
 */
export async function importSharePointData(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/sharepoint/import-data.php`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erreur lors de l\'import des données')
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur importSharePointData:', error)
    throw error
  }
}

/**
 * Formate la taille en unité lisible
 * @param {number} sizeGb - Taille en GB
 * @returns {string}
 */
export function formatSize(sizeGb) {
  if (sizeGb < 0.001) {
    return `${(sizeGb * 1024 * 1024).toFixed(2)} KB`
  } else if (sizeGb < 1) {
    return `${(sizeGb * 1024).toFixed(2)} MB`
  } else if (sizeGb < 1024) {
    return `${sizeGb.toFixed(2)} GB`
  } else {
    return `${(sizeGb / 1024).toFixed(2)} TB`
  }
}

/**
 * Génère une couleur pour les graphiques
 * @param {number} index - Index de la couleur
 * @returns {string}
 */
export function getChartColor(index) {
  const colors = [
    '#3b82f6', // blue-500
    '#10b981', // green-500
    '#f59e0b', // amber-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#14b8a6', // teal-500
    '#f97316', // orange-500
    '#6366f1', // indigo-500
    '#84cc16', // lime-500
    '#06b6d4'  // cyan-500
  ]
  return colors[index % colors.length]
}
