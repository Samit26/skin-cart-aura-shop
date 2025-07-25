import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAdminAuth } from "../contexts/AdminAuthContext";

interface DashboardStats {
  overview: {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
  };
  recentOrders: Array<{
    _id: string;
    orderId: string;
    totalAmount: number;
    orderStatus: string;
    createdAt: string;
    user: {
      name: string;
      email: string;
    };
  }>;
  monthlyRevenue: Array<{
    _id: { year: number; month: number };
    revenue: number;
    orders: number;
  }>;
  topProducts: Array<{
    _id: string;
    name: string;
    totalSold: number;
    revenue: number;
    image: string;
  }>;
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardStats();
    }
  }, [isAuthenticated]);

  const getBackendToken = async () => {
    try {
      const response = await fetch("/api/admin-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.token) {
          localStorage.setItem("adminToken", result.token);
          return result.token;
        }
      }
      return null;
    } catch (error) {
      console.error("Error getting backend token:", error);
      return null;
    }
  };

  const fetchDashboardStats = async () => {
    try {
      // Try to get admin token first, then fallback to getting new token
      let token = localStorage.getItem("adminToken");

      // If no admin token, get one from backend
      if (!token && user) {
        token = await getBackendToken();
        if (!token) {
          setError("Failed to authenticate with backend");
          return;
        }
      }

      if (!token) {
        setError("Please login to access dashboard data");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/admin/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setStats(result.data);
        } else {
          setError("Failed to load dashboard data");
        }
      } else {
        if (response.status === 401) {
          // Token might be expired, try to get a new one
          localStorage.removeItem("adminToken");
          const newToken = await getBackendToken();
          if (newToken) {
            // Retry with new token
            fetchDashboardStats();
            return;
          }
          setError("Authentication failed. Please login again.");
        } else {
          setError(`Failed to fetch dashboard stats: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const calculateGrowth = (current: number, previous: number = 0) => {
    if (previous === 0) return "+0%";
    const growth = ((current - previous) / previous) * 100;
    return `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%`;
  };

  const dashboardStats = stats
    ? [
        {
          name: "Total Products",
          value: stats.overview.totalProducts.toString(),
          change: calculateGrowth(stats.overview.totalProducts),
        },
        {
          name: "Total Orders",
          value: stats.overview.totalOrders.toLocaleString(),
          change: calculateGrowth(stats.overview.totalOrders),
        },
        {
          name: "Revenue",
          value: formatCurrency(stats.overview.totalRevenue),
          change: calculateGrowth(stats.overview.totalRevenue),
        },
        {
          name: "Users",
          value: stats.overview.totalUsers.toLocaleString(),
          change: calculateGrowth(stats.overview.totalUsers),
        },
      ]
    : [];

  const quickActions = [
    { name: "Add Product", href: "/products/new", color: "bg-blue-600" },
    { name: "View Orders", href: "/orders", color: "bg-green-600" },
    { name: "Manage Users", href: "/users", color: "bg-purple-600" },
    { name: "Analytics", href: "/analytics", color: "bg-orange-600" },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-6">
          <div className="bg-gray-300 h-32 rounded-lg"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-300 h-32 rounded-lg"></div>
            ))}
          </div>
          <div className="bg-gray-300 h-64 rounded-lg"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-red-800">
            Error Loading Dashboard
          </h3>
          <p className="mt-2 text-red-700">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || user?.email || "Admin"}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-sm font-medium text-green-600">
                        {stat.change}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <button
                key={action.name}
                className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
                onClick={() => router.push(action.href)}
              >
                {action.name}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {stats?.recentOrders && stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order) => (
                <div key={order._id} className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      order.orderStatus === "completed"
                        ? "bg-green-500"
                        : order.orderStatus === "pending"
                        ? "bg-yellow-500"
                        : order.orderStatus === "processing"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600">
                    New order #{order.orderId} -{" "}
                    {formatCurrency(order.totalAmount)} by {order.user.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        {stats?.topProducts && stats.topProducts.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Top Selling Products
            </h2>
            <div className="space-y-4">
              {stats.topProducts.map((product) => (
                <div key={product._id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {product.image ? (
                      <img
                        className="h-12 w-12 rounded-lg object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">IMG</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.totalSold} sold •{" "}
                      {formatCurrency(product.revenue)} revenue
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
