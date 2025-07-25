// Test script to demonstrate Clerk + MongoDB integration
// This is for demonstration purposes only

const express = require("express");
const { clerkAuth } = require("./middleware/clerkAuth");

// Example usage of the Clerk authentication middleware
const router = express.Router();

// Protected route example
router.get("/protected", clerkAuth, (req, res) => {
  res.json({
    success: true,
    message: "Access granted to protected route",
    user: {
      id: req.user.id,
      clerkId: req.user.clerkId,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
    },
  });
});

// Admin-only route example
router.get("/admin-only", clerkAuth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  res.json({
    success: true,
    message: "Admin access granted",
    user: req.user,
  });
});

module.exports = router;

// Usage instructions:
console.log(`
🎉 Clerk + MongoDB Integration Complete!

📚 How to use this system:

1. FRONTEND (React/Next.js):
   ===========================
   Import the useUserProfile hook:
   
   import { useUserProfile } from '@/hooks/useUserProfile';
   
   const MyComponent = () => {
     const { 
       profile, 
       loading, 
       updateProfile, 
       addAddress, 
       updateAddress, 
       deleteAddress,
       syncWithBackend 
     } = useUserProfile();
     
     // Access user data
     console.log(profile.name, profile.email);
     console.log(profile.addresses);
     
     // Update user profile
     const handleUpdateProfile = async () => {
       await updateProfile({ name: 'New Name' });
     };
     
     // Add new address
     const handleAddAddress = async () => {
       await addAddress({
         fullName: 'John Doe',
         phone: '9876543210',
         addressLine1: '123 Main St',
         city: 'Mumbai',
         state: 'Maharashtra',
         pincode: '400001',
         country: 'India',
         addressType: 'home'
       });
     };
   };

2. BACKEND API ENDPOINTS:
   ======================
   GET    /api/user-sync/profile         - Get user profile
   PUT    /api/user-sync/profile         - Update user profile
   POST   /api/user-sync/addresses       - Add new address
   PUT    /api/user-sync/addresses/:id   - Update address
   DELETE /api/user-sync/addresses/:id   - Delete address
   POST   /api/user-sync/sync            - Sync user from Clerk

3. AUTHENTICATION:
   ================
   All requests must include Authorization header:
   Authorization: Bearer <clerk_session_token>
   
   The clerkAuth middleware will:
   - Verify the Clerk token
   - Find/create user in MongoDB
   - Add user info to req.user

4. DATA FLOW:
   ===========
   Clerk (Auth) → Middleware → MongoDB (Data) → API Response
   
   - Clerk handles authentication & user sessions
   - MongoDB stores user profile, addresses, cart, wishlist
   - Middleware syncs data between Clerk and MongoDB
   - Frontend gets unified user experience

5. BENEFITS:
   ==========
   ✅ Clerk handles complex auth flows (social login, MFA, etc.)
   ✅ MongoDB stores rich user data (addresses, preferences, etc.)
   ✅ Admin panel can access all user data
   ✅ Automatic user sync between systems
   ✅ Secure token-based API access
   ✅ Scalable architecture
`);
