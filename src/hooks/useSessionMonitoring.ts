
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { safeAuthOperation } from "@/utils/auth/rate-limiting";
import { useSessionRecovery } from "./auth/useSessionRecovery";
import { useAuthStateMonitoring } from "./auth/useAuthStateMonitoring";
import { useSessionTimeout } from "./auth/useSessionTimeout";
import { logAuth } from "@/utils/auth/auth-logger";

export const useSessionMonitoring = (
  fetchProfileAndSetState: (userId: string) => Promise<void>,
  resetProfileState: () => void,
  setAuthError: (error: string | null) => void
) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [lastProfileFetch, setLastProfileFetch] = useState(0);

  // Reset state function - used in multiple places
  const resetAllState = () => {
    setUser(null);
    setSession(null);
    resetProfileState();
    setAuthError(null);
    setAuthStateChangeCount(0);
  };

  // Use refactored session recovery hook
  const {
    recoveryAttempted,
    sessionRecoveryInProgress,
    initiateSessionRecovery
  } = useSessionRecovery(resetAllState);

  // Use refactored auth state monitoring hook
  const {
    authStateChangeCount,
    trackAuthStateChange,
    setAuthStateChangeCount
  } = useAuthStateMonitoring(initiateSessionRecovery, recoveryAttempted);

  // Use timeout hook to prevent infinite loading
  useSessionTimeout(loading, authInitialized);

  // Set up auth listener and session initialization
  useEffect(() => {
    logAuth("Setting up auth listener");
    let isMounted = true;
    let profileFetchInProgress = false;
    
    // Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      logAuth("Auth state changed:", event);
      
      // Track auth state changes to detect potential loops
      trackAuthStateChange();
      
      if (isMounted) {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Check if we've recently fetched this profile to avoid redundant fetches
          const now = Date.now();
          const timeSinceLastFetch = now - lastProfileFetch;
          
          // Only fetch profile if enough time has passed and no fetch is in progress
          if (timeSinceLastFetch > 3000 && !profileFetchInProgress && isMounted) {
            profileFetchInProgress = true;
            
            // Defer Supabase call with setTimeout to prevent potential deadlocks
            setTimeout(() => {
              if (isMounted && session?.user?.id) {
                safeAuthOperation(async () => {
                  try {
                    await fetchProfileAndSetState(session.user.id);
                    setLastProfileFetch(Date.now());
                  } finally {
                    if (isMounted) {
                      profileFetchInProgress = false;
                    }
                  }
                }, `fetch_profile_${session.user.id}`); // Add operation key for deduplication
              }
            }, 300);
          }
        } else {
          resetProfileState();
          setLoading(false);
          setAuthError(null);
        }
      }
    });

    // THEN check for existing session with proper rate limiting
    safeAuthOperation(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        logAuth("Initial session check:", session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Add delay before fetching profile to avoid race conditions
          setTimeout(() => {
            if (isMounted && session?.user?.id && !profileFetchInProgress) {
              profileFetchInProgress = true;
              
              safeAuthOperation(async () => {
                try {
                  await fetchProfileAndSetState(session.user.id);
                  setLastProfileFetch(Date.now());
                } finally {
                  if (isMounted) {
                    profileFetchInProgress = false;
                    setLoading(false);
                    setAuthInitialized(true);
                  }
                }
              }, `initial_fetch_profile_${session.user.id}`);
            }
          }, 300);
        } else {
          resetProfileState();
          setLoading(false);
          setAuthInitialized(true);
        }
      } catch (error) {
        logAuth("Error getting session:", error, 'error');
        if (isMounted) {
          setLoading(false);
          setAuthError("Failed to get session");
          setAuthInitialized(true);
        }
      }
    }, "initial_session_check");

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfileAndSetState, resetProfileState, setAuthError, lastProfileFetch, 
      trackAuthStateChange, resetAllState]);

  return {
    user,
    session,
    loading,
    authInitialized,
    setUser,
    setSession,
    setLoading,
    initiateSessionRecovery
  };
};
