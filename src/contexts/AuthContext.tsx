
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { usePostLoginRedirection } from '@/hooks/usePostLoginRedirection';

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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasRedirected, setHasRedirected] = useState(false);
  const { redirectAfterLogin } = usePostLoginRedirection();

  // Add loading timeout to prevent infinite loading
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.log('Loading timeout reached, forcing loading to false');
        setLoading(false);
        setError('Authentication timeout - please refresh the page');
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(loadingTimeout);
  }, [loading]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found error
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Profile fetch error:', err);
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return { error };
      }

      return { error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, userData: { first_name: string; last_name: string; role: 'founder' | 'provider' }) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
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

      return { error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local state
      setUser(null);
      setSession(null);
      setProfile(null);
      setError(null);
      setHasRedirected(false);
    } catch (error: any) {
      console.error('Error signing out:', error);
      setError('Error signing out');
    }
  };

  const signOut = logout;

  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const userProfile = await fetchProfile(user.id);
      setProfile(userProfile);
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  };

  const ensureProfile = async (): Promise<Profile | null> => {
    if (!user) return null;
    
    if (profile) return profile;
    
    try {
      const userProfile = await fetchProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
        return userProfile;
      }
      
      // If no profile exists, create one
      const newProfile = {
        id: user.id,
        email: user.email || '',
        first_name: user.user_metadata?.first_name || '',
        last_name: user.user_metadata?.last_name || '',
        role: (user.user_metadata?.role as 'founder' | 'provider' | 'admin') || 'founder',
        onboarding_complete: false,
        approved: false,
        is_featured: false,
        created_at: new Date().toISOString(),
      };
      
      const { data, error } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single();
        
      if (error) {
        console.error('Error creating profile:', error);
        return null;
      }
      
      setProfile(data);
      return data;
    } catch (err) {
      console.error('Error ensuring profile:', err);
      return null;
    }
  };

  const retryAuth = () => {
    setError(null);
    setLoading(true);
    setHasRedirected(false);
    // Trigger a fresh session check
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error.message);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    let mounted = true;
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (!mounted) return;

        setSession(session);
        if (session?.user) {
          console.log('Initial session found for user:', session.user.email);
          setUser(session.user);
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
          
          // Only redirect on initial load if we haven't redirected yet
          if (!hasRedirected) {
            console.log('Triggering initial redirection...');
            setHasRedirected(true);
            setTimeout(() => {
              if (mounted) {
                redirectAfterLogin(session.user, userProfile);
              }
            }, 100);
          }
        } else {
          console.log('No initial session found');
        }
      } catch (error: any) {
        console.error('Error getting session:', error);
        if (mounted) {
          setError('Authentication error');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (!mounted) return;
        
        setSession(session);
        if (session?.user) {
          setUser(session.user);
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
          
          // Only redirect on sign in events, not on token refresh or initial load
          if (event === 'SIGNED_IN' && !hasRedirected) {
            console.log('User signed in, triggering redirection');
            setHasRedirected(true);
            setTimeout(() => {
              if (mounted) {
                redirectAfterLogin(session.user, userProfile);
              }
            }, 100);
          }
        } else {
          setUser(null);
          setProfile(null);
          setHasRedirected(false);
        }
        
        setLoading(false);
        setError(null);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [redirectAfterLogin, hasRedirected]);

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
