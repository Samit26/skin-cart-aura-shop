import { useState } from "react";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContextNew";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  badge?: string | null;
  onQuickView: (id: string) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  category,
  badge,
  onQuickView,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const handleAddToCart = async () => {
    try {
      // For now, we'll use default values since ProductCard doesn't have device selection
      // In a real implementation, this would be handled in ProductDetail page
      await addToCart(id, "Select Brand", "Select Model", "single", 1);
      toast({
        title: "Success!",
        description: `Added ${name} to cart!`,
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
    <div
      className="product-card group overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {" "}
      <div className="relative mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-contain rounded-t-lg group-hover:scale-105 transition-transform duration-300 bg-gray-50"
        />
        {/* Sale Badge */}
        <div className="absolute -top-1 -left-1 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
          Sale!
        </div>{" "}
        {/* Floating Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 bg-cyber-yellow text-jet-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg"
        >
          <ShoppingCart size={16} />
        </button>
      </div>{" "}
      <div className="px-3 pb-3 space-y-2">
        {/* Badges Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-cyber-yellow text-jet-black px-2 py-1 rounded-md text-xs font-medium">
            {category}
          </span>
          {badge && (
            <span className="bg-success-green text-white px-2 py-1 rounded-full text-xs font-medium">
              {badge}
            </span>
          )}
        </div>

        {/* Price Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {originalPrice && (
              <span className="text-light-text text-xs line-through">
                ₹{originalPrice}
              </span>
            )}
            <span className="font-poppins font-bold text-success-green">
              ₹{price}
            </span>
          </div>
        </div>
        {/* Product Name */}
        <Link
          to={`/product/${id}`}
          className="block hover:text-cyber-yellow transition-colors"
        >
          <h3 className="font-poppins font-medium text-sm line-clamp-2 text-dark-text leading-tight">
            {name}
          </h3>
        </Link>
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < rating
                    ? "fill-cyber-yellow text-cyber-yellow"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-light-text">({reviews})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
