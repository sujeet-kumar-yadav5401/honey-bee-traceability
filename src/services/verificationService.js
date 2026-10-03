/**
 * Verification Service
 * Calls GET /api/products/verify/:batchId on the backend.
 * Falls back gracefully — callers handle the null result.
 */

import { apiFetch } from './api.js';

/**
 * Verify a product batch by its batch ID.
 *
 * @param {string} batchId - e.g. 'HNY-2026-001', 'RICE-2026-001', 'INVALID-001'
 * @returns {Promise<object|null>}
 *   Resolves with the full API response object on success,
 *   or null if the backend is unreachable (caller falls back to mock data).
 *   Throws an error with a `verified: false` payload for known bad IDs (404).
 */
export const verifyBatchFromAPI = async (batchId) => {
  try {
    const data = await apiFetch(`/products/verify/${encodeURIComponent(batchId)}`);
    return data; // { success, verified, batch, traceabilityJourney, ... }
  } catch (error) {
    // 404 means the batch was explicitly not found or is invalid
    if (error.status === 404) {
      const notFoundPayload = {
        success: false,
        verified: false,
        batchId,
        message: error.data?.message || 'Product record could not be verified.',
      };
      const notFoundError = new Error(notFoundPayload.message);
      notFoundError.verificationFailed = true;
      notFoundError.payload = notFoundPayload;
      throw notFoundError;
    }

    // Any other error (network down, server error) → return null so caller falls back to mock
    console.warn(`[VerificationService] Backend unreachable, falling back to mock data. (${error.message})`);
    return null;
  }
};
