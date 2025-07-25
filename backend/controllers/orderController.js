const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const userId = req.user.id;

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Validate cart items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      if (!item.product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product ${item.product.name} is no longer available`,
        });
      }

      const orderItem = {
        product: item.product._id,
        deviceModel: item.deviceModel,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
      };

      orderItems.push(orderItem);
      totalAmount += item.totalPrice;
    }

    // Apply promo discount if exists
    if (cart.appliedPromo) {
      if (cart.appliedPromo.discountType === "percentage") {
        totalAmount = totalAmount * (1 - cart.appliedPromo.discount / 100);
      } else {
        totalAmount = Math.max(0, totalAmount - cart.appliedPromo.discount);
      }
    }

    // Generate unique order ID
    const orderId = `ORD${Date.now()}${Math.random()
      .toString(36)
      .substr(2, 4)
      .toUpperCase()}`;

    // Create order
    const order = await Order.create({
      orderId,
      user: userId,
      items: orderItems,
      shippingAddress,
      totalAmount: Math.round(totalAmount),
      orderStatus: "pending",
      paymentInfo: {
        method: paymentMethod,
        status: "pending",
        amount: Math.round(totalAmount),
      },
      appliedPromo: cart.appliedPromo,
    });

    // Populate order with product details
    await order.populate("items.product user");

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getUserOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const userId = req.user.id;

    const query = { user: userId };
    if (status && status !== "all") {
      query.orderStatus = status;
    }

    const orders = await Order.find(query)
      .populate("items.product", "name images category")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOrders / parseInt(limit)),
        totalOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;

    const order = await Order.findOne({
      $or: [{ _id: orderId }, { orderId: orderId }],
      user: userId,
    }).populate("items.product user");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;
    const { reason } = req.body;

    const order = await Order.findOne({
      $or: [{ _id: orderId }, { orderId: orderId }],
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if order can be cancelled
    if (!["pending", "confirmed"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled at this stage",
      });
    }

    // Update order status
    order.orderStatus = "cancelled";
    order.cancelReason = reason;
    order.cancelledAt = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error cancelling order",
      error: error.message,
    });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status, trackingNumber } = req.body;

    const order = await Order.findOne({
      $or: [{ _id: orderId }, { orderId: orderId }],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update order status
    order.orderStatus = status;

    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }

    // Set shipped date if status is shipped
    if (status === "shipped" && !order.shippedAt) {
      order.shippedAt = new Date();
    }

    // Set delivered date if status is delivered
    if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
};

// @desc    Get order statistics
// @route   GET /api/orders/stats
// @access  Private
const getOrderStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await Order.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalOrders = await Order.countDocuments({ user: userId });
    const totalSpent = await Order.aggregate([
      {
        $match: {
          user: userId,
          orderStatus: { $in: ["delivered", "shipped"] },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        totalSpent: totalSpent[0]?.total || 0,
        ordersByStatus: stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order statistics",
      error: error.message,
    });
  }
};

// @desc    Track order
// @route   GET /api/orders/track/:orderId
// @access  Private
const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      orderId: orderId,
      user: userId,
    }).select("orderId orderStatus createdAt updatedAt paymentInfo.status");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Define order tracking stages
    const trackingStages = [
      { stage: "pending", title: "Order Placed", completed: true },
      { stage: "confirmed", title: "Order Confirmed", completed: false },
      { stage: "processing", title: "Processing", completed: false },
      { stage: "shipped", title: "Shipped", completed: false },
      { stage: "delivered", title: "Delivered", completed: false },
    ];

    // Update completion status based on current order status
    const currentStageIndex = trackingStages.findIndex(
      (stage) => stage.stage === order.orderStatus
    );
    if (currentStageIndex !== -1) {
      for (let i = 0; i <= currentStageIndex; i++) {
        trackingStages[i].completed = true;
      }
    }

    res.status(200).json({
      success: true,
      data: {
        orderId: order.orderId,
        currentStatus: order.orderStatus,
        paymentStatus: order.paymentInfo.status,
        trackingStages,
        orderDate: order.createdAt,
        lastUpdated: order.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error tracking order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrder,
  cancelOrder,
  updateOrderStatus,
  getOrderStats,
  trackOrder,
};
