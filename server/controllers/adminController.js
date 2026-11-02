import User from '../models/User.js';
import Crop from '../models/Crop.js';
import RotationPlan from '../models/RotationPlan.js';
import QuizResult from '../models/QuizResult.js';
import Feedback from '../models/Feedback.js';

// @desc    Get dashboard statistics for admin
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCrops = await Crop.countDocuments();
        const totalPlans = await RotationPlan.countDocuments();
        const totalQuizAttempts = await QuizResult.countDocuments();
        const totalFeedback = await Feedback.countDocuments();

        res.json({
            success: true,
            data: {
                totalUsers,
                totalCrops,
                totalPlans,
                totalQuizAttempts,
                totalFeedback,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
