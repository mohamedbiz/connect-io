
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase, Google, Github, Twitter, User, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account created! Please check your email to confirm." });
      }
    } else {
      // Sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Login successful" });
        navigate("/");
      }
    }
  };

  const handleOAuth = async (provider: "google" | "github" | "twitter") => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    setLoading(false);
    if (error) {
      toast({ title: `Sign in with ${provider} failed`, description: error.message, variant: "destructive" });
    }
    // The user will be redirected by Supabase OAuth.
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
          <form className="space-y-4" onSubmit={handleAuth}>
            {isRegister && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="first_name"
                  placeholder="First name"
                  value={form.first_name}
                  onChange={handleInput}
                  required
                />
                <Input
                  name="last_name"
                  placeholder="Last name"
                  value={form.last_name}
                  onChange={handleInput}
                  required
                />
              </div>
            )}
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleInput}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (isRegister ? "Signing up..." : "Signing in...") : isRegister ? "Sign Up" : "Sign In"}
            </Button>
            <div className="flex items-center my-2">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="mx-2 text-xs text-gray-500">or</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => handleOAuth("google")} type="button">
                <Google className="mr-2 h-4 w-4" /> Continue with Google
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleOAuth("github")} type="button">
                <Github className="mr-2 h-4 w-4" /> Continue with GitHub
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleOAuth("twitter")} type="button">
                <Twitter className="mr-2 h-4 w-4" /> Continue with Twitter
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            {isRegister ? (
              <span>
                Already have an account?{" "}
                <button className="text-primary hover:underline" onClick={() => setIsRegister(false)} type="button">
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Need an account?{" "}
                <button className="text-primary hover:underline" onClick={() => setIsRegister(true)} type="button">
                  Sign Up
                </button>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
