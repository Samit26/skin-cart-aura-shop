import React, { createContext, useContext, ReactNode } from "react";
import { useUser, useAuth as useClerkAuthHook } from "@clerk/clerk-react";
import type { User, LoginCredentials, RegisterData } from "../types";

// Context interface that matches the existing AuthContext
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  loadUser: () => Promise<void>;
}

// Create context
export const ClerkAuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Clerk auth provider component that wraps Clerk's functionality
export const ClerkAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerkAuthHook();

  // Map Clerk's user data to our expected format
  const mappedUser: User | null = user
    ? {
        _id: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.fullName || user.firstName || "",
        phone: user.primaryPhoneNumber?.phoneNumber || "",
        role: "user" as const,
        addresses: [],
        wishlist: [],
        emailVerified: !!user.primaryEmailAddress?.verification?.status,
        phoneVerified: !!user.primaryPhoneNumber?.verification?.status,
        createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
        updatedAt: user.updatedAt?.toISOString() || new Date().toISOString(),
      }
    : null;

  const authContextValue: AuthContextType = {
    user: mappedUser,
    loading: !isLoaded,
    error: null, // Clerk handles errors differently
    isAuthenticated: !!user,
    login: async () => {
      // Clerk handles login through components, not programmatically
      // This is kept for compatibility but should redirect to sign-in
      return false;
    },
    register: async () => {
      // Clerk handles registration through components
      // This is kept for compatibility but should redirect to sign-up
      return false;
    },
    logout: () => {
      signOut();
    },
    updateProfile: async () => {
      // Clerk handles profile updates through their dashboard/components
      // This could be implemented using Clerk's user update methods if needed
    },
    loadUser: async () => {
      // Clerk automatically loads user data
      // This is kept for compatibility but is handled automatically
    },
  };

  return (
    <ClerkAuthContext.Provider value={authContextValue}>
      {children}
    </ClerkAuthContext.Provider>
  );
};

// Hook to use the auth context
export const useClerkAuthContext = () => {
  const context = useContext(ClerkAuthContext);
  if (context === undefined) {
    throw new Error(
      "useClerkAuthContext must be used within a ClerkAuthProvider"
    );
  }
  return context;
};
