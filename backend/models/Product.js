const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Original price is required"],
      min: [0, "Original price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: [
        "Anime",
        "Marvel",
        "Superhero",
        "Aesthetic",
        "Abstract",
        "Religious",
        "Cricket",
        "TV Series",
        "Comedy",
        "Gaming",
      ],
    },
    skinType: {
      type: String,
      required: [true, "Skin type is required"],
      enum: ["Normal", "Leather", "Texture", "Matte", "Glossy"],
      default: "Normal",
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
      },
    ],
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxLength: [2000, "Description cannot exceed 2000 characters"],
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    bundlePricing: {
      single: {
        price: { type: Number, required: true },
        label: { type: String, default: "Mobile Skin" },
      },
      double: {
        price: { type: Number, required: true },
        label: { type: String, default: "Mobile Skin" },
      },
      triple: {
        price: { type: Number, required: true },
        label: { type: String, default: "Mobile Skin" },
      },
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    badge: {
      type: String,
      enum: ["Trending", "New", "Hot", "Sale", null],
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  return 0;
});

// Virtual for formatted price
productSchema.virtual("formattedPrice").get(function () {
  return `₹${this.price}`;
});

// Index for search optimization
productSchema.index({
  name: "text",
  description: "text",
  category: "text",
  tags: "text",
});

productSchema.index({ category: 1, skinType: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

// Pre-save middleware to generate bundle pricing
productSchema.pre("save", function (next) {
  if (this.isModified("price") || this.isNew) {
    this.bundlePricing = {
      single: {
        price: this.price,
        label: "Mobile Skin",
      },
      double: {
        price: Math.round(this.price * 1.6),
        label: "Mobile Skin",
      },
      triple: {
        price: Math.round(this.price * 2.0),
        label: "Mobile Skin",
      },
    };
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
