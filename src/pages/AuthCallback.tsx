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
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setLoading(true);
        
        // Handle session from URL hash/query parameters
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (data.session) {
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
              console.log('Updating user metadata with role from URL:', roleFromUrl);
              await supabase.auth.updateUser({
                data: { role: roleFromUrl }
              });
            }
            
            // Ensure profile exists with correct role
            try {
              await ensureProfileExists(data.session.user);
            } catch (profileError) {
              console.error('Profile creation error in auth callback:', profileError);
            }
          }
          
          // Let ProtectedRoute handle redirection based on user status
          console.log('Auth callback successful, letting ProtectedRoute handle redirection');
        } else {
          // No session found, redirect to sign in
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
  }, [navigate]);

  // Handle automatic redirection when user and profile become available
  useEffect(() => {
    if (user && profile && !loading && !error) {
      console.log('Auth callback: User and profile available, redirecting based on role and status');
      
      // Navigate to appropriate dashboard and let ProtectedRoute handle status-based redirection
      if (profile.role === 'provider') {
        navigate('/provider/dashboard', { replace: true });
      } else if (profile.role === 'founder') {
        navigate('/founder/dashboard', { replace: true });
      } else {
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
              {loading ? 'Verifying Email...' : 'Email Verified!'}
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
