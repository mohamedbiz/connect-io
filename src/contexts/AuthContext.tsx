
import React, { createContext, useContext } from 'react';
import { AuthContextType } from './auth/types';
import { useAuthStateManager } from './auth/useAuthStateManager';
import { useAuthOperations } from './auth/useAuthOperations';

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
    session,
    profile,
    loading,
    error,
    setUser,
    setSession,
    setProfile,
    setError,
    fetchProfile,
  } = useAuthStateManager();

  const authOperations = useAuthOperations(
    setUser,
    setSession,
    setProfile,
    setError,
    fetchProfile,
    user
  );

  // Auth context value - explicitly destructure to ensure proper TypeScript inference
  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    error,
    isAuthenticated: !!session,
    login: authOperations.login,
    register: authOperations.register,
    logout: authOperations.logout,
    updateProfile: authOperations.updateProfile,
    refreshProfile: authOperations.refreshProfile,
    retryAuth: authOperations.retryAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
