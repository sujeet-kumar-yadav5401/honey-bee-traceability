import crypto from 'crypto';

/**
 * Hash Service - Data Hash Generation
 * IMPORTANT: This generates cryptographic SHA-256 data hashes for data integrity.
 * It is a preparatory cryptographic digest and NOT a real public blockchain transaction.
 */

export const generateBatchHash = (batchData = {}) => {
  // Normalize key fields to produce consistent deterministic hash
  const payload = {
    batchId: batchData.batchId || '',
    productName: batchData.productName || '',
    productCategory: batchData.productCategory || '',
    quantity: batchData.quantity || '',
    harvestDate: batchData.harvestDate ? new Date(batchData.harvestDate).toISOString() : '',
    location: batchData.location || '',
    qualityGrade: batchData.qualityGrade || '',
    moistureLevel: batchData.moistureLevel || '',
    hiveId: batchData.hiveId || '',
    floralSource: batchData.floralSource || '',
    producerName: batchData.producerName || ''
  };

  const stringified = JSON.stringify(payload);
  const hash = crypto.createHash('sha256').update(stringified).digest('hex');
  return `0x${hash}`;
};

export const generateEventHash = (eventData = {}) => {
  const payload = {
    batchId: eventData.batchId || '',
    eventType: eventData.eventType || '',
    title: eventData.title || '',
    location: eventData.location || '',
    actor: eventData.actor || '',
    timestamp: eventData.timestamp ? new Date(eventData.timestamp).toISOString() : ''
  };

  const stringified = JSON.stringify(payload);
  const hash = crypto.createHash('sha256').update(stringified).digest('hex');
  return `0x${hash}`;
};

export const generateSimulatedTransactionId = () => {
  const randomBytes = crypto.randomBytes(32).toString('hex');
  return `0x${randomBytes}`;
};

export default {
  generateBatchHash,
  generateEventHash,
  generateSimulatedTransactionId
};
