import { User } from '@supabase/supabase-js';
import { supabase, checkNetworkConnection } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { toast } from 'sonner';
import { logAuth } from '@/utils/auth/auth-logger';

// Fetch user profile
export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  try {
    logAuth(`Fetching profile for user: ${userId}`);
    
    // Check network connectivity first
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      logAuth('Network connectivity issue detected when fetching profile', null, true);
      toast.error('Network connection issue. Please check your internet connection.');
      return null;
    }
    
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
    // Check network connectivity first
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      logAuth('Network connectivity issue detected when ensuring profile exists', null, true);
      toast.error('Network connection issue. Please check your internet and try again.');
      return null;
    }
    
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
    // Check network connectivity first with a more thorough check
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      logAuth('Network connectivity issue detected during login', null, true);
      return { error: { message: 'You appear to be offline. Please check your internet connection and try again.' } };
    }
    
    logAuth('Attempting login', { email });
    
    // Add a retry mechanism for network flakiness
    let attempt = 0;
    const maxAttempts = 2;
    
    while (attempt < maxAttempts) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) {
          logAuth('Login error:', error, false, true);
          
          // If it's not a network error, don't retry
          if (!error.message?.includes('fetch')) {
            return { error };
          }
          
          // If it's the last attempt, return the error
          if (attempt === maxAttempts - 1) {
            return { error };
          }
          
          // Otherwise, wait and retry
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          attempt++;
          continue;
        }
        
        logAuth('Login successful', { user: data.user });
        toast.success('Logged in successfully');
        return { error: null };
      } catch (innerError: any) {
        // If it's not a network error or last attempt, don't retry
        if (!innerError.message?.includes('fetch') || attempt === maxAttempts - 1) {
          logAuth('Login exception:', innerError, false, true);
          return { error: innerError };
        }
        
        // Wait and retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        attempt++;
      }
    }
    
    // This should never be reached due to the return statements above,
    // but TypeScript requires a return statement
    return { error: { message: 'All login attempts failed' } };
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
    // Check network connectivity first with a more robust check
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      logAuth('Network connectivity issue detected during registration', null, true);
      return { error: { message: 'You appear to be offline. Please check your internet connection and try again.' } };
    }
    
    logAuth('Attempting registration', { email, userData });
    
    // Add a retry mechanism for network flakiness
    let attempt = 0;
    const maxAttempts = 2;
    
    while (attempt < maxAttempts) {
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
          logAuth('Registration error:', error, false, true);
          
          // If it's not a network error, don't retry
          if (!error.message?.includes('fetch')) {
            return { error };
          }
          
          // If it's the last attempt, return the error
          if (attempt === maxAttempts - 1) {
            return { error };
          }
          
          // Otherwise, wait and retry
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          attempt++;
          continue;
        }
        
        logAuth('Registration successful', { user: data.user });
        
        // Create a profile for the new user
        if (data.user) {
          await ensureProfileExists(data.user);
        }
        
        toast.success('Registration successful!');
        return { error: null };
      } catch (innerError: any) {
        // If it's not a network error or last attempt, don't retry
        if (!innerError.message?.includes('fetch') || attempt === maxAttempts - 1) {
          logAuth('Registration exception:', innerError, false, true);
          return { error: innerError };
        }
        
        // Wait and retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        attempt++;
      }
    }
    
    // This should never be reached
    return { error: { message: 'All registration attempts failed' } };
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
    // Check network connectivity first
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      logAuth('Network connectivity issue detected during logout', null, true);
      // We still want to clear local session even if offline
      localStorage.removeItem('sb-mohamedbiz-auth-token');
      toast.warning('Logged out locally. Some features may not work until you reconnect.');
      return;
    }
    
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
    // Check network connectivity first
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      logAuth('Network connectivity issue detected when getting session', null, true);
      return { session: null, error: new Error('You appear to be offline. Please check your internet connection.') };
    }
    
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
