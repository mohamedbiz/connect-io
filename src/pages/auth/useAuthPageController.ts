
import { useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEmailPasswordAuth } from "@/hooks/useEmailPasswordAuth";
import { useOAuth } from "@/hooks/useOAuth";
import { toast } from "sonner";
import { logAuth } from "@/utils/auth/auth-logger";

/**
 * Controller hook for the authentication page
 */
const useAuthPageController = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState<"founder" | "provider">("founder");
  const { handleLogin, handleRegister, loading, error } = useEmailPasswordAuth();
  const { loadingProviders, handleOAuth } = useOAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Form state
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Submit handler for both login and registration - optimized to reduce unnecessary renders
  const handleAuth = useCallback(async () => {
    // Simple client-side validation
    if (!form.email || !form.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    // For registration, check additional required fields
    if (isRegister) {
      if (!form.firstName || !form.lastName) {
        toast.error("Please enter your first and last name");
        return;
      }

      logAuth("Registration attempt", { 
        email: form.email, 
        role: userType 
      });

      // Call registration handler with necessary data
      const success = await handleRegister(form.email, form.password, {
        first_name: form.firstName,
        last_name: form.lastName,
        role: userType,
      });

      if (success) {
        // Only navigate if registration was successful
        navigate("/post-register", { 
          state: { userType, isNewUser: true },
          replace: true
        });
      }
    } else {
      // For login, simply call the login handler
      logAuth("Login attempt", { email: form.email });
      await handleLogin(form.email, form.password);
    }
  }, [form, isRegister, userType, handleRegister, handleLogin, navigate]);

  return {
    isRegister,
    setIsRegister,
    form,
    loading,
    error,
    handleInput,
    handleAuth,
    handleOAuth,
    userType,
    setUserType,
    loadingProviders
  };
};

export default useAuthPageController;
