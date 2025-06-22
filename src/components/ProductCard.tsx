
import { useState } from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  onAddToCart: (id: string) => void;
  onQuickView: (id: string) => void;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  rating, 
  reviews, 
  category, 
  onAddToCart, 
  onQuickView 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-cyber-yellow text-jet-black px-2 py-1 rounded-md text-xs font-medium">
            {category}
          </span>
        </div>
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={() => onQuickView(id)}
            className="bg-white text-jet-black px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-100 transition-colors"
          >
            <Eye size={16} />
            Quick View
          </button>
          <button
            onClick={() => onAddToCart(id)}
            className="bg-cyber-yellow text-jet-black px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-yellow-500 transition-colors"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Link to={`/product/${id}`} className="block hover:text-cyber-yellow transition-colors">
          <h3 className="font-poppins font-medium text-sm line-clamp-2">{name}</h3>
        </Link>
        
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < rating ? 'fill-cyber-yellow text-cyber-yellow' : 'text-gray-300'} 
              />
            ))}
          </div>
          <span className="text-xs text-light-text">({reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-poppins font-semibold text-lg">₹{price}</span>
          <button
            onClick={() => onAddToCart(id)}
            className="text-cyber-yellow hover:text-yellow-600 transition-colors"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
