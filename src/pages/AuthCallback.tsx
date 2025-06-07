
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { ensureProfileExists } from '@/utils/auth/auth-operations';

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the URL hash
      const hash = window.location.hash;
      
      try {
        setLoading(true);
        
        // Handle session from hash
        if (hash) {
          // The session should be automatically handled by Supabase
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            throw error;
          }
          
          if (data.session) {
            toast.success('Successfully signed in!');
            
            // Check if the user is new or returning
            const { data: userData } = await supabase.auth.getUser();
            
            // Get role from URL if present
            const url = new URL(window.location.href);
            const roleFromUrl = url.searchParams.get('role') as 'founder' | 'provider' | null;
            
            console.log('OAuth callback - role from URL:', roleFromUrl);
            console.log('OAuth callback - user metadata role:', userData.user?.user_metadata?.role);
            
            // Check for role in user metadata or URL parameter
            const role = userData.user?.user_metadata?.role || roleFromUrl;
            
            if (role && userData.user) {
              // If we have a role from URL, update user metadata if needed
              if (roleFromUrl && !userData.user?.user_metadata?.role) {
                console.log('Updating user metadata with role from URL:', roleFromUrl);
                await supabase.auth.updateUser({
                  data: { role: roleFromUrl }
                });
              }
              
              // Ensure profile exists with correct role
              try {
                await ensureProfileExists(userData.user);
              } catch (profileError) {
                console.error('Profile creation error in OAuth callback:', profileError);
              }
            }
            
            // Don't manually redirect - let ProtectedRoute handle it based on user status
            console.log('OAuth login successful, letting ProtectedRoute handle redirection');
          } else {
            // No session found, redirect to sign in
            navigate('/auth', { replace: true });
          }
        } else {
          // No hash found, redirect to sign in
          navigate('/auth', { replace: true });
        }
      } catch (err: any) {
        console.error('Auth callback error:', err);
        setError(err.message || 'Authentication failed. Please try again.');
        
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
      console.log('OAuth callback: User and profile available, redirecting to appropriate dashboard');
      
      // Use ProtectedRoute logic for redirection
      if (profile.role === 'provider') {
        if (profile.account_status === 'pending_application') {
          console.log('Redirecting provider to onboarding');
          navigate('/provider/onboarding', { replace: true });
        } else {
          console.log('Redirecting provider to dashboard');
          navigate('/provider/dashboard', { replace: true });
        }
      } else if (profile.role === 'founder') {
        if (profile.account_status === 'pending_profile') {
          console.log('Redirecting founder to onboarding');
          navigate('/founder/onboarding', { replace: true });
        } else {
          console.log('Redirecting founder to dashboard');
          navigate('/founder/dashboard', { replace: true });
        }
      }
    }
  }, [user, profile, loading, error, navigate]);

  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
        {error ? (
          <Alert variant="destructive" className="max-w-md">
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {loading ? 'Completing Sign In...' : 'Sign In Complete!'}
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
