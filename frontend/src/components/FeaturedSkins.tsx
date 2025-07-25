import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContextNew";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { SignInButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

import type { Product } from "@/types";

const FeaturedSkins = () => {
  const navigate = useNavigate();
  const { getFeaturedProducts } = useProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [featuredSkins, setFeaturedSkins] = useState<Product[]>([]);

  // Load featured products
  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const featured = await getFeaturedProducts();
        setFeaturedSkins(featured);
      } catch (error) {
        console.error("Error loading featured products:", error);
      }
    };
    loadFeatured();
  }, [getFeaturedProducts]);

  const handleViewAllSkins = () => {
    navigate("/products");
  };

  const handleAddToCart = async (skin: Product) => {
    if (!isAuthenticated) {
      // Show Clerk sign-in instead of navigating to login page
      return;
    }

    try {
      await addToCart(skin._id, "Select Brand", "Select Model", "single", 1);
      toast({
        title: "Success!",
        description: `Added ${skin.name} to cart!`,
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
    <section className="py-8 bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
            Featured Skins
          </h2>
          <p className="text-light-text text-lg">
            Handpicked designs that everyone loves
          </p>
        </div>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredSkins.map((skin) => (
            <div
              key={skin._id}
              className="bg-grey-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              style={{
                boxShadow:
                  "0 -4px 20px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => navigate(`/product/${skin._id}`)}
            >
              {/* Product Image */}
              <div className="relative mb-4 bg-white rounded-xl  h-64 flex items-center justify-center">
                <img
                  src={skin.images?.[0]?.url || "/placeholder.svg"}
                  alt={skin.images?.[0]?.alt || skin.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                {/* Brand */}
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                  {skin.category}
                </p>

                {/* Product Name */}
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {skin.name}
                </h3>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xl text-gray-900">
                      ₹{skin.price}
                    </span>
                    {skin.originalPrice > skin.price && (
                      <span className="text-gray-400 text-sm line-through">
                        ₹{skin.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>{" "}
        <div className="text-center mt-12">
          <button className="btn-secondary" onClick={handleViewAllSkins}>
            View All Skins
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSkins;
