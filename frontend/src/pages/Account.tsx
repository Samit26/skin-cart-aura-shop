import { Link } from "react-router-dom";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { useAuth } from "@/hooks/useAuth";

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();

  // Mock user data (this would come from the auth context in real implementation)
  const userData = {
    name: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    phone: user?.phone || "+91 9876543210",
    orders: [
      { id: "SK001", date: "2024-01-15", status: "Delivered", total: 1198 },
      { id: "SK002", date: "2024-01-10", status: "Shipped", total: 599 },
    ],
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-light-bg">
        <Header />

        <main className="container-max section-padding py-8">
          <div className="text-center py-20">
            <h1 className="text-4xl font-poppins font-bold mb-4">My Account</h1>
            <p className="text-light-text text-lg mb-8">
              Login or register to access your account
            </p>
            <div className="flex gap-4 justify-center">
              <SignInButton mode="modal">
                <button className="btn-primary">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn-secondary">Sign Up</button>
              </SignUpButton>
            </div>
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-poppins font-bold">My Account</h1>
            <button onClick={logout} className="btn-secondary">
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-poppins font-semibold mb-4">
                  Profile Info
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-light-text">Name</label>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-light-text">Email</label>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-light-text">Phone</label>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                  <button className="w-full btn-primary mt-4">
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                <h3 className="font-poppins font-semibold mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    to="/track-order"
                    className="block w-full text-left btn-secondary"
                  >
                    Track Order
                  </Link>
                  <button className="w-full text-left btn-secondary">
                    Wishlist
                  </button>
                  <button className="w-full text-left btn-secondary">
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>

            {/* Orders */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-poppins font-semibold mb-6">
                  Recent Orders
                </h2>
                <div className="space-y-4">
                  {userData.orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-poppins font-medium">
                            Order #{order.id}
                          </h3>
                          <p className="text-sm text-light-text">
                            {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${
                              order.status === "Delivered"
                                ? "bg-success-green text-white"
                                : "bg-cyber-yellow text-jet-black"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-poppins font-semibold">
                          ₹{order.total}
                        </span>
                        <div className="flex gap-2">
                          <Link
                            to={`/track-order?id=${order.id}`}
                            className="text-sm btn-secondary px-3 py-1"
                          >
                            Track
                          </Link>
                          <button className="text-sm btn-secondary px-3 py-1">
                            Reorder
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <button className="btn-primary">View All Orders</button>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                <h2 className="text-xl font-poppins font-semibold mb-6">
                  Account Settings
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="btn-secondary text-left">
                    Change Password
                  </button>
                  <button className="btn-secondary text-left">
                    Address Book
                  </button>
                  <button className="btn-secondary text-left">
                    Notification Settings
                  </button>
                  <button className="btn-secondary text-left">
                    Privacy Settings
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

export default Account;
