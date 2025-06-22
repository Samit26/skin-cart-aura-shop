
import { useState } from 'react';
import { Search, Package, Truck, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const OrderTracking = () => {
  const [trackingInput, setTrackingInput] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;

    // Mock order data
    setOrderData({
      orderId: trackingInput,
      status: 'shipped',
      estimatedDelivery: '2-3 days',
      items: [
        { name: 'Naruto Hokage Skin', model: 'iPhone 15 Pro', quantity: 1 },
        { name: 'Goku Super Saiyan Skin', model: 'iPhone 15 Pro', quantity: 1 },
      ],
      timeline: [
        { status: 'placed', title: 'Order Placed', completed: true, date: '2 days ago' },
        { status: 'printed', title: 'Printed & Packed', completed: true, date: '1 day ago' },
        { status: 'shipped', title: 'Shipped', completed: true, date: '12 hours ago' },
        { status: 'delivered', title: 'Delivered', completed: false, date: 'Expected in 2-3 days' },
      ]
    });
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    const iconClass = completed ? 'text-success-green' : 'text-gray-400';
    
    switch (status) {
      case 'placed':
        return <CheckCircle className={iconClass} size={24} />;
      case 'printed':
        return <Package className={iconClass} size={24} />;
      case 'shipped':
        return <Truck className={iconClass} size={24} />;
      case 'delivered':
        return <CheckCircle className={iconClass} size={24} />;
      default:
        return <CheckCircle className={iconClass} size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      
      <main className="container-max section-padding py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-poppins font-bold mb-4">Track Your Order</h1>
            <p className="text-light-text">Enter your order ID or email to track your skinning journey</p>
          </div>

          {/* Tracking Form */}
          <form onSubmit={handleTrack} className="mb-8">
            <div className="flex gap-4">
              <Input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Enter Order ID or Email"
                className="flex-1"
                required
              />
              <Button type="submit" className="btn-primary flex items-center gap-2">
                <Search size={18} />
                Track
              </Button>
            </div>
          </form>

          {/* Order Results */}
          {orderData && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-jet-black text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-poppins font-bold">Order #{orderData.orderId}</h2>
                    <p className="text-gray-300">Estimated delivery: {orderData.estimatedDelivery}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-cyber-yellow text-jet-black px-3 py-1 rounded-lg font-medium capitalize">
                      {orderData.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-poppins font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-light-text">Model: {item.model}</p>
                      </div>
                      <span className="text-sm text-light-text">Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="p-6">
                <h3 className="font-poppins font-semibold mb-6">Order Timeline</h3>
                <div className="space-y-6">
                  {orderData.timeline.map((step: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(step.status, step.completed)}
                      </div>
                      <div className={`flex-1 ${index < orderData.timeline.length - 1 ? 'border-l-2 border-gray-200 pb-6 ml-3' : ''}`}>
                        <div className="ml-6">
                          <h4 className={`font-medium ${step.completed ? 'text-dark-text' : 'text-gray-400'}`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-light-text">{step.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gray-50 p-6">
                <div className="text-center">
                  <p className="text-sm text-light-text mb-3">
                    Need help with your order?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" className="btn-secondary">
                      Contact Support
                    </Button>
                    <Button variant="outline" className="btn-secondary">
                      WhatsApp Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          {!orderData && (
            <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
              <h3 className="font-poppins font-semibold mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">Contact Support</h4>
                  <p className="text-sm text-light-text mb-3">Get help with your order</p>
                  <Button variant="outline" className="btn-secondary">
                    Email Us
                  </Button>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">WhatsApp Support</h4>
                  <p className="text-sm text-light-text mb-3">Quick chat support</p>
                  <Button variant="outline" className="btn-secondary">
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default OrderTracking;
