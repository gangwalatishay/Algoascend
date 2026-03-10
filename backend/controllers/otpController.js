const { validationResult } = require('express-validator');
const { twilioClient, VERIFY_SERVICE_SID } = require('../config/twilio');

async function sendOtp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { mobile } = req.body;

  try {
    const verification = await twilioClient.verify.v2
      .services(VERIFY_SERVICE_SID)
      .verifications.create({ to: mobile, channel: 'sms' });

    res.json({ message: 'OTP sent successfully', status: verification.status });
  } catch (error) {
    console.error('Twilio Send OTP Error:', error);
    let errorMessage = 'Failed to send OTP. Please try again.';

    if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      errorMessage =
        'Network Error: Could not reach Twilio. Please check your internet connection or DNS settings.';
    } else if (error.status === 401) {
      errorMessage = 'Twilio Auth Error: Invalid Account SID or Auth Token.';
    } else if (error.status === 404) {
      errorMessage = 'Twilio Config Error: Invalid Verify Service SID.';
    } else if (error.code === 21608) {
      errorMessage =
        'Twilio Trial Restriction: This number is not verified in your Twilio account. Please add it to "Verified Caller IDs" in Twilio Console or upgrade your account to send to any number.';
    }

    res.status(500).json({ error: errorMessage });
  }
}

async function verifyOtp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { mobile, otp } = req.body;

  try {
    const verificationCheck = await twilioClient.verify.v2
      .services(VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: mobile, code: otp });

    if (verificationCheck.status === 'approved') {
      res.json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }
  } catch (error) {
    console.error('Twilio Verify OTP Error:', error);
    let errorMessage = 'Verification failed. Please try again.';

    if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      errorMessage =
        'Network Error: Could not reach Twilio. Please check your internet connection.';
    }

    res.status(500).json({ error: errorMessage });
  }
}

module.exports = { sendOtp, verifyOtp };

