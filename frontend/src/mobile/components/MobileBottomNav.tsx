import { Home, Search, Heart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/mobile" },
    { icon: Search, label: "Search", path: "/mobile/products" },
    { icon: Heart, label: "Favorites", path: "/mobile/favorites" },
    { icon: User, label: "Account", path: "/mobile/account" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                active ? "text-blue-400" : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
