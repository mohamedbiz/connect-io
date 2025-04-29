
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { Briefcase } from "lucide-react";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [userType, setUserType] = useState<"founder" | "provider">("founder");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAuth = () => {
    setIsRegister(!isRegister);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        await register(form.email, form.password, {
          first_name: form.first_name,
          last_name: form.last_name,
          role: userType,
        });
        navigate(userType === "provider" ? "/provider-dashboard" : "/founder-dashboard");
      } else {
        await login(form.email, form.password);
        navigate("/");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
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
              handleSubmit={handleSubmit}
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
