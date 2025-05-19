import { useState, useEffect, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { logAuth } from '@/utils/auth/auth-logger';

/**
 * Hook to monitor authentication state changes
 */
export function useAuthStateMonitoring() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Keep a reference to the auth subscription
  const authSubscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);

  useEffect(() => {
    // Set up auth state listener
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, currentSession) => {
          logAuth(`Auth state changed: ${event}`, { userId: currentSession?.user?.id });
          
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          // Don't set loading to false on the auth change event
          // This will be handled after initial session check
        }
      );
      
      authSubscriptionRef.current = subscription;
      
      // Check for existing session
      supabase.auth.getSession().then(({ data, error: sessionError }) => {
        if (sessionError) {
          logAuth('Error getting session:', sessionError, false, true);
          setError(sessionError.message);
        } else {
          setSession(data.session);
          setUser(data.session?.user ?? null);
        }
        setLoading(false);
      });
    } catch (err: any) {
      logAuth('Auth monitoring initialization error:', err, false, true);
      setError(err.message || 'Error monitoring auth state');
      setLoading(false);
    }

    // Clean up subscription on unmount
    return () => {
      if (authSubscriptionRef.current) {
        authSubscriptionRef.current.unsubscribe();
      }
    };
  }, []);

  return { user, session, loading, error };
}
