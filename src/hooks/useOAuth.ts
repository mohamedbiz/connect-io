
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { logOAuth } from "@/utils/auth/oauth-logger";

export const useOAuth = () => {
  const [loading, setLoading] = useState(false);
  const [loadingProviders, setLoadingProviders] = useState<Record<string, boolean>>({
    google: false,
    github: false,
    twitter: false
  });

  const handleOAuth = async (provider: "google" | "github" | "twitter") => {
    // Use provider-specific loading state
    setLoadingProviders(prev => ({ ...prev, [provider]: true }));
    
    try {
      logOAuth(`Attempting to sign in with ${provider}...`);
      
      // Generate current URL info for proper redirect handling
      const currentOrigin = window.location.origin;
      const currentPath = window.location.pathname;
      const redirectUrl = `${currentOrigin}${currentPath}`;
      
      logOAuth(`OAuth redirect URL: ${redirectUrl}`, { provider, redirectUrl });
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            // Default to founder role for OAuth sign-ins
            role: "founder",
          }
        }
      });
      
      if (error) {
        logOAuth(`OAuth error with ${provider}:`, error, false, true, { provider });
        
        if (error.message.includes("not enabled")) {
          toast.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not enabled. This provider may not be configured in Supabase.`);
        } else if (error.message.includes("PKCE")) {
          toast.error(`OAuth configuration error. Please check that your Supabase URL configuration has the correct redirect URLs.`);
        } else {
          toast.error(`Sign in with ${provider} failed: ${error.message}`);
        }
        
        setLoadingProviders(prev => ({ ...prev, [provider]: false }));
        return Promise.reject(error);
      }
      
      logOAuth(`OAuth ${provider} response:`, data, false, false, { provider });
      // The OAuth flow will redirect the user, so we don't need to do anything else here
      return Promise.resolve();
    } catch (error) {
      logOAuth(`OAuth error with ${provider}:`, error, false, true, { provider });
      toast.error(`Failed to connect to ${provider}. Please try again or use email login instead.`);
      
      setLoadingProviders(prev => ({ ...prev, [provider]: false }));
      return Promise.reject(error);
    }
  };

  return {
    loading,
    loadingProviders,
    handleOAuth
  };
};
