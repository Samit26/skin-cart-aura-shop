import { useClerkAuthContext } from "../contexts/ClerkAuthContext";

export const useAuth = () => {
  return useClerkAuthContext();
};
