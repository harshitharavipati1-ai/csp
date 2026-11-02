import RotationPlan from '../models/RotationPlan.js';

// @desc    Create / save a rotation plan
// @route   POST /api/plans
// @access  Private
export const createPlan = async (req, res) => {
    try {
        const { title, location, soilType, season, currentCrop, previousCrop, waterAvailability, crops, notes } = req.body;

        if (!location || !soilType || !season || !currentCrop || !crops || crops.length === 0) {
            return res.status(400).json({ success: false, message: 'Please provide all required plan fields' });
        }

        const plan = await RotationPlan.create({
            userId: req.user._id,
            title: title || `${season} Rotation Plan`,
            location,
            soilType,
            season,
            currentCrop,
            previousCrop: previousCrop || 'None',
            waterAvailability: waterAvailability || 'Medium',
            crops,
            notes: notes || '',
        });

        res.status(201).json({ success: true, data: plan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get plans for current logged in user (or all if admin)
// @route   GET /api/plans
// @access  Private
export const getPlans = async (req, res) => {
    try {
        let query = { userId: req.user._id };

        // If admin explicitly wants all plans
        if (req.user.role === 'admin' && req.query.all === 'true') {
            query = {};
        }

        const plans = await RotationPlan.find(query).populate('userId', 'name email').sort({ createdAt: -1 });
        res.json({ success: true, count: plans.length, data: plans });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single rotation plan by ID
// @route   GET /api/plans/:id
// @access  Private
export const getPlanById = async (req, res) => {
    try {
        const plan = await RotationPlan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Rotation plan not found' });
        }

        // Check ownership or admin
        if (plan.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to view this plan' });
        }

        res.json({ success: true, data: plan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update rotation plan
// @route   PUT /api/plans/:id
// @access  Private
export const updatePlan = async (req, res) => {
    try {
        const plan = await RotationPlan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Rotation plan not found' });
        }

        if (plan.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to update this plan' });
        }

        Object.assign(plan, req.body);
        const updatedPlan = await plan.save();

        res.json({ success: true, data: updatedPlan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete rotation plan
// @route   DELETE /api/plans/:id
// @access  Private
export const deletePlan = async (req, res) => {
    try {
        const plan = await RotationPlan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Rotation plan not found' });
        }

        if (plan.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this plan' });
        }

        await RotationPlan.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Rotation plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
