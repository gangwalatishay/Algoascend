const express = require('express');
const { body } = require('express-validator');
const { createContact } = require('../controllers/contactController');

const router = express.Router();

router.post(
  '/api/contact',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('topic').trim().notEmpty().withMessage('Topic is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  createContact
);

module.exports = router;

