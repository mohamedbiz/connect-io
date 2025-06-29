
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuthWithRole } from '@/hooks/useAuthWithRole';
import { Loader2 } from 'lucide-react';

interface EnhancedProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('founder' | 'provider' | 'admin')[];
  requireOnboarding?: boolean;
  fallbackPath?: string;
}

const AuthLoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const UnauthorizedScreen = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
      <Navigate to="/" replace />
    </div>
  </div>
);

const OnboardingRedirectScreen = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const path = role === 'provider' ? '/provider/onboarding' : '/founder/onboarding';
    navigate(path, { replace: true });
  }, [role, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Redirecting to onboarding...</p>
      </div>
    </div>
  );
};

export const EnhancedProtectedRoute: React.FC<EnhancedProtectedRouteProps> = ({
  children,
  allowedRoles,
  requireOnboarding = false,
  fallbackPath
}) => {
  const { user, role, status, isOnboardingComplete, applicationStatus } = useAuthWithRole();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (status === 'loading') return;

    // Not authenticated - redirect to appropriate sign-in
    if (status === 'unauthenticated') {
      if (allowedRoles.includes('provider')) {
        navigate('/provider/signin', { 
          state: { from: location.pathname },
          replace: true 
        });
      } else if (allowedRoles.includes('founder')) {
        navigate('/founder/signin', { 
          state: { from: location.pathname },
          replace: true 
        });
      } else {
        navigate('/', { replace: true });
      }
      return;
    }

    // Role not allowed - redirect to appropriate dashboard
    if (role && !allowedRoles.includes(role)) {
      const redirectPath = getRoleBasedPath(role);
      navigate(redirectPath, { replace: true });
      return;
    }

    // Provider-specific routing logic
    if (role === 'provider') {
      const currentPath = location.pathname;
      
      // Handle provider application flow
      if (applicationStatus === 'submitted' || applicationStatus === 'in_review') {
        if (!currentPath.includes('/provider-application-submitted')) {
          navigate('/provider-application-submitted', { replace: true });
          return;
        }
      } else if (applicationStatus === 'approved') {
        if (!isOnboardingComplete && !currentPath.includes('/provider/onboarding')) {
          navigate('/provider/onboarding', { replace: true });
          return;
        }
      } else if (applicationStatus === 'rejected') {
        if (!currentPath.includes('/provider-application-rejected')) {
          navigate('/provider-application-rejected', { replace: true });
          return;
        }
      } else if (!applicationStatus && !currentPath.includes('/provider-application')) {
        navigate('/provider-application', { replace: true });
        return;
      }
    }

    // Onboarding required but not complete
    if (requireOnboarding && !isOnboardingComplete && role) {
      const onboardingPath = getOnboardingPath(role);
      if (!location.pathname.includes(onboardingPath)) {
        navigate(onboardingPath, { replace: true });
        return;
      }
    }

    // Custom fallback
    if (fallbackPath && (!role || !allowedRoles.includes(role))) {
      navigate(fallbackPath, { replace: true });
    }
  }, [status, role, isOnboardingComplete, applicationStatus, navigate, location, allowedRoles, requireOnboarding, fallbackPath]);

  if (status === 'loading') {
    return <AuthLoadingScreen />;
  }

  if (status === 'unauthenticated' || !role || !allowedRoles.includes(role)) {
    return <UnauthorizedScreen />;
  }

  if (requireOnboarding && !isOnboardingComplete && role) {
    return <OnboardingRedirectScreen role={role} />;
  }

  return <>{children}</>;
};

// Helper functions
const getRoleBasedPath = (role: string): string => {
  switch (role) {
    case 'founder': return '/founder/dashboard';
    case 'provider': return '/provider/dashboard';
    case 'admin': return '/admin/dashboard';
    default: return '/';
  }
};

const getOnboardingPath = (role: string): string => {
  switch (role) {
    case 'founder': return '/founder/onboarding';
    case 'provider': return '/provider/onboarding';
    default: return '/';
  }
};

export default EnhancedProtectedRoute;
