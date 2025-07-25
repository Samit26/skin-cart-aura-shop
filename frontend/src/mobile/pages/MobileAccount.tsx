import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, X } from "lucide-react";
import MobileLayout from "../components/MobileLayout";

const MobileAccount = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state

  const favoriteItems = [
    {
      id: "1",
      name: "Mint Green Case",
      image:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200&h=200&fit=crop",
      price: 29.99,
    },
    {
      id: "2",
      name: "Rose Gold Case",
      image:
        "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=200&h=200&fit=crop",
      price: 34.99,
    },
    {
      id: "3",
      name: "Coral Case",
      image:
        "https://images.unsplash.com/photo-1574435907806-9db0aef7f1c4?w=200&h=200&fit=crop",
      price: 32.99,
    },
    {
      id: "4",
      name: "Cream Case",
      image:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200&h=200&fit=crop",
      price: 31.99,
    },
  ];

  const accountMenuItems = [
    { label: "Profile Information", icon: ChevronRight },
    { label: "Payment Methods", icon: ChevronRight },
    { label: "Addresses", icon: ChevronRight },
  ];

  const supportMenuItems = [
    { label: "Help Center", icon: ChevronRight },
    { label: "Contact Us", icon: ChevronRight },
  ];

  if (!isLoggedIn) {
    return (
      <MobileLayout title="Account" showCart={false}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">👤</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Wrapify</h2>
            <p className="text-gray-400 mb-8">Sign in to access your account</p>
            <div className="space-y-3 w-full max-w-xs">
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium">
                Sign In
              </button>
              <button className="w-full border border-gray-600 text-white py-3 rounded-xl font-medium">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Account" showCart={false}>
      <div className="p-4 space-y-8">
        {/* Profile Section */}
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold">Sophia Carter</h2>
          <p className="text-gray-400">@sophia.carter</p>
        </div>

        {/* Orders Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Orders</h3>
          <div className="bg-gray-700 rounded-xl p-4 flex items-center justify-between">
            <span>Order History</span>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>

        {/* Favorites Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Favorites</h3>
          <div className="grid grid-cols-2 gap-3">
            {favoriteItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => navigate(`/mobile/product/${item.id}`)}
              >
                <div className="aspect-square">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <div className="space-y-3">
            {accountMenuItems.map((item) => (
              <div
                key={item.label}
                className="bg-gray-700 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-600 transition-colors"
              >
                <span>{item.label}</span>
                <item.icon size={20} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Help & Support Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
          <div className="space-y-3">
            {supportMenuItems.map((item) => (
              <div
                key={item.label}
                className="bg-gray-700 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-600 transition-colors"
              >
                <span>{item.label}</span>
                <item.icon size={20} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setIsLoggedIn(false)}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium"
        >
          Logout
        </button>
      </div>
    </MobileLayout>
  );
};

export default MobileAccount;
