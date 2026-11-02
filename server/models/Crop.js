import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Crop name is required'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['Cereal', 'Legume', 'Oilseed', 'Cash Crop', 'Vegetable', 'Fiber', 'Fodder', 'Pulse'],
        },
        season: {
            type: String,
            required: [true, 'Season is required'],
            enum: ['Kharif', 'Rabi', 'Zaid', 'All-Season'],
        },
        waterRequirement: {
            type: String,
            required: [true, 'Water requirement is required'],
            enum: ['High', 'Medium', 'Low'],
        },
        soilType: {
            type: String,
            required: [true, 'Soil type is required'],
        },
        description: {
            type: String,
            required: true,
        },
        nutrientCharacteristics: {
            type: String,
            required: true,
        },
        rotationBenefits: {
            type: String,
            required: true,
        },
        suitableFollowingCrops: [
            {
                type: String,
            },
        ],
        image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60',
        },
    },
    {
        timestamps: true,
    }
);

const Crop = mongoose.model('Crop', cropSchema);
export default Crop;
