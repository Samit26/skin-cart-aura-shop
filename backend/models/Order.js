const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  selectedBundle: {
    type: String,
    enum: ["single", "double", "triple"],
    default: "single",
  },
  selectedBrand: String,
  selectedModel: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    billingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    paymentInfo: {
      method: {
        type: String,
        enum: ["phonepe", "cod"],
        default: "phonepe",
      },
      transactionId: String,
      paidAt: Date,
      status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
      },
    },
    promoCode: {
      code: String,
      discount: {
        type: Number,
        default: 0,
      },
      discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        default: "percentage",
      },
    },
    subtotal: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "refunded",
      ],
      default: "pending",
    },
    trackingInfo: {
      trackingNumber: String,
      carrier: String,
      estimatedDelivery: Date,
      statusHistory: [
        {
          status: String,
          timestamp: { type: Date, default: Date.now },
          location: String,
          description: String,
        },
      ],
    },
    deliveredAt: Date,
    cancelledAt: Date,
    refundedAt: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Generate order ID before saving
orderSchema.pre("save", function (next) {
  if (this.isNew) {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    this.orderId = `SC${timestamp.slice(-6)}${random}`;
  }
  next();
});

// Update tracking status
orderSchema.methods.updateTrackingStatus = function (
  status,
  location = "",
  description = ""
) {
  this.trackingInfo.statusHistory.push({
    status,
    location,
    description,
    timestamp: new Date(),
  });

  this.orderStatus = status;

  if (status === "delivered") {
    this.deliveredAt = new Date();
  } else if (status === "cancelled") {
    this.cancelledAt = new Date();
  } else if (status === "refunded") {
    this.refundedAt = new Date();
  }
};

module.exports = mongoose.model("Order", orderSchema);
