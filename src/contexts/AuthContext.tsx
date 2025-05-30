
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { usePostLoginRedirection } from '@/hooks/usePostLoginRedirection';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { redirectAfterLogin } = usePostLoginRedirection();

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

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Error signing out');
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          setUser(session.user);
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
          
          // Trigger redirection after setting user and profile
          setTimeout(() => {
            redirectAfterLogin(session.user, userProfile);
          }, 100);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        setError('Authentication error');
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (session?.user) {
          setUser(session.user);
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
          
          // Only redirect on sign in events, not on token refresh
          if (event === 'SIGNED_IN') {
            console.log('User signed in, triggering redirection');
            setTimeout(() => {
              redirectAfterLogin(session.user, userProfile);
            }, 100);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
        
        setLoading(false);
        setError(null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [redirectAfterLogin]);

  const value = {
    user,
    profile,
    loading,
    error,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
