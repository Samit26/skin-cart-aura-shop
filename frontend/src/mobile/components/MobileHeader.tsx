import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface MobileHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showCart?: boolean;
}

const MobileHeader = ({
  title = "Wrapify",
  showBackButton = false,
  onBackClick,
  showCart = true,
}: MobileHeaderProps) => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        {showBackButton ? (
          <button onClick={onBackClick} className="mr-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        ) : null}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      {showCart && (
        <div className="relative">
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </div>
      )}
    </header>
  );
};

export default MobileHeader;
