import Crop from '../models/Crop.js';

// @desc    Get all crops with optional search & filter
// @route   GET /api/crops
// @access  Public
export const getCrops = async (req, res) => {
    try {
        const { category, season, waterRequirement, search } = req.query;
        const filter = {};

        if (category) {
            filter.category = category;
        }
        if (season) {
            filter.season = season;
        }
        if (waterRequirement) {
            filter.waterRequirement = waterRequirement;
        }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { soilType: { $regex: search, $options: 'i' } },
            ];
        }

        const crops = await Crop.find(filter).sort({ name: 1 });
        res.json({ success: true, count: crops.length, data: crops });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single crop by ID
// @route   GET /api/crops/:id
// @access  Public
export const getCropById = async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop) {
            return res.status(404).json({ success: false, message: 'Crop not found' });
        }
        res.json({ success: true, data: crop });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a new crop
// @route   POST /api/crops
// @access  Private/Admin
export const createCrop = async (req, res) => {
    try {
        const crop = new Crop(req.body);
        const createdCrop = await crop.save();
        res.status(201).json({ success: true, data: createdCrop });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update a crop
// @route   PUT /api/crops/:id
// @access  Private/Admin
export const updateCrop = async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop) {
            return res.status(404).json({ success: false, message: 'Crop not found' });
        }

        Object.assign(crop, req.body);
        const updatedCrop = await crop.save();
        res.json({ success: true, data: updatedCrop });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a crop
// @route   DELETE /api/crops/:id
// @access  Private/Admin
export const deleteCrop = async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop) {
            return res.status(404).json({ success: false, message: 'Crop not found' });
        }

        await Crop.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Crop deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
