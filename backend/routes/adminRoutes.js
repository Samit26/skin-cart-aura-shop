const express = require("express");
const router = express.Router();
const {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/auth");
const { upload } = require("../config/cloudinary");

// Admin login (public)
router.post("/login", adminLogin);

// Admin token verification (public, but requires token)
const { verifyAdminToken } = require("../controllers/adminController");
router.get("/verify", verifyAdminToken);

// Protected admin routes
router.use(protect);
router.use(admin);

// Dashboard
router.get("/dashboard/stats", getDashboardStats);

// User management
router.get("/users", getAllUsers);

// Order management
router.get("/orders", getAllOrders);

// Product management
router.get("/products", getAllProducts);
router.post("/products", upload.array("images", 10), createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
