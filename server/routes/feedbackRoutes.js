import express from 'express';
import { submitFeedback, getAllFeedback } from '../controllers/feedbackController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Allow submitting feedback publicly or authenticated
router.post('/', submitFeedback);

// Admin view feedback
router.get('/', protect, adminOnly, getAllFeedback);

export default router;
