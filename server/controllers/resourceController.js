import Resource from '../models/Resource.js';

// @desc    Get all educational resources
// @route   GET /api/resources
// @access  Public
export const getResources = async (req, res) => {
    try {
        const { category, search } = req.query;
        const filter = {};

        if (category) {
            filter.category = category;
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ];
        }

        const resources = await Resource.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: resources.length, data: resources });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single educational resource by ID
// @route   GET /api/resources/:id
// @access  Public
export const getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }
        res.json({ success: true, data: resource });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new educational resource (Admin)
// @route   POST /api/resources
// @access  Private/Admin
export const createResource = async (req, res) => {
    try {
        const resource = new Resource(req.body);
        const createdResource = await resource.save();
        res.status(201).json({ success: true, data: createdResource });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update resource (Admin)
// @route   PUT /api/resources/:id
// @access  Private/Admin
export const updateResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }

        Object.assign(resource, req.body);
        const updated = await resource.save();
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete resource (Admin)
// @route   DELETE /api/resources/:id
// @access  Private/Admin
export const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }

        await Resource.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
