
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  email: string;
  role: string;
  business_name?: string | null;
  expertise?: string | null;
  portfolio_url?: string | null;
  linkedin_url?: string | null;
  about?: string | null;
  created_at?: string;
};

type AcquisitionStatus = {
  completed: boolean;
  checked: boolean;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  logout: () => Promise<void>;
  shouldRedirectToAcquisition: (currentPath: string) => boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  logout: async () => {},
  shouldRedirectToAcquisition: () => false,
});

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
          fetchProfile(session.user.id);
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
        fetchProfile(session.user.id);
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
      checkAcquisitionStatus(user.id);
    }
  }, [user, profile]);

  async function fetchProfile(userId: string) {
    console.log("Fetching profile for:", userId);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } else if (data) {
        console.log("Profile loaded:", data);
        setProfile(data);
      } else {
        console.log("No profile found for user");
        setProfile(null);
      }
    } catch (err) {
      console.error("Profile fetch exception:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  async function checkAcquisitionStatus(userId: string) {
    try {
      // Use "founder_onboarding" table that we just created in the SQL migration
      const { data, error } = await supabase
        .from("founder_onboarding")
        .select("acquisition_completed")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (error) {
        console.error("Error checking acquisition status:", error);
        setAcquisitionStatus({completed: false, checked: true});
      } else {
        setAcquisitionStatus({
          completed: Boolean(data?.acquisition_completed),
          checked: true
        });
      }
    } catch (err) {
      console.error("Error in acquisition status check:", err);
      setAcquisitionStatus({completed: false, checked: true});
    }
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
  function shouldRedirectToAcquisition(currentPath: string) {
    // Don't redirect if:
    // - We're loading
    // - We're not logged in
    // - User is not a founder
    // - We're already on client acquisition related paths
    // - We haven't checked the status yet
    
    if (
      loading || 
      !user || 
      !profile || 
      profile.role !== 'founder' ||
      currentPath.includes('/client-acquisition') || 
      currentPath === '/auth' || 
      !acquisitionStatus.checked
    ) {
      return false;
    }
    
    // If we're headed to dashboard and haven't completed acquisition, redirect
    return !acquisitionStatus.completed && currentPath === '/founder-dashboard';
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      loading, 
      logout,
      shouldRedirectToAcquisition
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
