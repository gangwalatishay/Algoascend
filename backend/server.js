require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connectDB } = require('./config/db');
const otpRoutes = require('./routes/otpRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(otpRoutes);
app.use(authRoutes);
app.use(contactRoutes);
app.use(paymentRoutes);
app.use(courseRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

