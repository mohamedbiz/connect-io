
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
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        // Fetch profile if user exists
        if (session?.user) {
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
        }

        setError(null);
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setError(err.message || 'Authentication failed');
        }
      } finally {
        if (mounted) {
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
          setProfile(userProfile);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    initAuth();

    // Loading timeout
    const timeout = setTimeout(() => {
      if (mounted && loading) {
        console.warn('Auth loading timeout');
        setLoading(false);
        setError('Authentication timeout');
      }
    }, 8000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [fetchProfile, loading]);

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
    logout,
    retryAuth,
    setProfile,
  };
};
