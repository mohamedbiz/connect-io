
import React, { createContext, useContext, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { Profile } from '@/types/auth';
import { useAuthCore } from '@/hooks/auth/useAuthCore';
import { useAuthRedirection } from '@/hooks/useAuthRedirection';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
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
  const authState = useAuthCore();
  const { redirectUser } = useAuthRedirection();

  // Handle redirection after successful authentication
  useEffect(() => {
    if (!authState.loading && authState.user && authState.session) {
      // Only redirect if we're on the auth page
      if (window.location.pathname === '/auth') {
        redirectUser(authState.user, authState.profile);
      }
    }
  }, [authState.loading, authState.user, authState.session, authState.profile, redirectUser]);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
