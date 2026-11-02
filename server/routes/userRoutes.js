import express from 'express';
import { getAllUsers, deleteUser, updateUserRole } from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.put('/:id/role', updateUserRole);

export default router;
