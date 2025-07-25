const express = require("express");
const router = express.Router();
const {
  syncUserFromClerk,
  syncCurrentUser,
  updateUserProfile,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
} = require("../controllers/userSyncController");
const { clerkAuthWithUser } = require("../middleware/clerkAuth");

// Test route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "User sync API is working",
  });
});

// Webhook route (public but should be secured with Clerk webhook secret)
router.post("/webhooks/clerk", syncUserFromClerk);

// Protected routes - use Clerk authentication
router.use(clerkAuthWithUser);

// User sync and profile management
router.post("/sync-clerk", syncCurrentUser);
router.put("/profile", updateUserProfile);

// Address management
router.post("/addresses", addUserAddress);
router.put("/addresses/:addressId", updateUserAddress);
router.delete("/addresses/:addressId", deleteUserAddress);

module.exports = router;
