
import { useState, useEffect, useCallback, useRef } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { logAuth } from "@/utils/auth/auth-logger";
import { useSessionRecovery } from "./auth/useSessionRecovery";
import { useAuthStateMonitoring } from "./auth/useAuthStateMonitoring";
import { useSessionTimeout } from "./auth/useSessionTimeout";

// Debounce time in ms to prevent rapid state changes
const FETCH_DEBOUNCE_TIME = 100;

export const useSessionMonitoring = (
  onUserAuthenticated: (userId: string) => Promise<void>,
  onSignOut: () => void,
  setAuthError: (error: string | null) => void
) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);
  
  // Use refs to track if operations are in progress - prevents duplicate calls
  const profileFetchInProgress = useRef(false);

  // Reset all state when needed
  const resetState = useCallback(() => {
    setUser(null);
    setSession(null);
    onSignOut();
    setAuthError(null);
  }, [onSignOut, setAuthError]);

  // Use the session recovery hook
  const { 
    recoveryAttempted, 
    initiateSessionRecovery 
  } = useSessionRecovery(resetState);

  // Use the auth state monitoring hook
  const { trackAuthStateChange } = useAuthStateMonitoring(
    initiateSessionRecovery,
    recoveryAttempted
  );

  // Use the session timeout hook
  useSessionTimeout(loading, authInitialized);

  // Handle auth state change with debouncing
  const handleAuthChange = useCallback(
    async (_event: string, newSession: Session | null) => {
      // Track auth state change to detect potential loops
      trackAuthStateChange();
      
      // Update session state
      setSession(newSession);

      if (newSession?.user) {
        // Session exists - update user and fetch profile if needed
        setUser(newSession.user);
        setAuthError(null);
        
        // Prevent duplicate profile fetches with debouncing
        if (!profileFetchInProgress.current && newSession.user.id) {
          // Set the flag before the async operation
          profileFetchInProgress.current = true;
          
          // Use setTimeout to debounce profile fetching
          setTimeout(async () => {
            try {
              await onUserAuthenticated(newSession.user.id);
            } catch (error) {
              logAuth("Error fetching user profile:", error, "error");
            } finally {
              // Clear the flag after completion
              profileFetchInProgress.current = false;
            }
          }, FETCH_DEBOUNCE_TIME);
        }
      } else {
        // No session - reset user
        setUser(null);
      }
    },
    [onUserAuthenticated, setAuthError, trackAuthStateChange]
  );

  // Set up auth state listener on component mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    // Set up the auth subscription first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (isMounted) {
          handleAuthChange(event, session);
        }
      }
    );

    // Then, get the initial session
    const initializeAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          logAuth("Error getting session:", error, "error");
          if (isMounted) {
            setAuthError(error.message);
            setLoading(false);
          }
          return;
        }
        
        if (isMounted) {
          setSession(data.session);
          setUser(data.session?.user || null);
          
          // Fetch profile only if we have a session and no fetch is in progress
          if (data.session?.user && !profileFetchInProgress.current) {
            profileFetchInProgress.current = true;
            try {
              await onUserAuthenticated(data.session.user.id);
            } catch (err) {
              logAuth("Error fetching user profile:", err, "error");
            } finally {
              if (isMounted) {
                profileFetchInProgress.current = false;
              }
            }
          }
          
          setAuthInitialized(true);
          setLoading(false);
        }
      } catch (err) {
        logAuth("Unexpected error during auth initialization:", err, "error");
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Initialize auth after the subscription is set up
    initializeAuth();

    // Clean up on unmount
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [handleAuthChange, onUserAuthenticated, setAuthError]);

  return {
    user,
    session,
    loading,
    setUser,
    setSession,
    setLoading,
  };
};
