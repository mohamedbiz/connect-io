
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import AuthPage from "@/pages/AuthPage";
import IndexPage from "@/pages/IndexPage"; 
import ProviderApplicationPage from "@/pages/provider/ProviderApplicationPage";
import FounderApplicationPage from "@/pages/founder/FounderApplicationPage";
import FounderQualificationPage from "@/pages/FounderQualificationPage";
import FounderDashboardPage from "@/pages/founder/FounderDashboardPage";
import ProviderDashboardPage from "@/pages/provider/ProviderDashboardPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFoundPage from "@/pages/errors/NotFoundPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ForFoundersPage from "@/pages/ForFoundersPage";
import ForProvidersPage from "@/pages/ForProvidersPage";
import ProviderApplyRedirect from "@/pages/provider/ProviderApplyRedirect";
import PostRegisterPage from "@/pages/PostRegisterPage";
import { logAuth } from "@/utils/auth/auth-logger";

function App() {
  const { user, loading, profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Effect to handle redirects after authentication
  useEffect(() => {
    if (!loading && user && location.pathname === "/auth") {
      // If user is already logged in and on the auth page, redirect to appropriate dashboard
      const from = location.state?.from || "/";

      logAuth("User already authenticated on auth page, redirecting", { 
        from, 
        hasProfile: !!profile,
        role: profile?.role
      });
      
      if (profile) {
        // If profile exists, redirect based on role
        if (profile.role === "founder") {
          navigate("/founder-dashboard", { replace: true });
        } else if (profile.role === "provider") {
          navigate("/provider-dashboard", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        // If no profile yet, redirect to post-register page
        navigate("/post-register", { replace: true });
      }
    }
  }, [user, loading, profile, location.pathname, location.state, navigate]);

  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<IndexPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/for-founders" element={<ForFoundersPage />} />
        <Route path="/for-providers" element={<ForProvidersPage />} />
        
        {/* Redirect routes */}
        <Route path="/provider-apply" element={<ProviderApplyRedirect />} />
        
        {/* Onboarding routes */}
        <Route 
          path="/post-register" 
          element={
            <ProtectedRoute>
              <PostRegisterPage />
            </ProtectedRoute>
          }
        />
        
        {/* Protected routes */}
        <Route 
          path="/provider-application" 
          element={
            <ProtectedRoute>
              <ProviderApplicationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/founder-application" 
          element={
            <ProtectedRoute>
              <FounderApplicationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/founder-qualification" 
          element={
            <ProtectedRoute>
              <FounderQualificationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/founder-dashboard/*" 
          element={
            <ProtectedRoute redirectToQualification={true}>
              <FounderDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/provider-dashboard/*" 
          element={
            <ProtectedRoute>
              <ProviderDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
