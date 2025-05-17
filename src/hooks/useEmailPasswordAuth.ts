
import { useState, useCallback } from "react";
import { AuthError } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useRedirection } from "./useRedirection";
import { logAuth } from "@/utils/auth/auth-logger";

export const useEmailPasswordAuth = () => {
  const { login, register } = useAuth();
  const { handleRedirectBasedOnRole } = useRedirection();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle login with email and password
   */
  const handleLogin = useCallback(
    async (email: string, password: string) => {
      if (!email || !password) {
        setError("Please enter both email and password");
        toast.error("Please enter both email and password");
        return false;
      }
      
      // Prevent multiple submissions
      if (loading) return false;
      
      setLoading(true);
      setError(null);

      try {
        logAuth("Attempting login for:", { email });
        const response = await login(email, password);
        
        if (response.error) {
          setError(response.error.message);
          toast.error("Login failed: " + response.error.message);
          logAuth("Login error:", response.error, "error");
          return false;
        }

        if (response.data.user) {
          logAuth("Login successful, user ID:", { userId: response.data.user.id });
          toast.success("Successfully signed in!");
          // Handle redirection based on user role
          await handleRedirectBasedOnRole(response.data.user.id);
          return true;
        }

        return false;
      } catch (err) {
        logAuth("Unexpected error during login:", err, "error");
        const errorMessage = err instanceof AuthError 
          ? err.message 
          : "Failed to sign in. Please try again.";
        
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [login, handleRedirectBasedOnRole, loading]
  );

  /**
   * Handle registration with email and password
   */
  const handleRegister = useCallback(
    async (
      email: string,
      password: string,
      metadata?: { first_name?: string; last_name?: string; role?: string }
    ) => {
      if (!email || !password) {
        setError("Please enter both email and password");
        toast.error("Please enter both email and password");
        return false;
      }
      
      if (!metadata?.first_name || !metadata?.last_name) {
        setError("Please enter your first and last name");
        toast.error("Please enter your first and last name");
        return false;
      }
      
      // Prevent multiple submissions
      if (loading) return false;
      
      setLoading(true);
      setError(null);

      try {
        logAuth("Attempting registration for:", { email, role: metadata?.role });
        const response = await register(email, password, metadata);
        
        if (response.error) {
          setError(response.error.message);
          toast.error("Registration failed: " + response.error.message);
          logAuth("Registration error:", response.error, "error");
          return false;
        }

        if (response.data.user) {
          logAuth("Registration successful, user ID:", { userId: response.data.user.id });
          toast.success("Registration successful! Welcome to Connect!");
          
          // Redirect to post-register page for onboarding
          return true;
        }

        return false;
      } catch (err) {
        logAuth("Unexpected error during registration:", err, "error");
        const errorMessage = err instanceof AuthError 
          ? err.message 
          : "Failed to register. Please try again.";
        
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [register, loading]
  );

  return {
    handleLogin,
    handleRegister,
    loading,
    error,
  };
};
