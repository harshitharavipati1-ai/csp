import Crop from '../models/Crop.js';

// @desc    Suggest crop rotation sequence
// @route   POST /api/rotation/suggest
// @access  Public
export const suggestRotation = async (req, res) => {
    try {
        const { location, season, currentCrop, soilType, waterAvailability, previousCrop } = req.body;

        if (!currentCrop) {
            return res.status(400).json({ success: false, message: 'Current crop is required' });
        }

        // Fetch all crops from database
        const allCrops = await Crop.find({});

        // Find current crop entity
        const matchedCurrent = allCrops.find(
            (c) => c.name.toLowerCase() === currentCrop.trim().toLowerCase()
        );

        const suggestions = [];

        // 1. Direct match from suitableFollowingCrops in DB
        if (matchedCurrent && matchedCurrent.suitableFollowingCrops && matchedCurrent.suitableFollowingCrops.length > 0) {
            for (const folCropName of matchedCurrent.suitableFollowingCrops) {
                const cropObj = allCrops.find((c) => c.name.toLowerCase() === folCropName.toLowerCase());
                suggestions.push({
                    crop: folCropName,
                    category: cropObj ? cropObj.category : 'Recommended Crop',
                    waterRequirement: cropObj ? cropObj.waterRequirement : waterAvailability || 'Medium',
                    reason: `Directly recommended after ${matchedCurrent.name}. Helps replenish soil nutrients and optimize harvest potential.`,
                });
            }
        }

        // 2. Agronomical rules based on Crop Category
        const currentCat = matchedCurrent ? matchedCurrent.category : 'Cereal';

        if (currentCat === 'Cereal' || currentCat === 'Cash Crop') {
            // Suggest Legumes to restore Nitrogen
            const legumes = allCrops.filter((c) => c.category === 'Legume' || c.category === 'Pulse');
            legumes.forEach((leg) => {
                if (!suggestions.some((s) => s.crop.toLowerCase() === leg.name.toLowerCase())) {
                    suggestions.push({
                        crop: leg.name,
                        category: leg.category,
                        waterRequirement: leg.waterRequirement,
                        reason: `Leguminous crop that fixes atmospheric nitrogen in soil nodules after cereal heavy nutrient depletion.`,
                    });
                }
            });
        } else if (currentCat === 'Legume' || currentCat === 'Pulse') {
            // Suggest Cereal or Oilseed
            const cerealsAndOilseeds = allCrops.filter((c) => c.category === 'Cereal' || c.category === 'Oilseed');
            cerealsAndOilseeds.forEach((item) => {
                if (!suggestions.some((s) => s.crop.toLowerCase() === item.name.toLowerCase())) {
                    suggestions.push({
                        crop: item.name,
                        category: item.category,
                        waterRequirement: item.waterRequirement,
                        reason: `Capitalizes on residual nitrogen fixed by previous pulse crop for vigorous growth.`,
                    });
                }
            });
        }

        // 3. Fallback general suggestions if few found
        if (suggestions.length < 3) {
            const fallbackOptions = ['Green Gram', 'Black Gram', 'Chickpea', 'Sunflower', 'Maize', 'Mustard'];
            fallbackOptions.forEach((fName) => {
                if (
                    fName.toLowerCase() !== currentCrop.toLowerCase() &&
                    !suggestions.some((s) => s.crop.toLowerCase() === fName.toLowerCase())
                ) {
                    suggestions.push({
                        crop: fName,
                        category: 'Alternative Crop',
                        waterRequirement: 'Medium',
                        reason: 'Can be considered as a following crop depending on local field conditions and market demand.',
                    });
                }
            });
        }

        // Filter by water availability if specified
        let filteredSuggestions = suggestions;
        if (waterAvailability === 'Low') {
            // Prioritize Low or Medium water requirement crops
            filteredSuggestions = suggestions.sort((a, b) => {
                if (a.waterRequirement === 'Low') return -1;
                if (b.waterRequirement === 'Low') return 1;
                return 0;
            });
        }

        // Return top 4 unique suggestions
        const finalSuggestions = filteredSuggestions.slice(0, 4);

        res.json({
            success: true,
            query: {
                location: location || 'Not specified',
                season: season || 'Kharif',
                currentCrop,
                soilType: soilType || 'Loamy',
                waterAvailability: waterAvailability || 'Medium',
                previousCrop: previousCrop || 'None',
            },
            disclaimer:
                'These are educational suggestions. Actual crop selection should consider local soil, climate, water availability, market conditions, and advice from agricultural experts.',
            suggestions: finalSuggestions,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
