import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { productAPI } from "../services/api";
import type { Product, ProductFilters } from "../types";

// Context interface
interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProductById: (id: string) => Promise<Product | undefined>;
  getProductsByCategory: (
    category: string,
    filters?: ProductFilters
  ) => Promise<Product[]>;
  getFeaturedProducts: () => Promise<Product[]>;
  getAllCategories: () => string[];
  searchProducts: (
    query: string,
    filters?: ProductFilters
  ) => Promise<Product[]>;
  loadProducts: (filters?: ProductFilters) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// All products data - comprehensive list from your Premium Mobile Skins folder
const allProducts: Product[] = [
  // Superhero Category
  {
    id: "spiderman-skin",
    name: "Spiderman Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Spiderman-247x296.png",
    rating: 5,
    reviews: 256,
    category: "Superhero",
    badge: "Trending",
    description:
      "High-quality Spiderman mobile skin with vibrant colors and premium finish. Perfect for all Spiderman fans!",
    features: [
      "Water resistant",
      "Scratch proof",
      "Easy application",
      "Bubble-free installation",
    ],
    inStock: true,
  },
  {
    id: "batman-skin",
    name: "Batman Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image: "/Premium Mobile Skins Archives - TheMobileWraps/Batman-247x296.png",
    rating: 5,
    reviews: 189,
    category: "Superhero",
    badge: "Popular",
    description:
      "Dark Knight inspired mobile skin with premium matte finish. Show your love for the Caped Crusader!",
    features: [
      "Anti-fingerprint",
      "Scratch resistant",
      "Premium adhesive",
      "Precise cutouts",
    ],
    inStock: true,
  },
  {
    id: "joker-skin",
    name: "Joker Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image: "/Premium Mobile Skins Archives - TheMobileWraps/Joker-247x296.png",
    rating: 4,
    reviews: 145,
    category: "Superhero",
    badge: "New",
    description:
      "Embrace the chaos with this stunning Joker mobile skin. High-quality print with vivid colors.",
    features: ["Fade resistant", "Water proof", "Easy removal", "No residue"],
    inStock: true,
  },
  {
    id: "little-batman-skin",
    name: "Little Batman Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/little-Batman-247x296.png",
    rating: 4,
    reviews: 98,
    category: "Superhero",
    description:
      "Cute and stylish Little Batman design perfect for young superhero fans.",
    features: [
      "Kid-friendly design",
      "Durable material",
      "Easy application",
      "Colorfast",
    ],
    inStock: true,
  },
  {
    id: "man-of-steel-skin",
    name: "Man Of Steel Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Man-Of-Steel-247x296.png",
    rating: 5,
    reviews: 289,
    category: "Superhero",
    description:
      "Superman inspired design with metallic finish. Feel the power of the Man of Steel!",
    features: [
      "Metallic finish",
      "Scratch proof",
      "Premium quality",
      "Long lasting",
    ],
    inStock: true,
  },

  // Religious Category
  {
    id: "lord-shiva-skin",
    name: "Lord Shiva Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Lord-Shiva-247x296.png",
    rating: 5,
    reviews: 203,
    category: "Religious",
    description:
      "Beautiful Lord Shiva design with intricate details. Perfect for devotees and spiritual souls.",
    features: [
      "Spiritual design",
      "High resolution print",
      "Fade resistant",
      "Premium adhesive",
    ],
    inStock: true,
  },
  {
    id: "radha-krishna-skin",
    name: "Radha Krishna Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Radha-Krishna-247x296.png",
    rating: 5,
    reviews: 267,
    category: "Religious",
    badge: "Popular",
    description:
      "Divine Radha Krishna design with beautiful colors and spiritual essence.",
    features: [
      "Divine artwork",
      "Vibrant colors",
      "Water resistant",
      "Easy application",
    ],
    inStock: true,
  },

  // Cricket Category
  {
    id: "virat-kohli-skin",
    name: "Virat Kohli Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Virat-Kohli-Mobile-Skins-247x296.webp",
    rating: 5,
    reviews: 167,
    category: "Cricket",
    badge: "Sports",
    description:
      "Show your support for the King of Cricket with this premium Virat Kohli mobile skin.",
    features: [
      "Official inspired design",
      "High quality print",
      "Durable material",
      "Cricket fan favorite",
    ],
    inStock: true,
  },
  {
    id: "king-kohli-skin",
    name: "King Kohli Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/king-kohli-Mobile-Skins-247x296.webp",
    rating: 5,
    reviews: 278,
    category: "Cricket",
    badge: "Sports",
    description:
      "Celebrate the King of Cricket with this exclusive King Kohli design.",
    features: [
      "Royal design",
      "Premium finish",
      "Cricket themed",
      "Fan favorite",
    ],
    inStock: true,
  },
  {
    id: "ms-dhoni-skin",
    name: "MS Dhoni Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Dhoni-Mobile-skins-247x296.webp",
    rating: 5,
    reviews: 312,
    category: "Cricket",
    badge: "Popular",
    description:
      "Captain Cool inspired design for all MSD fans. Premium quality guaranteed!",
    features: [
      "Captain Cool design",
      "Exclusive artwork",
      "High durability",
      "Fan collection",
    ],
    inStock: true,
  },
  {
    id: "rohit-sharma-skin",
    name: "Rohit Sharma Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/rohit-sharma-mobile-skins-247x296.webp",
    rating: 5,
    reviews: 223,
    category: "Cricket",
    description:
      "Hitman inspired design for Rohit Sharma fans. Show your cricket passion!",
    features: [
      "Hitman design",
      "Premium quality",
      "Cricket inspired",
      "Durable print",
    ],
    inStock: true,
  },

  // TV Series Category
  {
    id: "money-heist-skin",
    name: "Money Heist Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Money-Hiest-247x296.png",
    rating: 5,
    reviews: 298,
    category: "TV Series",
    badge: "Trending",
    description:
      "La Casa de Papel inspired design. Perfect for Money Heist fans!",
    features: [
      "Netflix series inspired",
      "Bold design",
      "Premium quality",
      "Fan favorite",
    ],
    inStock: true,
  },

  // Anime Category
  {
    id: "one-piece-skin",
    name: "One Piece Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/One-Piece-Mobile-skins-247x296.png",
    rating: 4,
    reviews: 234,
    category: "Anime",
    badge: "New",
    description:
      "Set sail with the Straw Hat Pirates! Premium One Piece anime skin.",
    features: [
      "Anime artwork",
      "Vibrant colors",
      "Otaku favorite",
      "High quality print",
    ],
    inStock: true,
  },

  // Abstract Category
  {
    id: "dark-owl-skin",
    name: "Dark Owl Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Dark-Owl-Mobile-Skins-247x296.webp",
    rating: 4,
    reviews: 156,
    category: "Abstract",
    description:
      "Mysterious dark owl design with premium finish. Perfect for nature lovers.",
    features: [
      "Wildlife inspired",
      "Dark theme",
      "Premium finish",
      "Unique design",
    ],
    inStock: true,
  },
  {
    id: "mighty-owl-skin",
    name: "Mighty Owl Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/mighty-Owl-Mobile-Skins-247x296.webp",
    rating: 4,
    reviews: 189,
    category: "Abstract",
    description: "Powerful owl design symbolizing wisdom and strength.",
    features: [
      "Wisdom symbol",
      "Artistic design",
      "Premium material",
      "Nature inspired",
    ],
    inStock: true,
  },
  {
    id: "owl-red-skin",
    name: "Owl Red Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Owl-Red-247x296.png",
    rating: 4,
    reviews: 134,
    category: "Abstract",
    description:
      "Striking red owl design with bold colors and artistic appeal.",
    features: [
      "Bold red design",
      "Artistic appeal",
      "Eye-catching",
      "Premium quality",
    ],
    inStock: true,
  },
  {
    id: "double-owl-skin",
    name: "Double Owl Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Doubble-Owl-247x296.png",
    rating: 4,
    reviews: 145,
    category: "Abstract",
    description:
      "Unique double owl design representing companionship and wisdom.",
    features: [
      "Dual owl design",
      "Symbolic meaning",
      "Artistic",
      "Premium print",
    ],
    inStock: true,
  },

  // Comedy Category
  {
    id: "mr-bean-skin",
    name: "Mr Bean Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Mr-Bean-247x296.png",
    rating: 4,
    reviews: 167,
    category: "Comedy",
    badge: "Fun",
    description:
      "Bring smiles with this hilarious Mr. Bean mobile skin. Perfect for comedy lovers!",
    features: [
      "Comedy classic",
      "Fun design",
      "Nostalgic appeal",
      "High quality",
    ],
    inStock: true,
  },

  // Celebrity Category
  {
    id: "the-rock-skin",
    name: "The Rock Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/The-Rock-247x296.png",
    rating: 4,
    reviews: 198,
    category: "Celebrity",
    description:
      "Can you smell what The Rock is cooking? Premium celebrity skin design.",
    features: [
      "Celebrity inspired",
      "WWE legend",
      "Motivational",
      "High quality print",
    ],
    inStock: true,
  },
  {
    id: "yash-skin",
    name: "Yash Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image: "/Premium Mobile Skins Archives - TheMobileWraps/yash-247x296.png",
    rating: 4,
    reviews: 187,
    category: "Celebrity",
    description: "KGF star Yash inspired design for Kannada cinema fans.",
    features: [
      "KGF inspired",
      "Regional cinema",
      "Fan favorite",
      "Premium design",
    ],
    inStock: true,
  },

  // Fashion Category
  {
    id: "trendy-girl-skin",
    name: "Trendy Girl Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Trendy-Girl-mobile-skins-247x296.webp",
    rating: 4,
    reviews: 145,
    category: "Fashion",
    description: "Stylish trendy girl design perfect for fashion enthusiasts.",
    features: [
      "Fashion forward",
      "Trendy design",
      "Stylish appeal",
      "Modern artwork",
    ],
    inStock: true,
  },
  {
    id: "trendy-girl-2-skin",
    name: "Trendy Girl 2 Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Trendy-Girl-2-247x296.png",
    rating: 4,
    reviews: 123,
    category: "Fashion",
    description:
      "Another stylish trendy girl design with modern fashion appeal.",
    features: [
      "Contemporary design",
      "Fashion inspired",
      "Artistic style",
      "Premium quality",
    ],
    inStock: true,
  },

  // Gothic Category
  {
    id: "skull-rose-skin",
    name: "Skull Rose Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Skull-Rose-247x296.png",
    rating: 4,
    reviews: 134,
    category: "Gothic",
    description:
      "Dark gothic design combining skull and rose elements. Perfect for gothic style lovers.",
    features: [
      "Gothic aesthetic",
      "Dark artwork",
      "Unique design",
      "Premium finish",
    ],
    inStock: true,
  },
  {
    id: "skull-plant-skin",
    name: "Skull Plant Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/skull-plant-247x296.png",
    rating: 4,
    reviews: 98,
    category: "Gothic",
    description:
      "Unique skull and plant combination for those who love dark botanical themes.",
    features: [
      "Dark botanical",
      "Unique concept",
      "Gothic style",
      "Artistic design",
    ],
    inStock: true,
  },

  // Animal Category
  {
    id: "half-face-lion-skin",
    name: "Half Face Lion Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Half-Face-Lion-247x296.png",
    rating: 5,
    reviews: 245,
    category: "Animal",
    badge: "Wild",
    description:
      "Majestic half-face lion design symbolizing strength and courage.",
    features: [
      "Lion artwork",
      "Majestic design",
      "Symbol of strength",
      "High detail",
    ],
    inStock: true,
  },

  // Motivational Category
  {
    id: "never-give-up-skin",
    name: "Never Give Up Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Never-Give-Up-247x296.png",
    rating: 4,
    reviews: 178,
    category: "Motivational",
    badge: "Inspire",
    description:
      "Inspirational design to keep you motivated every day. Never give up on your dreams!",
    features: [
      "Motivational message",
      "Inspirational design",
      "Daily motivation",
      "Premium quality",
    ],
    inStock: true,
  },

  // Pattern Category
  {
    id: "boom-skin",
    name: "Boom Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image: "/Premium Mobile Skins Archives - TheMobileWraps/boom-247x296.png",
    rating: 4,
    reviews: 156,
    category: "Pattern",
    description: "Dynamic boom pattern with explosive design elements.",
    features: [
      "Dynamic pattern",
      "Bold design",
      "Eye-catching",
      "Modern style",
    ],
    inStock: true,
  },
  {
    id: "boom-1-skin",
    name: "Boom 1 Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image: "/Premium Mobile Skins Archives - TheMobileWraps/Boom-1-247x296.png",
    rating: 4,
    reviews: 143,
    category: "Pattern",
    description:
      "Another explosive boom design with vibrant colors and dynamic elements.",
    features: [
      "Explosive design",
      "Vibrant colors",
      "Dynamic style",
      "Modern appeal",
    ],
    inStock: true,
  },
  {
    id: "numbers-skin",
    name: "Numbers Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Numbers-247x296.png",
    rating: 4,
    reviews: 134,
    category: "Pattern",
    description:
      "Mathematical numbers pattern for students and number enthusiasts.",
    features: [
      "Numbers pattern",
      "Educational theme",
      "Unique design",
      "Clean aesthetic",
    ],
    inStock: true,
  },

  // Culture Category
  {
    id: "berlin-skin",
    name: "Berlin Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image: "/Premium Mobile Skins Archives - TheMobileWraps/Berlin-247x296.png",
    rating: 4,
    reviews: 145,
    category: "Culture",
    description:
      "Berlin city inspired design for travel and culture enthusiasts.",
    features: [
      "City inspired",
      "Cultural design",
      "Travel theme",
      "European style",
    ],
    inStock: true,
  },
  {
    id: "chai-skin",
    name: "Chai Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image: "/Premium Mobile Skins Archives - TheMobileWraps/chai-247x296.png",
    rating: 4,
    reviews: 167,
    category: "Culture",
    description: "Celebrate Indian chai culture with this beautiful design.",
    features: [
      "Indian culture",
      "Chai theme",
      "Cultural pride",
      "Artistic design",
    ],
    inStock: true,
  },
  {
    id: "hindi-mobile-skin",
    name: "Hindi Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/hindi-mobile-skin-247x296.png",
    rating: 4,
    reviews: 189,
    category: "Culture",
    description:
      "Beautiful Hindi script design celebrating Indian language and culture.",
    features: [
      "Hindi script",
      "Cultural heritage",
      "Language pride",
      "Traditional design",
    ],
    inStock: true,
  },

  // Lifestyle Category
  {
    id: "bicycle-boy-skin",
    name: "Bicycle Boy Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/bycicle-boy-247x296.png",
    rating: 4,
    reviews: 123,
    category: "Lifestyle",
    description:
      "Active lifestyle design featuring bicycle theme. Perfect for cycling enthusiasts.",
    features: [
      "Cycling theme",
      "Active lifestyle",
      "Sports inspired",
      "Dynamic design",
    ],
    inStock: true,
  },
  {
    id: "illusion-girl-skin",
    name: "Illusion Girl Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/illusion-girl-247x296.png",
    rating: 4,
    reviews: 134,
    category: "Lifestyle",
    description: "Artistic illusion design with mysterious girl theme.",
    features: [
      "Optical illusion",
      "Artistic design",
      "Mysterious theme",
      "Creative artwork",
    ],
    inStock: true,
  },
  {
    id: "i-am-danger-skin",
    name: "I Am Danger Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/i-am-danger-247x296.png",
    rating: 4,
    reviews: 156,
    category: "Lifestyle",
    badge: "Bold",
    description: "Bold statement design for those who dare to be different.",
    features: [
      "Bold statement",
      "Attitude design",
      "Unique style",
      "Premium quality",
    ],
    inStock: true,
  },

  // Sports Category
  {
    id: "cricket1-skin",
    name: "Cricket 1 Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Cricket1-247x296.png",
    rating: 4,
    reviews: 178,
    category: "Sports",
    description:
      "Cricket themed design for passionate cricket fans and players.",
    features: [
      "Cricket theme",
      "Sports design",
      "Fan favorite",
      "Premium finish",
    ],
    inStock: true,
  },
  {
    id: "cricket7-skin",
    name: "Cricket 7 Mobile Back Skin For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Cricket7-247x296.png",
    rating: 4,
    reviews: 145,
    category: "Sports",
    description: "Another cricket design celebrating the gentleman's game.",
    features: [
      "Cricket artwork",
      "Sports enthusiasm",
      "Game celebration",
      "Quality print",
    ],
    inStock: true,
  },

  // Branded Collection
  {
    id: "mobile-skin-1",
    name: "Premium Mobile Skin 1 For All Mobile Phone Models",
    price: 149,
    originalPrice: 499,
    image:
      "/Premium Mobile Skins Archives - TheMobileWraps/Mobile-skin-1-247x296.png",
    rating: 4,
    reviews: 167,
    category: "Premium",
    description:
      "Premium collection mobile skin with exclusive design patterns.",
    features: [
      "Premium collection",
      "Exclusive design",
      "High quality",
      "Limited edition",
    ],
    inStock: true,
  },
  // Add more mobile skins as needed...
];

// Provider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products] = useState<Product[]>(allProducts);

  const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  };

  const getFeaturedProducts = (): Product[] => {
    return products
      .filter(
        (product) => product.badge !== null && product.badge !== undefined
      )
      .slice(0, 8);
  };

  const getAllCategories = (): string[] => {
    const categories = products.map((product) => product.category);
    return [...new Set(categories)].sort();
  };

  const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.description?.toLowerCase().includes(lowercaseQuery)
    );
  };

  const value: ProductContextType = {
    products,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getAllCategories,
    searchProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

// Custom hook to use the product context
const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export { useProducts };

export default ProductContext;
