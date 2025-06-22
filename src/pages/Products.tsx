
import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import BrandModelSelector from '@/components/BrandModelSelector';
import ProductFilters from '@/components/ProductFilters';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';

const Products = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    sortBy: 'popularity'
  });

  // Mock products data
  const allProducts = [
    {
      id: '1',
      name: 'Naruto Hokage Skin',
      price: 599,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      rating: 5,
      reviews: 256,
      category: 'Anime'
    },
    {
      id: '2',
      name: 'Iron Man Arc Reactor',
      price: 649,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
      rating: 5,
      reviews: 189,
      category: 'Marvel'
    },
    {
      id: '3',
      name: 'Neon Cyberpunk',
      price: 699,
      image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400',
      rating: 4,
      reviews: 145,
      category: 'Neon'
    },
    {
      id: '4',
      name: 'Minimal Black',
      price: 549,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      rating: 4,
      reviews: 203,
      category: 'Minimalist'
    },
    {
      id: '5',
      name: 'Abstract Waves',
      price: 599,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
      rating: 5,
      reviews: 167,
      category: 'Abstract'
    },
    {
      id: '6',
      name: 'Dragon Ball Z Goku',
      price: 649,
      image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400',
      rating: 5,
      reviews: 298,
      category: 'Anime'
    }
  ];

  // Filter products based on search and filters
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id.localeCompare(a.id);
      default: // popularity
        return b.reviews - a.reviews;
    }
  });

  const handleAddToCart = (productId: string) => {
    console.log('Adding to cart:', productId);
    alert('Added to cart! (Cart functionality will be implemented with backend)');
  };

  const handleQuickView = (productId: string) => {
    console.log('Quick view:', productId);
    alert('Quick view modal will be implemented');
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      
      <main className="container-max section-padding py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-poppins font-bold mb-4">Premium Phone Skins</h1>
          <p className="text-light-text text-lg">Transform your device with our exclusive collection</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Brand & Model Selector */}
        <BrandModelSelector 
          selectedBrand={selectedBrand}
          selectedModel={selectedModel}
          onBrandChange={setSelectedBrand}
          onModelChange={setSelectedModel}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64">
            <ProductFilters 
              filters={filters}
              onFiltersChange={setFilters}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-light-text">
                Showing {sortedProducts.length} of {allProducts.length} products
                {searchQuery && (
                  <span> for "{searchQuery}"</span>
                )}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-light-text">Sort by:</span>
                <select 
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={handleAddToCart}
                    onQuickView={handleQuickView}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-light-text text-lg mb-4">No products found</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({ categories: [], sortBy: 'popularity' });
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Products;
