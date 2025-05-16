
import { useState, useCallback } from "react";
import { AuthError, AuthResponse } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useRedirection } from "./useRedirection";

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
      setLoading(true);
      setError(null);

      try {
        console.log("Attempting login for:", email);
        const response = await login(email, password);
        
        if (response.error) {
          setError(response.error.message);
          toast.error("Login failed: " + response.error.message);
          console.error("Login error:", response.error);
          return false;
        }

        if (response.data.user) {
          console.log("Login successful, user ID:", response.data.user.id);
          toast.success("Successfully signed in!");
          // Handle redirection based on user role
          await handleRedirectBasedOnRole(response.data.user.id);
          return true;
        }

        return false;
      } catch (err) {
        console.error("Unexpected error during login:", err);
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
    [login, handleRedirectBasedOnRole]
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
      setLoading(true);
      setError(null);

      try {
        console.log("Attempting registration for:", email, "with role:", metadata?.role);
        const response = await register(email, password, metadata);
        
        if (response.error) {
          setError(response.error.message);
          toast.error("Registration failed: " + response.error.message);
          console.error("Registration error:", response.error);
          return false;
        }

        if (response.data.user) {
          console.log("Registration successful, user ID:", response.data.user.id);
          toast.success("Registration successful! Welcome to Connect!");
          
          // Redirect to post-register page for onboarding
          return true;
        }

        return false;
      } catch (err) {
        console.error("Unexpected error during registration:", err);
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
    [register]
  );

  return {
    handleLogin,
    handleRegister,
    loading,
    error,
  };
};
