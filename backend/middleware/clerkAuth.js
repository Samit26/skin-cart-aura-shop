const {
  clerkMiddleware,
  requireAuth,
  getAuth,
  clerkClient,
} = require("@clerk/express");

// Basic Clerk middleware for authentication
const clerkAuth = (req, res, next) => {
  // Apply Clerk middleware to the request
  clerkMiddleware()(req, res, () => {
    // Use requireAuth to ensure the user is authenticated
    requireAuth()(req, res, next);
  });
};

// Enhanced middleware that also syncs user data with MongoDB
const clerkAuthWithUser = (req, res, next) => {
  // Apply Clerk middleware first
  clerkMiddleware()(req, res, async () => {
    try {
      // Get auth information
      const auth = getAuth(req);
      const clerkUserId = auth.userId;

      if (!clerkUserId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      // Find or create user in MongoDB
      const User = require("../models/User");

      // Try to find user by clerkId first
      let user = await User.findOne({ clerkId: clerkUserId });

      if (!user) {
        // If user doesn't exist, create from Clerk data
        try {
          const clerkUser = await clerkClient.users.getUser(clerkUserId);
          user = await User.findOrCreateFromClerk(clerkUser);
        } catch (clerkError) {
          console.error("Error fetching user from Clerk:", clerkError);
          return res.status(401).json({
            success: false,
            message: "User verification failed",
          });
        }
      }

      // Add user info to request
      req.user = {
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      next();
    } catch (error) {
      console.error("MongoDB user sync error:", error);
      return res.status(500).json({
        success: false,
        message: "User sync failed",
        error: error.message,
      });
    }
  });
};

// Middleware to check if user is admin
const clerkAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }
};

module.exports = { clerkAuth, clerkAuthWithUser, clerkAdmin };
