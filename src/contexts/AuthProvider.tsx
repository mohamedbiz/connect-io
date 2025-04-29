
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "./AuthContext";
import { fetchProfile } from "@/utils/auth-utils";
import { Profile } from "@/types/auth";
import { useAcquisitionStatus } from "@/hooks/useAcquisitionStatus";
import { shouldRedirectToAcquisition } from "@/utils/redirect-utils";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Use our custom hook for acquisition status
  const { acquisitionStatus } = useAcquisitionStatus(user?.id);

  useEffect(() => {
    // Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Defer Supabase call with setTimeout to prevent potential deadlocks
        setTimeout(() => {
          fetchProfileAndSetState(session.user.id);
        }, 0);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfileAndSetState(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfileAndSetState(userId: string) {
    const profileData = await fetchProfile(userId);
    setProfile(profileData);
    setLoading(false);
  }

  async function logout() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // Function to decide if we should redirect founders to the acquisition page
  function handleShouldRedirectToAcquisition(currentPath: string) {
    return shouldRedirectToAcquisition(currentPath, loading, user, profile, acquisitionStatus);
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      loading, 
      logout,
      shouldRedirectToAcquisition: handleShouldRedirectToAcquisition
    }}>
      {children}
    </AuthContext.Provider>
  );
};
