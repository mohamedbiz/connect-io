
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuthWithRole } from '@/hooks/useAuthWithRole';
import { Loader2 } from 'lucide-react';

interface RouteGuardProps {
  children: React.ReactNode;
  type: 'public-only' | 'protected' | 'dashboard-redirect';
  allowedRoles?: ('founder' | 'provider' | 'admin')[];
  requireOnboarding?: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  type,
  allowedRoles = [],
  requireOnboarding = false
}) => {
  const { user, role, status, isOnboardingComplete, applicationStatus } = useAuthWithRole();
  const navigate = useNavigate();
  const location = useLocation();
  const [timeoutReached, setTimeoutReached] = useState(false);

  // Add timeout fallback for loading states
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeoutReached(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  // Handle dashboard redirect logic
  useEffect(() => {
    if (type === 'dashboard-redirect' && status !== 'loading' && !timeoutReached) {
      if (status === 'unauthenticated') {
        navigate('/');
        return;
      }

      if (!role) {
        navigate('/');
        return;
      }

      // Provider-specific routing
      if (role === 'provider') {
        if (!applicationStatus) {
          navigate('/provider/application-questions');
          return;
        }
        
        if (applicationStatus === 'submitted' || applicationStatus === 'in_review') {
          navigate('/provider/application/submitted');
          return;
        }
        
        if (applicationStatus === 'rejected') {
          navigate('/provider/application/rejected');
          return;
        }
        
        if (applicationStatus === 'approved') {
          if (!isOnboardingComplete) {
            navigate('/provider/application-questions');
            return;
          }
          navigate('/provider/dashboard');
          return;
        }
      }

      // Founder routing
      if (role === 'founder') {
        if (!isOnboardingComplete) {
          navigate('/founder/profile-completion');
          return;
        }
        navigate('/founder/dashboard');
        return;
      }

      // Admin routing
      if (role === 'admin') {
        navigate('/admin/dashboard');
        return;
      }

      // Fallback
      navigate('/');
    }
  }, [status, role, applicationStatus, isOnboardingComplete, navigate, type, timeoutReached]);

  // Handle protected routes
  useEffect(() => {
    if (type === 'protected' && status !== 'loading' && !timeoutReached) {
      if (status === 'unauthenticated') {
        // Redirect to homepage instead of auth pages
        navigate('/', { state: { from: location.pathname } });
        return;
      }

      if (role && !allowedRoles.includes(role)) {
        const redirectPath = role === 'founder' ? '/founder/dashboard' : 
                            role === 'provider' ? '/provider/dashboard' : 
                            role === 'admin' ? '/admin/dashboard' : '/';
        navigate(redirectPath, { replace: true });
        return;
      }

      // Provider-specific routing logic
      if (role === 'provider') {
        const currentPath = location.pathname;
        
        if (applicationStatus === 'submitted' || applicationStatus === 'in_review') {
          if (!currentPath.includes('/provider/application/submitted')) {
            navigate('/provider/application/submitted');
            return;
          }
        } else if (applicationStatus === 'approved') {
          if (!isOnboardingComplete && !currentPath.includes('/provider/application-questions')) {
            navigate('/provider/application-questions');
            return;
          }
        } else if (applicationStatus === 'rejected') {
          if (!currentPath.includes('/provider/application/rejected')) {
            navigate('/provider/application/rejected');
            return;
          }
        } else if (!applicationStatus && !currentPath.includes('/provider/application-questions')) {
          navigate('/provider/application-questions');
          return;
        }
      }

      // Founder routing - redirect to profile completion if needed
      if (role === 'founder' && !isOnboardingComplete && !location.pathname.includes('/founder/profile-completion')) {
        navigate('/founder/profile-completion');
        return;
      }

      // Onboarding requirements for dashboards
      if (requireOnboarding && !isOnboardingComplete && role) {
        const completionPath = role === 'founder' ? '/founder/profile-completion' : '/provider/application-questions';
        if (!location.pathname.includes(completionPath)) {
          navigate(completionPath);
          return;
        }
      }
    }
  }, [status, role, isOnboardingComplete, applicationStatus, navigate, location, allowedRoles, requireOnboarding, type, timeoutReached]);

  // Loading state
  if ((status === 'loading' && !timeoutReached) || (type === 'dashboard-redirect' && status !== 'loading')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            {type === 'dashboard-redirect' ? 'Redirecting...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // For dashboard redirect, don't render children - always redirect
  if (type === 'dashboard-redirect') {
    return null;
  }

  // For protected routes, only show if authenticated and authorized
  if (type === 'protected') {
    if (status === 'unauthenticated' || (role && !allowedRoles.includes(role))) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default RouteGuard;
