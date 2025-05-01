
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "./AuthContext";
import { fetchProfile } from "@/utils/auth-utils";
import { Profile } from "@/types/auth";
import { shouldRedirectToAcquisition } from "@/utils/redirect-utils";
import { toast } from "sonner";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    console.log("Setting up auth listener");
    
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
    setProfileLoading(true);
    try {
      console.log("Fetching profile for user:", userId);
      const profileData = await fetchProfile(userId);
      console.log("Profile data retrieved:", profileData);
      
      if (!profileData) {
        console.warn("No profile found for user:", userId);
        toast.error("Failed to load your profile. Please contact support.");
      }
      
      setProfile(profileData);
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Error loading profile data");
    } finally {
      setProfileLoading(false);
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  }
  
  async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  }
  
  async function register(email: string, password: string, metadata?: { 
    first_name?: string; 
    last_name?: string; 
    role?: string;
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  }

  // Function to decide if we should redirect founders
  function handleShouldRedirectToAcquisition(currentPath: string) {
    return shouldRedirectToAcquisition(currentPath, loading || profileLoading, user, profile);
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      loading: loading || profileLoading,
      logout,
      shouldRedirectToAcquisition: handleShouldRedirectToAcquisition,
      login,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};
