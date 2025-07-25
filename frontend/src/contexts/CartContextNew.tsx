import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useAuth } from "@clerk/clerk-react";
import { cartAPI } from "../services/api";
import type { Cart, CartItem, Product } from "../types";

// Context interface
interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addToCart: (
    productId: string,
    selectedBrand?: string,
    selectedModel?: string,
    selectedBundle?: string,
    quantity?: number
  ) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  updateDeviceModel: (
    itemId: string,
    selectedBrand: string,
    selectedModel: string
  ) => Promise<void>;
  clearCart: () => Promise<void>;
  applyPromoCode: (code: string) => Promise<void>;
  removePromoCode: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (productId: string) => boolean;
  loadCart: () => Promise<void>;
}

// Create context
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Cart provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load cart from API
  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cartAPI.getCart();
      if (response.success && response.data) {
        setCart(response.data);
      } else {
        setCart(null);
      }
    } catch (err) {
      // If user is not authenticated, cart will be empty
      setCart(null);
      console.error("Error loading cart:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add item to cart
  const addToCart = useCallback(
    async (
      productId: string,
      selectedBrand: string = "Select Brand",
      selectedModel: string = "Select Model",
      selectedBundle: string = "single",
      quantity: number = 1
    ) => {
      setLoading(true);
      setError(null);
      try {
        const response = await cartAPI.addToCart({
          productId,
          selectedBrand,
          selectedModel,
          selectedBundle,
          quantity,
        });
        if (response.success && response.data) {
          setCart(response.data);
        } else {
          setError(response.message || "Failed to add item to cart");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cartAPI.removeFromCart(itemId);
      if (response.success && response.data) {
        setCart(response.data);
      } else {
        setError(response.message || "Failed to remove item from cart");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // Update item quantity
  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        await removeFromCart(itemId);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await cartAPI.updateCartItem(itemId, { quantity });
        if (response.success && response.data) {
          setCart(response.data);
        } else {
          setError(response.message || "Failed to update item quantity");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [removeFromCart]
  );

  // Update device model
  const updateDeviceModel = useCallback(
    async (itemId: string, selectedBrand: string, selectedModel: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await cartAPI.updateCartItem(itemId, {
          selectedBrand,
          selectedModel,
        });
        if (response.success && response.data) {
          setCart(response.data);
        } else {
          setError(response.message || "Failed to update device model");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Clear cart
  const clearCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Remove all items one by one
      if (cart?.items) {
        for (const item of cart.items) {
          await cartAPI.removeFromCart(item._id);
        }
      }
      setCart(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Apply promo code
  const applyPromoCode = useCallback(async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cartAPI.applyPromoCode(code);
      if (response.success && response.data) {
        setCart(response.data);
      } else {
        setError(response.message || "Failed to apply promo code");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove promo code
  const removePromoCode = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cartAPI.removePromoCode();
      if (response.success && response.data) {
        setCart(response.data);
      } else {
        setError(response.message || "Failed to remove promo code");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // Get cart total
  const getCartTotal = useCallback((): number => {
    return cart?.totalAmount || 0;
  }, [cart]);

  // Get cart items count
  const getCartCount = useCallback((): number => {
    return cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  }, [cart]);

  // Check if product is in cart
  const isInCart = useCallback(
    (productId: string): boolean => {
      return (
        cart?.items?.some((item) => item.product._id === productId) || false
      );
    },
    [cart]
  );

  // Load cart on mount if user is authenticated (Clerk)
  const { isSignedIn } = useAuth();
  useEffect(() => {
    if (isSignedIn) {
      loadCart();
    }
  }, [isSignedIn, loadCart]);

  const value: CartContextType = {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateDeviceModel,
    clearCart,
    applyPromoCode,
    removePromoCode,
    getCartTotal,
    getCartCount,
    isInCart,
    loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
