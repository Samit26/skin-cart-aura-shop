const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  trackOrder,
  cancelOrder,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/auth");

// User routes
router.use(protect);
router.post("/create", createOrder);
router.get("/my-orders", getUserOrders);
router.get("/:id", getOrder);
router.get("/track/:orderId", trackOrder);
router.put("/:id/cancel", cancelOrder);

// Admin routes
router.put("/:id/status", admin, updateOrderStatus);

module.exports = router;
