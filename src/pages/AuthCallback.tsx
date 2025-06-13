
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { ensureProfileExists } from '@/utils/auth/profile-operations';

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setLoading(true);
        console.log('Auth callback: Starting authentication process');
        
        // Handle session from URL hash/query parameters
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback session error:', error);
          throw error;
        }
        
        if (data.session) {
          console.log('Auth callback: Session found, processing user');
          toast.success('Email verified successfully! Welcome to the platform.');
          
          // Get role from URL parameter
          const url = new URL(window.location.href);
          const roleFromUrl = url.searchParams.get('role') as 'founder' | 'provider' | null;
          
          console.log('Auth callback - role from URL:', roleFromUrl);
          console.log('Auth callback - user metadata role:', data.session.user?.user_metadata?.role);
          
          // Check for role in user metadata or URL parameter
          const role = data.session.user?.user_metadata?.role || roleFromUrl;
          
          if (role && data.session.user) {
            // If we have a role from URL, update user metadata if needed
            if (roleFromUrl && !data.session.user?.user_metadata?.role) {
              console.log('Auth callback: Updating user metadata with role from URL:', roleFromUrl);
              await supabase.auth.updateUser({
                data: { role: roleFromUrl }
              });
            }
            
            // Ensure profile exists with correct role
            try {
              console.log('Auth callback: Ensuring profile exists for user:', data.session.user.id);
              const profileResult = await ensureProfileExists(data.session.user);
              
              if (profileResult) {
                console.log('Auth callback: Profile created/updated successfully', profileResult);
                // Force refresh of auth context to get latest profile
                await refreshProfile();
                
                // Small delay to ensure profile is fully synchronized
                await new Promise(resolve => setTimeout(resolve, 500));
              } else {
                console.warn('Auth callback: Profile creation/update failed');
              }
            } catch (profileError) {
              console.error('Auth callback: Profile creation error:', profileError);
              toast.error('Profile setup encountered an issue. Please try refreshing the page.');
            }
          }
          
          console.log('Auth callback: Authentication successful, profile sync initiated');
        } else {
          console.log('Auth callback: No session found, redirecting to auth');
          navigate('/auth', { replace: true });
        }
      } catch (err: any) {
        console.error('Auth callback error:', err);
        setError(err.message || 'Email verification failed. Please try again.');
        
        // Redirect to auth page after a delay
        setTimeout(() => {
          navigate('/auth', { replace: true });
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate, refreshProfile]);

  // Handle automatic redirection when user and profile become available
  useEffect(() => {
    if (user && profile && !loading && !error) {
      console.log('Auth callback: User and profile available, determining redirection');
      console.log('Auth callback: Profile role:', profile.role, 'Status:', profile.account_status);
      
      // Navigate based on role and status with explicit logging
      if (profile.role === 'provider') {
        console.log('Auth callback: Provider detected, checking status for redirection');
        
        if (profile.account_status === 'pending_profile') {
          console.log('Auth callback: Provider needs to complete onboarding');
          navigate('/provider/onboarding', { replace: true });
        } else {
          console.log('Auth callback: Provider redirecting to dashboard');
          navigate('/provider/dashboard', { replace: true });
        }
      } else if (profile.role === 'founder') {
        console.log('Auth callback: Founder detected, checking status for redirection');
        
        if (profile.account_status === 'pending_profile') {
          console.log('Auth callback: Founder needs to complete onboarding');
          navigate('/founder/onboarding', { replace: true });
        } else {
          console.log('Auth callback: Founder redirecting to dashboard');
          navigate('/founder/dashboard', { replace: true });
        }
      } else if (profile.role === 'admin') {
        console.log('Auth callback: Admin redirecting to dashboard');
        navigate('/admin/dashboard', { replace: true });
      } else {
        console.log('Auth callback: Unknown role, redirecting to home');
        navigate('/', { replace: true });
      }
    }
  }, [user, profile, loading, error, navigate]);

  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
        {error ? (
          <Alert variant="destructive" className="max-w-md">
            <AlertTitle>Email Verification Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {loading ? 'Verifying Email & Setting Up Profile...' : 'Email Verified!'}
            </h1>
            <div className="flex justify-center">
              {loading && (
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              )}
            </div>
            {!loading && (
              <p>Redirecting you to your dashboard...</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AuthCallback;
