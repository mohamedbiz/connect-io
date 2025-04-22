
import AuthPageLayout from "./auth/AuthPageLayout";
import AuthHeader from "./auth/AuthHeader";
import AuthSocialDivider from "./auth/AuthSocialDivider";
import useAuthPageController from "./auth/useAuthPageController";
import { CardContent } from "@/components/ui/card";
import AuthForm from "@/components/auth/AuthForm";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";

export default function AuthPage() {
  const {
    isRegister,
    setIsRegister,
    form,
    loading,
    handleInput,
    handleAuth,
    handleOAuth
  } = useAuthPageController();

  return (
    <AuthPageLayout>
      <AuthHeader isRegister={isRegister} />
      <CardContent>
        <AuthForm
          isRegister={isRegister}
          form={form}
          handleInput={handleInput}
          loading={loading}
          handleSubmit={handleAuth}
          toggleAuth={() => setIsRegister((v) => !v)}
        />
        <AuthSocialDivider />
        <SocialAuthButtons handleOAuth={handleOAuth} loading={loading} />
      </CardContent>
    </AuthPageLayout>
  );
}
