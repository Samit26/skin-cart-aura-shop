const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.product",
      select: "name price images bundlePricing isActive",
    });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Filter out inactive products
    cart.items = cart.items.filter(
      (item) => item.product && item.product.isActive
    );
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
  try {
    const {
      productId,
      quantity = 1,
      selectedBundle = "single",
      selectedBrand = "Select Brand",
      selectedModel = "Select Model",
    } = req.body;

    // Check if product exists and is active
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: "Product not found or inactive",
      });
    }

    // Get price based on bundle selection
    const price = product.bundlePricing[selectedBundle]?.price || product.price;

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.selectedBundle === selectedBundle &&
        item.selectedBrand === selectedBrand &&
        item.selectedModel === selectedModel
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].price = price;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        selectedBundle,
        selectedBrand,
        selectedModel,
        price,
      });
    }

    await cart.save();
    await cart.populate({
      path: "items.product",
      select: "name price images bundlePricing",
    });

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

// @desc    Update cart item
// @route   PUT /api/cart/update/:itemId
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate({
      path: "items.product",
      select: "name price images bundlePricing",
    });

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart item",
      error: error.message,
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:itemId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items.id(req.params.itemId).remove();
    await cart.save();
    await cart.populate({
      path: "items.product",
      select: "name price images bundlePricing",
    });

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    cart.appliedPromo = {};
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message,
    });
  }
};

// @desc    Apply promo code
// @route   POST /api/cart/promo/apply
// @access  Private
const applyPromoCode = async (req, res) => {
  try {
    const { promoCode } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Simple promo code validation (you can make this more sophisticated)
    const promoCodes = {
      WELCOME10: { discount: 10, discountType: "percentage" },
      SAVE50: { discount: 50, discountType: "fixed" },
      FIRST20: { discount: 20, discountType: "percentage" },
    };

    const promo = promoCodes[promoCode.toUpperCase()];
    if (!promo) {
      return res.status(400).json({
        success: false,
        message: "Invalid promo code",
      });
    }

    cart.appliedPromo = {
      code: promoCode.toUpperCase(),
      discount: promo.discount,
      discountType: promo.discountType,
    };

    await cart.save();
    await cart.populate({
      path: "items.product",
      select: "name price images bundlePricing",
    });

    res.status(200).json({
      success: true,
      message: "Promo code applied successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error applying promo code",
      error: error.message,
    });
  }
};

// @desc    Remove promo code
// @route   DELETE /api/cart/promo/remove
// @access  Private
const removePromoCode = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.appliedPromo = {};
    await cart.save();
    await cart.populate({
      path: "items.product",
      select: "name price images bundlePricing",
    });

    res.status(200).json({
      success: true,
      message: "Promo code removed",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing promo code",
      error: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyPromoCode,
  removePromoCode,
};
