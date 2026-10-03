import express from 'express';
import {
  createBatch,
  getBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
  addTraceabilityEvent,
} from '../controllers/batchController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getBatches)
  .post(authorize('ADMIN', 'BEEKEEPER', 'PRODUCER'), createBatch);

router
  .route('/:id')
  .get(getBatchById)
  .put(authorize('ADMIN', 'BEEKEEPER', 'PRODUCER'), updateBatch)
  .delete(authorize('ADMIN'), deleteBatch);

router.post('/:batchId/events', authorize('ADMIN', 'BEEKEEPER', 'PRODUCER'), addTraceabilityEvent);

export default router;
