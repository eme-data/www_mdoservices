/**
 * API Client for MDO Services
 * Replaces Supabase client with direct API calls to PHP backend
 */

// API Base URL - will use relative URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Get authentication token from localStorage
 */
function getAuthToken() {
  return localStorage.getItem('auth-token');
}

/**
 * Set authentication token in localStorage
 */
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('auth-token', token);
  } else {
    localStorage.removeItem('auth-token');
  }
}

/**
 * Make API request with error handling
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Parse JSON response
    const data = await response.json();

    // Handle errors
    if (!response.ok) {
      const error = new Error(data.error || `HTTP ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    // Return data directly (API wraps in { success: true, data: ... })
    return data.data !== undefined ? data.data : data;

  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// ============================================================
// Authentication API
// ============================================================

/**
 * Login user and get JWT token
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{token: string, user: object}>}
 */
export async function login(username, password) {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  // Store token
  if (response.token) {
    setAuthToken(response.token);
  }

  return response;
}

/**
 * Verify current token
 * @returns {Promise<{user: object}>}
 */
export async function verifyToken() {
  try {
    return await apiRequest('/auth/verify', {
      method: 'GET',
    });
  } catch (error) {
    // Clear invalid token
    setAuthToken(null);
    throw error;
  }
}

/**
 * Logout user
 */
export function logout() {
  setAuthToken(null);
  localStorage.removeItem('partner-authenticated');
  localStorage.removeItem('partner-admin');
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getAuthToken();
}

// ============================================================
// Posts API
// ============================================================

/**
 * Fetch all published posts
 * @returns {Promise<Array>}
 */
export async function fetchPublishedPosts() {
  const data = await apiRequest('/posts/list', {
    method: 'GET',
  });

  return data;
}

/**
 * Fetch single post by slug
 * @param {string} slug
 * @returns {Promise<object>}
 */
export async function fetchPostBySlug(slug) {
  const data = await apiRequest(`/posts/get?slug=${encodeURIComponent(slug)}`, {
    method: 'GET',
  });

  return data;
}

// ============================================================
// Pricing Items API
// ============================================================

/**
 * Fetch all pricing items
 * @returns {Promise<Array>}
 */
export async function fetchPricingItems() {
  const data = await apiRequest('/pricing/list', {
    method: 'GET',
  });

  return data;
}

/**
 * Create new pricing item
 * @param {object} item
 * @returns {Promise<object>}
 */
export async function createPricingItem(item) {
  const data = await apiRequest('/pricing/create', {
    method: 'POST',
    body: JSON.stringify(item),
  });

  return data;
}

/**
 * Update pricing item
 * @param {number} id
 * @param {object} updates
 * @returns {Promise<object>}
 */
export async function updatePricingItem(id, updates) {
  const data = await apiRequest('/pricing/update', {
    method: 'POST',
    body: JSON.stringify({ id, ...updates }),
  });

  return data;
}

/**
 * Delete pricing item
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deletePricingItem(id) {
  await apiRequest('/pricing/delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

/**
 * Update pricing items order (drag and drop)
 * @param {Array} items - Array of items with id and display_order
 * @returns {Promise<void>}
 */
export async function updatePricingOrder(items) {
  const itemsWithOrder = items.map((item, index) => ({
    id: item.id,
    display_order: index,
  }));

  await apiRequest('/pricing/reorder', {
    method: 'POST',
    body: JSON.stringify({ items: itemsWithOrder }),
  });
}

// ============================================================
// Backward compatibility with old localStorage auth
// ============================================================

/**
 * Migrate from old localStorage auth to new token-based auth
 * This helps maintain compatibility during transition
 */
export function migrateOldAuth() {
  const wasAuthenticated = localStorage.getItem('partner-authenticated') === 'true';
  const wasAdmin = localStorage.getItem('partner-admin') === 'true';

  // If old auth exists but no token, user needs to re-login
  if (wasAuthenticated && !getAuthToken()) {
    console.warn('Old authentication detected. Please login again.');
    localStorage.removeItem('partner-authenticated');
    localStorage.removeItem('partner-admin');
  }
}

// Run migration check on module load
migrateOldAuth();
