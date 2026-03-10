const mongoose = require('mongoose');

const PurchasedCourseSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    status: { type: String, enum: ['unlocked'], default: 'unlocked' },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PurchasedCourse', PurchasedCourseSchema);
