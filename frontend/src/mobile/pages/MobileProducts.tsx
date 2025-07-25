import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import MobileLayout from "../components/MobileLayout";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/contexts/ProductContext";

const MobileProducts = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { products, searchProducts, getProductsByCategory } = useProducts();
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Device");

  const categoryFilter = searchParams.get("category");

  let filteredProducts = products;
  if (categoryFilter) {
    filteredProducts = getProductsByCategory(categoryFilter);
  } else if (searchQuery) {
    filteredProducts = searchProducts(searchQuery);
  }

  const filters = ["Device", "Material", "Color"];

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <MobileLayout
      title="Skins"
      showBackButton
      onBackClick={() => navigate("/mobile")}
    >
      <div className="p-4 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="iPhone 14 Pro Max"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-700 text-white pl-10 pr-10 py-3 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/mobile/product/${product.id}`)}
                className="bg-gray-700 rounded-xl overflow-hidden cursor-pointer"
              >
                <div className="aspect-[3/4] bg-gray-600">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-green-400 font-bold">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No products found</p>
            <button
              onClick={() => {
                setSearchQuery("");
                navigate("/mobile/products");
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default MobileProducts;
