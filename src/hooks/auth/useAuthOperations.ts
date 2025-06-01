
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { User } from '@supabase/supabase-js';

interface UseAuthOperationsProps {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: User | null) => void;
  setSession: (session: any) => void;
  setProfile: (profile: Profile | null) => void;
  setHasRedirected: (hasRedirected: boolean) => void;
}

export const useAuthOperations = ({
  setLoading,
  setError,
  setUser,
  setSession,
  setProfile,
  setHasRedirected,
}: UseAuthOperationsProps) => {
  const fetchProfile = async (userId: string) => {
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

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
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
  }, [setLoading, setError]);

  const register = useCallback(async (
    email: string,
    password: string,
    userData: { first_name: string; last_name: string; role: 'founder' | 'provider' }
  ) => {
    try {
      setLoading(true);
      setError(null);
      
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
  }, [setLoading, setError]);

  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear all state
      setUser(null);
      setSession(null);
      setProfile(null);
      setError(null);
      setHasRedirected(false);
    } catch (error: any) {
      console.error('Error signing out:', error);
      setError('Error signing out');
    }
  }, [setUser, setSession, setProfile, setError, setHasRedirected]);

  const refreshProfile = useCallback(async (user: User | null) => {
    if (!user) return;
    
    try {
      const userProfile = await fetchProfile(user.id);
      setProfile(userProfile);
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  }, [setProfile]);

  const ensureProfile = useCallback(async (user: User | null): Promise<Profile | null> => {
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
  }, [setProfile]);

  const retryAuth = useCallback(() => {
    setError(null);
    setLoading(true);
    setHasRedirected(false);
    
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error.message);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });
  }, [setError, setLoading, setHasRedirected, setSession, setUser]);

  return {
    fetchProfile,
    login,
    register,
    logout,
    refreshProfile,
    ensureProfile,
    retryAuth,
  };
};
