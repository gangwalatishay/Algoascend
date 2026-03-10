const express = require('express');
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require('../controllers/authController');

const router = express.Router();

router.post('/api/auth/hash-password', hashPassword);
router.post('/api/auth/compare-password', comparePassword);
router.post('/api/auth/generate-token', generateToken);

module.exports = router;

