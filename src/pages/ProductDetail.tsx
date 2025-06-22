
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import BrandModelSelector from '@/components/BrandModelSelector';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock product data
  const product = {
    id: id || '1',
    name: 'Naruto Hokage Skin',
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 256,
    category: 'Anime',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600',
    ],
    description: 'Transform your phone with this stunning Naruto Hokage design. Premium quality vinyl material with precise cutouts for all ports and buttons.',
    features: [
      'Premium vinyl material',
      'Bubble-free application',
      'Precise cutouts',
      'Scratch resistant',
      'Easy removal'
    ]
  };

  const reviews = [
    { name: 'Rohit K.', rating: 5, comment: 'Amazing quality! Looks exactly like the picture.', date: '2 days ago' },
    { name: 'Priya S.', rating: 5, comment: 'Perfect fit for my iPhone. Super happy!', date: '1 week ago' },
    { name: 'Arjun M.', rating: 4, comment: 'Good quality but shipping took longer than expected.', date: '2 weeks ago' },
  ];

  const relatedProducts = [
    { id: '2', name: 'Goku Super Saiyan', price: 649, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300' },
    { id: '3', name: 'One Piece Luffy', price: 599, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300' },
    { id: '4', name: 'Attack on Titan', price: 699, image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=300' },
  ];

  const handleAddToCart = () => {
    if (!selectedBrand || !selectedModel) {
      alert('Please select your phone brand and model first!');
      return;
    }
    console.log('Adding to cart:', { product: product.id, brand: selectedBrand, model: selectedModel, quantity });
    alert('Added to cart successfully!');
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      
      <main className="container-max section-padding py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    activeImageIndex === index ? 'border-cyber-yellow' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-poppins font-bold">{product.name}</h1>
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Heart size={20} />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < product.rating ? 'fill-cyber-yellow text-cyber-yellow' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <span className="text-sm text-light-text">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-poppins font-bold">₹{product.price}</span>
                <span className="text-xl text-light-text line-through">₹{product.originalPrice}</span>
                <span className="bg-success-green text-white px-2 py-1 rounded text-sm">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>
            </div>

            {/* Brand & Model Selection */}
            <BrandModelSelector 
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              onBrandChange={setSelectedBrand}
              onModelChange={setSelectedModel}
            />

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <button 
                onClick={handleAddToCart}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              {quantity >= 2 && (
                <div className="bg-success-green text-white p-3 rounded-lg text-center">
                  🚚 Free delivery applied!
                </div>
              )}
            </div>

            {/* Product Features */}
            <div>
              <h3 className="font-poppins font-semibold mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyber-yellow rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-poppins font-bold mb-4">Description</h2>
          <p className="text-light-text leading-relaxed">{product.description}</p>
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-poppins font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-poppins font-medium">{review.name}</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < review.rating ? 'fill-cyber-yellow text-cyber-yellow' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-light-text">{review.date}</span>
                </div>
                <p className="text-light-text">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-poppins font-bold mb-6">Related Skins</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="product-card">
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="font-poppins font-medium mb-2">{relatedProduct.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-poppins font-semibold">₹{relatedProduct.price}</span>
                  <button className="text-cyber-yellow hover:text-yellow-600">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default ProductDetail;
