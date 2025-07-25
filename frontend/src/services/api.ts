import axios from "axios";
import type {
  ApiResponse,
  Product,
  User,
  Cart,
  Order,
  RegisterData,
  LoginCredentials,
  Address,
  ProductFilters,
  PaymentMethod,
  PaymentInitiation,
  PaymentResponse,
} from "../types";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let getClerkToken: (() => Promise<string | null>) | null = null;

// Function to set the Clerk token provider
export const setClerkTokenProvider = (
  tokenProvider: () => Promise<string | null>
) => {
  getClerkToken = tokenProvider;
};

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    if (getClerkToken) {
      const token = await getClerkToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - Clerk will handle this automatically
      console.error("Unauthorized request:", error);
    }
    return Promise.reject(error);
  }
);

// Product API
export const productAPI = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
  },

  // Get single product by ID
  getProduct: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category: string, params = {}) => {
    const response = await api.get(`/products/category/${category}`, {
      params,
    });
    return response.data;
  },

  // Search products
  searchProducts: async (query: string, params = {}) => {
    const response = await api.get("/products/search", {
      params: { q: query, ...params },
    });
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get("/products", {
      params: { featured: true, limit: 8 },
    });
    return response.data;
  },
};

// User API
export const userAPI = {
  // Register new user
  register: async (
    userData: RegisterData
  ): Promise<ApiResponse<{ token: string; user: User }>> => {
    const response = await api.post("/users/register", userData);
    return response.data;
  },

  // Login user
  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<{ token: string; user: User }>> => {
    const response = await api.post("/users/login", credentials);
    return response.data;
  },

  // Get user profile
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  // Update user profile
  updateProfile: async (
    profileData: Partial<User>
  ): Promise<ApiResponse<User>> => {
    const response = await api.put("/users/profile", profileData);
    return response.data;
  },

  // Add address
  addAddress: async (
    addressData: Omit<Address, "_id">
  ): Promise<ApiResponse<Address>> => {
    const response = await api.post("/users/addresses", addressData);
    return response.data;
  },

  // Update address
  updateAddress: async (
    addressId: string,
    addressData: Partial<Address>
  ): Promise<ApiResponse<Address>> => {
    const response = await api.put(
      `/users/addresses/${addressId}`,
      addressData
    );
    return response.data;
  },

  // Delete address
  deleteAddress: async (addressId: string) => {
    const response = await api.delete(`/users/addresses/${addressId}`);
    return response.data;
  },

  // Get wishlist
  getWishlist: async () => {
    const response = await api.get("/users/wishlist");
    return response.data;
  },

  // Add to wishlist
  addToWishlist: async (productId: string) => {
    const response = await api.post("/users/wishlist", { productId });
    return response.data;
  },

  // Remove from wishlist
  removeFromWishlist: async (productId: string) => {
    const response = await api.delete(`/users/wishlist/${productId}`);
    return response.data;
  },
};

// Cart API
export const cartAPI = {
  // Get user cart
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  // Add item to cart
  addToCart: async (cartItem: {
    productId: string;
    selectedBundle?: string;
    selectedBrand?: string;
    selectedModel?: string;
    quantity: number;
  }) => {
    const response = await api.post("/cart/add", cartItem);
    return response.data;
  },

  // Update cart item
  updateCartItem: async (
    itemId: string,
    updates: {
      quantity?: number;
      selectedBundle?: string;
      selectedBrand?: string;
      selectedModel?: string;
    }
  ) => {
    const response = await api.put(`/cart/update/${itemId}`, updates);
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (itemId: string) => {
    const response = await api.delete(`/cart/remove/${itemId}`);
    return response.data;
  },

  // Apply promo code
  applyPromoCode: async (code: string) => {
    const response = await api.post("/cart/promo/apply", { code });
    return response.data;
  },

  // Remove promo code
  removePromoCode: async () => {
    const response = await api.delete("/cart/promo/remove");
    return response.data;
  },
};

// Order API
export const orderAPI = {
  // Create new order
  createOrder: async (orderData: {
    shippingAddress: Address;
    paymentMethod: string;
  }): Promise<ApiResponse<Order>> => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  // Get user orders
  getOrders: async (params = {}) => {
    const response = await api.get("/orders", { params });
    return response.data;
  },

  // Get single order
  getOrder: async (orderId: string) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId: string, reason?: string) => {
    const response = await api.put(`/orders/${orderId}/cancel`, { reason });
    return response.data;
  },
};

// Payment API
export const paymentAPI = {
  // Get payment methods
  getPaymentMethods: async () => {
    const response = await api.get("/payment/methods");
    return response.data;
  },

  // Initiate payment
  initiatePayment: async (paymentData: {
    orderId: string;
    amount: number;
    paymentMethod: string;
  }) => {
    const response = await api.post("/payment/initiate", paymentData);
    return response.data;
  },

  // Check payment status
  checkPaymentStatus: async (transactionId: string) => {
    const response = await api.get(`/payment/status/${transactionId}`);
    return response.data;
  },
};

// Upload API
export const uploadAPI = {
  // Upload single image
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Upload multiple images
  uploadImages: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await api.post("/upload/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default api;
