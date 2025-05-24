
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lhlxhnhbfgmrwfirihxg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobHhobmhiZmdtcndmaXJpaHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMzU1MDMsImV4cCI6MjA2MDkxMTUwM30.K7O7jHgJLfTooO2tGP4DeTqsEcIONsiHWLVPn9su1wg'

// Create Supabase client with better network handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage,
    // Debug to help identify issues
    debug: import.meta.env.DEV,
    // This reduces unnecessary auth state changes in development
    detectSessionInUrl: true,
    flowType: 'implicit',
  }
})

// For debugging in development
if (import.meta.env.DEV) {
  // Track auth state
  supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Auth state changed: ${event}`, session?.user?.id || 'No user');
  });
}

// Improved helper function to check network connectivity
export const checkNetworkConnection = async (): Promise<boolean> => {
  try {
    // Create an abort controller to handle timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    // Try to ping the Supabase endpoint directly instead of Google
    // This gives us a more accurate reading on whether the API we actually need is available
    const response = await fetch(`${supabaseUrl}/rest/v1/`, { 
      method: 'HEAD', 
      headers: {
        'apikey': supabaseAnonKey,
      },
      signal: controller.signal,
      // Use no-cors mode as fallback
      mode: 'no-cors'
    });
    
    clearTimeout(timeoutId);
    console.log('Network connectivity check successful');
    
    return true;
  } catch (error) {
    console.error('Network connectivity check failed:', error);
    
    // Try a secondary check with Google as fallback
    try {
      await fetch('https://www.google.com', { 
        method: 'HEAD',
        mode: 'no-cors',
        // Short timeout for secondary check
        signal: AbortSignal.timeout(3000)
      });
      
      console.log('Secondary network check successful');
      return true;
    } catch (secondaryError) {
      console.error('Secondary network check failed:', secondaryError);
      return false;
    }
  }
};

// Export a function to test API connectivity specifically
export const testApiConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1).single();
    return !error;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};
