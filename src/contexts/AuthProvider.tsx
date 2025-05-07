
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "./AuthContext";
import { Profile } from "@/types/auth";
import { useProfileManagement } from "@/hooks/useProfileManagement";
import { useAuthOperations } from "@/hooks/useAuthOperations";
import { useAuthRedirection } from "@/hooks/useAuthRedirection";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    profile,
    profileLoading,
    profileError,
    fetchProfileAndSetState,
    ensureProfile,
    resetProfileState
  } = useProfileManagement();

  const {
    authError,
    setAuthError,
    logout: performLogout,
    login,
    register
  } = useAuthOperations();

  const { handleShouldRedirectToAcquisition } = useAuthRedirection();

  useEffect(() => {
    console.log("Setting up auth listener");
    let isMounted = true;
    
    // Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (isMounted) {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Defer Supabase call with setTimeout to prevent potential deadlocks
          setTimeout(() => {
            if (isMounted && session?.user?.id) {
              fetchProfileAndSetState(session.user.id);
            }
          }, 100);
        } else {
          resetProfileState();
          setLoading(false);
          setAuthError(null);
        }
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      
      console.log("Initial session check:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          if (isMounted && session?.user?.id) {
            fetchProfileAndSetState(session.user.id);
          }
        }, 100);
      } else {
        resetProfileState();
        setLoading(false);
      }
    }).catch(error => {
      console.error("Error getting session:", error);
      if (isMounted) {
        setLoading(false);
        setAuthError("Failed to get session");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfileAndSetState, resetProfileState, setAuthError]);

  // Force end loading state after 3 seconds to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        console.log("Forcing end of loading state after timeout");
        setLoading(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [loading]);

  async function logout() {
    const success = await performLogout();
    if (success) {
      setUser(null);
      setSession(null);
      resetProfileState();
      setAuthError(null);
    }
  }

  // Function to ensure a profile exists
  const ensureUserProfile = async (): Promise<Profile | null> => {
    return await ensureProfile(user);
  };

  // Function to decide if we should redirect founders
  function shouldRedirectToAcquisition(currentPath: string) {
    return handleShouldRedirectToAcquisition(
      currentPath, 
      loading || profileLoading, 
      user, 
      profile
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      loading: loading || profileLoading,
      error: authError || profileError,
      logout,
      shouldRedirectToAcquisition,
      login,
      register,
      ensureProfile: ensureUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
