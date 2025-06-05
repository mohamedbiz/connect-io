
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  register: (email: string, password: string, userData: { first_name: string; last_name: string; role: 'founder' | 'provider' }) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<{ error: any | null }>;
  refreshProfile: () => Promise<void>;
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
  // Core auth state
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile
  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Profile fetch error:', err);
      return null;
    }
  };

  // Initialize auth on mount (once only)
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        // Check for existing session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (!mounted) return;

        // Set session if exists
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          
          // Get user profile data
          const userProfile = await fetchProfile(currentSession.user.id);
          if (mounted) {
            setProfile(userProfile);
          }
        }

        setError(null);
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setError(err?.message || 'Failed to initialize authentication');
          // Clear any invalid session data
          setSession(null);
          setUser(null);
          setProfile(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    initializeAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth state changed:', event);
      
      if (!mounted) return;

      // Update session state
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      // Handle different auth events
      switch (event) {
        case 'SIGNED_IN':
          if (newSession) {
            try {
              // Get user profile data
              const userProfile = await fetchProfile(newSession.user.id);
              if (mounted) {
                setProfile(userProfile);
              }
            } catch (err) {
              console.error('Error fetching user data:', err);
              if (mounted) {
                setError('Error loading user profile');
              }
            }
          }
          break;
          
        case 'SIGNED_OUT':
          // Clear user data
          setProfile(null);
          break;
          
        case 'TOKEN_REFRESHED':
          // Just update the session, no need to refetch user
          break;
          
        case 'USER_UPDATED':
          // Refresh user data
          if (newSession) {
            try {
              const userProfile = await fetchProfile(newSession.user.id);
              if (mounted) {
                setProfile(userProfile);
              }
            } catch (err) {
              console.error('Error updating user data:', err);
              if (mounted) {
                setError('Error updating user profile');
              }
            }
          }
          break;
          
        default:
          break;
      }
      
      if (mounted) {
        setLoading(false);
      }
    });
    
    // Clean up listener on unmount
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setError(error.message);
        return { error };
      }
      
      toast.success('Logged in successfully!');
      return { error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  // Register function
  const register = async (
    email: string, 
    password: string, 
    userData: { first_name: string; last_name: string; role: 'founder' | 'provider' }
  ) => {
    try {
      setError(null);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role,
          },
        },
      });
      
      if (error) {
        setError(error.message);
        return { error };
      }
      
      toast.success('Account created successfully!');
      return { error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log('Logout initiated');
      setError(null);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Supabase logout error:', error);
        throw error;
      }
      
      // Clear all state immediately
      setUser(null);
      setSession(null);
      setProfile(null);
      setError(null);
      
      console.log('Logout completed successfully');
      toast.success('Logged out successfully');
      
      // Force reload to ensure clean state
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
      
    } catch (err: any) {
      console.error('Logout error:', err);
      setError('Logout failed');
      
      // Even if there's an error, clear local state
      setUser(null);
      setSession(null);
      setProfile(null);
      
      // Force reload as fallback
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
  };

  // Update profile function
  const updateProfile = async (profileData: Partial<Profile>) => {
    try {
      setError(null);
      
      if (!user || !user.id) {
        throw new Error('No authenticated user');
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      // Update local profile state
      setProfile(data);
      toast.success('Profile updated successfully');
      
      return { error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Profile update failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  // Refresh profile function
  const refreshProfile = async () => {
    try {
      if (!user || !user.id) {
        throw new Error('No authenticated user');
      }
      
      const userProfile = await fetchProfile(user.id);
      setProfile(userProfile);
    } catch (err: any) {
      console.error('Profile refresh error:', err);
      setError('Failed to refresh profile');
    }
  };

  // Retry auth function
  const retryAuth = () => {
    setError(null);
    setLoading(true);
    
    // Re-trigger auth initialization
    supabase.auth.getSession().then(({ data: { session: currentSession }, error }) => {
      if (error) {
        console.error('Retry auth error:', error);
        setError(error.message);
      } else if (currentSession) {
        setSession(currentSession);
        setUser(currentSession.user);
        fetchProfile(currentSession.user.id).then(userProfile => {
          setProfile(userProfile);
        });
      }
      setLoading(false);
    });
  };

  // Auth context value
  const value = {
    user,
    session,
    profile,
    loading,
    error,
    isAuthenticated: !!session,
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,
    retryAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
