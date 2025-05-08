
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { safeAuthOperation } from "@/utils/auth/rate-limiting";

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

  // Set up auth listener and session initialization
  useEffect(() => {
    console.log("Setting up auth listener");
    let isMounted = true;
    
    // Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      // Track auth state changes to detect potential loops
      setAuthStateChangeCount(prev => {
        const newCount = prev + 1;
        
        // Log warning if too many auth state changes
        if (newCount > 20 && newCount % 5 === 0) {
          console.warn(`High frequency of auth state changes detected (${newCount}). Possible auth loop.`);
        }
        
        return newCount;
      });
      
      if (isMounted) {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Defer Supabase call with setTimeout to prevent potential deadlocks
          // Use increasing timeouts for stability
          setTimeout(() => {
            if (isMounted && session?.user?.id) {
              // Only fetch profile if enough time has passed since last fetch
              safeAuthOperation(async () => {
                fetchProfileAndSetState(session.user.id);
              });
            }
          }, 200);
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
        
        console.log("Initial session check:", session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            if (isMounted && session?.user?.id) {
              safeAuthOperation(async () => {
                fetchProfileAndSetState(session.user.id);
              });
            }
          }, 200);
        } else {
          resetProfileState();
          setLoading(false);
        }
        
        setAuthInitialized(true);
      } catch (error) {
        console.error("Error getting session:", error);
        if (isMounted) {
          setLoading(false);
          setAuthError("Failed to get session");
          setAuthInitialized(true);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfileAndSetState, resetProfileState, setAuthError]);

  // Force end loading state after 5 seconds to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        console.log("Forcing end of loading state after timeout");
        setLoading(false);
        
        // Show toast if we had to force end loading
        if (!authInitialized) {
          toast.error("Authentication is taking longer than expected. You may need to refresh the page.");
        }
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [loading, authInitialized]);

  // Monitor for potential auth refresh loops and add circuit breaker
  useEffect(() => {
    if (authStateChangeCount > 30) {
      console.error("Too many auth state changes detected. Possible auth loop. Adding circuit breaker delay.");
      
      // Add a circuit breaker delay
      const timer = setTimeout(() => {
        setAuthStateChangeCount(0);
      }, 10000); // 10 second cooling period
      
      return () => clearTimeout(timer);
    }
  }, [authStateChangeCount]);

  return {
    user,
    session,
    loading,
    authInitialized,
    setUser,
    setSession,
    setLoading
  };
};
