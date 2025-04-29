
import { createContext, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { Profile } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  logout: () => Promise<void>;
  shouldRedirectToAcquisition: (currentPath: string) => boolean;
  login?: () => void;  // Added to fix build error
  register?: () => void;  // Added to fix build error
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
