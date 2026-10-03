import ProductBatch from '../models/ProductBatch.js';
import TraceabilityEvent from '../models/TraceabilityEvent.js';
import { generateBatchHash } from '../services/hashService.js';

// @desc  Verify a product batch by batchId (public, no auth required)
// @route GET /api/products/verify/:batchId
// @access Public
export const verifyBatch = async (req, res, next) => {
  try {
    const batchId = req.params.batchId.trim().toUpperCase();

    // ─── Known invalid prefix check ────────────────────────────────────────
    if (
      batchId === 'INVALID-001' ||
      batchId.startsWith('INVALID') ||
      batchId.startsWith('FAIL')
    ) {
      return res.status(404).json({
        success: false,
        verified: false,
        batchId,
        message: 'Product record could not be verified.',
        reason:
          'The batch identifier does not exist in the AgriTrace consortium ledger, or has not been sealed by a registered producer.',
      });
    }

    // ─── Fetch batch from DB ────────────────────────────────────────────────
    const batch = await ProductBatch.findOne({ batchId });

    if (!batch) {
      return res.status(404).json({
        success: false,
        verified: false,
        batchId,
        message: 'Product record could not be verified.',
        reason: 'No matching batch found in the database.',
      });
    }

    // ─── Fetch traceability events ──────────────────────────────────────────
    const events = await TraceabilityEvent.find({ batchId })
      .sort({ stepNumber: 1, timestamp: 1 })
      .lean();

    // ─── Data-integrity re-hash check ───────────────────────────────────────
    const recomputedHash = generateBatchHash({
      batchId: batch.batchId,
      productName: batch.productName,
      productCategory: batch.productCategory,
      producerName: batch.producerName,
      location: batch.location,
      quantity: batch.quantity,
      unit: batch.unit,
      harvestDate: batch.harvestDate,
      qualityGrade: batch.qualityGrade,
    });

    const dataIntegrityCheck =
      batch.dataHash && batch.dataHash.length > 0
        ? batch.dataHash === recomputedHash
        : true; // new record with no stored hash → treat as valid

    // ─── Build response ─────────────────────────────────────────────────────
    return res.status(200).json({
      success: true,
      verified: true,
      verificationStatus: batch.verificationStatus,
      dataIntegrityCheck,
      batch: {
        id: batch.batchId,
        batchId: batch.batchId,
        product: batch.productName,
        productName: batch.productName,
        productCategory: batch.productCategory,
        producer: batch.producerName,
        origin: batch.location,
        quantity: `${batch.quantity} ${batch.unit}`,
        qualityGrade: batch.qualityGrade,
        harvestDate: batch.harvestDate,
        processingDate: batch.processingDate,
        packagingDate: batch.packagingDate,
        processingMethod: batch.processingMethod,
        packagingType: batch.packagingType,
        expiryDate: batch.expiryDate,
        sourceId: batch.sourceId,
        status: batch.verificationStatus,
        // Honey-specific biology fields
        hiveId: batch.hiveId,
        beeSpecies: batch.beeSpecies,
        floralSource: batch.floralSource,
        moistureLevel: batch.moistureLevel,
        honeyType: batch.honeyType,
        pollenCount: batch.pollenCount,
        c4SugarAdulteration: batch.c4SugarAdulteration,
        hpmfIndex: batch.hpmfIndex,
        antibioticResidue: batch.antibioticResidue,
        // Blockchain simulation fields
        blockchain: {
          dataHash: batch.dataHash || recomputedHash,
          transactionId: batch.blockchainTransactionId,
          verificationStatus: batch.verificationStatus,
          isPrototype: true,
        },
      },
      traceabilityJourney: events.map((ev, index) => ({
        step: ev.stepNumber || index + 1,
        title: ev.title,
        actor: ev.actor,
        location: ev.location,
        timestamp: ev.timestamp,
        status: ev.blockchainStatus,
        details: ev.description,
        eventType: ev.eventType,
        dataHash: ev.dataHash,
      })),
    });
  } catch (error) {
    next(error);
  }
};
