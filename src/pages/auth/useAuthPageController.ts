
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useOAuth } from "@/hooks/useOAuth";

export interface AuthForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const initialForm: AuthForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const useAuthPageController = () => {
  const [searchParams] = useSearchParams();
  const shouldRegister = searchParams.get('register') === 'true';
  const userTypeParam = searchParams.get('type') as "founder" | "provider" | null;
  
  const [isRegister, setIsRegister] = useState(shouldRegister || false);
  const [userType, setUserType] = useState<"founder" | "provider">(
    userTypeParam === "provider" ? "provider" : "founder"
  );
  const [form, setForm] = useState<AuthForm>(initialForm);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, login, register } = useAuth();
  const { handleOAuth, loadingProviders } = useOAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/post-register", { replace: true });
    }
  }, [user, navigate]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for both login and register
  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        // Registration flow
        if (form.password !== form.confirmPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }

        if (!form.firstName.trim() || !form.lastName.trim()) {
          toast.error("Please provide your first and last name");
          setLoading(false);
          return;
        }

        const { error } = await register(form.email, form.password, {
          first_name: form.firstName,
          last_name: form.lastName,
          role: userType
        });

        if (error) {
          toast.error(error.message);
        } else {
          // Success - the navigation will be handled by the user effect above
          toast.success("Registration successful! Redirecting...");
        }
      } else {
        // Login flow
        const { error } = await login(form.email, form.password);
        
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Login successful! Redirecting...");
          // Navigation will be handled by the user effect
        }
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  // Handle OAuth providers - now using the improved hook
  const handleSocialAuth = async (provider: "google" | "github" | "twitter") => {
    try {
      await handleOAuth(provider);
    } catch (error: any) {
      // Error is handled by the OAuth hook
    }
  };

  return {
    isRegister,
    setIsRegister,
    userType,
    setUserType,
    form,
    loading,
    handleInput,
    handleAuth,
    handleOAuth: handleSocialAuth,
    loadingProviders
  };
};

export default useAuthPageController;
