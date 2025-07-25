const express = require("express");
const {
  initiatePayment,
  checkPaymentStatus,
  handlePaymentCallback,
  getPaymentMethods,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Get available payment methods
router.get("/methods", getPaymentMethods);

// Initiate payment (protected)
router.post("/initiate", protect, initiatePayment);

// Check payment status (protected)
router.get("/status/:transactionId", protect, checkPaymentStatus);

// Payment callback from PhonePe (public - webhook)
router.post("/callback", handlePaymentCallback);

module.exports = router;
