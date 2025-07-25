const express = require("express");
const {
  getBrands,
  getModelsByBrand,
} = require("../controllers/deviceController");

const router = express.Router();

// @route   GET /api/devices/brands
// @desc    Get all available device brands
// @access  Public
router.get("/brands", getBrands);

// @route   GET /api/devices/models/:brandName
// @desc    Get models for a specific brand
// @access  Public
router.get("/models/:brandName", getModelsByBrand);

module.exports = router;
