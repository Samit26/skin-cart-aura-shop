const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  getProductsByCategory,
  getRelatedProducts,
  searchProducts,
  getCategories,
  getSkinTypes,
  getFeaturedProducts,
} = require("../controllers/productController");
const { optionalAuth } = require("../middleware/auth");

// Public routes
router.get("/", optionalAuth, getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/categories", getCategories);
router.get("/skin-types", getSkinTypes);
router.get("/search", searchProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/related/:id", getRelatedProducts);
router.get("/:id", getProduct);

module.exports = router;
