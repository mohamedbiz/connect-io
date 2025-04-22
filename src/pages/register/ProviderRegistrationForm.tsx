
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ProviderRegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    business_name: "",
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.first_name,
            last_name: form.last_name,
            role: "provider",
          },
        },
      });
      
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account created!", description: "Welcome to Connect." });
        navigate("/"); // Redirect to homepage after successful registration
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast({ 
        title: "Registration error", 
        description: "An unexpected error occurred. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-sm text-gray-500 mb-4 mt-2">
        For email marketing specialists who want to connect with pre-qualified eCommerce clients
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="first-name" className="text-sm font-medium">
              First Name
            </label>
            <Input 
              name="first_name"
              id="first-name" 
              placeholder="Jane" 
              required 
              value={form.first_name}
              onChange={handleInput}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-sm font-medium">
              Last Name
            </label>
            <Input 
              name="last_name"
              id="last-name" 
              placeholder="Doe" 
              required 
              value={form.last_name}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="business-name" className="text-sm font-medium">
            Business Name
          </label>
          <Input 
            name="business_name"
            id="business-name" 
            placeholder="Your Agency or Freelance Business" 
            value={form.business_name}
            onChange={handleInput}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              name="email"
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              required 
              className="pl-10" 
              value={form.email}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              name="password"
              id="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              className="pl-10" 
              value={form.password}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="flex items-start space-x-2 text-sm">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
              required
            />
          </div>
          <label htmlFor="terms" className="text-gray-500">
            I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </label>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Apply as Provider"}
        </Button>
      </form>
    </>
  );
};

export default ProviderRegistrationForm;
