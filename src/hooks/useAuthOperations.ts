
import { useState } from "react";
import { AuthResponse } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAuthOperations = () => {
  const [authError, setAuthError] = useState<string | null>(null);

  async function logout() {
    try {
      await supabase.auth.signOut();
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
      return false;
    }
  }
  
  async function login(email: string, password: string): Promise<AuthResponse> {
    try {
      return await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  
  async function register(email: string, password: string, metadata?: { 
    first_name?: string; 
    last_name?: string; 
    role?: string;
  }): Promise<AuthResponse> {
    try {
      return await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  return {
    authError,
    setAuthError,
    logout,
    login,
    register
  };
};
