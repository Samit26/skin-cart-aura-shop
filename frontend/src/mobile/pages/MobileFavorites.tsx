import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import MobileLayout from "../components/MobileLayout";
import { useProducts } from "@/contexts/ProductContext";

const MobileFavorites = () => {
  const navigate = useNavigate();
  const { getFeaturedProducts } = useProducts();

  // Mock favorites data - in real app this would come from context/localStorage
  const [favorites, setFavorites] = useState(getFeaturedProducts().slice(0, 6));

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  if (favorites.length === 0) {
    return (
      <MobileLayout title="Favorites" showCart={false}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">No Favorites Yet</h2>
            <p className="text-gray-400 mb-8">
              Start browsing and add items to your favorites
            </p>
            <button
              onClick={() => navigate("/mobile/products")}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium"
            >
              Browse Products
            </button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Favorites" showCart={false}>
      <div className="p-4">
        <div className="mb-4">
          <p className="text-gray-400">{favorites.length} items</p>
        </div>{" "}
        <div className="grid grid-cols-2 gap-4">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-gray-700 rounded-xl overflow-hidden relative group"
            >
              <button
                onClick={() => removeFavorite(item.id)}
                className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart size={16} className="text-red-500 fill-current" />
              </button>

              <div
                onClick={() => navigate(`/mobile/product/${item.id}`)}
                className="cursor-pointer"
              >
                <div className="aspect-[3/4] bg-gray-600">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm mb-2 line-clamp-2">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-green-400 font-bold">${item.price}</p>
                    {item.originalPrice && (
                      <p className="text-gray-400 text-sm line-through">
                        ${item.originalPrice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileFavorites;
