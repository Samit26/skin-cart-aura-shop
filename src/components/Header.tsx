
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <Link to="/brands" className="hover:text-cyber-yellow transition-colors">
                Brands
              </Link>
              <Link to="/about" className="hover:text-cyber-yellow transition-colors">
                About
              </Link>
              <Link to="/contact" className="hover:text-cyber-yellow transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Search size={20} />
              </button>
              <Link to="/cart" className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-cyber-yellow text-jet-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </Link>
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
              <nav className="flex flex-col space-y-2">
                <Link to="/products" className="py-2 hover:text-cyber-yellow transition-colors">
                  Products
                </Link>
                <Link to="/brands" className="py-2 hover:text-cyber-yellow transition-colors">
                  Brands
                </Link>
                <Link to="/about" className="py-2 hover:text-cyber-yellow transition-colors">
                  About
                </Link>
                <Link to="/contact" className="py-2 hover:text-cyber-yellow transition-colors">
                  Contact
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
