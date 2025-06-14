
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('founder' | 'provider' | 'admin')[];
  requiredStatus?: string[];
}

const ProtectedRoute = ({ children, allowedRoles = [], requiredStatus = [] }: ProtectedRouteProps) => {
  const { user, profile, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading spinner while auth state is being determined
  if (loading) {
    console.log('ProtectedRoute: Loading auth state...');
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
      status: profile.account_status, 
      currentPath 
    });

    // Provider needs to complete application first
    if (profile.account_status === 'pending_profile' && !currentPath.includes('/provider-application')) {
      console.log('ProtectedRoute: Provider needs to complete application');
      return <Navigate to="/provider-application" replace />;
    }

    // Provider application submitted, redirect to onboarding
    if (profile.account_status === 'pending_application' && !currentPath.includes('/provider/onboarding')) {
      console.log('ProtectedRoute: Provider application submitted, redirect to onboarding');
      return <Navigate to="/provider/onboarding" replace />;
    }

    // Provider is active, can access dashboard
    if (profile.account_status === 'active' && currentPath.includes('/provider-application')) {
      console.log('ProtectedRoute: Provider is active, redirect to dashboard');
      return <Navigate to="/provider/dashboard" replace />;
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

  if (loading) {
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
      status: profile.account_status 
    });
    
    if (profile.role === 'provider') {
      if (profile.account_status === 'pending_profile') {
        return <Navigate to="/provider-application" replace />;
      } else if (profile.account_status === 'pending_application') {
        return <Navigate to="/provider/onboarding" replace />;
      } else if (profile.account_status === 'active') {
        return <Navigate to="/provider/dashboard" replace />;
      }
    } else if (profile.role === 'founder') {
      if (profile.account_status === 'pending_profile') {
        return <Navigate to="/founder/onboarding" replace />;
      } else if (profile.account_status === 'active') {
        return <Navigate to="/founder/dashboard" replace />;
      }
    } else if (profile.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
