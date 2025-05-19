
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { toast } from 'sonner';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  register: (email: string, password: string, userData: Partial<Profile>) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
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

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as Profile;
    } catch (error) {
      console.error('Exception fetching profile:', error);
      return null;
    }
  };

  // Refresh user profile
  const refreshProfile = async () => {
    if (!user) return;
    
    const profile = await fetchProfile(user.id);
    if (profile) {
      setProfile(profile);
    }
  };

  // Initialize auth - get session and set up listener
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      // First, set up the auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, currentSession) => {
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
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);

      // If we have a user, fetch their profile
      if (data.session?.user) {
        const userProfile = await fetchProfile(data.session.user.id);
        setProfile(userProfile);
      }

      setLoading(false);

      // Cleanup the listener on unmount
      return () => {
        subscription.unsubscribe();
      };
    };

    initializeAuth();
  }, []);

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast.error(error.message);
        return { error };
      }

      toast.success('Logged in successfully');
      return { error: null };
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
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
        toast.error(error.message);
        return { error };
      }

      toast.success('Registration successful!');
      return { error: null };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration');
      return { error };
    }
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    session,
    profile,
    loading,
    login,
    register,
    logout,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
