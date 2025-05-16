
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEmailPasswordAuth } from "@/hooks/useEmailPasswordAuth";
import { useOAuth } from "@/hooks/useOAuth";

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
    // Form validation
    if (!form.email || !form.password) {
      return;
    }

    if (isRegister) {
      // For registration, we need to include the user type and name info
      const success = await handleRegister(form.email, form.password, {
        first_name: form.firstName,
        last_name: form.lastName,
        role: userType,
      });

      if (success) {
        // Redirect to appropriate onboarding flow based on user type
        if (userType === "founder") {
          navigate("/founder-qualification");
        } else {
          navigate("/provider-application");
        }
      }
    } else {
      // For login
      const success = await handleLogin(form.email, form.password);
      
      if (success) {
        // Redirect to the page the user was trying to access, or home
        const from = location.state?.from || "/";
        navigate(from, { replace: true });
      }
    }
  }, [form, isRegister, userType, handleRegister, handleLogin, navigate, location.state]);

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
