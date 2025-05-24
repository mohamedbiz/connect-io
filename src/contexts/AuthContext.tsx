
import React, { createContext, useContext, useCallback, ReactNode, useState } from 'react';
import { useAuthInitialize } from '@/hooks/auth/useAuthInitialize';
import { 
  fetchProfile, 
  ensureProfileExists,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logoutUser
} from '@/utils/auth/auth-operations';
import { AuthContextType } from '@/types/auth-context';
import { toast } from 'sonner';
import { checkNetworkConnection, testApiConnection } from '@/integrations/supabase/client';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    user,
    session,
    profile,
    loading,
    error,
    retryAuth: initialRetryAuth,
    setProfile
  } = useAuthInitialize();
  
  const [isRetryingAuth, setIsRetryingAuth] = useState(false);

  // Refresh user profile
  const refreshProfile = useCallback(async () => {
    if (!user) return;
    
    try {
      const userProfile = await fetchProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  }, [user, setProfile]);

  // Ensure a profile exists
  const ensureProfile = useCallback(async () => {
    return await ensureProfileExists(user);
  }, [user]);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    return await loginWithEmailAndPassword(email, password);
  }, []);

  // Register - fix the type signature
  const register = useCallback(async (
    email: string, 
    password: string, 
    userData: { first_name: string; last_name: string; role: 'founder' | 'provider' }
  ) => {
    return await registerWithEmailAndPassword(email, password, userData);
  }, []);

  // Logout
  const logout = useCallback(async () => {
    await logoutUser();
  }, []);
  
  // Improved retry function with network check
  const retryAuth = useCallback(async () => {
    setIsRetryingAuth(true);
    
    try {
      // First check basic connectivity
      const isConnected = await checkNetworkConnection();
      if (!isConnected) {
        toast.error('Cannot retry authentication. Network is still unavailable.');
        return;
      }
      
      // Then check Supabase API connectivity
      const apiConnected = await testApiConnection();
      if (!apiConnected) {
        toast.error('Cannot connect to authentication service. Please try again later.');
        return;
      }
      
      // Run the original retry
      initialRetryAuth();
      toast.success('Reconnected to authentication service');
    } catch (error) {
      console.error('Error during auth retry:', error);
      toast.error('Failed to retry authentication');
    } finally {
      setIsRetryingAuth(false);
    }
  }, [initialRetryAuth]);

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading: loading || isRetryingAuth,
    error,
    login,
    register,
    logout,
    refreshProfile,
    ensureProfile,
    retryAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
