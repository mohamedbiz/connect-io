
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mohamedbiz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vaGFtZWRiaXoiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcxMTA5MzUzMywiZXhwIjoyMDI2NjY5NTMzfQ.A5uJsrm0HGbIuZI2kWoOeQPF_6LrEPqyvVnXgUZuEm0'

// Create Supabase client with explicit auth configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage,
    // Debug to help identify issues
    debug: import.meta.env.DEV,
    // This reduces unnecessary auth state changes in development
    detectSessionInUrl: true,
    flowType: 'implicit'
  },
})

// For debugging in development
if (import.meta.env.DEV) {
  // Track auth state
  supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Auth state changed: ${event}`, session?.user?.id || 'No user');
  });
}
