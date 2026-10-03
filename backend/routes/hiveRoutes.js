import express from 'express';
import {
  createHive,
  getHives,
  getHiveById,
  updateHive,
  deleteHive,
  addHiveInspection,
  getHiveInspections,
} from '../controllers/hiveController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getHives).post(authorize('ADMIN', 'BEEKEEPER'), createHive);
router
  .route('/:id')
  .get(getHiveById)
  .put(authorize('ADMIN', 'BEEKEEPER'), updateHive)
  .delete(authorize('ADMIN'), deleteHive);

router.post('/:id/inspections', authorize('ADMIN', 'BEEKEEPER'), addHiveInspection);
router.get('/:id/inspections', getHiveInspections);

export default router;
