
import { useCallback } from "react";
import { AuthError, AuthResponse } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { safeAuthOperation } from "@/utils/auth/rate-limiting";
import { logAuth } from "@/utils/auth/auth-logger";

export const useAuthOperations = () => {
  /**
   * Login with email and password
   */
  const login = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    try {
      logAuth("Attempting login with email", { email });
      
      const response = await safeAuthOperation(() => {
        return supabase.auth.signInWithPassword({
          email,
          password,
        });
      });
      
      if (response.error) {
        logAuth("Login failed", response.error, "error");
        throw response.error;
      }
      
      logAuth("Login successful", { userId: response.data?.user?.id });
      return response;
    } catch (error) {
      logAuth("Login error", error, "error");
      throw error;
    }
  }, []);

  /**
   * Register with email and password
   */
  const register = useCallback(async (
    email: string,
    password: string,
    metadata?: { first_name?: string; last_name?: string; role?: string }
  ): Promise<AuthResponse> => {
    try {
      logAuth("Attempting registration", { email, ...metadata });
      
      const response = await safeAuthOperation(() => {
        return supabase.auth.signUp({
          email,
          password,
          options: { 
            data: metadata 
          },
        });
      });
      
      if (response.error) {
        logAuth("Registration failed", response.error, "error");
        throw response.error;
      }
      
      logAuth("Registration successful", { userId: response.data?.user?.id });
      return response;
    } catch (error) {
      logAuth("Registration error", error, "error");
      throw error;
    }
  }, []);

  /**
   * Logout current user
   */
  const logout = useCallback(async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        logAuth("Logout failed", error, "error");
        return false;
      }
      
      logAuth("Logout successful");
      return true;
    } catch (error) {
      logAuth("Logout error", error, "error");
      return false;
    }
  }, []);

  return {
    login,
    register,
    logout,
  };
};
