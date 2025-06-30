
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { useProfileManagement } from './useProfileManagement';

export const useAuthStateManager = () => {
  // Core auth state
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchProfile } = useProfileManagement();

  // Initialize auth on mount (once only)
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      console.log('useAuthStateManager: Initializing auth state');
      setLoading(true);
      
      try {
        // Check for existing session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (!mounted) return;

        // Set session if exists
        if (currentSession) {
          console.log('useAuthStateManager: Found existing session');
          setSession(currentSession);
          setUser(currentSession.user);
        } else {
          console.log('useAuthStateManager: No existing session found');
        }

        setError(null);
      } catch (err: any) {
        console.error('useAuthStateManager: Auth initialization error:', err);
        if (mounted) {
          setError(err?.message || 'Failed to initialize authentication');
          // Clear any invalid session data
          setSession(null);
          setUser(null);
          setProfile(null);
        }
      } finally {
        if (mounted) {
          console.log('useAuthStateManager: Setting loading to false after initialization');
          setLoading(false);
        }
      }
    };
    
    initializeAuth();
    
    // Set up auth state change listener - NO ASYNC CALLS HERE
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log('useAuthStateManager: Auth state changed:', event);
      
      if (!mounted) return;

      // ONLY synchronous state updates in the callback
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false); // Always set loading to false when auth state changes
      
      // Defer ANY async operations using setTimeout
      if (newSession?.user) {
        console.log('useAuthStateManager: User authenticated, deferring profile fetch');
        setTimeout(async () => {
          if (mounted) {
            try {
              const userProfile = await fetchProfile(newSession.user.id);
              if (mounted) {
                setProfile(userProfile);
              }
            } catch (err) {
              console.error('useAuthStateManager: Error fetching profile:', err);
              if (mounted) {
                setError('Error loading user profile');
              }
            }
          }
        }, 0);
      } else {
        console.log('useAuthStateManager: User not authenticated, clearing profile');
        setProfile(null);
      }
    });
    
    // Clean up listener on unmount
    return () => {
      console.log('useAuthStateManager: Cleaning up auth state listener');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array - only run once

  return {
    user,
    session,
    profile,
    loading,
    error,
    setUser,
    setSession,
    setProfile,
    setError,
    fetchProfile,
  };
};
