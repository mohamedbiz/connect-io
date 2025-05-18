
import { useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useAuthPageController from "@/pages/auth/useAuthPageController";
import { logAuth } from "@/utils/auth/auth-logger";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Extends the base controller with URL parameter handling
 */
export const useAuthPageControllerWithParams = () => {
  const [searchParams] = useSearchParams();
  const shouldRegister = searchParams.get('register') === 'true';
  const userTypeParam = searchParams.get('type') as "founder" | "provider" | null;
  
  // Destructure only what we need from auth context to avoid excessive re-renders
  const { user, loading: authLoading } = useAuth();
  
  const {
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
  } = useAuthPageController();

  // Set initial values based on URL params - using useEffect with dependencies to run only when needed
  useEffect(() => {
    logAuth("Auth page params:", { 
      shouldRegister, 
      userTypeParam,
      currentIsRegister: isRegister,
      currentUserType: userType
    });

    // Only set if the values don't match to avoid unnecessary state updates
    if (shouldRegister && !isRegister) {
      setIsRegister(true);
    }
    
    if (userTypeParam && userTypeParam !== userType && 
        (userTypeParam === "founder" || userTypeParam === "provider")) {
      logAuth("Setting user type from URL param", { userType: userTypeParam });
      setUserType(userTypeParam);
    }
  }, [shouldRegister, userTypeParam, setIsRegister, setUserType, isRegister, userType]);

  // Log authentication state on render - with proper dependencies
  useEffect(() => {
    logAuth("AuthPage rendered", { 
      isAuthenticated: !!user, 
      loading: authLoading,
      isRegisterMode: isRegister,
      userType
    });
  }, [user, authLoading, isRegister, userType]);

  // Toggle between register and login
  const toggleAuth = useCallback(() => {
    logAuth("Toggling auth mode", { currentMode: isRegister ? "Register" : "Login" });
    setIsRegister(prev => !prev);
  }, [setIsRegister]);

  // Use useMemo to prevent unnecessary re-creation of this object
  const authFormData = useMemo(() => ({
    email: form.email,
    password: form.password,
    first_name: form.firstName || '',
    last_name: form.lastName || ''
  }), [form.email, form.password, form.firstName, form.lastName]);

  // Memoize loading state to reduce re-renders
  const isLoading = useMemo(() => 
    loading || authLoading || Object.values(loadingProviders).some(Boolean), 
    [loading, authLoading, loadingProviders]
  );

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
    loadingProviders,
    toggleAuth,
    authFormData,
    isLoading
  };
};
