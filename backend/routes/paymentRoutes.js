const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');

const router = express.Router();

router.post('/api/payment/create-order', createOrder);
router.post('/api/payment/verify', verifyPayment);

module.exports = router;
