
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "@/components/auth/AuthForm";
import { Briefcase } from "lucide-react";
import useAuthPageController from "@/pages/auth/useAuthPageController";
import { Button } from "@/components/ui/button";

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
          <div className="border border-[#2D82B7]/30 rounded-lg bg-white p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-2">
                <div className="bg-[#0A2342] p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-[#2D82B7]" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-[#0A2342]">
                {isRegister ? "Create your Connect account" : "Welcome back"}
              </h1>
              <p className="text-[#0E3366] mt-2">
                {isRegister
                  ? "Join the platform that guarantees results"
                  : "Sign in to your Connect account"}
              </p>
            </div>

            {isRegister && (
              <Tabs
                defaultValue="founder"
                value={userType}
                onValueChange={(value) => setUserType(value as "founder" | "provider")}
                className="mb-6"
              >
                <TabsList className="grid grid-cols-2 w-full bg-[#BFD7ED]/30">
                  <TabsTrigger 
                    value="founder"
                    className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
                  >
                    I'm a Founder
                  </TabsTrigger>
                  <TabsTrigger 
                    value="provider"
                    className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
                  >
                    I'm a Provider
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}

            <AuthForm
              isRegister={isRegister}
              form={form}
              handleInput={handleInput}
              loading={loading}
              handleSubmit={handleAuth}
              toggleAuth={toggleAuth}
              userType={userType}
            />

            <div className="mt-6 pt-6 border-t border-[#2D82B7]/30 text-center">
              <p className="text-[#0E3366] mb-4">Or continue with</p>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  className="border-[#2D82B7]/30 hover:bg-[#BFD7ED]/10 hover:border-[#2D82B7] transition-colors"
                  disabled={loading}
                  onClick={() => handleOAuth('google')}
                >
                  Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
