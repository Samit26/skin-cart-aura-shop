import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import MobileLayout from "../components/MobileLayout";
import { useCart } from "@/contexts/CartContext";

const MobileCart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getCartTotal, getCartCount } =
    useCart();

  const subtotal = getCartTotal();
  const freeDelivery = getCartCount() >= 2;
  const deliveryCharge = freeDelivery ? 0 : 99;
  const total = subtotal + deliveryCharge;

  if (items.length === 0) {
    return (
      <MobileLayout title="Cart" showCart={false}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-8">
              Add some amazing skins to get started
            </p>
            <button
              onClick={() => navigate("/mobile/products")}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium"
            >
              Shop Now
            </button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Cart" showCart={false}>
      <div className="p-4 pb-32">
        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-700 rounded-xl p-4">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-600"
                />
                <div className="flex-1">
                  <h3 className="font-medium mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{item.category}</p>
                  <p className="text-green-400 font-bold">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Free Delivery Banner */}
        {freeDelivery && (
          <div className="bg-green-600 text-white p-4 rounded-xl mb-6 text-center">
            🚚 Congratulations! You get FREE delivery!
          </div>
        )}
      </div>

      {/* Fixed Bottom Checkout */}
      <div className="fixed bottom-20 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({items.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery</span>
            <span className={freeDelivery ? "text-green-400" : ""}>
              {freeDelivery ? "FREE" : `$${deliveryCharge.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t border-gray-600 pt-3">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold">
          Proceed to Checkout
        </button>
      </div>
    </MobileLayout>
  );
};

export default MobileCart;
