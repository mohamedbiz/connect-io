
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
