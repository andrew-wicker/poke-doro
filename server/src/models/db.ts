import mongoose from 'mongoose';
import 'dotenv/config.js';

const MONGO_URI: string = process.env.MONGO_URI || '';

export const connectDB = async () => {
  if (!MONGO_URI) {
    throw new Error(`MONGO_URI is not defined in .env file`);
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: 'pokedoro',
    });
    console.log('Connected to pokedoro at MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};
