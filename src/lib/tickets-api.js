/**
 * API Client pour la gestion des tickets de support
 * MDO Services - Espace Client
 */

const API_BASE_URL = '/api/tickets'

/**
 * Créer un nouveau ticket
 * @param {Object} ticketData - Données du ticket
 * @param {string} ticketData.title - Titre du ticket
 * @param {string} ticketData.description - Description détaillée
 * @param {string} ticketData.category - Catégorie du ticket
 * @param {string} ticketData.priority - Priorité (low|normal|high|urgent)
 * @returns {Promise<Object>} Ticket créé
 */
export async function createTicket(ticketData) {
  try {
    const response = await fetch(`${API_BASE_URL}/create.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important pour inclure les cookies de session
      body: JSON.stringify(ticketData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la création du ticket')
    }

    return data
  } catch (error) {
    console.error('Erreur createTicket:', error)
    throw error
  }
}

/**
 * Récupérer la liste des tickets
 * @param {Object} filters - Filtres optionnels
 * @param {string} filters.status - Filtrer par statut
 * @param {string} filters.category - Filtrer par catégorie
 * @param {string} filters.priority - Filtrer par priorité
 * @param {number} filters.limit - Nombre de tickets à récupérer
 * @param {number} filters.offset - Offset pour pagination
 * @returns {Promise<Object>} Liste des tickets avec pagination et stats
 */
export async function listTickets(filters = {}) {
  try {
    const queryParams = new URLSearchParams()

    if (filters.status) queryParams.append('status', filters.status)
    if (filters.category) queryParams.append('category', filters.category)
    if (filters.priority) queryParams.append('priority', filters.priority)
    if (filters.limit) queryParams.append('limit', filters.limit.toString())
    if (filters.offset) queryParams.append('offset', filters.offset.toString())

    const url = `${API_BASE_URL}/list.php${queryParams.toString() ? '?' + queryParams.toString() : ''}`

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la récupération des tickets')
    }

    return data
  } catch (error) {
    console.error('Erreur listTickets:', error)
    throw error
  }
}

/**
 * Récupérer les détails d'un ticket avec ses commentaires
 * @param {number} ticketId - ID du ticket
 * @returns {Promise<Object>} Détails du ticket et commentaires
 */
export async function getTicket(ticketId) {
  try {
    const response = await fetch(`${API_BASE_URL}/get.php?id=${ticketId}`, {
      method: 'GET',
      credentials: 'include',
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la récupération du ticket')
    }

    return data
  } catch (error) {
    console.error('Erreur getTicket:', error)
    throw error
  }
}

/**
 * Ajouter un commentaire à un ticket
 * @param {number} ticketId - ID du ticket
 * @param {string} message - Message du commentaire
 * @returns {Promise<Object>} Commentaire créé
 */
export async function addComment(ticketId, message) {
  try {
    const response = await fetch(`${API_BASE_URL}/add-comment.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ticket_id: ticketId,
        message: message,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de l\'ajout du commentaire')
    }

    return data
  } catch (error) {
    console.error('Erreur addComment:', error)
    throw error
  }
}

/**
 * Mettre à jour le statut d'un ticket
 * @param {number} ticketId - ID du ticket
 * @param {string} status - Nouveau statut (resolved|closed)
 * @returns {Promise<Object>} Résultat de la mise à jour
 */
export async function updateTicketStatus(ticketId, status) {
  try {
    const response = await fetch(`${API_BASE_URL}/update-status.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ticket_id: ticketId,
        status: status,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la mise à jour du statut')
    }

    return data
  } catch (error) {
    console.error('Erreur updateTicketStatus:', error)
    throw error
  }
}

/**
 * Catégories de tickets prédéfinies
 */
export const TICKET_CATEGORIES = [
  { value: 'technique', label: 'Problème Technique' },
  { value: 'facturation', label: 'Facturation' },
  { value: 'compte', label: 'Gestion de Compte' },
  { value: 'reseau', label: 'Réseau & Connectivité' },
  { value: 'email', label: 'Email & Messagerie' },
  { value: 'securite', label: 'Sécurité' },
  { value: 'cloud', label: 'Services Cloud' },
  { value: 'telephonie', label: 'Téléphonie' },
  { value: 'autre', label: 'Autre' },
]

/**
 * Priorités de tickets
 */
export const TICKET_PRIORITIES = [
  { value: 'low', label: 'Basse', color: 'gray' },
  { value: 'normal', label: 'Normale', color: 'blue' },
  { value: 'high', label: 'Haute', color: 'orange' },
  { value: 'urgent', label: 'Urgente', color: 'red' },
]

/**
 * Statuts de tickets
 */
export const TICKET_STATUSES = [
  { value: 'open', label: 'Ouvert', color: 'blue' },
  { value: 'in_progress', label: 'En cours', color: 'yellow' },
  { value: 'waiting_client', label: 'En attente client', color: 'purple' },
  { value: 'resolved', label: 'Résolu', color: 'green' },
  { value: 'closed', label: 'Fermé', color: 'gray' },
]

/**
 * Helper pour récupérer le label d'une priorité
 */
export function getPriorityLabel(priority) {
  const p = TICKET_PRIORITIES.find(p => p.value === priority)
  return p ? p.label : priority
}

/**
 * Helper pour récupérer le label d'un statut
 */
export function getStatusLabel(status) {
  const s = TICKET_STATUSES.find(s => s.value === status)
  return s ? s.label : status
}

/**
 * Helper pour récupérer la couleur d'une priorité
 */
export function getPriorityColor(priority) {
  const p = TICKET_PRIORITIES.find(p => p.value === priority)
  return p ? p.color : 'gray'
}

/**
 * Helper pour récupérer la couleur d'un statut
 */
export function getStatusColor(status) {
  const s = TICKET_STATUSES.find(s => s.value === status)
  return s ? s.color : 'gray'
}
