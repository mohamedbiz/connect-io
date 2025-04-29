
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "./AuthContext";
import { fetchProfile, checkAcquisitionStatus, shouldRedirectToAcquisition } from "@/utils/auth-utils";
import { Profile, AcquisitionStatus } from "@/types/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [acquisitionStatus, setAcquisitionStatus] = useState<AcquisitionStatus>({
    completed: false,
    checked: false
  });

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
        setAcquisitionStatus({completed: false, checked: true});
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
        setAcquisitionStatus({completed: false, checked: true});
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check acquisition status whenever the user changes
  useEffect(() => {
    if (user && profile?.role === 'founder') {
      checkAcquisitionStatusAndSetState(user.id);
    }
  }, [user, profile]);

  async function fetchProfileAndSetState(userId: string) {
    const profileData = await fetchProfile(userId);
    setProfile(profileData);
    setLoading(false);
  }

  async function checkAcquisitionStatusAndSetState(userId: string) {
    const status = await checkAcquisitionStatus(userId);
    setAcquisitionStatus(status);
  }

  async function logout() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setAcquisitionStatus({completed: false, checked: true});
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
