
import Layout from "@/components/layout/Layout";
import useAuthPageController from "@/pages/auth/useAuthPageController";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthSocialDivider from "@/pages/auth/AuthSocialDivider";
import AuthForm from "@/components/auth/AuthForm";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthUserTypeSelector from "@/components/auth/AuthUserTypeSelector";
import AuthCard from "@/components/auth/AuthCard";
import AuthToggle from "@/components/auth/AuthToggle";

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
    setUserType
  } = useAuthPageController();

  const toggleAuth = () => {
    setIsRegister(!isRegister);
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
              form={form}
              handleInput={handleInput}
              loading={loading}
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
                loading={loading}
              />
            </div>
          </AuthCard>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
