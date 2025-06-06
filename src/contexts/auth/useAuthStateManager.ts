
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
          setSession(currentSession);
          setUser(currentSession.user);
          
          // Get user profile data
          const userProfile = await fetchProfile(currentSession.user.id);
          if (mounted) {
            setProfile(userProfile);
          }
        }

        setError(null);
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setError(err?.message || 'Failed to initialize authentication');
          // Clear any invalid session data
          setSession(null);
          setUser(null);
          setProfile(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    initializeAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth state changed:', event);
      
      if (!mounted) return;

      // Update session state
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      // Handle different auth events
      switch (event) {
        case 'SIGNED_IN':
          if (newSession) {
            try {
              // Get user profile data
              const userProfile = await fetchProfile(newSession.user.id);
              if (mounted) {
                setProfile(userProfile);
              }
            } catch (err) {
              console.error('Error fetching user data:', err);
              if (mounted) {
                setError('Error loading user profile');
              }
            }
          }
          break;
          
        case 'SIGNED_OUT':
          // Clear user data
          setProfile(null);
          break;
          
        case 'TOKEN_REFRESHED':
          // Just update the session, no need to refetch user
          break;
          
        case 'USER_UPDATED':
          // Refresh user data
          if (newSession) {
            try {
              const userProfile = await fetchProfile(newSession.user.id);
              if (mounted) {
                setProfile(userProfile);
              }
            } catch (err) {
              console.error('Error updating user data:', err);
              if (mounted) {
                setError('Error updating user profile');
              }
            }
          }
          break;
          
        default:
          break;
      }
      
      if (mounted) {
        setLoading(false);
      }
    });
    
    // Clean up listener on unmount
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
