
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { checkQualificationStatus } from "@/utils/redirect-utils";

export const useRedirection = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast: toastNotification } = useToast();

  const handleRedirectBasedOnRole = async (userId: string) => {
    console.log("Handling redirect based on role for user ID:", userId);
    
    try {
      setLoading(true);
      
      // Add a small delay to ensure Supabase has time to update
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user role:", error);
        toastNotification({ 
          title: "Error",
          description: "Failed to fetch user profile. Please try again.",
          variant: "destructive" 
        });
        navigate("/");
        return;
      }

      if (!data || !data.role) {
        console.error("No role found for user:", userId);
        toastNotification({ 
          title: "Profile Error", 
          description: "User profile not found or role not specified." 
        });
        navigate("/");
        return;
      }

      console.log("User role found:", data.role);
      
      if (data.role === "founder") {
        console.log("User is a founder, checking qualification status");
        
        // Check qualification status
        const isQualified = await checkQualificationStatus(userId);
        
        if (!isQualified) {
          console.log("Founder not qualified, redirecting to qualification page");
          toastNotification({
            title: "Welcome!",
            description: "Please complete the qualification to access your dashboard."
          });
          navigate("/founder-qualification");
          return;
        }
        
        console.log("Founder is qualified, redirecting to dashboard");
        toastNotification({
          title: "Login Successful",
          description: "Welcome to your founder dashboard."
        });
        navigate("/founder-dashboard");
      } else if (data.role === "provider") {
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
            toastNotification({
              title: "Complete Your Application",
              description: "Please complete your provider application."
            });
            navigate("/provider-apply");
          } else {
            // Has submitted an application already, go to dashboard
            console.log("Application found, redirecting to provider dashboard");
            toastNotification({
              title: "Login Successful",
              description: "Welcome to your provider dashboard."
            });
            navigate("/provider-dashboard");
          }
        } catch (err) {
          console.error("Error in provider redirection:", err);
          toastNotification({ 
            title: "Error", 
            description: "Failed to check provider status. Redirecting to dashboard.",
            variant: "destructive"
          });
          // Default to provider dashboard in case of errors
          navigate("/provider-dashboard");
        }
      } else if (data.role === "admin") {
        console.log("Redirecting to admin dashboard");
        toastNotification({
          title: "Admin Login",
          description: "Welcome to the admin dashboard."
        });
        navigate("/admin/provider-applications");
      } else {
        console.log("Unknown role, redirecting to home");
        navigate("/");
      }
    } catch (err) {
      console.error("Role check error:", err);
      toastNotification({ 
        title: "Error", 
        description: "An error occurred during login. Please try again.",
        variant: "destructive"
      });
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
