const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  hashPassword,
  comparePassword,
  generateToken,
} = require('../controllers/authController');

const router = express.Router();

// New auth endpoints
router.post('/api/auth/signup', signup);
router.post('/api/auth/login', login);
router.post('/api/auth/forgot-password', forgotPassword);
router.post('/api/auth/reset-password', resetPassword);

// Legacy endpoints (keep for compatibility)
router.post('/api/auth/hash-password', hashPassword);
router.post('/api/auth/compare-password', comparePassword);
router.post('/api/auth/generate-token', generateToken);

module.exports = router;

