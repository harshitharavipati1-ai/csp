import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    if (uri && uri !== 'use-memory') {
      console.log('Attempting to connect to MongoDB URI...');
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log('🌱 Connected to MongoDB successfully.');
      return;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Could not connect to the configured MongoDB database: ${error.message}`);
    }
    console.warn('⚠️ Could not connect to primary MONGODB_URI. Falling back to MongoMemoryServer...');
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('MONGODB_URI must be configured in production. In-memory storage is only available for development.');
  }

  try {
    mongoMemoryServer = await MongoMemoryServer.create();
    const memoryUri = mongoMemoryServer.getUri();
    await mongoose.connect(memoryUri);
    console.log(`🚀 Connected to MongoMemoryServer (In-Memory Database) at ${memoryUri}`);
  } catch (err) {
    console.error('❌ Failed to start MongoMemoryServer:', err.message);
    process.exit(1);
  }
};
