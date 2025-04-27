
import AuthPageLayout from "./auth/AuthPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthHeader from "./auth/AuthHeader";
import AuthForm from "@/components/auth/AuthForm";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import { Building, UserRound } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import useAuthPageController from "./auth/useAuthPageController";

export default function AuthPage() {
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

  return (
    <AuthPageLayout>
      <AuthHeader isRegister={isRegister} />
      <CardContent>
        <Tabs defaultValue="founder" className="mb-6" onValueChange={(value) => setUserType(value as "founder" | "provider")}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="founder">
              <Building className="h-4 w-4 mr-2" />
              Founder
            </TabsTrigger>
            <TabsTrigger value="provider">
              <UserRound className="h-4 w-4 mr-2" />
              Provider
            </TabsTrigger>
          </TabsList>

          <TabsContent value="founder" className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              For eCommerce store owners looking to grow their business
            </p>
            <AuthForm
              isRegister={isRegister}
              form={form}
              handleInput={handleInput}
              loading={loading}
              handleSubmit={handleAuth}
              toggleAuth={() => setIsRegister((v) => !v)}
              userType="founder"
            />
          </TabsContent>

          <TabsContent value="provider" className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              For email marketing specialists looking to connect with clients
            </p>
            <AuthForm
              isRegister={isRegister}
              form={form}
              handleInput={handleInput}
              loading={loading}
              handleSubmit={handleAuth}
              toggleAuth={() => setIsRegister((v) => !v)}
              userType="provider"
            />
          </TabsContent>
        </Tabs>
        
        <SocialAuthButtons handleOAuth={handleOAuth} loading={loading} />
      </CardContent>
    </AuthPageLayout>
  );
}
