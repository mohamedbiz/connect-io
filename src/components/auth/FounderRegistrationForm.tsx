
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Building, Lock, Mail, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { validatePassword } from "@/utils/password-utils";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const FounderRegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(validatePassword(""));
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    password: "",
    password_confirmation: "",
    accepted_terms: false
  });

  useEffect(() => {
    // Validate password when it changes
    if (form.password) {
      setPasswordValidation(validatePassword(form.password));
    }
  }, [form.password]);

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

  // Enhanced form validation
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
    } else if (!passwordValidation.isValid) {
      errors.password = "Password doesn't meet security requirements";
    }
    
    if (form.password !== form.password_confirmation) {
      errors.password_confirmation = "Passwords don't match";
    }
    
    if (!form.accepted_terms) {
      errors.accepted_terms = "You must accept the terms and conditions";
    }
    
    return errors;
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
          emailRedirectTo: window.location.origin + "/post-register",
        },
      });
      
      if (error) {
        if (error.message.includes("User already registered")) {
          toast.error("This email is already registered. Please try logging in instead.");
          setFormErrors(prev => ({
            ...prev,
            email: "Email already in use"
          }));
        } else {
          toast.error(error.message);
          setFormErrors(prev => ({
            ...prev,
            submit: error.message
          }));
        }
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
      <div className="text-sm text-[#0E3366] mb-4 mt-2">
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
            <label htmlFor="first-name" className="text-sm font-medium text-[#0A2342]">
              First Name
            </label>
            <Input 
              name="first_name"
              id="first-name" 
              placeholder="John" 
              required 
              value={form.first_name}
              onChange={handleInput}
              className={`border-[#2D82B7]/50 focus-visible:ring-[#2D82B7] ${formErrors.first_name ? "border-red-500" : ""}`}
            />
            {formErrors.first_name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.first_name}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-sm font-medium text-[#0A2342]">
              Last Name
            </label>
            <Input 
              name="last_name"
              id="last-name" 
              placeholder="Smith" 
              required 
              value={form.last_name}
              onChange={handleInput}
              className={`border-[#2D82B7]/50 focus-visible:ring-[#2D82B7] ${formErrors.last_name ? "border-red-500" : ""}`}
            />
            {formErrors.last_name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.last_name}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium text-[#0A2342]">
            Company/Store Name
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#2D82B7]/70" />
            <Input 
              name="company"
              id="company" 
              placeholder="Your eCommerce Store" 
              required 
              value={form.company}
              onChange={handleInput}
              className={`pl-10 border-[#2D82B7]/50 focus-visible:ring-[#2D82B7] ${formErrors.company ? "border-red-500" : ""}`}
            />
          </div>
          {formErrors.company && (
            <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#0A2342]">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#2D82B7]/70" />
            <Input 
              name="email"
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              required 
              className={`pl-10 border-[#2D82B7]/50 focus-visible:ring-[#2D82B7] ${formErrors.email ? "border-red-500" : ""}`}
              value={form.email}
              onChange={handleInput}
            />
          </div>
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-[#0A2342]">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#2D82B7]/70" />
            <Input 
              name="password"
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••" 
              required 
              className={`pl-10 pr-10 border-[#2D82B7]/50 focus-visible:ring-[#2D82B7] ${formErrors.password ? "border-red-500" : ""}`}
              value={form.password}
              onChange={handleInput}
            />
            <button 
              type="button"
              onClick={handleTogglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          {formErrors.password && (
            <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
          )}
          {form.password && <PasswordStrengthIndicator validation={passwordValidation} />}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password_confirmation" className="text-sm font-medium text-[#0A2342]">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#2D82B7]/70" />
            <Input 
              name="password_confirmation"
              id="password_confirmation" 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••" 
              required 
              className={`pl-10 border-[#2D82B7]/50 focus-visible:ring-[#2D82B7] ${formErrors.password_confirmation ? "border-red-500" : ""}`}
              value={form.password_confirmation}
              onChange={handleInput}
            />
          </div>
          {formErrors.password_confirmation && (
            <p className="text-red-500 text-xs mt-1">{formErrors.password_confirmation}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start space-x-2 text-sm">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="accepted_terms"
                type="checkbox"
                className={`h-4 w-4 text-[#2D82B7] border-[#2D82B7]/50 rounded ${
                  formErrors.accepted_terms ? "border-red-500" : ""
                }`}
                checked={form.accepted_terms}
                onChange={handleInput}
              />
            </div>
            <label htmlFor="terms" className="text-[#0E3366]">
              I agree to the <Link to="/terms" className="text-[#2D82B7] hover:text-[#3D9AD1] hover:underline">Terms of Service</Link> and{" "}
              <Link to="/privacy" className="text-[#2D82B7] hover:text-[#3D9AD1] hover:underline">Privacy Policy</Link>
            </label>
          </div>
          {formErrors.accepted_terms && (
            <p className="text-red-500 text-xs">{formErrors.accepted_terms}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-[#2D82B7] border-[#2D82B7]/50 rounded"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember-me" className="text-sm text-[#0E3366]">
            Remember me
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-[#2D82B7] hover:bg-[#3D9AD1]" 
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Founder Account"}
        </Button>
        
        <p className="text-center text-sm text-[#0E3366]">
          Already have an account?{" "}
          <Link 
            to="/auth?login=true" 
            className="text-[#2D82B7] hover:text-[#3D9AD1] hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </>
  );
};

export default FounderRegistrationForm;
