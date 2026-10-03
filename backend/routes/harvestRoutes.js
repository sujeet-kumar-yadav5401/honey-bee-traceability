import express from 'express';
import {
  recordHarvest,
  getHarvests,
  getHarvestById,
} from '../controllers/harvestController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getHarvests).post(authorize('ADMIN', 'BEEKEEPER'), recordHarvest);
router.get('/:id', getHarvestById);

export default router;
