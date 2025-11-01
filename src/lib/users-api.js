/**
 * Users API Service
 * Service pour gérer les utilisateurs (admin seulement)
 */

const API_BASE = '/api/users'

/**
 * Récupérer tous les utilisateurs (selon le rôle de l'admin)
 */
export async function fetchUsers() {
  try {
    const response = await fetch(`${API_BASE}/list.php`, {
      method: 'GET',
      credentials: 'include', // Important pour envoyer les cookies de session
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors du chargement des utilisateurs')
    }

    return data.users || []
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

/**
 * Créer un nouvel utilisateur
 * @param {Object} userData - { username, email, password, is_admin, is_active }
 */
export async function createUser(userData) {
  try {
    const response = await fetch(`${API_BASE}/create.php`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la création de l\'utilisateur')
    }

    return data.user
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

/**
 * Mettre à jour un utilisateur
 * @param {number} userId
 * @param {Object} updates - { username, email, is_admin, is_active }
 */
export async function updateUser(userId, updates) {
  try {
    const response = await fetch(`${API_BASE}/update.php`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId, ...updates }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la mise à jour de l\'utilisateur')
    }

    return data.user
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

/**
 * Supprimer un utilisateur
 * @param {number} userId
 */
export async function deleteUser(userId) {
  try {
    const response = await fetch(`${API_BASE}/delete.php?id=${userId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la suppression de l\'utilisateur')
    }

    return data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

/**
 * Changer le mot de passe d'un utilisateur
 * @param {number} userId
 * @param {string} newPassword
 */
export async function changeUserPassword(userId, newPassword) {
  try {
    const response = await fetch(`${API_BASE}/change-password.php`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        new_password: newPassword,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors du changement de mot de passe')
    }

    return data
  } catch (error) {
    console.error('Error changing password:', error)
    throw error
  }
}
