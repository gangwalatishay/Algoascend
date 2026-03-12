const { validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const { isMongoEnabled } = require('../config/db');
const {
  transporter,
  isEmailEnabled,
  CONTACT_RECIPIENT_EMAIL,
} = require('../config/email');

async function createContact(req, res) {
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

    console.log(`Contact message saved in DB: ${doc._id}`);

    if (isEmailEnabled && transporter) {
      const subject = `[Contact Form] New request from ${firstName} ${lastName}`;
      const html = `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
        <hr />
        <p><small>This message was sent from the AlgoAscend contact form.</small></p>
      `;

      try {
        await transporter.sendMail({
          from: `"AlgoAscend Contact" <${CONTACT_RECIPIENT_EMAIL}>`,
          to: CONTACT_RECIPIENT_EMAIL,
          replyTo: email,
          subject,
          html,
        });
        console.log(`Email notification sent to ${CONTACT_RECIPIENT_EMAIL}`);
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // We still return success because the message was saved in DB
      }
    }

    res.status(201).json({ success: true, id: doc._id });
  } catch (error) {
    console.error('Contact save error:', error);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
}

module.exports = { createContact };
