
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { AuthFormData } from "@/types/auth";

export const useEmailPasswordAuth = () => {
  const [loading, setLoading] = useState(false);
  const { toast: toastNotification } = useToast();
  const { login, register } = useAuth();

  const initialForm: AuthFormData = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  };

  const [form, setForm] = useState(initialForm);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };
  
  const handleSignIn = async () => {
    setLoading(true);
    console.log("Attempting to log in user");

    try {
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
        return { data, error };
      } 
      
      console.log("Login successful for user:", data?.user?.id);
      toastNotification({ title: "Login successful" });
      return { data, error: null };
    } catch (error: any) {
      console.error("Sign in error:", error);
      toastNotification({
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
      return { data: null, error };
    }
  };
  
  const handleSignUp = async (userType: "founder" | "provider") => {
    setLoading(true);
    console.log("Attempting to register user with role:", userType);
    
    try {
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
        return { data, error };
      }
      
      console.log("Registration successful for user:", data?.user?.id);
      toastNotification({ title: "Account created!", description: "Welcome to Connect." });
      return { data, error: null };
    } catch (error: any) {
      console.error("Sign up error:", error);
      toastNotification({
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
      return { data: null, error };
    }
  };

  return {
    form,
    setForm,
    loading,
    handleInput,
    handleSignIn,
    handleSignUp
  };
};
