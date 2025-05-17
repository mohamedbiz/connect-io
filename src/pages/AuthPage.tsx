
import { useEffect } from "react";
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

  // Set initial values based on URL params
  useEffect(() => {
    if (shouldRegister) {
      setIsRegister(true);
    }
    
    if (userTypeParam && (userTypeParam === "founder" || userTypeParam === "provider")) {
      setUserType(userTypeParam);
    }
  }, [shouldRegister, userTypeParam, setIsRegister, setUserType]);

  // Log authentication state on render
  useEffect(() => {
    logAuth("AuthPage rendered", { 
      isAuthenticated: !!user, 
      loading: authLoading,
      isRegisterMode: isRegister,
      userType
    });
  }, [user, authLoading, isRegister, userType]);

  const toggleAuth = () => {
    setIsRegister(!isRegister);
  };

  // Map form data to match what AuthForm expects
  const authFormData = {
    email: form.email,
    password: form.password,
    first_name: form.firstName || '',
    last_name: form.lastName || ''
  };

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
              loading={loading || authLoading}
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
                loading={loading || loadingProviders || authLoading}
              />
            </div>
          </AuthCard>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
