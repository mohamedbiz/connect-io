
import { createContext, useContext } from "react";
import { Session, User, AuthResponse } from "@supabase/supabase-js";
import { Profile } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  shouldRedirectToAcquisition: (currentPath: string) => boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string, metadata?: { 
    first_name?: string; 
    last_name?: string; 
    role?: string;
  }) => Promise<AuthResponse>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
