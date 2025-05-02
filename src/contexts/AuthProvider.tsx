
import { useState, useEffect, useCallback } from "react";
import { Session, User, AuthResponse } from "@supabase/supabase-js";
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
  const [authError, setAuthError] = useState<string | null>(null);

  // Memoized profile fetch function with exponential backoff
  const fetchProfileAndSetState = useCallback(async (userId: string, retryCount = 0) => {
    setProfileLoading(true);
    try {
      console.log(`Fetching profile for user: ${userId} (attempt ${retryCount + 1})`);
      const profileData = await fetchProfile(userId);
      
      if (!profileData) {
        console.warn(`No profile found for user: ${userId} on attempt ${retryCount + 1}`);
        
        // Implement exponential backoff for retries
        if (retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 500; // 500ms, 1000ms, 2000ms
          console.log(`Retrying profile fetch in ${delay}ms...`);
          
          setTimeout(() => {
            fetchProfileAndSetState(userId, retryCount + 1);
          }, delay);
          return;
        } else if (retryCount === 3) {
          // Last attempt - notify user of the issue
          toast.error("Could not load your profile. Please refresh the page or contact support if the problem persists.");
          setAuthError("Failed to load user profile after multiple attempts");
        }
      } else {
        console.log("Profile data retrieved successfully:", profileData);
        setProfile(profileData);
        setAuthError(null);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      
      if (retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 500;
        console.log(`Error occurred, retrying profile fetch in ${delay}ms...`);
        
        setTimeout(() => {
          fetchProfileAndSetState(userId, retryCount + 1);
        }, delay);
        return;
      } else {
        toast.error("Error loading profile data. Please try refreshing the page.");
        setAuthError("Error loading profile data after multiple attempts");
      }
    } finally {
      // Only set loading to false after all retries are exhausted or profile is found
      if (retryCount >= 3 || profile) {
        setProfileLoading(false);
        setLoading(false);
      }
    }
  }, []);

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
            if (isMounted) {
              fetchProfileAndSetState(session.user.id);
            }
          }, 0);
        } else {
          setProfile(null);
          setLoading(false);
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
        fetchProfileAndSetState(session.user.id);
      } else {
        setProfile(null);
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
  }, [fetchProfileAndSetState]);

  async function logout() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setAuthError(null);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  }
  
  async function login(email: string, password: string): Promise<AuthResponse> {
    try {
      return await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  
  async function register(email: string, password: string, metadata?: { 
    first_name?: string; 
    last_name?: string; 
    role?: string;
  }): Promise<AuthResponse> {
    try {
      return await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
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
      error: authError,
      logout,
      shouldRedirectToAcquisition: handleShouldRedirectToAcquisition,
      login,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};
