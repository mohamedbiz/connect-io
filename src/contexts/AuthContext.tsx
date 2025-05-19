
import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import { useAuthInitialize } from '@/hooks/auth/useAuthInitialize';
import { 
  fetchProfile, 
  ensureProfileExists,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logoutUser
} from '@/utils/auth/auth-operations';
import { AuthContextType } from '@/types/auth-context';

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
    retryAuth,
    setProfile
  } = useAuthInitialize();

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

  // Register
  const register = useCallback(async (
    email: string, 
    password: string, 
    userData: Partial<import('@/types/auth').Profile>
  ) => {
    return await registerWithEmailAndPassword(email, password, userData);
  }, []);

  // Logout
  const logout = useCallback(async () => {
    await logoutUser();
  }, []);

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
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
