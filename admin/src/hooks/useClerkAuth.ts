import { useUser, useAuth as useClerkAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerkAuth();
  const router = useRouter();

  // Check if user is authenticated and is an admin
  const isAuthenticated = !!user;
  const loading = !isLoaded;

  // Admin role check - you can customize this based on your Clerk setup
  const isAdmin =
    user?.publicMetadata?.role === "admin" ||
    user?.emailAddresses?.[0]?.emailAddress?.includes("admin") ||
    user?.emailAddresses?.[0]?.emailAddress === "admin@skincartsaura.com";

  useEffect(() => {
    if (isLoaded && !isAuthenticated && router.pathname !== "/") {
      router.replace("/");
    }
  }, [isLoaded, isAuthenticated, router]);

  const logout = async () => {
    await signOut();
    router.replace("/");
  };

  const login = () => {
    // Clerk handles login through components, redirect to dashboard after sign-in
    router.push("/dashboard");
  };

  // Map Clerk user to admin user format
  const adminUser = user
    ? {
        id: user.id,
        email: user.emailAddresses?.[0]?.emailAddress || "",
        name: user.fullName || user.firstName || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        imageUrl: user.imageUrl || "",
        role: isAdmin ? "admin" : "user",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    : null;

  return {
    user: adminUser,
    isAuthenticated,
    isAdmin,
    loading,
    logout,
    login,
  };
};
