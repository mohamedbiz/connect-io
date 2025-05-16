
import { useState, useCallback } from "react";
import { AuthError, AuthResponse } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useEmailPasswordAuth = () => {
  const { login, register } = useAuth();
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
        const response = await login(email, password);
        
        if (response.error) {
          setError(response.error.message);
          toast.error("Login failed: " + response.error.message);
          return false;
        }

        toast.success("Successfully signed in!");
        return true;
      } catch (err) {
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
    [login]
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
        const response = await register(email, password, metadata);
        
        if (response.error) {
          setError(response.error.message);
          toast.error("Registration failed: " + response.error.message);
          return false;
        }

        toast.success("Registration successful! Welcome to Connect!");
        return true;
      } catch (err) {
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
