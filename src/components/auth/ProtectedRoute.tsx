
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProviderApplications } from '@/hooks/useProviderApplications';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('founder' | 'provider' | 'admin')[];
  requiredStatus?: string[];
}

const ProtectedRoute = ({ children, allowedRoles = [], requiredStatus = [] }: ProtectedRouteProps) => {
  const { user, profile, loading, isAuthenticated } = useAuth();
  const { myApplication, isLoadingMyApplication } = useProviderApplications();
  const location = useLocation();

  // Show loading spinner while auth state is being determined
  if (loading || (profile?.role === 'provider' && isLoadingMyApplication)) {
    console.log('ProtectedRoute: Loading auth/application state...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('ProtectedRoute: User not authenticated, redirecting to auth');
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // Check role requirements if specified
  if (allowedRoles.length > 0 && profile && !allowedRoles.includes(profile.role)) {
    console.log('ProtectedRoute: User role not allowed', { userRole: profile.role, allowedRoles });
    return <Navigate to="/" replace />;
  }

  // Handle provider flow redirections
  if (profile?.role === 'provider') {
    const currentPath = location.pathname;
    console.log('ProtectedRoute: Processing provider flow', { 
      accountStatus: profile.account_status,
      applicationStatus: myApplication?.status,
      hasApplication: !!myApplication,
      currentPath 
    });

    // Provider needs to complete application first
    if (!myApplication && !currentPath.includes('/provider-application')) {
      console.log('ProtectedRoute: Provider has no application, redirecting to application page');
      return <Navigate to="/provider-application" replace />;
    }

    // Provider application submitted - route based on status
    if (myApplication) {
      console.log('ProtectedRoute: Provider has application', { status: myApplication.status });
      
      switch (myApplication.status) {
        case 'submitted':
        case 'in_review':
          if (!currentPath.includes('/provider-application-submitted')) {
            console.log('ProtectedRoute: Application in review, redirecting to submitted page');
            return <Navigate to="/provider-application-submitted" replace />;
          }
          break;
          
        case 'approved':
          // If approved but onboarding not complete
          if (profile.account_status === 'pending_application' && !currentPath.includes('/provider/onboarding')) {
            console.log('ProtectedRoute: Application approved, redirecting to onboarding');
            return <Navigate to="/provider/onboarding" replace />;
          }
          // If onboarding complete, allow dashboard access
          if (profile.account_status === 'active' && currentPath.includes('/provider-application')) {
            console.log('ProtectedRoute: Provider active, redirecting to dashboard');
            return <Navigate to="/provider/dashboard" replace />;
          }
          break;
          
        case 'rejected':
          if (!currentPath.includes('/provider-application-rejected')) {
            console.log('ProtectedRoute: Application rejected, redirecting to rejected page');
            return <Navigate to="/provider-application-rejected" replace />;
          }
          break;
      }
    }
  }

  // Handle founder flow redirections
  if (profile?.role === 'founder') {
    const currentPath = location.pathname;
    console.log('ProtectedRoute: Processing founder flow', { 
      status: profile.account_status, 
      currentPath 
    });

    // Founder needs to complete onboarding
    if (profile.account_status === 'pending_profile' && !currentPath.includes('/founder/onboarding')) {
      console.log('ProtectedRoute: Founder needs to complete onboarding');
      return <Navigate to="/founder/onboarding" replace />;
    }

    // Founder completed onboarding, redirect to dashboard
    if (profile.account_status === 'active' && currentPath.includes('/founder/onboarding')) {
      console.log('ProtectedRoute: Founder completed onboarding, redirect to dashboard');
      return <Navigate to="/founder/dashboard" replace />;
    }
  }

  console.log('ProtectedRoute: All checks passed, rendering protected content');
  return <>{children}</>;
};

// Public route that redirects authenticated users based on their status
export const PublicOnlyRoute = ({ children, redirectPath = '/' }: { children: React.ReactNode; redirectPath?: string }) => {
  const { isAuthenticated, loading, profile } = useAuth();
  const { myApplication, isLoadingMyApplication } = useProviderApplications();

  // Show loading while determining auth state and application status
  if (loading || (profile?.role === 'provider' && isLoadingMyApplication)) {
    console.log('PublicOnlyRoute: Loading auth/application state...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect authenticated users to appropriate flow
  if (isAuthenticated && profile) {
    console.log('PublicOnlyRoute: User authenticated, determining redirect', { 
      role: profile.role, 
      accountStatus: profile.account_status,
      applicationStatus: myApplication?.status,
      hasApplication: !!myApplication
    });
    
    if (profile.role === 'provider') {
      // No application yet
      if (!myApplication) {
        console.log('PublicOnlyRoute: Provider has no application, redirecting to application page');
        return <Navigate to="/provider-application" replace />;
      }
      
      // Route based on application status
      switch (myApplication.status) {
        case 'submitted':
        case 'in_review':
          console.log('PublicOnlyRoute: Application in review, redirecting to submitted page');
          return <Navigate to="/provider-application-submitted" replace />;
        case 'approved':
          if (profile.account_status === 'pending_application') {
            console.log('PublicOnlyRoute: Application approved, redirecting to onboarding');
            return <Navigate to="/provider/onboarding" replace />;
          } else {
            console.log('PublicOnlyRoute: Provider active, redirecting to dashboard');
            return <Navigate to="/provider/dashboard" replace />;
          }
        case 'rejected':
          console.log('PublicOnlyRoute: Application rejected, redirecting to rejected page');
          return <Navigate to="/provider-application-rejected" replace />;
        default:
          console.log('PublicOnlyRoute: Unknown application status, redirecting to application page');
          return <Navigate to="/provider-application" replace />;
      }
    } else if (profile.role === 'founder') {
      if (profile.account_status === 'pending_profile') {
        console.log('PublicOnlyRoute: Founder needs onboarding, redirecting to onboarding');
        return <Navigate to="/founder/onboarding" replace />;
      } else if (profile.account_status === 'active') {
        console.log('PublicOnlyRoute: Founder active, redirecting to dashboard');
        return <Navigate to="/founder/dashboard" replace />;
      }
    } else if (profile.role === 'admin') {
      console.log('PublicOnlyRoute: Admin user, redirecting to admin dashboard');
      return <Navigate to="/admin/dashboard" replace />;
    }
    
    console.log('PublicOnlyRoute: Fallback redirect to:', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  console.log('PublicOnlyRoute: User not authenticated, showing public content');
  return <>{children}</>;
};

export default ProtectedRoute;
