
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useOAuth = () => {
  const [loading, setLoading] = useState(false);

  const handleOAuth = async (provider: "google" | "github" | "twitter", userType: "founder" | "provider") => {
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
    loading,
    handleOAuth
  };
};
