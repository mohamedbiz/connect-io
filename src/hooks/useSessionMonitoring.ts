
import { useState, useEffect, useCallback, useRef } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { logAuth } from "@/utils/auth/auth-logger";
import { useSessionRecovery } from "./auth/useSessionRecovery";
import { useAuthStateMonitoring } from "./auth/useAuthStateMonitoring";
import { useSessionTimeout } from "./auth/useSessionTimeout";

// Increased debounce time to prevent multiple rapid profile fetches
const FETCH_DEBOUNCE_TIME = 300;

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
  const lastProfileFetchTime = useRef(0);

  // Reset all state when needed
  const resetState = useCallback(() => {
    setUser(null);
    setSession(null);
    onSignOut();
    setAuthError(null);
    profileFetchInProgress.current = false;
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

  // Use the session timeout hook with proper loading setter
  useSessionTimeout(loading, authInitialized, setLoading);

  // Function to safely fetch user profile with rate limiting
  const fetchUserProfile = useCallback(async (userId: string) => {
    const now = Date.now();
    
    // Skip if fetch is in progress or if we've fetched recently
    if (profileFetchInProgress.current || (now - lastProfileFetchTime.current < FETCH_DEBOUNCE_TIME)) {
      return;
    }
    
    profileFetchInProgress.current = true;
    lastProfileFetchTime.current = now;
    
    try {
      logAuth("Fetching user profile", { userId });
      await onUserAuthenticated(userId);
      logAuth("Profile fetch completed", { userId });
    } catch (error) {
      logAuth("Error fetching user profile:", error, "error");
    } finally {
      profileFetchInProgress.current = false;
    }
  }, [onUserAuthenticated]);

  // Handle auth state change
  const handleAuthChange = useCallback(
    (_event: string, newSession: Session | null) => {
      // Track auth state change to detect potential loops
      trackAuthStateChange();
      
      // Update session state
      setSession(newSession);

      if (newSession?.user) {
        // Session exists - update user and fetch profile if needed
        setUser(newSession.user);
        setAuthError(null);
        
        // Use setTimeout to safely defer profile fetching
        setTimeout(() => {
          fetchUserProfile(newSession.user.id);
        }, 0);
      } else {
        // No session - reset user
        setUser(null);
      }
    },
    [fetchUserProfile, setAuthError, trackAuthStateChange]
  );

  // Set up auth state listener on component mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    logAuth("Setting up auth state listener", null);
    
    // Set up the auth subscription first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (isMounted) {
          logAuth(`Auth state changed: ${event}`, { userId: session?.user?.id });
          handleAuthChange(event, session);
        }
      }
    );

    // Then, get the initial session
    const initializeAuth = async () => {
      try {
        logAuth("Initializing auth - getting session", null);
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
          logAuth("Initial session retrieved", { userId: data.session?.user?.id });
          setSession(data.session);
          setUser(data.session?.user || null);
          
          // Fetch profile only if we have a session
          if (data.session?.user) {
            // Use setTimeout to avoid potential auth state deadlocks
            setTimeout(() => {
              if (isMounted && !profileFetchInProgress.current) {
                fetchUserProfile(data.session.user.id);
              }
            }, 50);
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
  }, [handleAuthChange, fetchUserProfile, setAuthError]);

  return {
    user,
    session,
    loading,
    setUser,
    setSession,
    setLoading,
  };
};
