const crypto = require('crypto');
const { getRazorpay } = require('../config/razorpay');
const Payment = require('../models/Payment');
const PurchasedCourse = require('../models/PurchasedCourse');

async function createOrder(req, res) {
  try {
    console.log('Order creation request body:', req.body);
    const { courseId, amount, userId } = req.body;

    if (!courseId || !amount || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const razorpay = getRazorpay();

    const options = {
      amount: amount, // amount in the smallest currency unit (paise for INR)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save initial payment record
    const payment = await Payment.create({
      userId,
      courseId,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: 'created',
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
      paymentRecordId: payment._id,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
}

async function verifyPayment(req, res) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      userId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment details' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // Verify signature using HMAC SHA256
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Signature is valid
      const payment = await Payment.findOneAndUpdate(
        { order_id: razorpay_order_id },
        {
          payment_id: razorpay_payment_id,
          status: 'paid',
        },
        { new: true }
      );

      if (!payment) {
        return res.status(404).json({ error: 'Payment record not found' });
      }

      // Unlock course for user
      await PurchasedCourse.create({
        userId,
        courseId,
        paymentId: payment._id,
      });

      res.json({ success: true, message: 'Payment verified and course unlocked' });
    } else {
      // Signature is invalid
      await Payment.findOneAndUpdate(
        { order_id: razorpay_order_id },
        { status: 'failed' }
      );
      res.status(400).json({ success: false, error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}

module.exports = { createOrder, verifyPayment };
