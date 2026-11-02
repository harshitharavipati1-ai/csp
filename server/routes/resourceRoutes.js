import express from 'express';
import {
    getResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
} from '../controllers/resourceController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getResources);
router.get('/:id', getResourceById);

// Admin routes
router.post('/', protect, adminOnly, createResource);
router.put('/:id', protect, adminOnly, updateResource);
router.delete('/:id', protect, adminOnly, deleteResource);

export default router;
