
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useOAuth } from "@/hooks/useOAuth";

interface AuthForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default function useAuthPageController() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const { signInWithOAuth, loadingProviders } = useOAuth();
  
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState<"founder" | "provider">("founder");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<AuthForm>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleAuth = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        // Registration
        const metadata = {
          first_name: form.firstName,
          last_name: form.lastName,
          role: userType,
        };

        const response = await register(form.email, form.password, metadata);

        if (response.error) {
          toast.error(response.error.message);
          return;
        }

        // Redirect to appropriate page based on user type
        const redirectPath = userType === "founder" 
          ? "/founder-qualification?new=true" 
          : "/provider-application";
          
        toast.success("Registration successful!");
        navigate(redirectPath, { replace: true });
      } else {
        // Login
        const response = await login(form.email, form.password);
        
        if (response.error) {
          toast.error(response.error.message);
          return;
        }
        
        // Redirect to where the user was trying to go, or home
        const from = location.state?.from || "/";
        toast.success("Login successful!");
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }, [isRegister, form, userType, register, login, navigate, location.state]);

  const handleOAuth = useCallback(async (provider: string) => {
    try {
      const metadata = isRegister ? { role: userType } : {};
      await signInWithOAuth(provider, metadata);
    } catch (error: any) {
      toast.error(error.message || `Failed to sign in with ${provider}`);
    }
  }, [signInWithOAuth, isRegister, userType]);

  return {
    isRegister,
    setIsRegister,
    form,
    loading,
    handleInput,
    handleAuth,
    handleOAuth,
    userType,
    setUserType,
    loadingProviders
  };
}
