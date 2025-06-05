
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
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // Check role requirements if specified
  if (allowedRoles.length > 0 && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }

  // Check status requirements and handle redirects based on role and status
  if (profile) {
    const currentPath = location.pathname;

    // Founder status checks
    if (profile.role === 'founder') {
      // If founder hasn't completed profile and is trying to access dashboard
      if (profile.account_status === 'pending_profile' && currentPath.includes('/founder/dashboard')) {
        return <Navigate to="/founder/onboarding" replace />;
      }
      // If founder completed profile but is trying to access onboarding
      if (profile.account_status === 'active' && currentPath.includes('/founder/onboarding')) {
        return <Navigate to="/founder/dashboard" replace />;
      }
    }

    // Provider status checks
    if (profile.role === 'provider') {
      // If provider hasn't submitted application and is trying to access dashboard
      if (profile.account_status === 'pending_application' && currentPath.includes('/provider/dashboard')) {
        return <Navigate to="/provider/onboarding" replace />;
      }
      // If provider is approved but trying to access onboarding
      if (profile.account_status === 'active' && currentPath.includes('/provider/onboarding')) {
        return <Navigate to="/provider/dashboard" replace />;
      }
    }

    // Status requirements check
    if (requiredStatus.length > 0 && !requiredStatus.includes(profile.account_status || '')) {
      // Redirect based on role and status
      if (profile.role === 'founder') {
        if (profile.account_status === 'pending_profile') {
          return <Navigate to="/founder/onboarding" replace />;
        }
      } else if (profile.role === 'provider') {
        if (profile.account_status === 'pending_application') {
          return <Navigate to="/provider/onboarding" replace />;
        }
      }
      
      return <Navigate to="/" replace />;
    }
  }

  // All checks passed, render the protected content
  return <>{children}</>;
};

// Public route that redirects authenticated users
export const PublicOnlyRoute = ({ children, redirectPath = '/' }: { children: React.ReactNode; redirectPath?: string }) => {
  const { isAuthenticated, loading, profile } = useAuth();

  // Show loading spinner while auth state is being determined
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

  // Redirect authenticated users based on their role and status
  if (isAuthenticated && profile) {
    if (profile.role === 'founder') {
      if (profile.account_status === 'pending_profile') {
        return <Navigate to="/founder/onboarding" replace />;
      } else if (profile.account_status === 'active') {
        return <Navigate to="/founder/dashboard" replace />;
      }
    } else if (profile.role === 'provider') {
      if (profile.account_status === 'pending_application') {
        return <Navigate to="/provider/onboarding" replace />;
      } else if (profile.account_status === 'active') {
        return <Navigate to="/provider/dashboard" replace />;
      }
    } else if (profile.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    
    // Default fallback if no specific route matches
    return <Navigate to={redirectPath} replace />;
  }

  // Not authenticated, render the public content
  return <>{children}</>;
};

export default ProtectedRoute;
