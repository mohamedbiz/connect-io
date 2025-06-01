
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { WifiOff, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('founder' | 'provider' | 'admin')[];
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, allowedRoles = [], adminOnly = false }: ProtectedRouteProps) => {
  const { user, profile, loading, error } = useAuth();
  const location = useLocation();

  // Handle connection error
  if (error && error.includes('fetch')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Alert className="max-w-md">
          <WifiOff className="h-5 w-5" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            <p className="mb-4">
              We're having trouble connecting to our servers. Please check your internet connection.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Still loading - show loading spinner
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

  // Not authenticated - redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Admin only routes
  if (adminOnly && profile?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Role check if roles are specified
  if (allowedRoles.length > 0 && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }

  // Account status-based redirection logic
  if (profile) {
    const currentPath = location.pathname;

    // Founder status checks
    if (profile.role === 'founder') {
      // If founder hasn't completed onboarding and is trying to access dashboard
      if (!profile.onboarding_complete && currentPath.includes('/founder/dashboard')) {
        // Instead of redirecting to a separate onboarding page, we'll show onboarding within the dashboard
        // The dashboard will handle showing the onboarding flow
      }
    }

    // Provider status checks
    if (profile.role === 'provider') {
      // If provider hasn't been approved and is trying to access dashboard
      if (!profile.approved && currentPath.includes('/provider/dashboard')) {
        // The dashboard will handle showing the application status or application form
      }
    }
  }

  // User is authenticated and has necessary permissions
  return <>{children}</>;
};

export default ProtectedRoute;
