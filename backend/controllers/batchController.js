import ProductBatch from '../models/ProductBatch.js';
import TraceabilityEvent from '../models/TraceabilityEvent.js';
import { generateBatchHash, generateSimulatedTransactionId } from '../services/hashService.js';
import { generateBatchQR } from '../services/qrService.js';

// @desc  Create a product batch
// @route POST /api/batches
// @access Private
export const createBatch = async (req, res, next) => {
  try {
    const {
      batchId,
      productName,
      productCategory,
      quantity,
      unit,
      location,
      harvestDate,
      qualityGrade,
      hiveId,
      beeSpecies,
      floralSource,
      moistureLevel,
      honeyType,
    } = req.body;

    const exists = await ProductBatch.findOne({ batchId: batchId?.toUpperCase() });
    if (exists) {
      res.status(400);
      throw new Error('Batch ID already exists.');
    }

    const batchData = {
      batchId: batchId?.toUpperCase(),
      productName,
      productCategory: productCategory?.toUpperCase() || 'HONEY',
      producerId: req.user._id,
      producerName: req.user.name || 'AgriTrace Producer',
      quantity,
      unit: unit || 'KG',
      location,
      harvestDate,
      qualityGrade,
      hiveId,
      beeSpecies,
      floralSource,
      moistureLevel,
      honeyType,
    };

    // Generate SHA-256 hash before saving
    batchData.dataHash = generateBatchHash(batchData);
    batchData.blockchainTransactionId = generateSimulatedTransactionId();

    // Generate QR code for this batch
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const qrResult = await generateBatchQR(batchData.batchId, baseUrl);
    batchData.qrCode = qrResult.svg;

    const batch = await ProductBatch.create(batchData);

    // Auto-create initial BLOCKCHAIN_REGISTERED traceability event
    await TraceabilityEvent.create({
      eventId: `EVT-${batchData.batchId}-REGISTERED`,
      batchId: batchData.batchId,
      eventType: 'BLOCKCHAIN_REGISTERED',
      title: 'Batch Registered on AgriTrace Ledger',
      description: `Batch ${batchData.batchId} registered and cryptographic hash anchored.`,
      location: location || 'AgriTrace Registry',
      actor: req.user.name || 'System',
      dataHash: batchData.dataHash,
      blockchainStatus: 'Confirmed',
      stepNumber: 99,
    });

    res.status(201).json({ success: true, batch });
  } catch (error) {
    next(error);
  }
};

// @desc  Get all batches
// @route GET /api/batches
// @access Private
export const getBatches = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.role !== 'ADMIN') {
      filter.producerId = req.user._id;
    }
    const batches = await ProductBatch.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: batches.length, batches });
  } catch (error) {
    next(error);
  }
};

// @desc  Get batch by id or batchId string
// @route GET /api/batches/:id
// @access Private
export const getBatchById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const batch =
      id.length === 24
        ? await ProductBatch.findById(id)
        : await ProductBatch.findOne({ batchId: id.toUpperCase() });

    if (!batch) {
      res.status(404);
      throw new Error('Batch not found.');
    }

    const events = await TraceabilityEvent.find({ batchId: batch.batchId }).sort({
      stepNumber: 1,
    });

    res.json({ success: true, batch, events });
  } catch (error) {
    next(error);
  }
};

// @desc  Update batch
// @route PUT /api/batches/:id
// @access Private
export const updateBatch = async (req, res, next) => {
  try {
    const batch = await ProductBatch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!batch) {
      res.status(404);
      throw new Error('Batch not found.');
    }
    res.json({ success: true, batch });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete batch
// @route DELETE /api/batches/:id
// @access Private (Admin)
export const deleteBatch = async (req, res, next) => {
  try {
    const batch = await ProductBatch.findByIdAndDelete(req.params.id);
    if (!batch) {
      res.status(404);
      throw new Error('Batch not found.');
    }
    res.json({ success: true, message: 'Batch deleted.' });
  } catch (error) {
    next(error);
  }
};

// @desc  Add a traceability event to a batch
// @route POST /api/batches/:batchId/events
// @access Private
export const addTraceabilityEvent = async (req, res, next) => {
  try {
    const { batchId } = req.params;
    const { eventType, title, description, location, stepNumber } = req.body;

    const batch = await ProductBatch.findOne({ batchId: batchId.toUpperCase() });
    if (!batch) {
      res.status(404);
      throw new Error('Batch not found.');
    }

    const eventId = `EVT-${batchId.toUpperCase()}-${Date.now()}`;
    const { generateEventHash } = await import('../services/hashService.js');

    const event = await TraceabilityEvent.create({
      eventId,
      batchId: batchId.toUpperCase(),
      eventType,
      title,
      description,
      location,
      actor: req.user.name || 'AgriTrace System',
      dataHash: generateEventHash({ eventId, batchId, eventType, title, location }),
      blockchainStatus: 'Confirmed',
      stepNumber: stepNumber || 1,
    });

    res.status(201).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};
