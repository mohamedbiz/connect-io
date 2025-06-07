
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase, checkNetworkConnection } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterFormData } from './RegisterFormData';

interface UseRegistrationLogicProps {
  userType: 'founder' | 'provider';
  formData: RegisterFormData;
  setNetworkAvailable: (available: boolean) => void;
}

export const useRegistrationLogic = ({ userType, formData, setNetworkAvailable }: UseRegistrationLogicProps) => {
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOAuthLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [showResendOption, setShowResendOption] = useState(false);
  
  const { register, user, profile } = useAuth();

  // Handle redirection after successful registration
  useEffect(() => {
    if (user && registrationComplete && !loading) {
      console.log('Registration complete, user authenticated. ProtectedRoute will handle redirection.');
      
      // Clear the registration complete flag to prevent multiple redirections
      setRegistrationComplete(false);
      
      // Let ProtectedRoute handle the redirection based on user role and status
      // No manual redirection needed - ProtectedRoute will automatically redirect
      // providers to onboarding if account_status is 'pending_application'
    }
  }, [user, registrationComplete, loading, userType, profile]);

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
    setShowResendOption(false);

    try {
      console.log(`Attempting registration with: ${formData.email} as ${userType}`);
      
      // Use Supabase directly with proper email redirect configuration
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: userType
          },
          emailRedirectTo: `${window.location.origin}/auth-callback?role=${userType}`
        }
      });

      if (error) {
        console.error('Registration error:', error);
        
        // Handle specific error cases
        if (error.message?.includes('User already registered')) {
          toast.error('This email is already registered. Please sign in instead or check your email for the verification link.');
          setShowResendOption(true);
        } else if (error.message?.includes('Password should be at least')) {
          toast.error('Password must be at least 6 characters long.');
        } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
          toast.error('Network error. Please check your connection and try again.');
          setNetworkAvailable(false);
        } else {
          toast.error(error.message || 'Registration failed. Please try again.');
        }
      } else {
        // Check if user was created or already exists
        if (data.user && !data.user.email_confirmed_at) {
          console.log('Registration successful, verification email sent');
          toast.success('Account created! Please check your email and click the verification link to continue.');
          setShowResendOption(true);
        } else if (data.user && data.user.email_confirmed_at) {
          console.log('User already verified, proceeding with login');
          toast.success('Welcome back! Logging you in...');
          setRegistrationComplete(true);
        }
      }
    } catch (error) {
      console.error('Registration exception:', error);
      toast.error('An unexpected error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth-callback?role=${userType}`
        }
      });

      if (error) {
        toast.error('Failed to resend verification email. Please try again.');
      } else {
        toast.success('Verification email sent! Please check your inbox and spam folder.');
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      toast.error('Failed to resend verification email.');
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
      // Simple retry - just reset error state
      // The auth state will be handled by the AuthContext
    } else {
      toast.error('Still offline. Please check your internet connection.');
    }
  };

  return {
    loading,
    oauthLoading,
    showResendOption,
    handleSubmit,
    handleGoogleSignIn,
    handleRetryConnection,
    handleResendVerification
  };
};
