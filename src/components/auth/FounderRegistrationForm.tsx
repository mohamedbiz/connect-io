
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Building, Lock, Mail, Check, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FounderRegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    password: "",
    accepted_terms: false
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ 
      ...f, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Basic form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!form.first_name.trim()) {
      errors.first_name = "First name is required";
    }
    
    if (!form.last_name.trim()) {
      errors.last_name = "Last name is required";
    }
    
    if (!form.company.trim()) {
      errors.company = "Company/Store name is required";
    }
    
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (!form.accepted_terms) {
      errors.accepted_terms = "You must accept the terms and conditions";
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsLoading(true);
    setIsSubmitted(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.first_name,
            last_name: form.last_name,
            role: "founder",
            company_name: form.company
          },
        },
      });
      
      if (error) {
        toast.error(error.message);
        setFormErrors(prev => ({
          ...prev,
          submit: error.message
        }));
      } else {
        toast.success("Account created! Redirecting you to the dashboard.");
        
        // Allow the success message to show before redirecting
        setTimeout(() => {
          navigate("/founder-dashboard");
        }, 1500);
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("An unexpected error occurred. Please try again.");
      setFormErrors(prev => ({
        ...prev,
        submit: "An unexpected error occurred. Please try again."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-sm text-gray-500 mb-4 mt-2">
        For eCommerce store owners looking to grow their sales and improve customer retention
      </div>
      
      {isSubmitted && !isLoading && !formErrors.submit && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">
            Your account is being created. You'll be redirected to the dashboard shortly.
          </AlertDescription>
        </Alert>
      )}
      
      {formErrors.submit && (
        <Alert className="mb-4 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">
            {formErrors.submit}
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="first-name" className="text-sm font-medium">
              First Name
            </label>
            <Input 
              name="first_name"
              id="first-name" 
              placeholder="John" 
              required 
              value={form.first_name}
              onChange={handleInput}
              className={formErrors.first_name ? "border-red-500" : ""}
            />
            {formErrors.first_name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.first_name}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-sm font-medium">
              Last Name
            </label>
            <Input 
              name="last_name"
              id="last-name" 
              placeholder="Smith" 
              required 
              value={form.last_name}
              onChange={handleInput}
              className={formErrors.last_name ? "border-red-500" : ""}
            />
            {formErrors.last_name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.last_name}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company/Store Name
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              name="company"
              id="company" 
              placeholder="Your eCommerce Store" 
              required 
              value={form.company}
              onChange={handleInput}
              className={`pl-10 ${formErrors.company ? "border-red-500" : ""}`}
            />
          </div>
          {formErrors.company && (
            <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>
          )}
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
              className={`pl-10 ${formErrors.email ? "border-red-500" : ""}`}
              value={form.email}
              onChange={handleInput}
            />
          </div>
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
          )}
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
              className={`pl-10 ${formErrors.password ? "border-red-500" : ""}`}
              value={form.password}
              onChange={handleInput}
            />
          </div>
          {formErrors.password && (
            <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
          )}
          <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
        </div>
        <div className="flex items-start space-x-2 text-sm">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="accepted_terms"
              type="checkbox"
              className={`focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded ${
                formErrors.accepted_terms ? "border-red-500" : ""
              }`}
              checked={form.accepted_terms}
              onChange={handleInput}
            />
          </div>
          <label htmlFor="terms" className="text-gray-500">
            I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </label>
        </div>
        {formErrors.accepted_terms && (
          <p className="text-red-500 text-xs">{formErrors.accepted_terms}</p>
        )}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Founder Account"}
        </Button>
      </form>
    </>
  );
};

export default FounderRegistrationForm;
