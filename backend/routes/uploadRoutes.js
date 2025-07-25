const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { protect, admin } = require("../middleware/auth");

// @desc    Upload product images
// @route   POST /api/upload/products
// @access  Private (Admin only)
router.post(
  "/products",
  protect,
  admin,
  upload.array("images", 5),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded",
        });
      }

      const uploadedImages = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
        alt: req.body.alt || "",
      }));

      res.status(200).json({
        success: true,
        message: "Images uploaded successfully",
        data: uploadedImages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error uploading images",
        error: error.message,
      });
    }
  }
);

// @desc    Upload single image
// @route   POST /api/upload/single
// @access  Private (Admin only)
router.post(
  "/single",
  protect,
  admin,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: {
          url: req.file.path,
          public_id: req.file.filename,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error uploading image",
        error: error.message,
      });
    }
  }
);

module.exports = router;
