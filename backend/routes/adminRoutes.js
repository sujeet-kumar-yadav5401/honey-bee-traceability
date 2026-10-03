import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { getAllUsers, updateUserRole, deleteUser, getSystemStats } from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, authorize('ADMIN'));

router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/stats', getSystemStats);

export default router;
