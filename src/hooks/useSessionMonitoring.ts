
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { safeAuthOperation, recoverAuthState } from "@/utils/auth/rate-limiting";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const useSessionMonitoring = (
  fetchProfileAndSetState: (userId: string) => Promise<void>,
  resetProfileState: () => void,
  setAuthError: (error: string | null) => void
) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [authStateChangeCount, setAuthStateChangeCount] = useState(0);
  const [lastProfileFetch, setLastProfileFetch] = useState(0);
  const [recoveryAttempted, setRecoveryAttempted] = useState(false);
  const [sessionRecoveryInProgress, setSessionRecoveryInProgress] = useState(false);

  // Enhanced logging function that only logs in development mode
  const logAuth = (message: string, data?: any, isWarning = false, isError = false) => {
    if (process.env.NODE_ENV !== 'production') {
      const timestamp = new Date().toISOString();
      const logMethod = isError ? console.error : isWarning ? console.warn : console.log;
      logMethod(`${timestamp} ${isWarning ? 'warning:' : isError ? 'error:' : 'info:'} ${message}`, data);
    }
  };

  // Set up auth listener and session initialization
  useEffect(() => {
    logAuth("Setting up auth listener");
    let isMounted = true;
    let profileFetchInProgress = false;
    
    // Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      logAuth("Auth state changed:", event);
      
      // Track auth state changes to detect potential loops
      setAuthStateChangeCount(prev => {
        const newCount = prev + 1;
        
        // Log warning if too many auth state changes
        if (newCount > 10 && newCount % 5 === 0) {
          logAuth(`High frequency of auth state changes detected (${newCount}). Possible auth loop.`, null, true);
          
          if (newCount > 25 && !recoveryAttempted) {
            logAuth("Auth state change threshold exceeded. Initiating recovery.", null, true);
            setRecoveryAttempted(true);
            initiateSessionRecovery();
            return prev; // Don't increment further during recovery
          }
        }
        
        return newCount;
      });
      
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
        logAuth("Error getting session:", error, false, true);
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
  }, [fetchProfileAndSetState, resetProfileState, setAuthError, lastProfileFetch]);

  // Force end loading state after timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        logAuth("Forcing end of loading state after timeout", null, true);
        setLoading(false);
        
        // Show toast if we had to force end loading
        if (!authInitialized) {
          toast.error(
            <div className="flex flex-col gap-2">
              <span>Authentication is taking longer than expected</span>
              <Alert variant="warning" className="mt-2">
                <AlertDescription>
                  You may need to refresh the page if you experience issues.
                </AlertDescription>
              </Alert>
            </div>
          );
        }
      }
    }, 7000); // Increased from 5000ms to 7000ms

    return () => clearTimeout(timer);
  }, [loading, authInitialized]);

  // Monitor for potential auth refresh loops and add circuit breaker
  useEffect(() => {
    if (authStateChangeCount > 25 && !sessionRecoveryInProgress && !recoveryAttempted) {
      logAuth("Too many auth state changes detected. Possible auth loop. Initiating recovery.", null, false, true);
      initiateSessionRecovery();
    }
  }, [authStateChangeCount, sessionRecoveryInProgress, recoveryAttempted]);

  // Session recovery function
  const initiateSessionRecovery = async () => {
    if (sessionRecoveryInProgress) return;
    
    setSessionRecoveryInProgress(true);
    logAuth("Starting session recovery procedure", null, true);
    
    try {
      // Clear pending operations first
      await recoverAuthState();
      
      // Sign out completely to reset state
      await supabase.auth.signOut({ scope: 'local' });
      
      // Reset all local state
      setUser(null);
      setSession(null);
      resetProfileState();
      setAuthError(null);
      setAuthStateChangeCount(0);
      
      // Notify user
      toast.warning(
        <div className="flex flex-col gap-2">
          <span>Authentication session recovered</span>
          <Alert variant="warning" className="mt-2">
            <AlertDescription>
              Your session has been reset due to an authentication loop. Please sign in again.
            </AlertDescription>
          </Alert>
        </div>
      );
    } catch (error) {
      logAuth("Session recovery failed:", error, false, true);
      toast.error("Session recovery failed. Please refresh the page.");
    } finally {
      setSessionRecoveryInProgress(false);
      setRecoveryAttempted(true);
    }
  };

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
