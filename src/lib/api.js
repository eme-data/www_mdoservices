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

/**
 * Request password reset
 * @param {string} email
 * @returns {Promise<void>}
 */
export async function requestPasswordReset(email) {
  const response = await apiRequest('/auth/request-reset', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  return response;
}

/**
 * Verify password reset token
 * @param {string} token
 * @returns {Promise<{valid: boolean, email?: string, message?: string}>}
 */
export async function verifyResetToken(token) {
  const data = await apiRequest(`/auth/verify-reset-token?token=${encodeURIComponent(token)}`, {
    method: 'GET',
  });

  return data;
}

/**
 * Reset password with token
 * @param {string} token
 * @param {string} password
 * @returns {Promise<void>}
 */
export async function resetPassword(token, password) {
  const response = await apiRequest('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  });

  return response;
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

/**
 * Fetch all posts (including drafts) - Admin only
 * @returns {Promise<Array>}
 */
export async function fetchAllPosts() {
  const data = await apiRequest('/posts/list-all', {
    method: 'GET',
  });

  return data;
}

/**
 * Create new blog post - Admin only
 * @param {object} post
 * @returns {Promise<object>}
 */
export async function createPost(post) {
  const data = await apiRequest('/posts/create', {
    method: 'POST',
    body: JSON.stringify(post),
  });

  return data;
}

/**
 * Update existing blog post - Admin only
 * @param {number} id
 * @param {object} updates
 * @returns {Promise<object>}
 */
export async function updatePost(id, updates) {
  const data = await apiRequest('/posts/update', {
    method: 'POST',
    body: JSON.stringify({ id, ...updates }),
  });

  return data;
}

/**
 * Delete blog post - Admin only
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deletePost(id) {
  await apiRequest('/posts/delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
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
// Categories API
// ============================================================

/**
 * Fetch all categories
 * @returns {Promise<Array>}
 */
export async function fetchCategories() {
  const data = await apiRequest('/categories/list', {
    method: 'GET',
  });

  return data;
}

/**
 * Create new category - Admin only
 * @param {object} category
 * @returns {Promise<object>}
 */
export async function createCategory(category) {
  const data = await apiRequest('/categories/create', {
    method: 'POST',
    body: JSON.stringify(category),
  });

  return data;
}

/**
 * Update category - Admin only
 * @param {number} id
 * @param {object} updates
 * @returns {Promise<object>}
 */
export async function updateCategory(id, updates) {
  const data = await apiRequest('/categories/update', {
    method: 'POST',
    body: JSON.stringify({ id, ...updates }),
  });

  return data;
}

/**
 * Delete category - Admin only
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteCategory(id) {
  await apiRequest('/categories/delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

// ============================================================
// Tags API
// ============================================================

/**
 * Fetch all tags
 * @returns {Promise<Array>}
 */
export async function fetchTags() {
  const data = await apiRequest('/tags/list', {
    method: 'GET',
  });

  return data;
}

/**
 * Create new tag - Admin only
 * @param {object} tag
 * @returns {Promise<object>}
 */
export async function createTag(tag) {
  const data = await apiRequest('/tags/create', {
    method: 'POST',
    body: JSON.stringify(tag),
  });

  return data;
}

/**
 * Delete tag - Admin only
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteTag(id) {
  await apiRequest('/tags/delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

// ============================================================
// Media API
// ============================================================

/**
 * Upload an image file
 * @param {File} file
 * @returns {Promise<object>}
 */
export async function uploadMedia(file) {
  const url = `${API_BASE_URL}/media/upload`;

  const formData = new FormData();
  formData.append('file', file);

  const token = getAuthToken();
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || `HTTP ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data.data !== undefined ? data.data : data;
}

/**
 * Fetch all media files
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<object>}
 */
export async function fetchMedia(limit = 50, offset = 0) {
  const data = await apiRequest(`/media/list?limit=${limit}&offset=${offset}`, {
    method: 'GET',
  });

  return data;
}

/**
 * Delete media file - Admin only
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteMedia(id) {
  await apiRequest('/media/delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

// ============================================================
// Import API
// ============================================================

/**
 * Bulk import posts from JSON - Admin only
 * @param {Array} posts
 * @param {boolean} skipDuplicates
 * @returns {Promise<object>}
 */
export async function bulkImportPosts(posts, skipDuplicates = true) {
  const data = await apiRequest('/import/bulk', {
    method: 'POST',
    body: JSON.stringify({ posts, skip_duplicates: skipDuplicates }),
  });

  return data;
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
