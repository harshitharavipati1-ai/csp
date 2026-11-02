import Feedback from '../models/Feedback.js';

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Public (or Private)
export const submitFeedback = async (req, res) => {
    try {
        const { name, email, userType, message, rating } = req.body;

        if (!name || !email || !userType || !message || !rating) {
            return res.status(400).json({ success: false, message: 'All feedback fields are required' });
        }

        const feedback = await Feedback.create({
            userId: req.user ? req.user._id : null,
            name,
            email,
            userType,
            message,
            rating: Number(rating),
        });

        res.status(201).json({ success: true, message: 'Feedback submitted successfully', data: feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all feedback (Admin)
// @route   GET /api/feedback
// @access  Private/Admin
export const getAllFeedback = async (req, res) => {
    try {
        const feedbackList = await Feedback.find({}).sort({ createdAt: -1 });
        res.json({ success: true, count: feedbackList.length, data: feedbackList });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
