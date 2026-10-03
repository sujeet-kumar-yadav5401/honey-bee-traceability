/**
 * Base API client for the AgriTrace backend.
 * All services import from here.
 *
 * Base URL: http://localhost:5000/api
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Core fetch wrapper with JSON handling and auth token injection.
 * @param {string} endpoint - path relative to BASE_URL (e.g. '/products/verify/HNY-2026-001')
 * @param {RequestInit} options - fetch options
 * @returns {Promise<any>} parsed JSON response
 */
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('agritrace_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    // Propagate backend error message if available
    const message = data?.message || `Request failed: ${response.status} ${response.statusText}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export default apiFetch;
