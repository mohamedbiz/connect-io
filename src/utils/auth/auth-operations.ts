
import { supabase, checkNetworkConnection } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { logAuth } from '@/utils/auth/auth-logger';

// Login with email and password
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      logAuth('Network connectivity issue detected during login', null, true);
      return { error: { message: 'You appear to be offline. Please check your internet connection and try again.' } };
    }
    
    logAuth('Attempting login', { email });
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      logAuth('Login error:', error, false, true);
      return { error };
    }
    
    logAuth('Login successful', { user: data.user });
    toast.success('Logged in successfully');
    return { error: null };
  } catch (error: any) {
    logAuth('Login exception:', error, false, true);
    return { error };
  }
};

// Register with email and password
export const registerWithEmailAndPassword = async (
  email: string, 
  password: string, 
  userData: { first_name: string; last_name: string; role: 'founder' | 'provider' }
) => {
  try {
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      logAuth('Network connectivity issue detected during registration', null, true);
      return { error: { message: 'You appear to be offline. Please check your internet connection and try again.' } };
    }
    
    logAuth('Attempting registration', { email, userData });
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          role: userData.role
        },
      }
    });
    
    if (error) {
      logAuth('Registration error:', error, false, true);
      return { error };
    }
    
    logAuth('Registration successful', { user: data.user });
    toast.success('Registration successful!');
    return { error: null };
  } catch (error: any) {
    logAuth('Registration exception:', error, false, true);
    return { error };
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      logAuth('Network connectivity issue detected during logout', null, true);
      localStorage.removeItem('sb-lhlxhnhbfgmrwfirihxg-auth-token');
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
