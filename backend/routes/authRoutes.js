const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
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

// Google OAuth routes
router.get('/api/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

router.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT token for the authenticated user
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, role: req.user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }))}`);
  }
);

// Apple OAuth routes
router.get('/api/auth/apple',
  passport.authenticate('apple', { scope: ['name', 'email'] })
);

router.post('/api/auth/apple/callback',
  passport.authenticate('apple', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT token for the authenticated user
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, role: req.user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }))}`);
  }
);

// Legacy endpoints (keep for compatibility)
router.post('/api/auth/hash-password', hashPassword);
router.post('/api/auth/compare-password', comparePassword);
router.post('/api/auth/generate-token', generateToken);

module.exports = router;

