import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  ArrowLeft,
  ChevronDown,
  ShoppingCart,
  Search,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContextNew";
import { useAuth } from "@/hooks/useAuth";
import type { Product } from "@/types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, getProductsByCategory } = useProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("Select Brand");
  const [selectedModel, setSelectedModel] = useState("Select Model");
  const [selectedBundle, setSelectedBundle] = useState(1);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const productData = await getProductById(id);
        if (productData) {
          setProduct(productData);

          // Load related products
          const related = await getProductsByCategory(productData.category, {
            limit: 8,
          });
          setRelatedProducts(related.filter((p) => p._id !== productData._id));
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.error("Error loading product:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, getProductById, getProductsByCategory, navigate]);

  // Load available brands on component mount
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/devices/brands"
        );
        const result = await response.json();
        if (result.success) {
          setAvailableBrands(result.data);
        }
      } catch (error) {
        console.error("Error loading brands:", error);
      }
    };

    loadBrands();
  }, []);

  // Load models when brand is selected
  useEffect(() => {
    const loadModels = async () => {
      if (selectedBrand === "Select Brand") {
        setAvailableModels([]);
        setSelectedModel("Select Model");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/devices/models/${selectedBrand}`
        );
        const result = await response.json();
        if (result.success) {
          setAvailableModels(result.data.models);
          setSelectedModel("Select Model"); // Reset model selection
        }
      } catch (error) {
        console.error("Error loading models:", error);
        setAvailableModels([]);
      }
    };

    loadModels();
  }, [selectedBrand]);

  // Get bundle pricing from product or use defaults
  const bundlePricing = [
    {
      quantity: 1,
      price: product?.bundlePricing?.single?.price || product?.price || 299,
      discount: 0,
    },
    {
      quantity: 2,
      price:
        product?.bundlePricing?.double?.price ||
        Math.round((product?.price || 299) * 1.6),
      discount: 10,
    },
    {
      quantity: 3,
      price:
        product?.bundlePricing?.triple?.price ||
        Math.round((product?.price || 299) * 2.0),
      discount: 15,
    },
  ];

  if (!product) {
    return (
      <div className="min-h-screen bg-light-bg">
        <Header />
        <main className="container-max section-padding py-16 text-center">
          <h1 className="text-2xl font-poppins font-bold mb-4">
            Product Not Found
          </h1>
          <p className="text-light-text mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button onClick={() => navigate("/products")} className="btn-primary">
            Back to Products
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!product) return;

    // Validate selections
    if (selectedBrand === "Select Brand") {
      toast({
        title: "Brand Required",
        description: "Please select a device brand",
        variant: "destructive",
      });
      return;
    }

    if (selectedModel === "Select Model") {
      toast({
        title: "Model Required",
        description: "Please select a device model",
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated) {
      // Show Clerk sign-in instead of navigating to login page
      return;
    }

    try {
      const currentBundle = bundlePricing[selectedBundle - 1];

      await addToCart(
        product._id,
        selectedBrand,
        selectedModel,
        ["single", "double", "triple"][selectedBundle - 1],
        currentBundle.quantity
      );
      toast({
        title: "Success!",
        description: `Added ${product.name} to cart!`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 py-2">
        {/* Product Title */}
        {product && (
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-poppins">
              {product.name}
            </h1>
            {product.description && (
              <p className="text-gray-600 text-base md:text-lg mb-1 font-inter leading-relaxed">
                {product.description}
              </p>
            )}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-blue-600">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              {product.discountPercentage && product.discountPercentage > 0 && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Product Image */}
          <div className="bg-white rounded-xl h-[500px] w-[400px] mx-auto flex items-center justify-center relative">
            <img
              src={
                product?.images?.[selectedDesign]?.url ||
                product?.images?.[0]?.url ||
                "/placeholder.svg"
              }
              alt={
                product?.images?.[selectedDesign]?.alt ||
                product?.name ||
                "Product"
              }
              className="w-[350px] h-[600px] object-contain"
            />
          </div>

          {/* Right Side - Product Configuration */}
          <div className="bg-white rounded-xl p-6 space-y-6">
            {/* Select Your Device */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 font-poppins">
                Select Your Device
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option>Select Brand</option>
                    {availableBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    disabled={selectedBrand === "Select Brand"}
                  >
                    <option>Select Model</option>
                    {availableModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>
            </div>

            {/* Bundle Pricing */}
            <div>
              <div className="bg-gray-200 text-center py-3 rounded-t-xl">
                <h3 className="text-gray-700 text-lg font-medium font-poppins">
                  Upto 40% savings on bundles
                </h3>
              </div>
              <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                <div className="grid grid-cols-3 divide-x divide-gray-300 divide-dashed">
                  {bundlePricing.map((bundle, index) => (
                    <div
                      key={bundle.quantity}
                      className={`text-center px-4 py-6 cursor-pointer transition-colors ${
                        selectedBundle === bundle.quantity
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedBundle(bundle.quantity)}
                    >
                      <h4 className="font-bold mb-2 text-gray-900 font-poppins text-lg">
                        Buy {bundle.quantity}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 font-inter">
                        Mobile Skin{bundle.quantity > 1 ? "s" : ""}
                      </p>
                      <p className="text-2xl font-bold text-blue-600 font-poppins">
                        ₹{bundle.price}
                      </p>
                      {bundle.discount > 0 && (
                        <p className="text-sm text-green-600 font-semibold">
                          Save {bundle.discount}%
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div>
              {isAuthenticated ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-green-400 hover:bg-green-500 text-black font-bold py-4 px-6 rounded-full transition-colors flex items-center justify-center gap-3 text-lg font-poppins shadow-lg"
                >
                  <div className="bg-green-600 rounded-full p-2 flex items-center justify-center">
                    <ShoppingCart size={20} className="text-white" />
                  </div>
                  Add to Cart - ₹
                  {bundlePricing[selectedBundle - 1]?.price || product.price}
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="w-full bg-green-400 hover:bg-green-500 text-black font-bold py-4 px-6 rounded-full transition-colors flex items-center justify-center gap-3 text-lg font-poppins shadow-lg">
                    <div className="bg-green-600 rounded-full p-2 flex items-center justify-center">
                      <ShoppingCart size={20} className="text-white" />
                    </div>
                    Sign in to Add to Cart - ₹
                    {bundlePricing[selectedBundle - 1]?.price || product.price}
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>

        {/* Related Skins - Full Width Below */}
        <div className="mt-12 bg-white rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 font-poppins">
            Related Skins
          </h3>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct._id}
                  onClick={() => navigate(`/product/${relatedProduct._id}`)}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                  style={{
                    boxShadow:
                      "0 -4px 20px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Product Image */}
                  <div className="relative mb-4 bg-white rounded-xl h-48 flex items-center justify-center">
                    <img
                      src={
                        relatedProduct.images?.[0]?.url || "/placeholder.svg"
                      }
                      alt={
                        relatedProduct.images?.[0]?.alt || relatedProduct.name
                      }
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    {/* Product Name */}
                    <h4 className="font-bold text-gray-900 text-base leading-tight font-poppins">
                      {relatedProduct.name}
                    </h4>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-gray-900 font-poppins">
                        ₹{relatedProduct.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 font-inter">
                No related products found.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default ProductDetail;
