
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-jet-black text-white mt-20">
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyber-yellow rounded-lg flex items-center justify-center">
                <span className="text-jet-black font-bold text-lg">S</span>
              </div>
              <span className="font-poppins text-xl font-bold">SkinCart</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transform your phone with premium custom skins. Quality guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/products" className="block text-gray-400 hover:text-cyber-yellow transition-colors">
                All Products
              </Link>
              <Link to="/brands" className="block text-gray-400 hover:text-cyber-yellow transition-colors">
                Brands
              </Link>
              <Link to="/track-order" className="block text-gray-400 hover:text-cyber-yellow transition-colors">
                Track Order
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-poppins font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link to="/contact" className="block text-gray-400 hover:text-cyber-yellow transition-colors">
                Contact Us
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-cyber-yellow transition-colors">
                About Us
              </Link>
              <a href="#" className="block text-gray-400 hover:text-cyber-yellow transition-colors">
                FAQ
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-poppins font-semibold mb-4">Join SkinClub</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive deals and new skin alerts
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyber-yellow"
              />
              <button className="bg-cyber-yellow text-jet-black px-4 py-2 rounded-r-lg font-medium hover:bg-yellow-500 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2024 SkinCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
