require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    const users = await User.find({}, 'email mobile name').limit(10);
    console.log('Recent users:', JSON.stringify(users, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

check();
