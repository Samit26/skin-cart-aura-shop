
import { ShoppingCart } from 'lucide-react';

const featuredSkins = [
  {
    id: 1,
    name: "Dragon Ball Z - Goku",
    price: 299,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop",
    category: "Anime",
    badge: "Trending"
  },
  {
    id: 2,
    name: "Marvel - Iron Man",
    price: 349,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop",
    category: "Marvel",
    badge: "New"
  },
  {
    id: 3,
    name: "Minimal Black",
    price: 199,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop",
    category: "Minimal",
    badge: null
  },
  {
    id: 4,
    name: "Neon Cyberpunk",
    price: 399,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop",
    category: "Neon",
    badge: "Popular"
  },
  {
    id: 5,
    name: "Abstract Waves",
    price: 279,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
    category: "Abstract",
    badge: null
  },
  {
    id: 6,
    name: "Nature Forest",
    price: 259,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop",
    category: "Nature",
    badge: "Eco"
  }
];

const FeaturedSkins = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
            Featured Skins
          </h2>
          <p className="text-light-text text-lg">
            Handpicked designs that everyone loves
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSkins.map((skin) => (
            <div
              key={skin.id}
              className="product-card group overflow-hidden"
            >
              <div className="relative mb-4">
                <img
                  src={skin.image}
                  alt={skin.name}
                  className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                {skin.badge && (
                  <span className="absolute top-3 left-3 bg-success-green text-white px-2 py-1 rounded-full text-xs font-medium">
                    {skin.badge}
                  </span>
                )}
                <button className="absolute bottom-3 right-3 bg-cyber-yellow text-jet-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110">
                  <ShoppingCart size={18} />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-light-text text-sm">{skin.category}</span>
                  <span className="font-poppins font-bold text-lg">₹{skin.price}</span>
                </div>
                <h3 className="font-poppins font-semibold text-dark-text">
                  {skin.name}
                </h3>
                <button className="w-full btn-primary mt-4 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Skins
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSkins;
