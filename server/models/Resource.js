import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                'Crop Rotation Basics',
                'Soil Health',
                'Nutrient Management',
                'Pest Management',
                'Sustainable Agriculture',
                'Crop Diversity',
            ],
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=60',
        },
        readTime: {
            type: String,
            default: '5 min read',
        },
    },
    {
        timestamps: true,
    }
);

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;
