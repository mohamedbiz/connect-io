
import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { isProtectedRoute } from "@/utils/redirect-utils";
import { logAuth } from "@/utils/auth/auth-logger";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean; // If true, redirects to login when not authenticated
  redirectToQualification?: boolean; // If true, checks qualification status for founders
  adminOnly?: boolean; // If true, only allows admin users
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  redirectToQualification = true,
  adminOnly = false
}: ProtectedRouteProps) => {
  const { user, loading, profile, shouldRedirectToQualification } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // Only check for qualification redirect if explicitly enabled, user is logged in, and the route requires auth
    if (
      redirectToQualification &&
      !loading && 
      user && 
      profile?.role === "founder" &&
      isProtectedRoute(currentPath)
    ) {
      try {
        const shouldRedirect = shouldRedirectToQualification(currentPath);
        
        if (shouldRedirect) {
          logAuth("Redirecting to qualification from protected route", { path: currentPath });
          navigate("/founder-qualification", { 
            state: { from: currentPath },
            replace: true
          });
        }
      } catch (error) {
        logAuth("Error in qualification redirect check", error, "error");
        // Continue rendering children even if redirect check fails
      }
    }
  }, [
    redirectToQualification, 
    loading, 
    user, 
    profile, 
    currentPath, 
    shouldRedirectToQualification, 
    navigate
  ]);

  // Check if user is an admin when adminOnly is true
  const isAdmin = profile?.role === "admin";
  if (adminOnly && !loading && !isAdmin) {
    logAuth("Non-admin attempted to access admin-only route", { path: currentPath });
    return <Navigate to="/" replace />;
  }

  // Still loading - return the children
  if (loading) {
    return <>{children}</>;
  }

  // Not authenticated but auth is required - redirect to login
  if (!user && requireAuth) {
    logAuth("Protected route accessed without authentication", { path: currentPath });
    
    // Navigate to login, passing the current location to redirect back after login
    return (
      <Navigate 
        to="/auth" 
        state={{ from: currentPath }} 
        replace 
      />
    );
  }

  // User is authenticated or route doesn't require auth - render children
  return <>{children}</>;
};

export default ProtectedRoute;
