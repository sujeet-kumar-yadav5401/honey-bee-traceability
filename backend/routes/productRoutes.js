import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: verify by batch ID (must come BEFORE protect middleware)
import { verifyBatch } from '../controllers/verificationController.js';
router.get('/verify/:batchId', verifyBatch);

// All routes below require authentication
router.use(protect);

router
  .route('/')
  .get(getProducts)
  .post(authorize('ADMIN', 'BEEKEEPER', 'PRODUCER'), createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(authorize('ADMIN', 'BEEKEEPER', 'PRODUCER'), updateProduct)
  .delete(authorize('ADMIN'), deleteProduct);

export default router;
