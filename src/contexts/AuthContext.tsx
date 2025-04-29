
import { createContext } from "react";
import { AuthContextType } from "@/types/auth";

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  logout: async () => {},
  shouldRedirectToAcquisition: () => false,
});

export { AuthContext };
export { AuthProvider } from "./AuthProvider";
export { useAuth } from "./useAuth";
