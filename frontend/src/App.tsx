import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProductProvider } from "@/contexts/ProductContextNew";
import { CartProvider } from "@/contexts/CartContextNew";
import { ClerkAuthProvider } from "@/contexts/ClerkAuthContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { setClerkTokenProvider } from "@/services/api";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";
import MobileApp from "./mobile/MobileApp";

const queryClient = new QueryClient();

// Component to set up Clerk token provider
const ClerkTokenSetup = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();

  useEffect(() => {
    // Configure the API service to use Clerk tokens
    setClerkTokenProvider(async () => {
      try {
        return await getToken();
      } catch (error) {
        console.error("Error getting Clerk token:", error);
        return null;
      }
    });
  }, [getToken]);

  return <>{children}</>;
};

const AppContent = () => {
  const isMobile = useIsMobile();

  console.log("isMobile:", isMobile, "userAgent:", navigator.userAgent);

  return (
    <Routes>
      {/* Mobile Routes */}
      <Route path="/mobile/*" element={<MobileApp />} />

      {/* Desktop Routes with mobile redirects */}
      <Route
        path="/"
        element={isMobile ? <Navigate to="/mobile" replace /> : <Index />}
      />
      <Route
        path="/products"
        element={
          isMobile ? <Navigate to="/mobile/products" replace /> : <Products />
        }
      />
      <Route
        path="/product/:id"
        element={
          isMobile ? (
            <Navigate to="/mobile/products" replace />
          ) : (
            <ProductDetail />
          )
        }
      />
      <Route
        path="/brands"
        element={
          isMobile ? <Navigate to="/mobile/products" replace /> : <Products />
        }
      />
      <Route
        path="/account"
        element={
          isMobile ? <Navigate to="/mobile/account" replace /> : <Account />
        }
      />

      {/* Routes that work for both mobile and desktop */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/track-order" element={<OrderTracking />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ClerkAuthProvider>
      <ClerkTokenSetup>
        <ProductProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <AppContent />
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </ProductProvider>
      </ClerkTokenSetup>
    </ClerkAuthProvider>
  </QueryClientProvider>
);

export default App;
