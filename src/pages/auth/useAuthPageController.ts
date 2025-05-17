
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
  const { loading: loadingProviders, handleOAuth } = useOAuth();

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

  // Submit handler for both login and registration
  const handleAuth = useCallback(async () => {
    logAuth("Auth form submission. Is registration:", { isRegister, userType });
    
    // Form validation
    if (!form.email || !form.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isRegister) {
      // For registration, we need first and last name
      if (!form.firstName || !form.lastName) {
        toast.error("Please enter your first and last name");
        return;
      }

      // For registration, we need to include the user type and name info
      logAuth("Registering new user with role:", { role: userType });
      const success = await handleRegister(form.email, form.password, {
        first_name: form.firstName,
        last_name: form.lastName,
        role: userType,
      });

      if (success) {
        logAuth("Registration successful, redirecting to post-register");
        // Redirect to post-register page
        navigate("/post-register", { 
          state: { 
            userType,
            isNewUser: true 
          },
          replace: true
        });
      }
    } else {
      // For login
      logAuth("Logging in existing user");
      await handleLogin(form.email, form.password);
      // Redirection will be handled by useEmailPasswordAuth
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
