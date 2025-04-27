
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleRedirectBasedOnRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        navigate("/");
        return;
      }

      if (data.role === "founder") {
        navigate("/founder-dashboard");
      } else if (data.role === "provider") {
        navigate("/provider-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Role check error:", err);
      navigate("/");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              first_name: form.first_name,
              last_name: form.last_name,
              role: userType,
            },
          },
        });

        if (error) {
          toastNotification({ title: "Sign up failed", description: error.message, variant: "destructive" });
        } else if (data.user) {
          toastNotification({ title: "Account created!", description: "Welcome to Connect." });
          setTimeout(() => {
            handleRedirectBasedOnRole(data.user.id);
          }, 500);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (error) {
          toastNotification({ title: "Login failed", description: error.message, variant: "destructive" });
        } else if (data.user) {
          toastNotification({ title: "Login successful" });
          setTimeout(() => {
            handleRedirectBasedOnRole(data.user.id);
          }, 500);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toastNotification({
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github" | "twitter") => {
    setLoading(true);
    try {
      console.log(`Attempting to sign in with ${provider}...`);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
          data: {
            role: userType, // Include the selected role for OAuth sign ups
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
        
        return Promise.reject(error);
      }
      
      console.log(`OAuth ${provider} response:`, data);
      return Promise.resolve();
    } catch (error) {
      console.error(`OAuth error with ${provider}:`, error);
      toast.error(`Failed to connect to ${provider}. Please try again.`);
      return Promise.reject(error);
    } finally {
      setLoading(false);
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
