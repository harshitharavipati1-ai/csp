import connectDB from './config/db.js';
import Crop from './models/Crop.js';

const updateImage = async () => {
    try {
        await connectDB();
        const res = await Crop.updateOne(
            { name: 'Green Gram' },
            { $set: { image: '/images/green_gram.png' } }
        );
        console.log('Green Gram image updated successfully in database:', res);
        process.exit(0);
    } catch (err) {
        console.error('Error updating image:', err);
        process.exit(1);
    }
};

updateImage();
