import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { useCart } from "@/contexts/CartContextNew";

const Cart = () => {
  const {
    cart,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
    loadCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  useEffect(() => {
    // Load cart when component mounts
    loadCart();
  }, [loadCart]);

  const subtotal = getCartTotal();
  const freeDelivery = getCartCount() >= 2;
  const deliveryCharge = freeDelivery ? 0 : 99;
  const total = subtotal + deliveryCharge;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setPromoLoading(true);
    try {
      await applyPromoCode(promoCode);
      setPromoCode("");
    } catch (err) {
      console.error("Error applying promo code:", err);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleRemovePromo = async () => {
    setPromoLoading(true);
    try {
      await removePromoCode();
    } catch (err) {
      console.error("Error removing promo code:", err);
    } finally {
      setPromoLoading(false);
    }
  };

  // Show loading state
  if (loading && !cart) {
    return (
      <div className="min-h-screen bg-light-bg">
        <Header />
        <main className="container-max section-padding py-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyber-yellow mx-auto mb-4"></div>
            <p className="text-light-text">Loading your cart...</p>
          </div>
        </main>
        <Footer />
        <FloatingChat />
      </div>
    );
  }

  // Show error state
  if (error && !cart) {
    return (
      <div className="min-h-screen bg-light-bg">
        <Header />
        <main className="container-max section-padding py-8">
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">Error loading cart: {error}</p>
            <button onClick={loadCart} className="btn-primary">
              Try Again
            </button>
          </div>
        </main>
        <Footer />
        <FloatingChat />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-light-bg">
        <Header />

        <main className="container-max section-padding py-8">
          <div className="text-center py-20">
            <ShoppingBag size={64} className="mx-auto text-light-text mb-4" />
            <h1 className="text-4xl font-poppins font-bold mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-light-text text-lg mb-8">
              Looks like you haven't added any skins yet
            </p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </main>

        <Footer />
        <FloatingChat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg">
      <Header />

      <main className="container-max section-padding py-8">
        <h1 className="text-3xl font-poppins font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={
                        typeof item.product.images[0] === "string"
                          ? item.product.images[0]
                          : item.product.images[0]?.url || "/placeholder.svg"
                      }
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-poppins font-medium">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-light-text">
                            {item.selectedBrand} {item.selectedModel}
                          </p>
                          <p className="text-sm text-light-text">
                            Bundle: {item.selectedBundle}
                          </p>
                          <p className="font-poppins font-semibold text-lg mt-1">
                            ₹{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          disabled={loading}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                          disabled={loading}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                          disabled={loading}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Continue Shopping */}
            <div className="mt-6">
              <Link to="/products" className="btn-secondary">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-poppins font-semibold mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({getCartCount()} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className={freeDelivery ? "text-success-green" : ""}>
                    {freeDelivery ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                {freeDelivery && (
                  <div className="bg-success-green text-white p-3 rounded-lg text-sm text-center">
                    🎉 Free delivery applied!
                  </div>
                )}
                {cart.appliedPromo && (
                  <div className="flex justify-between text-success-green">
                    <span>Promo ({cart.appliedPromo.code})</span>
                    <span>-₹{cart.totalAmount - cart.finalAmount}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between font-poppins font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    ₹
                    {cart.appliedPromo
                      ? cart.finalAmount + deliveryCharge
                      : total}
                  </span>
                </div>
              </div>

              <button className="w-full btn-primary mb-4">
                Proceed to Checkout
              </button>

              <div className="text-center">
                <p className="text-xs text-light-text">
                  Secure checkout powered by Razorpay
                </p>
              </div>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                {cart.appliedPromo ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-success-green font-medium">
                        ✓ {cart.appliedPromo.code} applied
                      </span>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      disabled={promoLoading}
                      className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      disabled={promoLoading}
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={promoLoading || !promoCode.trim()}
                      className="btn-secondary px-4 py-2 text-sm disabled:opacity-50"
                    >
                      {promoLoading ? "Applying..." : "Apply"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Cart;
