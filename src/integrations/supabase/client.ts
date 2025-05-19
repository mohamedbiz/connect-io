
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mohamedbiz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vaGFtZWRiaXoiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcxMTA5MzUzMywiZXhwIjoyMDI2NjY5NTMzfQ.A5uJsrm0HGbIuZI2kWoOeQPF_6LrEPqyvVnXgUZuEm0'

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
    // Add network handling configuration
    fetch: (url, options) => {
      const controller = new AbortController();
      const { signal } = controller;
      
      // Set a timeout for fetch requests
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout
      
      return fetch(url, { ...options, signal })
        .then(response => {
          clearTimeout(timeoutId);
          return response;
        })
        .catch(error => {
          clearTimeout(timeoutId);
          console.error('Network error:', error);
          throw error;
        });
    }
  },
})

// For debugging in development
if (import.meta.env.DEV) {
  // Track auth state
  supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Auth state changed: ${event}`, session?.user?.id || 'No user');
  });
}

// Helper function to check network connectivity
export const checkNetworkConnection = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('https://www.google.com', { 
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    console.error('Network connectivity check failed:', error);
    return false;
  }
};
