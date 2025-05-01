
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const initialForm = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
};

export default function useAuthPageController() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<"founder" | "provider">("founder");
  const navigate = useNavigate();
  const { toast: toastNotification } = useToast();
  const { login, register } = useAuth();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

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
        console.log("Redirecting to founder dashboard");
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
            navigate("/provider-apply");
          } else {
            // Has submitted an application already, go to dashboard
            console.log("Application found, redirecting to provider dashboard");
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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Starting authentication process");

    try {
      if (isRegister) {
        console.log("Attempting to register user with role:", userType);
        
        const { data, error } = await register(
          form.email,
          form.password,
          {
            first_name: form.first_name,
            last_name: form.last_name,
            role: userType,
          }
        );

        if (error) {
          console.error("Registration error:", error);
          toastNotification({ 
            title: "Sign up failed", 
            description: error.message, 
            variant: "destructive" 
          });
          setLoading(false);
        } else if (data.user) {
          console.log("Registration successful for user:", data.user.id);
          toastNotification({ title: "Account created!", description: "Welcome to Connect." });
          
          // Add delay for better user experience and to ensure profile is created
          setTimeout(() => {
            handleRedirectBasedOnRole(data.user.id);
          }, 1000);
        }
      } else {
        console.log("Attempting to log in user");
        
        const { data, error } = await login(
          form.email,
          form.password
        );

        if (error) {
          console.error("Login error:", error);
          toastNotification({ 
            title: "Login failed", 
            description: error.message, 
            variant: "destructive" 
          });
          setLoading(false);
        } else if (data.user) {
          console.log("Login successful for user:", data.user.id);
          toastNotification({ title: "Login successful" });
          
          // Add delay for better user experience and to ensure profile is loaded
          setTimeout(() => {
            handleRedirectBasedOnRole(data.user.id);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toastNotification({
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github" | "twitter") => {
    setLoading(true);
    try {
      console.log(`Attempting to sign in with ${provider}...`);
      console.log("Current user type:", userType);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth`,
          queryParams: {
            // Pass role info as a query parameter (will be stored in user metadata)
            role: userType,
          }
        }
      });
      
      if (error) {
        console.error(`OAuth error with ${provider}:`, error);
        
        if (error.message.includes("not enabled")) {
          toast.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not enabled in your Supabase project.`, {
            description: "Please check your Supabase configuration."
          });
        } else {
          toast.error(`Sign in with ${provider} failed: ${error.message}`);
        }
        
        setLoading(false);
        return Promise.reject(error);
      }
      
      console.log(`OAuth ${provider} response:`, data);
      // The OAuth flow will redirect the user, so we don't need to do anything else here
      return Promise.resolve();
    } catch (error) {
      console.error(`OAuth error with ${provider}:`, error);
      toast.error(`Failed to connect to ${provider}. Please try again.`);
      setLoading(false);
      return Promise.reject(error);
    }
  };

  return {
    isRegister,
    setIsRegister,
    form,
    setForm,
    loading,
    handleInput,
    handleAuth,
    handleOAuth,
    userType,
    setUserType
  };
}
