
import { useState, useCallback, useRef } from "react";
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
  
  // Use refs to prevent duplicate submissions
  const loginInProgress = useRef(false);
  const registerInProgress = useRef(false);
  
  // Add debounced operation support
  const lastOperationTime = useRef<number>(0);
  const OPERATION_COOLDOWN = 1000; // 1 second
  
  // Throttle requests to prevent rapid sequential operations
  const canPerformOperation = (): boolean => {
    const now = Date.now();
    if (now - lastOperationTime.current < OPERATION_COOLDOWN) {
      toast.error("Please wait before trying again");
      return false;
    }
    lastOperationTime.current = now;
    return true;
  };

  /**
   * Handle login with email and password
   */
  const handleLogin = useCallback(
    async (email: string, password: string) => {
      // Validate inputs
      if (!email || !password) {
        setError("Please enter both email and password");
        toast.error("Please enter both email and password");
        return false;
      }
      
      // Prevent multiple submissions and throttle
      if (loading || loginInProgress.current || !canPerformOperation()) {
        return false;
      }
      
      loginInProgress.current = true;
      setLoading(true);
      setError(null);

      try {
        logAuth("Attempting login for:", { email });
        const response = await login(email, password);
        
        if (response.error) {
          setError(response.error.message);
          // Show user-friendly error messages
          if (response.error.message.includes("credentials")) {
            toast.error("Invalid email or password. Please try again.");
          } else {
            toast.error("Login failed: " + response.error.message);
          }
          logAuth("Login error:", response.error, "error");
          return false;
        }

        if (response.data.user) {
          logAuth("Login successful, user ID:", { userId: response.data.user.id });
          toast.success("Welcome back!");
          
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
        loginInProgress.current = false;
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
      // Validate inputs
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
      
      // Prevent multiple submissions and throttle
      if (loading || registerInProgress.current || !canPerformOperation()) {
        return false;
      }
      
      registerInProgress.current = true;
      setLoading(true);
      setError(null);

      try {
        logAuth("Attempting registration for:", { email, role: metadata?.role });
        const response = await register(email, password, metadata);
        
        if (response.error) {
          setError(response.error.message);
          
          // Show user-friendly error messages
          if (response.error.message.includes("already registered")) {
            toast.error("This email is already registered. Try logging in instead.");
          } else if (response.error.message.includes("password")) {
            toast.error("Please use a stronger password (at least 8 characters).");
          } else {
            toast.error("Registration failed: " + response.error.message);
          }
          
          logAuth("Registration error:", response.error, "error");
          return false;
        }

        if (response.data.user) {
          logAuth("Registration successful, user ID:", { userId: response.data.user.id });
          toast.success("Registration successful! Welcome to Connect!");
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
        registerInProgress.current = false;
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
