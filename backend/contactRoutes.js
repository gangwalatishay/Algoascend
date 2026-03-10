const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  topic: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactMessage =
  mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactSchema);

function registerContactRoutes(app, isMongoEnabled) {
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
    async (req, res) => {
      if (!isMongoEnabled) {
        return res.status(500).json({ error: 'Database not configured' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstName, lastName, email, phone, topic, message } = req.body;

      try {
        const doc = await ContactMessage.create({
          firstName,
          lastName,
          email,
          phone,
          topic,
          message,
        });

        res.status(201).json({ success: true, id: doc._id });
      } catch (error) {
        console.error('Contact save error:', error);
        res.status(500).json({ error: 'Failed to save contact message' });
      }
    }
  );

  app.use(router);
}

module.exports = registerContactRoutes;

