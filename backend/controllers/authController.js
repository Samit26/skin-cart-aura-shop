const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Store OTPs temporarily (in production, use Redis or similar)
const otpStore = new Map();

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Send OTP to mobile number
// @route   POST /api/auth/send-otp
// @access  Public
const sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP with expiration (5 minutes)
    otpStore.set(phoneNumber, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // In production, send OTP via SMS service (Twilio, AWS SNS, etc.)
    console.log(`OTP for ${phoneNumber}: ${otp}`);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      // In development, return OTP for testing
      ...(process.env.NODE_ENV === "development" && { otp }),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending OTP",
      error: error.message,
    });
  }
};

// @desc    Verify OTP and login/register user
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone number and OTP are required",
      });
    }

    // Check if OTP exists and is valid
    const storedOTPData = otpStore.get(phoneNumber);

    if (!storedOTPData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    if (storedOTPData.expiresAt < Date.now()) {
      otpStore.delete(phoneNumber);
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (storedOTPData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP is valid, remove it from store
    otpStore.delete(phoneNumber);

    // Check if user exists
    let user = await User.findOne({ phone: phoneNumber });

    if (!user) {
      // Create new user
      user = new User({
        phone: phoneNumber,
        name: `User ${phoneNumber.slice(-4)}`, // Default name
        isVerified: true,
        registrationMethod: "mobile",
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        phone: user.phone,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isVerified: user.isVerified,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying OTP",
      error: error.message,
    });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
};
