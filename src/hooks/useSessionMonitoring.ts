
import { useState, useEffect, useCallback, useRef } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStateMonitoring } from "./auth/useAuthStateMonitoring";
import { useSessionRecovery } from "./auth/useSessionRecovery";
import { useSessionTimeout } from "./auth/useSessionTimeout";
import { logAuth } from "@/utils/auth/auth-logger";

export const useSessionMonitoring = (
  onUserAuthenticated: (userId: string) => Promise<void>,
  onSignOut: () => void,
  setAuthError: (error: string | null) => void
) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);
  
  // Use a ref to track if profile fetch is in progress
  const profileFetchInProgress = useRef(false);

  // Use session recovery hook
  const {
    recoveryAttempted,
    sessionRecoveryInProgress,
    setRecoveryAttempted,
    initiateSessionRecovery
  } = useSessionRecovery(onSignOut);

  // Use auth state monitoring to detect potential loops
  const { trackAuthStateChange } = useAuthStateMonitoring(
    initiateSessionRecovery,
    recoveryAttempted
  );

  // Handle auth state change
  const handleAuthChange = useCallback(
    async (_event: string, newSession: Session | null) => {
      trackAuthStateChange();
      
      try {
        setSession(newSession);

        if (newSession?.user) {
          setUser(newSession.user);
          setAuthError(null);
          
          // Prevent duplicate profile fetches
          if (!sessionRecoveryInProgress && !profileFetchInProgress.current && newSession.user.id) {
            profileFetchInProgress.current = true;
            try {
              await onUserAuthenticated(newSession.user.id);
            } finally {
              profileFetchInProgress.current = false;
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        logAuth("Error in auth state change handler:", error, "error");
        setAuthError("Failed to process authentication change");
      }
    },
    [trackAuthStateChange, onUserAuthenticated, setAuthError, sessionRecoveryInProgress]
  );

  // Set up auth state listener on component mount
  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    
    // First, set up the auth subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

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
          
          if (data.session?.user && !profileFetchInProgress.current) {
            profileFetchInProgress.current = true;
            try {
              await onUserAuthenticated(data.session.user.id);
            } catch (err) {
              logAuth("Error fetching user profile:", err, "error");
            } finally {
              profileFetchInProgress.current = false;
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

    initializeAuth();

    // Clean up on unmount
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [handleAuthChange, onUserAuthenticated, setAuthError]);

  // Force end loading state after timeout to prevent infinite loading
  useSessionTimeout(loading, authInitialized);

  return {
    user,
    session,
    loading,
    setUser,
    setSession,
    setLoading,
  };
};
