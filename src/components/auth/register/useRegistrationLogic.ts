
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
      // Simple retry - just reset error state
      // The auth state will be handled by the AuthContext
    } else {
      toast.error('Still offline. Please check your internet connection.');
    }
  };

  return {
    loading,
    oauthLoading,
    handleSubmit,
    handleGoogleSignIn,
    handleRetryConnection
  };
};
