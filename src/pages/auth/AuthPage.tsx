
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";
import AuthSocialDivider from "@/pages/auth/AuthSocialDivider";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthUserTypeSelector from "@/components/auth/AuthUserTypeSelector";
import AuthCard from "@/components/auth/AuthCard";
import AuthToggle from "@/components/auth/AuthToggle";
import { useAuthPageControllerWithParams } from "./useAuthPageControllerWithParams";
import { logAuth } from "@/utils/auth/auth-logger";

const AuthPage = () => {
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
    loadingProviders,
    toggleAuth,
    authFormData,
    isLoading
  } = useAuthPageControllerWithParams();

  // Add logging to help debug user type selection
  const handleUserTypeChange = (value: "founder" | "provider") => {
    logAuth("AuthPage: User type selection changed", { 
      from: userType, 
      to: value 
    });
    setUserType(value);
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
                setUserType={handleUserTypeChange} 
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
