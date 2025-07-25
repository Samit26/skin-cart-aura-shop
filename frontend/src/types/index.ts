// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Product Types
export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  skinType: string;
  price: number; // Main price from backend
  originalPrice: number; // Original price from backend
  bundlePricing: {
    single: { price: number; label: string };
    double: { price: number; label: string };
    triple: { price: number; label: string };
  };
  images: ProductImage[];
  features: string[];
  tags: string[];
  badge?: string;
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  isFeatured?: boolean; // This might be virtual or computed
  createdAt: string;
  updatedAt: string;
  discountPercentage?: number; // Virtual field
  formattedPrice?: string; // Virtual field
}

export interface ProductImage {
  url: string;
  public_id: string;
  alt: string;
}

// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  addresses: Address[];
  wishlist: string[];
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  _id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

// Cart Types
export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalAmount: number;
  appliedPromo?: {
    code: string;
    discount: number;
    discountType: "percentage" | "fixed";
  };
  finalAmount: number;
  updatedAt: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  selectedBundle: "single" | "double" | "triple";
  selectedBrand: string;
  selectedModel: string;
  price: number;
}

export interface PromoCode {
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

// Order Types
export interface Order {
  _id: string;
  orderId: string;
  user: User;
  items: OrderItem[];
  shippingAddress: Address;
  totalAmount: number;
  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentInfo: PaymentInfo;
  appliedPromo?: PromoCode;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: Product;
  deviceModel: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface PaymentInfo {
  transactionId?: string;
  method: string;
  status: "pending" | "completed" | "failed";
  amount: number;
  paidAt?: string;
  gatewayTransactionId?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

// Filter Types
export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  skinType?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Payment Types
export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  icon: string;
}

export interface PaymentInitiation {
  orderId: string;
  amount: number;
  paymentMethod: string;
}

export interface PaymentResponse {
  transactionId: string;
  paymentUrl: string;
  orderId: string;
}
