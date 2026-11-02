import express from 'express';
import {
    getQuizQuestions,
    submitQuiz,
    getLeaderboard,
    createQuestion,
    updateQuestion,
    deleteQuestion,
} from '../controllers/quizController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/questions', getQuizQuestions);
router.post('/submit', protect, submitQuiz);
router.get('/leaderboard', getLeaderboard);

// Admin routes
router.post('/questions', protect, adminOnly, createQuestion);
router.put('/questions/:id', protect, adminOnly, updateQuestion);
router.delete('/questions/:id', protect, adminOnly, deleteQuestion);

export default router;
