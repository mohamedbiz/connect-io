
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { toast } from 'sonner';
import { logAuth } from '@/utils/auth/auth-logger';

// Fetch user profile
export const fetchProfile = async (userId: string): Promise<Profile | null> => {
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
export const ensureProfileExists = async (user: User | null): Promise<Profile | null> => {
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
    
    return userProfile;
  } catch (error) {
    logAuth('Error ensuring profile exists:', error, false, true);
    toast.error('Profile error');
    return null;
  }
};

// Login with email and password
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    logAuth('Attempting login', { email });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      logAuth('Login error:', error, false, true);
      
      // Enhanced error handling
      if (error.message?.includes('fetch')) {
        toast.error('Network connection error. Please check your internet connection and try again.');
      } else if (error.message?.includes('Invalid login credentials')) {
        toast.error('Invalid email or password. Please try again.');
      } else if (error.message?.includes('rate limit')) {
        toast.error('Too many login attempts. Please try again later.');
      } else {
        toast.error(error.message || 'Login failed');
      }
      
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
export const registerWithEmailAndPassword = async (
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
      
      // Enhanced error handling
      if (error.message?.includes('fetch')) {
        toast.error('Network connection error. Please check your internet connection and try again.');
      } else if (error.message?.includes('already registered')) {
        toast.error('This email is already registered. Please sign in instead.');
      } else if (error.message?.includes('password')) {
        toast.error('Password must be at least 6 characters long.');
      } else if (error.message?.includes('rate limit')) {
        toast.error('Too many signup attempts. Please try again later.');
      } else {
        toast.error(error.message || 'Registration failed');
      }
      
      return { error };
    }

    logAuth('Registration successful', { user: data.user });
    
    // Create a profile for the new user
    if (data.user) {
      await ensureProfileExists(data.user);
    }
    
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
export const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
    logAuth('Logged out successfully');
    toast.success('Logged out successfully');
  } catch (error) {
    logAuth('Logout error:', error, false, true);
    toast.error('Error during logout');
  }
};

// Get the current session
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      logAuth('Error getting session:', error, false, true);
      return { session: null, error };
    }
    
    return { session: data.session, error: null };
  } catch (error) {
    logAuth('Exception getting session:', error, false, true);
    return { session: null, error };
  }
};
