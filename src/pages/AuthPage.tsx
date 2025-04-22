
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AuthForm from "@/components/auth/AuthForm";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";

const initialForm = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
};

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) navigate("/");
    });
  }, [navigate]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              first_name: form.first_name,
              last_name: form.last_name,
            },
          },
        });

        if (error) {
          toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
        } else {
          toast({ title: "Account created!", description: "Welcome to Connect." });
          navigate("/");
        }
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (error) {
          toast({ title: "Login failed", description: error.message, variant: "destructive" });
        } else {
          toast({ title: "Login successful" });
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github" | "twitter") => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) {
        toast({ title: `Sign in with ${provider} failed`, description: error.message, variant: "destructive" });
      }
      // User is redirected by Supabase OAuth
    } catch (error) {
      console.error(`OAuth error with ${provider}:`, error);
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred with social login. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex min-h-screen justify-center items-center">
      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{isRegister ? "Create your account" : "Login to Connect"}</CardTitle>
          <CardDescription>
            {isRegister ? "Sign up to start using Connect" : "Sign in with email or social provider"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm
            isRegister={isRegister}
            form={form}
            handleInput={handleInput}
            loading={loading}
            handleSubmit={handleAuth}
            toggleAuth={() => setIsRegister((v) => !v)}
          />
          <div className="flex items-center my-2">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="mx-2 text-xs text-gray-500">or</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <SocialAuthButtons handleOAuth={handleOAuth} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}
