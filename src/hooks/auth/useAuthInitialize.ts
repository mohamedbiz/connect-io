
import { useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { fetchProfile } from '@/utils/auth/auth-operations';
import { Profile } from '@/types/auth';
import { logAuth } from '@/utils/auth/auth-logger';

export function useAuthInitialize() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Handle retry and connection issues
  const handleRetry = useCallback((operation: string) => {
    if (retryCount < maxRetries) {
      const delay = Math.pow(2, retryCount) * 1000;
      logAuth(`Retrying ${operation} after ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`, null, true);
      
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
      }, delay);
      return true;
    }
    return false;
  }, [retryCount, maxRetries]);

  // Manual retry function that users can trigger
  const retryAuth = useCallback(() => {
    setError(null);
    setRetryCount(0);
  }, []);

  // Initialize auth - get session and set up listener
  useEffect(() => {
    let cleanup = () => {};
    
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        // Set up the auth state change listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, currentSession) => {
            logAuth(`Auth state changed: ${event}`, { currentSession });
            setSession(currentSession);
            setUser(currentSession?.user ?? null);

            // If session exists, fetch the user profile
            if (currentSession?.user) {
              // Use setTimeout to avoid potential auth state conflicts
              setTimeout(async () => {
                const userProfile = await fetchProfile(currentSession.user.id);
                setProfile(userProfile);
              }, 0);
            } else {
              setProfile(null);
            }
          }
        );

        // Then get the initial session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setSession(data.session);
        setUser(data.session?.user ?? null);

        // If we have a user, fetch their profile
        if (data.session?.user) {
          const userProfile = await fetchProfile(data.session.user.id);
          setProfile(userProfile);
        }

        setError(null);
        setRetryCount(0);

        cleanup = () => {
          subscription.unsubscribe();
        };
      } catch (error: any) {
        logAuth('Auth initialization error:', error, false, true);
        setError(error?.message || 'Failed to initialize authentication');
        
        // Retry if network error
        if (error.message?.includes('fetch') && handleRetry('initialization')) {
          // Retry is scheduled
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
    
    return () => {
      cleanup();
    };
  }, [retryCount, handleRetry]);

  return {
    user,
    session,
    profile,
    loading,
    error,
    retryAuth,
    setProfile
  };
}
