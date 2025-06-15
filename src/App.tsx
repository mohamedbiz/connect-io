
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/home/HomePage";
import AuthCallback from "./pages/AuthCallback";
import FounderSignInPage from "./pages/auth/FounderSignInPage";
import ProviderSignInPage from "./pages/auth/ProviderSignInPage";
import FounderDashboardPage from "./pages/founder/FounderDashboardPage";
import FounderOnboardingPage from "./pages/founder/FounderOnboardingPage";
import ProviderDashboardPage from "./pages/provider/ProviderDashboardPage";
import ProviderOnboardingPage from "./pages/provider/ProviderOnboardingPage";
import ProviderSignupPage from "./pages/provider/ProviderSignupPage";
import ProviderApplicationPage from "./pages/provider/ProviderApplicationPage";
import ProviderApplicationSubmittedPage from "./pages/provider/ApplicationSubmittedPage";
import ProviderApplicationApprovedPage from "./pages/provider/ApplicationApprovedPage";
import ProviderApplicationRejectedPage from "./pages/provider/ApplicationRejectedPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import ForFoundersPage from "./pages/ForFoundersPage";
import ForProvidersPage from "./pages/ForProvidersPage";
import ProtectedRoute, { PublicOnlyRoute } from "./components/auth/ProtectedRoute";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/for-founders" element={<ForFoundersPage />} />
          <Route path="/for-providers" element={<ForProvidersPage />} />
          
          {/* Dedicated sign-in pages */}
          <Route path="/founder/signin" element={
            <PublicOnlyRoute>
              <FounderSignInPage />
            </PublicOnlyRoute>
          } />
          <Route path="/provider/signin" element={
            <PublicOnlyRoute>
              <ProviderSignInPage />
            </PublicOnlyRoute>
          } />
          
          <Route path="/auth-callback" element={<AuthCallback />} />
          
          {/* Provider public routes */}
          <Route path="/provider-signup" element={
            <PublicOnlyRoute>
              <ProviderSignupPage />
            </PublicOnlyRoute>
          } />
          
          {/* Provider application routes - requires authentication */}
          <Route path="/provider-application" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderApplicationPage />
            </ProtectedRoute>
          } />
          <Route path="/provider-application-submitted" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderApplicationSubmittedPage />
            </ProtectedRoute>
          } />
          <Route path="/provider-application-approved" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderApplicationApprovedPage />
            </ProtectedRoute>
          } />
          <Route path="/provider-application-rejected" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderApplicationRejectedPage />
            </ProtectedRoute>
          } />
          
          {/* Founder routes */}
          <Route path="/founder/onboarding" element={
            <ProtectedRoute allowedRoles={['founder']}>
              <FounderOnboardingPage />
            </ProtectedRoute>
          } />
          <Route path="/founder/dashboard" element={
            <ProtectedRoute allowedRoles={['founder']}>
              <FounderDashboardPage />
            </ProtectedRoute>
          } />
          
          {/* Provider routes */}
          <Route path="/provider/onboarding" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderOnboardingPage />
            </ProtectedRoute>
          } />
          <Route path="/provider/dashboard" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderDashboardPage />
            </ProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
        <SonnerToaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
