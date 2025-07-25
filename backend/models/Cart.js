const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
    max: [10, "Quantity cannot exceed 10"],
  },
  selectedBundle: {
    type: String,
    enum: ["single", "double", "triple"],
    default: "single",
  },
  selectedBrand: {
    type: String,
    default: "Select Brand",
  },
  selectedModel: {
    type: String,
    default: "Select Model",
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    totalAmount: {
      type: Number,
      default: 0,
    },
    appliedPromo: {
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
    finalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total amount before saving
cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Apply promo discount
  if (this.appliedPromo && this.appliedPromo.discount > 0) {
    if (this.appliedPromo.discountType === "percentage") {
      this.finalAmount =
        this.totalAmount * (1 - this.appliedPromo.discount / 100);
    } else {
      this.finalAmount = Math.max(
        0,
        this.totalAmount - this.appliedPromo.discount
      );
    }
  } else {
    this.finalAmount = this.totalAmount;
  }

  next();
});

module.exports = mongoose.model("Cart", cartSchema);
