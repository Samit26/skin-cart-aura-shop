
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Mock cart count

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Navigate to products page with search query
    if (query) {
      window.location.href = `/products?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-success-green text-white text-center py-2 px-4 sticky top-0 z-50">
        <p className="text-sm font-medium">
          🚚 Buy two skins and get free delivery
        </p>
      </div>

      {/* Main Header */}
      <header className="bg-jet-black text-white sticky top-8 z-40 shadow-lg">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyber-yellow rounded-lg flex items-center justify-center">
                <span className="text-jet-black font-bold text-lg">S</span>
              </div>
              <span className="font-poppins text-xl font-bold">SkinCart</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/products" className="hover:text-cyber-yellow transition-colors">
                Products
              </Link>
              <Link to="/products?brand=all" className="hover:text-cyber-yellow transition-colors">
                Brands
              </Link>
              <Link to="/about" className="hover:text-cyber-yellow transition-colors">
                About
              </Link>
              <Link to="/contact" className="hover:text-cyber-yellow transition-colors">
                Contact
              </Link>
              <Link to="/track-order" className="hover:text-cyber-yellow transition-colors">
                Track Order
              </Link>
            </nav>

            {/* Search & Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:block">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              {/* Mobile Search Button */}
              <button className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Search size={20} />
              </button>

              {/* Cart */}
              <Link to="/cart" className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cyber-yellow text-jet-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link to="/account" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <User size={20} />
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 animate-fade-in">
              {/* Mobile Search */}
              <div className="mb-4">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              <nav className="flex flex-col space-y-2">
                <Link 
                  to="/products" 
                  className="py-2 hover:text-cyber-yellow transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/products?brand=all" 
                  className="py-2 hover:text-cyber-yellow transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Brands
                </Link>
                <Link 
                  to="/about" 
                  className="py-2 hover:text-cyber-yellow transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="py-2 hover:text-cyber-yellow transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  to="/track-order" 
                  className="py-2 hover:text-cyber-yellow transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Track Order
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
