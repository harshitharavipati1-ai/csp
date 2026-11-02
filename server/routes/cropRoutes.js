import express from 'express';
import {
    getCrops,
    getCropById,
    createCrop,
    updateCrop,
    deleteCrop,
} from '../controllers/cropController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCrops);
router.get('/:id', getCropById);

// Admin restricted
router.post('/', protect, adminOnly, createCrop);
router.put('/:id', protect, adminOnly, updateCrop);
router.delete('/:id', protect, adminOnly, deleteCrop);

export default router;
