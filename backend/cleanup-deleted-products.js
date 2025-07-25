const mongoose = require("mongoose");
const Product = require("./models/Product");
const Cart = require("./models/Cart");

const cleanup = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://trysamitkhedekar2594:9X1eXuDlLNDg0tbe@cluster0.nmlpx5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/skin-cart"
    );
    console.log("Connected to MongoDB");

    // Find and delete all inactive products
    const result = await Product.deleteMany({ isActive: false });
    console.log("Deleted", result.deletedCount, "inactive products");

    // Also clean up any cart items that reference deleted products
    const allProducts = await Product.find({}, "_id");
    const validProductIds = allProducts.map((p) => p._id);

    const cartCleanup = await Cart.updateMany(
      {},
      { $pull: { items: { product: { $nin: validProductIds } } } }
    );
    console.log("Cleaned up cart items");

    mongoose.disconnect();
    console.log("Cleanup complete!");
  } catch (error) {
    console.error("Error during cleanup:", error);
    mongoose.disconnect();
  }
};

cleanup();
