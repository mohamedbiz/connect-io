
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

  // Check status requirements and handle redirects based on role and status
  if (profile) {
    const currentPath = location.pathname;
    console.log('ProtectedRoute: Checking status requirements', { 
      role: profile.role, 
      status: profile.account_status, 
      currentPath,
      requiredStatus 
    });

    // Founder status checks
    if (profile.role === 'founder') {
      console.log('ProtectedRoute: Processing founder status checks');
      
      // If founder hasn't completed profile and is trying to access dashboard
      if (profile.account_status === 'pending_profile' && currentPath.includes('/founder/dashboard')) {
        console.log('ProtectedRoute: Founder needs to complete onboarding, redirecting from dashboard');
        return <Navigate to="/founder/onboarding" replace />;
      }
      
      // If founder completed profile but is trying to access onboarding
      if (profile.account_status === 'active' && currentPath.includes('/founder/onboarding')) {
        console.log('ProtectedRoute: Founder already completed onboarding, redirecting to dashboard');
        return <Navigate to="/founder/dashboard" replace />;
      }
    }

    // Provider status checks
    if (profile.role === 'provider') {
      console.log('ProtectedRoute: Processing provider status checks');
      
      // If provider hasn't completed initial profile setup
      if (profile.account_status === 'pending_profile' && currentPath.includes('/provider/dashboard')) {
        console.log('ProtectedRoute: Provider needs to complete initial onboarding, redirecting from dashboard');
        return <Navigate to="/provider/onboarding" replace />;
      }
      
      // If provider has submitted application or is active but trying to access onboarding
      if ((profile.account_status === 'pending_application' || profile.account_status === 'active') && currentPath.includes('/provider/onboarding')) {
        console.log('ProtectedRoute: Provider already completed onboarding, redirecting to dashboard');
        return <Navigate to="/provider/dashboard" replace />;
      }
    }

    // Status requirements check
    if (requiredStatus.length > 0 && !requiredStatus.includes(profile.account_status || '')) {
      console.log('ProtectedRoute: Status requirement not met', { 
        currentStatus: profile.account_status, 
        requiredStatus 
      });
      
      // Redirect based on role and status
      if (profile.role === 'founder') {
        if (profile.account_status === 'pending_profile') {
          console.log('ProtectedRoute: Redirecting founder to onboarding due to status requirement');
          return <Navigate to="/founder/onboarding" replace />;
        }
      } else if (profile.role === 'provider') {
        if (profile.account_status === 'pending_profile') {
          console.log('ProtectedRoute: Redirecting provider to onboarding due to status requirement');
          return <Navigate to="/provider/onboarding" replace />;
        }
      }
      
      console.log('ProtectedRoute: Redirecting to home due to unmet status requirements');
      return <Navigate to="/" replace />;
    }
  }

  console.log('ProtectedRoute: All checks passed, rendering protected content');
  // All checks passed, render the protected content
  return <>{children}</>;
};

// Public route that redirects authenticated users
export const PublicOnlyRoute = ({ children, redirectPath = '/' }: { children: React.ReactNode; redirectPath?: string }) => {
  const { isAuthenticated, loading, profile } = useAuth();

  // Show loading spinner while auth state is being determined
  if (loading) {
    console.log('PublicOnlyRoute: Loading auth state...');
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
    console.log('PublicOnlyRoute: User authenticated, determining redirect', { 
      role: profile.role, 
      status: profile.account_status 
    });
    
    if (profile.role === 'founder') {
      if (profile.account_status === 'pending_profile') {
        console.log('PublicOnlyRoute: Redirecting founder to onboarding');
        return <Navigate to="/founder/onboarding" replace />;
      } else if (profile.account_status === 'active') {
        console.log('PublicOnlyRoute: Redirecting founder to dashboard');
        return <Navigate to="/founder/dashboard" replace />;
      }
    } else if (profile.role === 'provider') {
      if (profile.account_status === 'pending_profile') {
        console.log('PublicOnlyRoute: Redirecting provider to onboarding');
        return <Navigate to="/provider/onboarding" replace />;
      } else if (profile.account_status === 'pending_application' || profile.account_status === 'active') {
        console.log('PublicOnlyRoute: Redirecting provider to dashboard');
        return <Navigate to="/provider/dashboard" replace />;
      }
    } else if (profile.role === 'admin') {
      console.log('PublicOnlyRoute: Redirecting admin to dashboard');
      return <Navigate to="/admin/dashboard" replace />;
    }
    
    // Default fallback if no specific route matches
    console.log('PublicOnlyRoute: Using default redirect path');
    return <Navigate to={redirectPath} replace />;
  }

  console.log('PublicOnlyRoute: User not authenticated, rendering public content');
  // Not authenticated, render the public content
  return <>{children}</>;
};

export default ProtectedRoute;
