
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, Google } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';

interface RegisterFormProps {
  userType: 'founder' | 'provider';
}

const RegisterForm = ({ userType }: RegisterFormProps) => {
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: '',
    acceptTerms: false
  });

  const { register, error: authError } = useAuth();
  const navigate = useNavigate();
  
  const isConnectionError = authError && authError.includes('fetch');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isConnectionError) {
      toast.error('Please check your internet connection and try again');
      return;
    }
    
    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    
    setLoading(true);

    try {
      const { error } = await register(
        formData.email, 
        formData.password, 
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          business_name: formData.companyName,
          role: userType
        }
      );

      if (!error) {
        navigate('/post-register', { 
          state: { userType, isNewUser: true },
          replace: true 
        });
      } else {
        // Enhanced error messages
        if (error.message?.includes('already registered')) {
          toast.error('This email is already registered. Please sign in instead.');
        } else if (error.message?.includes('password')) {
          toast.error('Password must be at least 6 characters long.');
        } else {
          toast.error(error.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In with userType metadata
  const handleGoogleSignIn = async () => {
    try {
      setOAuthLoading(true);
      
      // Add user_type to OAuth options to store role in metadata
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth-callback`,
          queryParams: {
            // Pass the user type as a query param to be handled on callback
            access_type: 'offline',
            prompt: 'consent',
          },
          // Add custom user metadata
          data: {
            role: userType
          }
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    } finally {
      setOAuthLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
          <Input 
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInput}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
          <Input 
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInput}
            required
          />
        </div>
      </div>

      {userType === 'founder' && (
        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-medium">Company/Store Name</label>
          <Input 
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInput}
            required={userType === 'founder'}
          />
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInput}
            className="pl-10"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInput}
            className="pl-10 pr-10" 
            required
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="acceptTerms" 
          name="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) => 
            setFormData(prev => ({...prev, acceptTerms: checked as boolean}))
          }
        />
        <label 
          htmlFor="acceptTerms" 
          className="text-sm text-gray-600 cursor-pointer"
        >
          I agree to the{" "}
          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90" 
        disabled={loading || isConnectionError}
      >
        {loading ? (
          <div className="flex items-center">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
            Creating account...
          </div>
        ) : (
          'Create Account'
        )}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button 
        type="button" 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogleSignIn}
        disabled={oauthLoading || isConnectionError}
      >
        <Google className="h-4 w-4" />
        {oauthLoading ? 'Connecting...' : 'Sign up with Google'}
      </Button>
    </form>
  );
};

export default RegisterForm;
