import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
            
            if (userData.user?.user_metadata?.role) {
              // Existing user with role - redirect to appropriate dashboard
              const role = userData.user.user_metadata.role;
              
              if (role === 'founder') {
                navigate('/founder-dashboard', { replace: true });
              } else if (role === 'provider') {
                navigate('/provider-dashboard', { replace: true });
              } else {
                navigate('/', { replace: true });
              }
            } else {
              // New user or no role - redirect to post-register
              navigate('/post-register', { 
                state: { isNewUser: true },
                replace: true 
              });
            }
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
