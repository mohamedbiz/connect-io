
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthWithRole } from '@/hooks/useAuthWithRole';
import { Loader2 } from 'lucide-react';

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const { status, role, isOnboardingComplete, applicationStatus } = useAuthWithRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'authenticated' && role) {
      console.log('PublicOnlyRoute: User is authenticated, redirecting based on role and status', {
        role,
        applicationStatus,
        isOnboardingComplete
      });

      // Add a small delay to ensure auth state has fully propagated
      setTimeout(() => {
        // Provider-specific routing
        if (role === 'provider') {
          if (!applicationStatus) {
            console.log('PublicOnlyRoute: Provider needs to complete application');
            navigate('/provider-application', { replace: true });
          } else if (applicationStatus === 'submitted' || applicationStatus === 'in_review') {
            console.log('PublicOnlyRoute: Provider application submitted, showing status page');
            navigate('/provider-application-submitted', { replace: true });
          } else if (applicationStatus === 'rejected') {
            console.log('PublicOnlyRoute: Provider application rejected');
            navigate('/provider-application-rejected', { replace: true });
          } else if (applicationStatus === 'approved') {
            if (!isOnboardingComplete) {
              console.log('PublicOnlyRoute: Provider approved, needs onboarding');
              navigate('/provider/onboarding', { replace: true });
            } else {
              console.log('PublicOnlyRoute: Provider fully onboarded, redirecting to dashboard');
              navigate('/provider/dashboard', { replace: true });
            }
          }
          return;
        }

        // Founder routing
        if (role === 'founder') {
          if (!isOnboardingComplete) {
            console.log('PublicOnlyRoute: Founder needs onboarding');
            navigate('/founder/onboarding', { replace: true });
          } else {
            console.log('PublicOnlyRoute: Founder onboarded, redirecting to dashboard');
            navigate('/founder/dashboard', { replace: true });
          }
          return;
        }

        // Admin routing
        if (role === 'admin') {
          console.log('PublicOnlyRoute: Admin user, redirecting to dashboard');
          navigate('/admin/dashboard', { replace: true });
          return;
        }
      }, 100); // Small delay to ensure state consistency
    }
  }, [status, role, applicationStatus, isOnboardingComplete, navigate]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, they should be redirected (handled in useEffect)
  // Show loading while redirect happens
  if (status === 'authenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated, show the public content
  return <>{children}</>;
};

export default PublicOnlyRoute;
