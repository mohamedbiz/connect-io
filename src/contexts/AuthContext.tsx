
import React, { createContext, useContext, ReactNode } from 'react';
import { User, Session, AuthResponse } from '@supabase/supabase-js';
import { Profile } from '@/types/auth';
import { useAuthProvider } from '@/hooks/useAuthProvider';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string, metadata?: any) => Promise<AuthResponse>;
  ensureProfile: () => Promise<Profile | null>;
  shouldRedirectToAcquisition: (path: string) => boolean;
  shouldRedirectToQualification: (path: string) => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  error: null,
  logout: async () => {},
  login: async () => { throw new Error('Authentication not initialized'); },
  register: async () => { throw new Error('Authentication not initialized'); },
  ensureProfile: async () => null,
  shouldRedirectToAcquisition: () => false,
  shouldRedirectToQualification: () => false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
