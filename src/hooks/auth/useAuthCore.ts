
import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';

export const useAuthCore = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile helper
  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
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
  }, []);

  // Initialize authentication
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (!mounted) return;

        console.log('Initial session:', session ? 'found' : 'none');
        setSession(session);
        setUser(session?.user ?? null);

        // Fetch profile if user exists
        if (session?.user) {
          console.log('Fetching profile for user:', session.user.id);
          const userProfile = await fetchProfile(session.user.id);
          if (mounted) {
            setProfile(userProfile);
          }
        }

        setError(null);
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setError(err.message || 'Authentication failed');
        }
      } finally {
        if (mounted) {
          console.log('Auth initialization complete');
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state change:', event);
        
        if (!mounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          const userProfile = await fetchProfile(currentSession.user.id);
          if (mounted) {
            setProfile(userProfile);
          }
        } else {
          setProfile(null);
        }

        if (mounted) {
          setLoading(false);
        }
      }
    );

    initAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  // Auth operations
  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (err: any) {
      const error = { message: err.message || 'Login failed' };
      setError(error.message);
      return { error };
    }
  }, []);

  const register = useCallback(async (
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
      return { error };
    } catch (err: any) {
      const error = { message: err.message || 'Registration failed' };
      setError(error.message);
      return { error };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setError(null);
    } catch (err: any) {
      console.error('Logout error:', err);
      setError('Logout failed');
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    
    try {
      const userProfile = await fetchProfile(user.id);
      setProfile(userProfile);
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  }, [user, fetchProfile]);

  const ensureProfile = useCallback(async (): Promise<Profile | null> => {
    if (!user) return null;
    
    try {
      let userProfile = await fetchProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
        return userProfile;
      }
      
      // Create new profile if it doesn't exist
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
  }, [user, fetchProfile]);

  const retryAuth = useCallback(() => {
    setError(null);
    setLoading(true);
  }, []);

  return {
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
    retryAuth,
  };
};
