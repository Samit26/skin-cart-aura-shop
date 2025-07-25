import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import MobileLayout from "../components/MobileLayout";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";

const MobileProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, getFeaturedProducts } = useProducts();
  const { addToCart } = useCart();

  const [selectedBrand, setSelectedBrand] = useState("Select Brand");
  const [selectedModel, setSelectedModel] = useState("Select Model");
  const [selectedMaterial, setSelectedMaterial] = useState("Matte");

  const product = id ? getProductById(id) : null;
  if (!product) {
    return (
      <MobileLayout
        title="Product"
        showBackButton
        onBackClick={() => navigate(-1)}
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
            <p className="text-gray-400 mb-4">
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/mobile/products")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium"
            >
              Browse Products
            </button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
  };

  const relatedProducts = getFeaturedProducts().slice(0, 3);

  const reviews = [
    {
      id: 1,
      name: "Sophia Carter",
      time: "2 weeks ago",
      rating: 5,
      comment:
        "Absolutely love this skin! The design is even more vibrant in person, and it fits my phone perfectly. Highly recommend!",
      likes: 15,
      dislikes: 2,
    },
    {
      id: 2,
      name: "Ethan Hayes",
      time: "1 month ago",
      rating: 4,
      comment:
        "Great quality skin. The abstract art design is unique and stylish. The customization option was a nice touch.",
      likes: 8,
      dislikes: 1,
    },
  ];

  return (
    <MobileLayout
      title=""
      showBackButton
      onBackClick={() => navigate(-1)}
      showCart={true}
    >
      <div className="pb-24">
        {" "}
        {/* Product Image */}
        <div className="h-96 py-2 border-4 rounded-2xl bg-white">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl  max-w-64"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=400&fit=crop";
              }}
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="px-4 py-6 space-y-6">
          {/* Title and Description */}
          <div>
            <h1 className="text-2xl font-bold mb-3">{product.name}</h1>
            <p className="text-gray-400 leading-relaxed">
              Elevate your phone's style with our {product.name}. This unique
              design adds a touch of modern art to your device, making it stand
              out from the crowd.
            </p>
          </div>
          {/* Price */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Price</h3>
            <p className="text-2xl font-bold text-white">${product.price}</p>
          </div>
          {/* Choose Your Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Choose Your Brand
            </h3>
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg appearance-none border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="Select Brand">Select Brand</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Google">Google</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Nothing">Nothing</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
          {/* Choose Your Model */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Choose Your Model
            </h3>
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg appearance-none border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="Select Model">Select Model</option>
                <option value="iPhone 15 Pro Max">iPhone 15 Pro Max</option>
                <option value="iPhone 15 Pro">iPhone 15 Pro</option>
                <option value="iPhone 15">iPhone 15</option>
                <option value="Samsung Galaxy S24">Samsung Galaxy S24</option>
                <option value="Google Pixel 8">Google Pixel 8</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
          {/* Material */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Material</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedMaterial("Matte")}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedMaterial === "Matte"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Matte
              </button>
              <button
                onClick={() => setSelectedMaterial("Glossy")}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedMaterial === "Glossy"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Glossy
              </button>
            </div>
          </div>
          {/* Wrap Type */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Wrap Type</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-700 px-4 py-3 rounded-lg">
                <span className="text-white">
                  Full Body Wrap (Cover Sides & Edges)
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-lg">
                <span className="text-gray-400">Only Back (No Sides)</span>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold"
            >
              Add to Cart
            </button>
            <button className="flex-1 bg-gray-700 text-white py-4 rounded-xl font-semibold">
              Buy Now
            </button>
          </div>
          {/* Reviews & Ratings */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Reviews & Ratings
            </h3>

            {/* Rating Summary */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">4.5</div>
                <div className="flex items-center justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < 4 ? "text-yellow-400 fill-current" : "text-gray-600"
                      }
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-400">125 reviews</div>
              </div>

              <div className="flex-1 space-y-1">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 w-2">{rating}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width:
                            rating === 5 ? "60%" : rating === 4 ? "30%" : "10%",
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400 w-8">
                      {rating === 5 ? "60%" : rating === 4 ? "30%" : "10%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-700 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {review.name[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {review.name}
                      </div>
                      <div className="text-sm text-gray-400">{review.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-3">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                      <ThumbsUp size={16} />
                      <span>{review.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                      <ThumbsDown size={16} />
                      <span>{review.dislikes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>{" "}
          {/* You Might Also Like */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              You Might Also Like
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() =>
                    navigate(`/mobile/product/${relatedProduct.id}`)
                  }
                  className="flex-shrink-0 w-40 cursor-pointer"
                >
                  <div className="bg-gray-700 rounded-xl overflow-hidden mb-3 aspect-[3/4]">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=250&fit=crop";
                      }}
                    />
                  </div>
                  <h4 className="font-medium text-sm mb-1 line-clamp-2 text-white">
                    {relatedProduct.name}
                  </h4>
                  <p className="text-green-400 font-bold text-sm">
                    ${relatedProduct.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileProductDetail;
