
import { useState, useEffect, useCallback } from "react";
import { Session, User, AuthResponse } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "./AuthContext";
import { fetchProfile, createProfileManually } from "@/utils/auth-utils";
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
  const [profileAttempts, setProfileAttempts] = useState(0);

  // Memoized profile fetch function with limited retries
  const fetchProfileAndSetState = useCallback(async (userId: string, retryCount = 0) => {
    if (!userId) return;
    
    setProfileLoading(true);
    setProfileAttempts(prev => prev + 1);
    
    try {
      console.log(`Fetching profile for user: ${userId} (attempt ${retryCount + 1})`);
      const profileData = await fetchProfile(userId);
      
      if (!profileData) {
        console.warn(`No profile found for user: ${userId} on attempt ${retryCount + 1}`);
        
        // Implement limited retries (max 1)
        if (retryCount < 1) {
          const delay = 800; // Single fixed retry delay
          console.log(`Retrying profile fetch in ${delay}ms...`);
          
          setTimeout(() => {
            if (userId) { // Double check userId is still valid
              fetchProfileAndSetState(userId, retryCount + 1);
            }
          }, delay);
          return;
        } else {
          // After final retry - set loading to false even if profile is null
          setLoading(false);
          setProfileLoading(false);
          setAuthError("Unable to load user profile. Please try refreshing the page.");
        }
      } else {
        console.log("Profile data retrieved successfully:", profileData);
        setProfile(profileData);
        setAuthError(null);
        setLoading(false);
        setProfileLoading(false);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      
      if (retryCount < 1) {
        const delay = 800; // Single fixed retry delay
        console.log(`Error occurred, retrying profile fetch in ${delay}ms...`);
        
        setTimeout(() => {
          if (userId) { // Double check userId is still valid
            fetchProfileAndSetState(userId, retryCount + 1);
          }
        }, delay);
        return;
      } else {
        // After final retry - set loading to false even with errors
        setLoading(false);
        setProfileLoading(false);
        setAuthError("Error loading profile data. Please try refreshing the page.");
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
            if (isMounted && session?.user?.id) {
              fetchProfileAndSetState(session.user.id);
            }
          }, 100);
        } else {
          setProfile(null);
          setLoading(false);
          setProfileLoading(false);
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
        setProfile(null);
        setLoading(false);
        setProfileLoading(false);
      }
    }).catch(error => {
      console.error("Error getting session:", error);
      if (isMounted) {
        setLoading(false);
        setProfileLoading(false);
        setAuthError("Failed to get session");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfileAndSetState]);

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

  // Function to manually attempt creating a profile if automatic creation failed
  async function ensureProfile(): Promise<Profile | null> {
    if (!user) return null;
    
    if (profile) return profile;
    
    // Try to create profile manually if we have user but no profile
    try {
      setProfileLoading(true);
      const newProfile = await createProfileManually(
        user.id, 
        user.email || '', 
        user.user_metadata?.first_name || '',
        user.user_metadata?.last_name || '',
        user.user_metadata?.role || 'founder'
      );
      
      setProfileLoading(false);
      if (newProfile) {
        setProfile(newProfile);
        setAuthError(null);
        return newProfile;
      }
      
      setAuthError("Failed to create user profile");
      return null;
    } catch (error) {
      console.error("Failed to ensure profile exists:", error);
      setProfileLoading(false);
      setAuthError("Error creating user profile");
      return null;
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
      register,
      ensureProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
