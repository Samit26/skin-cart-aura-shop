import { useAdminAuth } from "../contexts/AdminAuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, loading, isAuthenticated, login, logout, error } =
    useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated && router.pathname !== "/") {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  return {
    user,
    isAuthenticated,
    isAdmin: user?.role === "admin",
    loading,
    logout,
    login,
    error,
  };
};
