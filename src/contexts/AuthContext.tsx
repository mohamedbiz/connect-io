
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { toast } from 'sonner';
import { logAuth } from '@/utils/auth/auth-logger';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  register: (email: string, password: string, userData: Partial<Profile>) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  ensureProfile: () => Promise<Profile | null>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      logAuth(`Fetching profile for user: ${userId}`);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        logAuth('Error fetching profile:', error, false, true);
        return null;
      }

      logAuth('Profile fetched successfully', data);
      return data as Profile;
    } catch (error) {
      logAuth('Exception fetching profile:', error, false, true);
      return null;
    }
  };

  // Ensure a profile exists or create one if it doesn't
  const ensureProfile = async (): Promise<Profile | null> => {
    if (!user) return null;
    
    try {
      // First try to fetch existing profile
      let userProfile = await fetchProfile(user.id);
      
      // If no profile exists, create one
      if (!userProfile) {
        logAuth('No profile found, creating one', { userId: user.id });
        
        const { data, error } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            role: user.user_metadata?.role || 'founder'
          })
          .select()
          .single();
          
        if (error) {
          logAuth('Error creating profile:', error, false, true);
          toast.error('Could not create user profile');
          return null;
        }
        
        userProfile = data as Profile;
        toast.success('Profile created successfully');
      }
      
      // Update state
      setProfile(userProfile);
      return userProfile;
    } catch (error) {
      logAuth('Error ensuring profile exists:', error, false, true);
      toast.error('Profile error');
      return null;
    }
  };

  // Refresh user profile
  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const userProfile = await fetchProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
      }
    } catch (error) {
      logAuth('Error refreshing profile:', error, false, true);
    }
  };

  // Handle retry and connection issues
  const handleRetry = (operation: string) => {
    if (retryCount < maxRetries) {
      const delay = Math.pow(2, retryCount) * 1000;
      logAuth(`Retrying ${operation} after ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`, null, true);
      
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        initializeAuth();
      }, delay);
      return true;
    }
    return false;
  };

  // Initialize auth - get session and set up listener
  const initializeAuth = async () => {
    setLoading(true);
    
    try {
      // Set up the auth state change listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, currentSession) => {
          logAuth(`Auth state changed: ${event}`, { currentSession });
          setSession(currentSession);
          setUser(currentSession?.user ?? null);

          // If session exists, fetch the user profile
          if (currentSession?.user) {
            // Use setTimeout to avoid potential auth state conflicts
            setTimeout(async () => {
              const userProfile = await fetchProfile(currentSession.user.id);
              setProfile(userProfile);
            }, 0);
          } else {
            setProfile(null);
          }
        }
      );

      // Then get the initial session
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      setSession(data.session);
      setUser(data.session?.user ?? null);

      // If we have a user, fetch their profile
      if (data.session?.user) {
        const userProfile = await fetchProfile(data.session.user.id);
        setProfile(userProfile);
      }

      setError(null);
      setRetryCount(0);

      // Cleanup function
      return () => {
        subscription.unsubscribe();
      };
    } catch (error: any) {
      logAuth('Auth initialization error:', error, false, true);
      setError(error?.message || 'Failed to initialize authentication');
      
      // Retry if network error
      if (error.message?.includes('fetch') && handleRetry('initialization')) {
        // Retry is scheduled
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cleanup = initializeAuth();
    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [retryCount]);

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      logAuth('Attempting login', { email });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        logAuth('Login error:', error, false, true);
        toast.error(error.message);
        return { error };
      }

      logAuth('Login successful', { user: data.user });
      toast.success('Logged in successfully');
      return { error: null };
    } catch (error: any) {
      logAuth('Login exception:', error, false, true);
      
      // Network error handling
      if (error.message?.includes('fetch')) {
        toast.error('Network error. Please check your connection and try again.');
      } else {
        toast.error('An error occurred during login');
      }
      
      return { error };
    }
  };

  // Register with email and password
  const register = async (
    email: string, 
    password: string, 
    userData: Partial<Profile>
  ) => {
    try {
      logAuth('Attempting registration', { email, userData });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role || 'founder'
          },
        }
      });

      if (error) {
        logAuth('Registration error:', error, false, true);
        toast.error(error.message);
        return { error };
      }

      logAuth('Registration successful', { user: data.user });
      toast.success('Registration successful!');
      return { error: null };
    } catch (error: any) {
      logAuth('Registration exception:', error, false, true);
      
      // Network error handling
      if (error.message?.includes('fetch')) {
        toast.error('Network error. Please check your connection and try again.');
      } else {
        toast.error('An error occurred during registration');
      }
      
      return { error };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      logAuth('Logged out successfully');
      toast.success('Logged out successfully');
    } catch (error) {
      logAuth('Logout error:', error, false, true);
      toast.error('Error during logout');
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    error,
    login,
    register,
    logout,
    refreshProfile,
    ensureProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
