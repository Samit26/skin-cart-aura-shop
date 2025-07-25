import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { productAPI } from "../services/api";
import type { Product, ProductFilters } from "../types";

// Context interface
interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProductById: (id: string) => Promise<Product | undefined>;
  getProductsByCategory: (
    category: string,
    filters?: ProductFilters
  ) => Promise<Product[]>;
  getFeaturedProducts: () => Promise<Product[]>;
  getAllCategories: () => string[];
  searchProducts: (
    query: string,
    filters?: ProductFilters
  ) => Promise<Product[]>;
  loadProducts: (filters?: ProductFilters) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

// Create context
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

// Product provider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load products from API
  const loadProducts = async (filters: ProductFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.getProducts(filters);
      if (response.success && response.data) {
        setProducts(response.data.products || response.data);
      } else {
        setError(response.message || "Failed to load products");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Refresh products
  const refreshProducts = async () => {
    await loadProducts();
  };

  // Get product by ID
  const getProductById = async (id: string): Promise<Product | undefined> => {
    try {
      const response = await productAPI.getProduct(id);
      if (response.success && response.data) {
        return response.data;
      }
    } catch (err) {
      console.error("Error fetching product:", err);
    }
    return undefined;
  };

  // Get products by category
  const getProductsByCategory = async (
    category: string,
    filters: ProductFilters = {}
  ): Promise<Product[]> => {
    try {
      const response = await productAPI.getProductsByCategory(
        category,
        filters
      );
      if (response.success && response.data) {
        return response.data.products || response.data;
      }
    } catch (err) {
      console.error("Error fetching products by category:", err);
    }
    return [];
  };

  // Get featured products
  const getFeaturedProducts = async (): Promise<Product[]> => {
    try {
      const response = await productAPI.getFeaturedProducts();
      if (response.success && response.data) {
        return response.data.products || response.data;
      }
    } catch (err) {
      console.error("Error fetching featured products:", err);
    }
    return [];
  };

  // Get all categories from current products
  const getAllCategories = (): string[] => {
    const categories = products.map((product) => product.category);
    return [...new Set(categories)].sort();
  };

  // Search products
  const searchProducts = async (
    query: string,
    filters: ProductFilters = {}
  ): Promise<Product[]> => {
    try {
      const response = await productAPI.searchProducts(query, filters);
      if (response.success && response.data) {
        return response.data.products || response.data;
      }
    } catch (err) {
      console.error("Error searching products:", err);
    }
    return [];
  };

  // Load initial products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const value: ProductContextType = {
    products,
    loading,
    error,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getAllCategories,
    searchProducts,
    loadProducts,
    refreshProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
