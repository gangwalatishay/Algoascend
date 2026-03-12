const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    order_id: { type: String, required: true, unique: true },
    payment_id: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['created', 'paid', 'failed'],
      default: 'created',
    },
    receipt: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
