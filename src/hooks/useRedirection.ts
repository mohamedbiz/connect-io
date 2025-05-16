
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQualificationStatus } from "@/hooks/useQualificationStatus";

export const useRedirection = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isQualified } = useQualificationStatus();

  const handleRedirectBasedOnRole = async (userId: string) => {
    console.log("Handling redirect based on role for user ID:", userId);
    
    try {
      setLoading(true);
      
      // Add a small delay to ensure Supabase has time to update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("role, onboarding_complete")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user role:", error);
        toast.error("Failed to fetch user profile. Please try again.");
        navigate("/");
        return;
      }

      if (!profileData) {
        console.error("No profile found for user:", userId);
        toast.error("User profile not found.");
        navigate("/post-register");
        return;
      }

      console.log("User role found:", profileData.role, "Onboarding complete:", profileData.onboarding_complete);
      
      // Check if user needs to complete onboarding first
      if (profileData.onboarding_complete === false) {
        console.log("User needs to complete onboarding");
        navigate("/post-register", { state: { userType: profileData.role } });
        return;
      }
      
      if (profileData.role === "founder") {
        console.log("User is a founder, checking qualification status");
        
        if (!isQualified) {
          console.log("Founder not qualified, redirecting to qualification page");
          toast("Please complete the qualification to access your dashboard.");
          navigate("/founder-qualification");
          return;
        }
        
        console.log("Founder is qualified, redirecting to dashboard");
        toast.success("Welcome to your founder dashboard.");
        navigate("/founder-dashboard");
      } else if (profileData.role === "provider") {
        console.log("User is a provider, checking application status");
        
        try {
          const { data: providerApplication, error: appError } = await supabase
            .from("provider_applications") 
            .select("status")
            .eq("user_id", userId)
            .maybeSingle();
          
          if (appError) {
            console.error("Error checking provider application:", appError);
          }
          
          console.log("Provider application status:", providerApplication);
          
          if (!providerApplication) {
            // No application yet, redirect to application form
            console.log("No application found, redirecting to provider application page");
            toast("Please complete your provider application.");
            navigate("/provider-application");
          } else {
            // Has submitted an application already, go to dashboard
            console.log("Application found, redirecting to provider dashboard");
            toast.success("Welcome to your provider dashboard.");
            navigate("/provider-dashboard");
          }
        } catch (err) {
          console.error("Error in provider redirection:", err);
          toast.error("Failed to check provider status. Redirecting to dashboard.");
          // Default to provider dashboard in case of errors
          navigate("/provider-dashboard");
        }
      } else if (profileData.role === "admin") {
        console.log("Redirecting to admin dashboard");
        toast.success("Welcome to the admin dashboard.");
        navigate("/admin/provider-applications");
      } else {
        console.log("Unknown role, redirecting to home");
        navigate("/");
      }
    } catch (err) {
      console.error("Role check error:", err);
      toast.error("An error occurred during login. Please try again.");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleRedirectBasedOnRole
  };
};
