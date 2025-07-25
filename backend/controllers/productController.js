const Product = require("../models/Product");

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      category,
      skinType,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12,
      search,
    } = req.query;

    // Build query object
    const query = { isActive: true };

    // Filter by category
    if (category && category !== "Categories") {
      query.category = { $regex: category, $options: "i" };
    }

    // Filter by skin type
    if (skinType && skinType !== "Skin Type") {
      query.skinType = { $regex: skinType, $options: "i" };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Sorting
    let sortBy = { createdAt: -1 }; // Default: newest first

    if (sort) {
      switch (sort) {
        case "Price: Low to High":
          sortBy = { price: 1 };
          break;
        case "Price: High to Low":
          sortBy = { price: -1 };
          break;
        case "Newest":
          sortBy = { createdAt: -1 };
          break;
        case "Featured":
          sortBy = { badge: -1, createdAt: -1 };
          break;
        default:
          sortBy = { createdAt: -1 };
      }
    }

    // Pagination
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (pageNumber - 1) * pageSize;

    // Execute query
    const products = await Product.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(pageSize)
      .select("-createdBy -__v");

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);

    res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      totalPages,
      currentPage: pageNumber,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select(
      "-createdBy -__v"
    );

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 12 } = req.query;

    const products = await Product.find({
      category: { $regex: category, $options: "i" },
      isActive: true,
    })
      .limit(parseInt(limit))
      .select("-createdBy -__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products by category",
      error: error.message,
    });
  }
};

// @desc    Get related products
// @route   GET /api/products/related/:id
// @access  Public
const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true,
    })
      .limit(4)
      .select("name price images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: relatedProducts.length,
      data: relatedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching related products",
      error: error.message,
    });
  }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
const searchProducts = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const products = await Product.find({
      $and: [
        { isActive: true },
        {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } },
            { tags: { $in: [new RegExp(q, "i")] } },
          ],
        },
      ],
    })
      .limit(parseInt(limit))
      .select("name price images category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching products",
      error: error.message,
    });
  }
};

// @desc    Get all categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category", { isActive: true });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

// @desc    Get all skin types
// @route   GET /api/products/skin-types
// @access  Public
const getSkinTypes = async (req, res) => {
  try {
    const skinTypes = await Product.distinct("skinType", { isActive: true });

    res.status(200).json({
      success: true,
      data: skinTypes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching skin types",
      error: error.message,
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const products = await Product.find({
      badge: { $ne: null },
      isActive: true,
    })
      .limit(parseInt(limit))
      .select("-createdBy -__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching featured products",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getProductsByCategory,
  getRelatedProducts,
  searchProducts,
  getCategories,
  getSkinTypes,
  getFeaturedProducts,
};
