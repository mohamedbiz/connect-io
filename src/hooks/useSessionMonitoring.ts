
import { useState, useEffect, useCallback, useRef } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { logAuth } from "@/utils/auth/auth-logger";

// Threshold for detecting potential auth loops
const AUTH_CHANGE_THRESHOLD = 10;
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
  
  // Track auth state changes to detect potential loops
  const authStateChangeCount = useRef(0);
  const lastAuthChangeTime = useRef(Date.now());
  
  // Use refs to track if operations are in progress - prevents duplicate calls
  const profileFetchInProgress = useRef(false);
  const sessionRecoveryInProgress = useRef(false);

  // Force end loading state after timeout to prevent infinite loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading && authStateChangeCount.current > AUTH_CHANGE_THRESHOLD) {
        logAuth("Forcing end of loading state due to timeout", null, "warning");
        setLoading(false);
      }
    }, 10000); // 10 seconds max loading time
    
    return () => clearTimeout(timeoutId);
  }, [loading]);

  // Handle recovery from potential auth loops
  const initiateSessionRecovery = useCallback(async () => {
    if (sessionRecoveryInProgress.current) return;
    
    sessionRecoveryInProgress.current = true;
    logAuth("Session recovery: Signing out to reset auth state", null, 'warning');
    
    try {
      // Sign out completely to reset state
      await supabase.auth.signOut({ scope: 'local' });
      
      // Reset all local state
      setUser(null);
      setSession(null);
      onSignOut();
      
      // Reset counters
      authStateChangeCount.current = 0;
      
      // Notify user
      toast.warning("Your session has been reset due to an authentication issue. Please sign in again.");
    } catch (error) {
      logAuth("Session recovery failed:", error, 'error');
    } finally {
      sessionRecoveryInProgress.current = false;
      setLoading(false);
    }
  }, [onSignOut]);

  // Handle auth state change with debouncing
  const handleAuthChange = useCallback(
    async (_event: string, newSession: Session | null) => {
      // Check for potential auth loop by measuring frequency
      const now = Date.now();
      const timeSinceLastChange = now - lastAuthChangeTime.current;
      lastAuthChangeTime.current = now;
      
      // Count auth state changes to detect potential loops
      authStateChangeCount.current += 1;
      
      // If changes are happening too rapidly, it may indicate a loop
      if (authStateChangeCount.current > AUTH_CHANGE_THRESHOLD && timeSinceLastChange < 1000) {
        logAuth(`Potential auth loop detected (${authStateChangeCount.current} changes)`, null, "warning");
        
        if (authStateChangeCount.current > 25 && !sessionRecoveryInProgress.current) {
          // Circuit breaker: attempt recovery
          initiateSessionRecovery();
          return;
        }
      }
      
      // Don't update state if recovery is in progress
      if (sessionRecoveryInProgress.current) return;
      
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
    [onUserAuthenticated, setAuthError, initiateSessionRecovery]
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

// Import toast at the top of the file
import { toast } from "sonner";
