
import React, { createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { Profile } from '@/types/auth';
import { useAuthState } from '@/hooks/auth/useAuthState';
import { useAuthOperations } from '@/hooks/auth/useAuthOperations';
import { useAuthEffects } from '@/hooks/auth/useAuthEffects';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  register: (email: string, password: string, userData: { first_name: string; last_name: string; role: 'founder' | 'provider' }) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  ensureProfile: () => Promise<Profile | null>;
  retryAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    user,
    setUser,
    session,
    setSession,
    profile,
    setProfile,
    loading,
    setLoading,
    error,
    setError,
    hasRedirected,
    setHasRedirected,
  } = useAuthState();

  const {
    fetchProfile,
    login,
    register,
    logout,
    refreshProfile: refreshProfileOperation,
    ensureProfile: ensureProfileOperation,
    retryAuth,
  } = useAuthOperations({
    setLoading,
    setError,
    setUser,
    setSession,
    setProfile,
    setHasRedirected,
  });

  useAuthEffects({
    loading,
    hasRedirected,
    setSession,
    setUser,
    setProfile,
    setLoading,
    setError,
    setHasRedirected,
    fetchProfile,
  });

  const refreshProfile = () => refreshProfileOperation(user);
  const ensureProfile = () => ensureProfileOperation(user);
  const signOut = logout;

  const value = {
    user,
    session,
    profile,
    loading,
    error,
    login,
    register,
    logout,
    signOut,
    refreshProfile,
    ensureProfile,
    retryAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
