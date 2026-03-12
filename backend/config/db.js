const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
const isMongoEnabled = Boolean(MONGO_URI);

async function connectDB() {
  if (!isMongoEnabled) {
    console.warn('MONGO_URI is not set. Contact form storage is disabled.');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

module.exports = { connectDB, isMongoEnabled };

