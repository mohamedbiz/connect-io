
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { toast } from 'sonner';

export const useAuthOperations = (
  setUser: (user: User | null) => void,
  setSession: (session: Session | null) => void,
  setProfile: (profile: Profile | null) => void,
  setError: (error: string | null) => void,
  fetchProfile: (userId: string) => Promise<Profile | null>,
  user: User | null
) => {
  // Login function
  const login = async (email: string, password: string): Promise<{ error: any | null }> => {
    try {
      setError(null);
      console.log('Auth operations: Attempting login for', email);
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Auth operations: Login error', error);
        setError(error.message);
        return { error };
      }
      
      console.log('Auth operations: Login successful');
      toast.success('Logged in successfully!');
      return { error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      console.error('Auth operations: Login exception', err);
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  // Register function
  const register = async (
    email: string, 
    password: string, 
    userData: { first_name: string; last_name: string; role: 'founder' | 'provider' }
  ): Promise<{ error: any | null }> => {
    try {
      setError(null);
      console.log('Auth operations: Attempting registration for', email, 'with role', userData.role);
      
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
        console.error('Auth operations: Registration error', error);
        setError(error.message);
        return { error };
      }
      
      console.log('Auth operations: Registration successful');
      toast.success('Account created successfully!');
      return { error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      console.error('Auth operations: Registration exception', err);
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      console.log('Auth operations: Logout initiated');
      setError(null);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Auth operations: Supabase logout error:', error);
        throw error;
      }
      
      // Clear all state immediately
      setUser(null);
      setSession(null);
      setProfile(null);
      setError(null);
      
      console.log('Auth operations: Logout completed successfully');
      toast.success('Logged out successfully');
      
      // Force reload to ensure clean state
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
      
    } catch (err: any) {
      console.error('Auth operations: Logout error:', err);
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
  const updateProfile = async (profileData: Partial<Profile>): Promise<{ error: any | null }> => {
    try {
      setError(null);
      console.log('Auth operations: Updating profile', profileData);
      
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
      console.log('Auth operations: Profile updated successfully', data);
      toast.success('Profile updated successfully');
      
      return { error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Profile update failed';
      console.error('Auth operations: Profile update error', err);
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  // Refresh profile function with enhanced error handling
  const refreshProfile = async (): Promise<void> => {
    try {
      console.log('Auth operations: Refreshing profile');
      
      if (!user || !user.id) {
        console.log('Auth operations: No user available for profile refresh');
        return;
      }
      
      const userProfile = await fetchProfile(user.id);
      setProfile(userProfile);
      
      if (userProfile) {
        console.log('Auth operations: Profile refreshed successfully', userProfile);
      } else {
        console.log('Auth operations: Profile refresh returned null');
      }
    } catch (err: any) {
      console.error('Auth operations: Profile refresh error:', err);
      setError('Failed to refresh profile');
    }
  };

  // Retry auth function
  const retryAuth = (): void => {
    console.log('Auth operations: Retrying authentication');
    setError(null);
    
    // Re-trigger auth initialization
    supabase.auth.getSession().then(({ data: { session: currentSession }, error }) => {
      if (error) {
        console.error('Auth operations: Retry auth error:', error);
        setError(error.message);
      } else if (currentSession) {
        console.log('Auth operations: Session recovered during retry');
        setSession(currentSession);
        setUser(currentSession.user);
        fetchProfile(currentSession.user.id).then(userProfile => {
          setProfile(userProfile);
          console.log('Auth operations: Profile recovered during retry', userProfile);
        });
      }
    });
  };

  return {
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,
    retryAuth,
  };
};
