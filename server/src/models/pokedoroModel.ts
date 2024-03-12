import mongoose from 'mongoose';
import 'dotenv/config.js';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(`MONGO_URI is not defined in .env file`);
}

const pokedoroConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: 'pokedoro',
    });
    console.log('Connected to pokedoro at MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

pokedoroConnect();
