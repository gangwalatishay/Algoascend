const nodemailer = require('nodemailer');

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  CONTACT_RECIPIENT_EMAIL,
} = process.env;

const isEmailEnabled =
  Boolean(SMTP_HOST) &&
  Boolean(SMTP_PORT) &&
  Boolean(SMTP_USER) &&
  Boolean(SMTP_PASS) &&
  Boolean(CONTACT_RECIPIENT_EMAIL);

let transporter = null;

if (isEmailEnabled) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_PORT === '465',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

module.exports = {
  transporter,
  isEmailEnabled,
  CONTACT_RECIPIENT_EMAIL,
};

