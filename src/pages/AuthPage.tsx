
import { useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import useAuthPageController from "@/pages/auth/useAuthPageController";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthSocialDivider from "@/pages/auth/AuthSocialDivider";
import AuthForm from "@/components/auth/AuthForm";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthUserTypeSelector from "@/components/auth/AuthUserTypeSelector";
import AuthCard from "@/components/auth/AuthCard";
import AuthToggle from "@/components/auth/AuthToggle";
import { useAuth } from "@/contexts/AuthContext";
import { logAuth } from "@/utils/auth/auth-logger";

const AuthPage = () => {
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
    // Only set if the values don't match to avoid unnecessary state updates
    if (shouldRegister && !isRegister) {
      setIsRegister(true);
    }
    
    if (userTypeParam && userTypeParam !== userType && 
        (userTypeParam === "founder" || userTypeParam === "provider")) {
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

  const toggleAuth = useCallback(() => {
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
    loading || authLoading || loadingProviders, 
    [loading, authLoading, loadingProviders]
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <AuthCard>
            <AuthHeader isRegister={isRegister} />

            {isRegister && (
              <AuthUserTypeSelector 
                userType={userType} 
                setUserType={setUserType} 
              />
            )}

            <AuthForm
              isRegister={isRegister}
              form={authFormData}
              handleInput={handleInput}
              loading={isLoading}
              handleSubmit={handleAuth}
              userType={userType}
            />
            
            <AuthToggle 
              isRegister={isRegister}
              toggleAuth={toggleAuth}
            />

            <div className="mt-6 pt-6 border-t border-[#2D82B7]/30">
              <AuthSocialDivider />
              <SocialAuthButtons 
                handleOAuth={handleOAuth}
                loading={isLoading}
              />
            </div>
          </AuthCard>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
