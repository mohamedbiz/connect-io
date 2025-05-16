
import React, { createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { Profile } from '@/types/auth';
import { useAuthProvider } from '@/hooks/useAuthProvider';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, metadata?: any) => Promise<void>;
  ensureProfile: () => Promise<Profile | null>;
  shouldRedirectToAcquisition: (path: string) => boolean;
  shouldRedirectToQualification: (path: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  error: null,
  logout: async () => {},
  login: async () => {},
  register: async () => {},
  ensureProfile: async () => null,
  shouldRedirectToAcquisition: () => false,
  shouldRedirectToQualification: () => false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    user,
    session,
    profile,
    loading,
    error,
    logout,
    login,
    register,
    ensureProfile,
    shouldRedirectToAcquisition,
    shouldRedirectToQualification
  } = useAuthProvider();

  const value = {
    user,
    session,
    profile,
    loading,
    error,
    logout,
    login,
    register,
    ensureProfile,
    shouldRedirectToAcquisition,
    shouldRedirectToQualification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
