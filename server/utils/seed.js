import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Crop from '../models/Crop.js';
import QuizQuestion from '../models/QuizQuestion.js';
import Resource from '../models/Resource.js';
import RotationPlan from '../models/RotationPlan.js';
import QuizResult from '../models/QuizResult.js';

import { sampleCrops, sampleQuizQuestions, sampleResources } from './seedData.js';

dotenv.config();

export const seedDatabase = async () => {
    try {
        console.log('🌱 Checking & seeding initial database records...');

        // Create privileged/demo accounts only when explicitly configured.
        if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
            const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
            if (!adminExists) {
                await User.create({
                    name: 'Admin Supervisor',
                    email: process.env.ADMIN_EMAIL,
                    password: process.env.ADMIN_PASSWORD,
                    role: 'admin',
                    userType: 'Teacher',
                });
                console.log(`✅ Admin account created: ${process.env.ADMIN_EMAIL}`);
            }
        } else {
            console.log('ℹ️ Admin account creation skipped; set ADMIN_EMAIL and ADMIN_PASSWORD to enable it.');
        }

        let demoFarmer = null;
        if (process.env.SEED_DEMO_DATA === 'true' && process.env.DEMO_FARMER_PASSWORD) {
            const farmerEmail = process.env.DEMO_FARMER_EMAIL || 'farmer@cropcycle.org';
            demoFarmer = await User.findOne({ email: farmerEmail });
            if (!demoFarmer) {
                demoFarmer = await User.create({
                    name: 'Demo Farmer',
                    email: farmerEmail,
                    password: process.env.DEMO_FARMER_PASSWORD,
                    role: 'user',
                    userType: 'Farmer',
                });
                console.log(`✅ Demo farmer account created: ${farmerEmail}`);
            }
        }

        // Seed reference crops only for a new/empty database; never erase user edits on restart.
        const cropCount = await Crop.countDocuments();
        if (cropCount === 0) {
            await Crop.insertMany(sampleCrops);
            console.log(`✅ Seeded ${sampleCrops.length} crops into the database.`);
        }

        // 4. Seed Quiz Questions
        const quizCount = await QuizQuestion.countDocuments();
        if (quizCount === 0) {
            await QuizQuestion.insertMany(sampleQuizQuestions);
            console.log(`✅ Seeded ${sampleQuizQuestions.length} quiz questions into database.`);
        }

        // 5. Seed Resources
        const resourceCount = await Resource.countDocuments();
        if (resourceCount === 0) {
            await Resource.insertMany(sampleResources);
            console.log(`✅ Seeded ${sampleResources.length} educational resources into database.`);
        }

        // 6. Seed sample records only when demo data has been explicitly enabled.
        const planCount = await RotationPlan.countDocuments();
        if (process.env.SEED_DEMO_DATA === 'true' && planCount === 0 && demoFarmer) {
            await RotationPlan.create({
                userId: demoFarmer._id,
                title: 'Kharif-Rabi Sustainable Plan',
                location: 'Andhra Pradesh',
                soilType: 'Loamy',
                season: 'Kharif',
                currentCrop: 'Rice',
                previousCrop: 'Fallow',
                waterAvailability: 'High',
                crops: ['Rice', 'Green Gram', 'Maize'],
                notes: 'Targeting soil nitrogen recovery after rice harvest using short-duration green gram.',
            });
            console.log(`✅ Seeded sample rotation plan for demo farmer.`);
        }

        // 7. Seed Sample Quiz Result for Leaderboard Demo
        const resultCount = await QuizResult.countDocuments();
        if (process.env.SEED_DEMO_DATA === 'true' && resultCount === 0 && demoFarmer) {
            await QuizResult.create({
                userId: demoFarmer._id,
                score: 5,
                totalQuestions: 6,
                percentage: 83,
            });
            console.log(`✅ Seeded sample quiz leaderboard entry.`);
        }

        console.log('🌾 Database Seeding Completed Successfully!');
    } catch (error) {
        console.error('❌ Error Seeding Database:', error.message);
        throw error;
    }
};

// Allow running seed script standalone if executed via CLI
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
    (async () => {
        try {
            await connectDB();
            await seedDatabase();
        } catch (error) {
            console.error('❌ Database seeding failed.');
            process.exitCode = 1;
        } finally {
            await mongoose.disconnect();
        }
    })();
}
