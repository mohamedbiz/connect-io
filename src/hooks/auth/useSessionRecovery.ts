
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { logAuth } from '@/utils/auth/auth-logger';

/**
 * Hook to recover a session from local storage
 */
export function useSessionRecovery() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;

  const recoverSession = useCallback(async () => {
    try {
      setLoading(true);
      logAuth('Attempting to recover session', { retryCount });

      const { data, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw sessionError;
      }
      
      if (data?.session) {
        logAuth('Session recovered successfully', { userId: data.session.user.id });
        setSession(data.session);
        setError(null);
      } else {
        logAuth('No session found to recover', null, true);
      }
    } catch (err: any) {
      logAuth('Error recovering session:', err, false, true);
      setError(err.message || 'Error recovering session');
      
      // Retry if under max attempts and looks like a network error
      if (retryCount < MAX_RETRIES && err.message?.includes('fetch')) {
        setRetryCount(prev => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    recoverSession();
  }, [recoverSession]);

  const retry = useCallback(() => {
    setRetryCount(0); // Reset retry counter
    recoverSession();
  }, [recoverSession]);

  return {
    session,
    loading,
    error,
    retry,
    recoverSession
  };
}
