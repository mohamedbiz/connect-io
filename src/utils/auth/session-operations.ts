
import { supabase, checkNetworkConnection } from '@/integrations/supabase/client';
import { logAuth } from '@/utils/auth/auth-logger';

// Get the current session
export const getCurrentSession = async () => {
  try {
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
