/**
 * Simple API Client - Version Simplifiée
 * Utilise les endpoints d'authentification simplifiés avec sessions PHP
 */

const API_BASE_URL = '/api/auth';

/**
 * Login avec le système simplifié
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{success: boolean, user: object}>}
 */
export async function simpleLogin(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/simple-login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important pour les cookies de session
      body: JSON.stringify({ username, password }),
    });

    // Lire la réponse brute pour debug
    const text = await response.text();

    // Parser le JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Réponse non-JSON:', text);
      throw new Error('Le serveur a retourné une réponse invalide');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Erreur de connexion');
    }

    if (!data.success) {
      throw new Error(data.message || 'Échec de connexion');
    }

    return data;

  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Vérifier la session
 * @returns {Promise<{authenticated: boolean, user: object}>}
 */
export async function simpleVerify() {
  try {
    const response = await fetch(`${API_BASE_URL}/simple-verify.php`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Verify error:', error);
    return { authenticated: false };
  }
}

/**
 * Déconnexion
 * @returns {Promise<{success: boolean}>}
 */
export async function simpleLogout() {
  try {
    const response = await fetch(`${API_BASE_URL}/simple-logout.php`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

/**
 * Vérifier si l'utilisateur est authentifié
 * @returns {boolean}
 */
export function isAuthenticated() {
  // La vérification se fait côté serveur avec la session
  // Cette fonction peut vérifier localStorage pour un cache local
  return localStorage.getItem('user-authenticated') === 'true';
}

/**
 * Sauvegarder l'état d'authentification dans localStorage
 * @param {object} user
 */
export function saveAuthState(user) {
  localStorage.setItem('user-authenticated', 'true');
  localStorage.setItem('user-data', JSON.stringify(user));
}

/**
 * Effacer l'état d'authentification
 */
export function clearAuthState() {
  localStorage.removeItem('user-authenticated');
  localStorage.removeItem('user-data');
  localStorage.removeItem('partner-authenticated');
  localStorage.removeItem('partner-admin');
  localStorage.removeItem('client-authenticated');
  localStorage.removeItem('client-name');
}

/**
 * Récupérer les données utilisateur du localStorage
 * @returns {object|null}
 */
export function getUserData() {
  try {
    const data = localStorage.getItem('user-data');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}
