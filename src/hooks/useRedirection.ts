
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchProfile } from "@/utils/profile/profile-api";
import { toast } from "sonner";
import { logAuth } from "@/utils/auth/auth-logger";

export const useRedirection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirectBasedOnRole = useCallback(async (userId: string) => {
    try {
      const userProfile = await fetchProfile(userId);
      
      // Get the intended redirect location or default to home
      const from = location.state?.from || "/";
      
      if (!userProfile) {
        // If no profile exists, redirect to post-register page
        logAuth("No profile found, redirecting to post-registration", { userId });
        navigate("/post-register", { replace: true });
        return;
      }
      
      // Check if user has completed onboarding
      if (!userProfile.onboarding_complete) {
        logAuth("User has not completed onboarding", { userId, role: userProfile.role });
        
        // Redirect based on role for onboarding
        if (userProfile.role === "founder") {
          navigate("/founder-application", { replace: true });
          return;
        } else if (userProfile.role === "provider") {
          navigate("/provider-application", { replace: true });
          return;
        }
      }
      
      // Redirect based on role to appropriate dashboard
      if (userProfile.role === "founder") {
        navigate("/founder-dashboard", { replace: true });
      } else if (userProfile.role === "provider") {
        navigate("/provider-dashboard", { replace: true });
      } else if (userProfile.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        // If no specific role or unknown role, redirect to the home page
        navigate(from, { replace: true });
      }
      
    } catch (error) {
      logAuth("Error during redirect:", error, "error");
      toast.error("Something went wrong. Please try again.");
      navigate("/", { replace: true });
    }
  }, [navigate, location.state]);
  
  return {
    handleRedirectBasedOnRole
  };
};
