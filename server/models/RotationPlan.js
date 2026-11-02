import mongoose from 'mongoose';

const rotationPlanSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            default: 'My Crop Rotation Plan',
        },
        location: {
            type: String,
            required: true,
        },
        soilType: {
            type: String,
            required: true,
        },
        season: {
            type: String,
            required: true,
        },
        currentCrop: {
            type: String,
            required: true,
        },
        previousCrop: {
            type: String,
            default: 'None / Fallow',
        },
        waterAvailability: {
            type: String,
            required: true,
        },
        crops: [
            {
                type: String,
            },
        ],
        notes: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const RotationPlan = mongoose.model('RotationPlan', rotationPlanSchema);
export default RotationPlan;
