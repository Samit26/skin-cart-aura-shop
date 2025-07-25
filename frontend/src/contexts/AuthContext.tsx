import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { userAPI } from "../services/api";
import type { User, LoginCredentials, RegisterData } from "../types";

// Context interface
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
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  const isAuthenticated = !!user && !!localStorage.getItem("userToken");

  // Load user profile
  const loadUser = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setUser(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.getProfile();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setUser(null);
        localStorage.removeItem("userToken");
      }
    } catch (err) {
      setUser(null);
      localStorage.removeItem("userToken");
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.login(credentials);
      if (response.success && response.data) {
        localStorage.setItem("userToken", response.data.token);
        setUser(response.data.user);
        return true;
      } else {
        setError(response.message || "Login failed");
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.register(userData);
      if (response.success && response.data) {
        localStorage.setItem("userToken", response.data.token);
        setUser(response.data.user);
        return true;
      } else {
        setError(response.message || "Registration failed");
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    setError(null);
  };

  // Update user profile
  const updateProfile = async (profileData: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.updateProfile(profileData);
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setError(response.message || "Failed to update profile");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
