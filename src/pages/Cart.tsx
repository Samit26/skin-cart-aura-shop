
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Naruto Hokage Skin',
      price: 599,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      brand: 'iPhone',
      model: '15 Pro',
      quantity: 1
    },
    {
      id: '2',
      name: 'Iron Man Arc Reactor',
      price: 649,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300',
      brand: 'iPhone',
      model: '15 Pro',
      quantity: 1
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeDelivery = cartItems.length >= 2;
  const deliveryCharge = freeDelivery ? 0 : 99;
  const total = subtotal + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-light-bg">
        <Header />
        
        <main className="container-max section-padding py-8">
          <div className="text-center py-20">
            <ShoppingBag size={64} className="mx-auto text-light-text mb-4" />
            <h1 className="text-4xl font-poppins font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-light-text text-lg mb-8">Looks like you haven't added any skins yet</p>
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
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-poppins font-medium">{item.name}</h3>
                          <p className="text-sm text-light-text">
                            {item.brand} {item.model}
                          </p>
                          <p className="font-poppins font-semibold text-lg mt-1">
                            ₹{item.price}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-4">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
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
              <h2 className="text-xl font-poppins font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className={freeDelivery ? 'text-success-green' : ''}>
                    {freeDelivery ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                {freeDelivery && (
                  <div className="bg-success-green text-white p-3 rounded-lg text-sm text-center">
                    🎉 Free delivery applied!
                  </div>
                )}
                <hr />
                <div className="flex justify-between font-poppins font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
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
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button className="btn-secondary px-4 py-2 text-sm">
                    Apply
                  </button>
                </div>
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
