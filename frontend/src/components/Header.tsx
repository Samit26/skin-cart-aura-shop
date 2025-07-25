import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import SearchBar from "./SearchBar";
import { useCart } from "@/contexts/CartContextNew";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const cartCount = getCartCount();

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Navigate to products page with search query
    if (query) {
      window.location.href = `/products?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <>
      {/* Main Header */}
      <header className="bg-white text-black sticky top-0 z-40 shadow-sm border-b border-gray-200">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-poppins text-xl font-bold text-black">
                SkinIt
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 ml-12">
              <Link
                to="/products?brand=all"
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                Products
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                Track Order
              </Link>
              <Link
                to="/products?filter=new"
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                New Arrivals
              </Link>
            </nav>

            {/* Search & Icons */}
            <div className="flex items-center space-x-6 ml-auto">
              {/* Search Bar */}
              <div className="hidden md:block">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Mobile Search Button */}
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Search size={20} className="text-gray-700" />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <ShoppingCart size={24} className="text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Authentication */}
              {isAuthenticated ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <User size={24} className="text-gray-700" />
                  </button>
                </SignInButton>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                      isMenuOpen
                        ? "rotate-45 translate-y-1"
                        : "-translate-y-0.5"
                    }`}
                  ></span>
                  <span
                    className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                      isMenuOpen
                        ? "-rotate-45 -translate-y-1"
                        : "translate-y-0.5"
                    }`}
                  ></span>
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
                  to="/products?brand=all"
                  className="py-2 hover:text-black transition-colors text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Phone Brand
                </Link>
                <Link
                  to="/products"
                  className="py-2 hover:text-black transition-colors text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Design Style
                </Link>
                <Link
                  to="/products?filter=new"
                  className="py-2 hover:text-black transition-colors text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  New Arrivals
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
