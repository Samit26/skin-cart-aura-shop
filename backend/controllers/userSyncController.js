const User = require("../models/User");

// @desc    Sync user from Clerk webhook
// @route   POST /api/webhooks/clerk
// @access  Public (but secured with Clerk webhook secret)
const syncUserFromClerk = async (req, res) => {
  try {
    const { data, type } = req.body;

    switch (type) {
      case "user.created":
      case "user.updated":
        await User.findOrCreateFromClerk(data);
        break;

      case "user.deleted":
        await User.findOneAndDelete({ clerkId: data.id });
        break;

      default:
        console.log(`Unhandled webhook type: ${type}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error syncing user from Clerk:", error);
    res.status(500).json({
      success: false,
      message: "Error syncing user",
      error: error.message,
    });
  }
};

// @desc    Get or create user from Clerk ID
// @route   POST /api/users/sync-clerk
// @access  Private
const syncCurrentUser = async (req, res) => {
  try {
    const { clerkUser } = req.body;

    if (!clerkUser) {
      return res.status(400).json({
        success: false,
        message: "Clerk user data is required",
      });
    }

    const user = await User.findOrCreateFromClerk(clerkUser);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error syncing current user:", error);
    res.status(500).json({
      success: false,
      message: "Error syncing user",
      error: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const { clerkId } = req.user; // Assuming middleware sets this
    const updateData = req.body;

    // Remove sensitive fields that shouldn't be updated directly
    delete updateData.clerkId;
    delete updateData.role;
    delete updateData._id;

    const user = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

// @desc    Add user address
// @route   POST /api/users/addresses
// @access  Private
const addUserAddress = async (req, res) => {
  try {
    const { clerkId } = req.user;
    const addressData = req.body;

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If this is set as default, unset other default addresses
    if (addressData.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push(addressData);
    await user.save();

    res.status(201).json({
      success: true,
      data: user.addresses[user.addresses.length - 1],
    });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({
      success: false,
      message: "Error adding address",
      error: error.message,
    });
  }
};

// @desc    Update user address
// @route   PUT /api/users/addresses/:addressId
// @access  Private
const updateUserAddress = async (req, res) => {
  try {
    const { clerkId } = req.user;
    const { addressId } = req.params;
    const updateData = req.body;

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // If setting as default, unset other defaults
    if (updateData.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    Object.assign(address, updateData);
    await user.save();

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({
      success: false,
      message: "Error updating address",
      error: error.message,
    });
  }
};

// @desc    Delete user address
// @route   DELETE /api/users/addresses/:addressId
// @access  Private
const deleteUserAddress = async (req, res) => {
  try {
    const { clerkId } = req.user;
    const { addressId } = req.params;

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.addresses.pull(addressId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting address",
      error: error.message,
    });
  }
};

module.exports = {
  syncUserFromClerk,
  syncCurrentUser,
  updateUserProfile,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
