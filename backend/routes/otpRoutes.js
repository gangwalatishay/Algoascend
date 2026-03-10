const express = require('express');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { sendOtp, verifyOtp } = require('../controllers/otpController');

const router = express.Router();

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error:
      'Too many OTP requests from this IP, please try again after 15 minutes',
  },
});

router.post(
  '/api/otp/send',
  otpLimiter,
  body('mobile')
    .matches(/^\+\d{10,15}$/)
    .withMessage(
      'Invalid phone number format. Must include country code (e.g., +91XXXXXXXXXX)'
    ),
  sendOtp
);

router.post(
  '/api/otp/verify',
  body('mobile')
    .matches(/^\+\d{10,15}$/)
    .withMessage('Invalid phone number format'),
  body('otp')
    .isLength({ min: 4, max: 10 })
    .withMessage('Invalid OTP format'),
  verifyOtp
);

module.exports = router;

