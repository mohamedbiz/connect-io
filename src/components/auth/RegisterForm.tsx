import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase, checkNetworkConnection } from '@/integrations/supabase/client';
import { usePostLoginRedirection } from '@/hooks/usePostLoginRedirection';
import { useRegisterFormData } from './register/RegisterFormData';
import RegisterFormFields from './register/RegisterFormFields';
import RegisterNetworkAlert from './register/RegisterNetworkAlert';
import RegisterGoogleButton from './register/RegisterGoogleButton';

interface RegisterFormProps {
  userType: 'founder' | 'provider';
}

const RegisterForm = ({ userType }: RegisterFormProps) => {
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [networkAvailable, setNetworkAvailable] = useState(true);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const { formData, handleInput, updateAcceptTerms } = useRegisterFormData();
  const { register, error: authError, retryAuth, user, profile } = useAuth();
  const { redirectAfterLogin } = usePostLoginRedirection();

  // Handle redirection after successful registration
  useEffect(() => {
    if (user && registrationComplete && !loading) {
      console.log('Registration complete, triggering redirection with userType:', userType);
      
      // Clear the registration complete flag to prevent multiple redirections
      setRegistrationComplete(false);
      
      // Use a timeout to ensure all auth state has settled
      const redirectTimer = setTimeout(() => {
        redirectAfterLogin(user, profile, userType);
      }, 1000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [user, registrationComplete, loading, redirectAfterLogin, userType, profile]);
  
  // Check network status on component mount
  useEffect(() => {
    const checkNetwork = async () => {
      const isOnline = await checkNetworkConnection();
      setNetworkAvailable(isOnline);
      
      if (!isOnline) {
        toast.error('Network connection unavailable');
      }
    };
    
    checkNetwork();
    
    const handleOnline = () => setNetworkAvailable(true);
    const handleOffline = () => setNetworkAvailable(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      toast.error('Network connection is unavailable. Please check your internet connection and try again.');
      setNetworkAvailable(false);
      return;
    }
    
    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    
    setLoading(true);

    try {
      console.log(`Attempting registration with: ${formData.email} as ${userType}`);
      const { error } = await register(
        formData.email, 
        formData.password, 
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          role: userType
        }
      );

      if (!error) {
        console.log('Registration successful, setting flag for redirection');
        toast.success('Registration successful! Redirecting...');
        setRegistrationComplete(true);
      } else {
        if (error.message?.includes('already registered')) {
          toast.error('This email is already registered. Please sign in instead.');
        } else if (error.message?.includes('password')) {
          toast.error('Password must be at least 6 characters long.');
        } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
          toast.error('Network error. Please check your connection and try again.');
          setNetworkAvailable(false);
        } else {
          toast.error(error.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An unexpected error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      toast.error('Network connection is unavailable. Please check your internet connection and try again.');
      setNetworkAvailable(false);
      return;
    }
    
    try {
      setOAuthLoading(true);
      console.log('Attempting Google sign-up as:', userType);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth-callback?role=${userType}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        toast.error('Network error. Please check your connection and try again.');
        setNetworkAvailable(false);
      } else {
        toast.error('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setOAuthLoading(false);
    }
  };

  const handleRetryConnection = async () => {
    const isOnline = await checkNetworkConnection();
    setNetworkAvailable(isOnline);
    
    if (isOnline) {
      toast.success('Connection restored!');
      retryAuth();
    } else {
      toast.error('Still offline. Please check your internet connection.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!networkAvailable && (
        <RegisterNetworkAlert onRetry={handleRetryConnection} />
      )}

      <RegisterFormFields
        formData={formData}
        userType={userType}
        showPassword={showPassword}
        onShowPasswordToggle={() => setShowPassword(!showPassword)}
        onInput={handleInput}
        onAcceptTermsChange={updateAcceptTerms}
      />
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90" 
        disabled={loading || !networkAvailable}
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

      <RegisterGoogleButton
        userType={userType}
        loading={oauthLoading}
        networkAvailable={networkAvailable}
        onGoogleSignIn={handleGoogleSignIn}
      />
    </form>
  );
};

export default RegisterForm;
