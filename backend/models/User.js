const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // Clerk Integration
    clerkId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values to be non-unique
      index: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: function () {
        // Password is only required if clerkId is not present
        return !this.clerkId;
      },
      minLength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // Enhanced address schema
    addresses: [
      {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, default: "India" },
        isDefault: { type: Boolean, default: false },
        addressType: {
          type: String,
          enum: ["home", "office", "other"],
          default: "home",
        },
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    // User preferences and settings
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: true },
        orderUpdates: { type: Boolean, default: true },
        promotions: { type: Boolean, default: false },
      },
      language: { type: String, default: "en" },
      currency: { type: String, default: "INR" },
    },
    // Clerk-specific fields
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      url: String,
      public_id: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving (only if password exists)
userSchema.pre("save", async function (next) {
  // Skip password hashing for Clerk users
  if (this.clerkId || !this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method (only for non-Clerk users)
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (this.clerkId) {
    throw new Error("Password comparison not available for Clerk users");
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to find or create user from Clerk data
userSchema.statics.findOrCreateFromClerk = async function (clerkUser) {
  try {
    // First try to find by clerkId
    let user = await this.findOne({ clerkId: clerkUser.id });

    if (!user) {
      // Try to find by email and link to Clerk
      user = await this.findOne({
        email: clerkUser.emailAddresses[0]?.emailAddress,
      });

      if (user) {
        // Link existing user to Clerk
        user.clerkId = clerkUser.id;
        user.emailVerified =
          clerkUser.emailAddresses[0]?.verification?.status === "verified";
        if (clerkUser.phoneNumbers?.[0]) {
          user.phone = clerkUser.phoneNumbers[0].phoneNumber;
          user.phoneVerified =
            clerkUser.phoneNumbers[0].verification?.status === "verified";
        }
        await user.save();
      } else {
        // Create new user from Clerk data
        user = await this.create({
          clerkId: clerkUser.id,
          name:
            clerkUser.fullName ||
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          email: clerkUser.emailAddresses[0]?.emailAddress,
          phone: clerkUser.phoneNumbers?.[0]?.phoneNumber,
          emailVerified:
            clerkUser.emailAddresses[0]?.verification?.status === "verified",
          phoneVerified:
            clerkUser.phoneNumbers?.[0]?.verification?.status === "verified",
          avatar: {
            url: clerkUser.imageUrl,
          },
          role: clerkUser.publicMetadata?.role || "user",
        });
      }
    }

    return user;
  } catch (error) {
    throw new Error(`Error finding/creating user from Clerk: ${error.message}`);
  }
};

// Generate email verification token
userSchema.methods.getEmailVerificationToken = function () {
  const crypto = require("crypto");
  const verificationToken = crypto.randomBytes(20).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  const crypto = require("crypto");
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
