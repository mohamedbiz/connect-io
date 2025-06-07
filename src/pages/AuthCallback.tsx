
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

  // Handle redirection based on user role and profile
  const redirectAfterLogin = (user: any, profile: any, userRole?: 'founder' | 'provider') => {
    console.log('Redirecting after login - user role:', userRole, 'profile role:', profile?.role);
    
    const role = userRole || profile?.role || 'founder';
    
    if (role === 'provider') {
      navigate('/provider/dashboard', { replace: true });
    } else {
      navigate('/founder/dashboard', { replace: true });
    }
  };

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
            
            // Wait for profile to be available and then redirect
            console.log('OAuth login successful, waiting for profile data to redirect');
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

  // Handle redirection when user and profile become available
  useEffect(() => {
    if (user && !loading && !error) {
      console.log('OAuth callback: User available, triggering redirection');
      const url = new URL(window.location.href);
      const roleFromUrl = url.searchParams.get('role') as 'founder' | 'provider' | null;
      const userRole = user.user_metadata?.role || roleFromUrl;
      
      console.log('OAuth callback redirection - user role:', userRole);
      console.log('OAuth callback redirection - profile:', profile);
      
      setTimeout(() => {
        redirectAfterLogin(user, profile, userRole as 'founder' | 'provider');
      }, 1000);
    }
  }, [user, profile, loading, error]);

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
