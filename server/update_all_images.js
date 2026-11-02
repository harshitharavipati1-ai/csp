import connectDB from './config/db.js';
import Crop from './models/Crop.js';
import { sampleCrops } from './utils/seedData.js';

const syncImages = async () => {
    try {
        await connectDB();
        for (const crop of sampleCrops) {
            await Crop.updateOne({ name: crop.name }, { $set: { image: crop.image } });
            console.log(`Updated ${crop.name} image -> ${crop.image}`);
        }
        console.log('All crop images updated successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error updating images:', err);
        process.exit(1);
    }
};

syncImages();
