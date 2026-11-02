import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { seedDatabase } from './utils/seed.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import rotationRoutes from './routes/rotationRoutes.js';
import planRoutes from './routes/planRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173', `http://localhost:${PORT}`, process.env.CLIENT_URL || '*'],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static crop images
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

// API Root Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'CropCycle API is running smoothly',
        timestamp: new Date(),
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/rotation', rotationRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// Serve client dist static files in production / unified server mode
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) {
            res.status(404).send('🌱 CropCycle API Server is running. Frontend build index.html not found.');
        }
    });
});

// Global Error Handler middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Start Server & Connect DB
const startServer = async () => {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
        console.log(`==================================================`);
        console.log(`🚀 CropCycle Application Server running on port ${PORT}`);
        console.log(`🌐 Application Link: http://localhost:${PORT}`);
        console.log(`==================================================`);
    });
};

startServer().catch((error) => {
    console.error('❌ Application startup failed:', error.message);
    process.exitCode = 1;
});
