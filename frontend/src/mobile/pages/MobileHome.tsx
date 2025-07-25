import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "../components/MobileLayout";
import { useProducts } from "@/contexts/ProductContext";

const MobileHome = () => {
  const navigate = useNavigate();
  const { getFeaturedProducts, getAllCategories } = useProducts();
  const [currentPromo, setCurrentPromo] = useState(0);

  const featuredSkins = getFeaturedProducts().slice(0, 3);
  const promos = [
    {
      id: 1,
      title: "Promo 1",
    },
    {
      id: 2,
      title: "Promo 2",
    },
    {
      id: 3,
      title: "Promo 3",
    },
  ];

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [promos.length]);

  const categories = [
    {
      name: "Anime",
      image: "/public/Naruto Archives - TheMobileWraps/1-2-247x296.png",
      category: "Anime",
    },
    {
      name: "Marvel",
      image:
        "/Premium Mobile Skins Archives - TheMobileWraps/Spiderman-247x296.png",
      category: "Superhero",
    },
    {
      name: "Custom",
      image:
        "/Premium Mobile Skins Archives - TheMobileWraps/Trendy-Girl-mobile-skins-247x296.webp",
      category: "Lifestyle",
    },
    {
      name: "Trending",
      image:
        "/Premium Mobile Skins Archives - TheMobileWraps/One-Piece-Mobile-skins-247x296.png",
      category: "Anime",
    },
  ];
  return (
    <MobileLayout>
      {" "}
      <div className="px-4 py-6 space-y-8">
        {/* Promotional Text - Fixed */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">
            🎁 Buy 2 Skins = FREE Delivery!
          </h2>
        </div>

        {/* Hero Carousel */}
        <div className="relative">
          <div
            className="relative rounded-2xl overflow-hidden h-64"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold">
                  {promos[currentPromo].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {promos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPromo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPromo ? "bg-white" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-3 px-2">
          <button
            onClick={() => navigate("/mobile/products")}
            className="flex-1 bg-white text-gray-900 py-3 px-6 rounded-full font-semibold shadow-md"
          >
            Shop Now
          </button>
          <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-full font-semibold">
            Design Your Own
          </button>
        </div>
        {/* Categories */}
        <div>
          <h3 className="text-xl font-bold mb-4">Shop by Category</h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() =>
                  navigate(`/mobile/products?category=${category.category}`)
                }
                className="relative rounded-xl overflow-hidden cursor-pointer group"
              >
                <div className="aspect-square bg-gray-700">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop";
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h4 className="font-semibold text-lg">{category.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Featured Skins */}
        <div>
          <h3 className="text-xl font-bold mb-4">Featured Skins</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {featuredSkins.map((skin) => (
              <div
                key={skin.id}
                onClick={() => navigate(`/mobile/product/${skin.id}`)}
                className="flex-shrink-0 w-40 cursor-pointer"
              >
                <div className="bg-gray-700 rounded-xl overflow-hidden mb-3 aspect-[3/4]">
                  <img
                    src={skin.image}
                    alt={skin.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium text-sm mb-1 line-clamp-2">
                  {skin.name}
                </h4>
                <p className="text-green-400 font-bold">${skin.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileHome;
