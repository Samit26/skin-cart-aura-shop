import { useState } from "react";
import { Search, ChevronDown, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedSkinType, setSelectedSkinType] = useState("Skin Type");
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("Featured");

  // Use products from context
  const allProducts = products;

  // Filter products based on search and filters
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSkinType =
      selectedSkinType === "Skin Type" ||
      product.name.toLowerCase().includes(selectedSkinType.toLowerCase());
    const matchesCategory =
      selectedCategory === "Categories" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesSkinType && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default: // Featured
        return b.isFeatured ? 1 : -1;
    }
  });

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(
        {
          id: product._id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images?.[0]?.url || "/placeholder.svg",
          category: product.category,
        },
        1
      );
      toast({
        title: "Success!",
        description: `Added ${product.name} to cart!`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Skin Type Dropdown */}
            <div className="relative">
              <select
                value={selectedSkinType}
                onChange={(e) => setSelectedSkinType(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option>Skin Type</option>
                <option>Normal</option>
                <option>Leather</option>
                <option>Texture</option>
                <option>Matte</option>
                <option>Glossy</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            {/* Categories Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option>Categories</option>
                <option>Anime</option>
                <option>Marvel</option>
                <option>Superhero</option>
                <option>Aesthetic</option>
                <option>Abstract</option>
                <option>Religious</option>
                <option>Cricket</option>
                <option>TV Series</option>
                <option>Comedy</option>
                <option>Gaming</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Brand or Device"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="text-gray-400" size={20} />
              </button>
            </div>

            {/* Featured Dropdown */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Most Popular</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              style={{
                boxShadow:
                  "0 -4px 20px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              {/* Product Image */}
              <div className="relative mb-4 bg-white rounded-xl h-64 flex items-center justify-center">
                <img
                  src={product.images?.[0]?.url || "/placeholder.svg"}
                  alt={product.images?.[0]?.alt || product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                {/* Brand */}
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                  {product.category}
                </p>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 text-lg leading-tight truncate">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xl text-gray-900">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-gray-400 text-sm line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No products found</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSkinType("Skin Type");
                setSelectedCategory("Categories");
                setSelectedSort("Featured");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Products;
