
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
import RoleSelectionStep from "./components/auth/RoleSelectionStep";
import EnhancedProtectedRoute from "./components/auth/EnhancedProtectedRoute";
import DashboardRedirect from "./components/auth/DashboardRedirect";
import PublicOnlyRoute from "./components/auth/PublicOnlyRoute";

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
          <Route path="/get-started" element={
            <PublicOnlyRoute>
              <RoleSelectionStep />
            </PublicOnlyRoute>
          } />
          
          {/* Smart dashboard redirect */}
          <Route path="/dashboard" element={<DashboardRedirect />} />
          
          {/* Dedicated sign-in pages wrapped with PublicOnlyRoute */}
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
            <EnhancedProtectedRoute allowedRoles={['provider']} requireOnboarding={false}>
              <ProviderApplicationPage />
            </EnhancedProtectedRoute>
          } />
          <Route path="/provider-application-submitted" element={
            <EnhancedProtectedRoute allowedRoles={['provider']} requireOnboarding={false}>
              <ProviderApplicationSubmittedPage />
            </EnhancedProtectedRoute>
          } />
          <Route path="/provider-application-approved" element={
            <EnhancedProtectedRoute allowedRoles={['provider']} requireOnboarding={false}>
              <ProviderApplicationApprovedPage />
            </EnhancedProtectedRoute>
          } />
          <Route path="/provider-application-rejected" element={
            <EnhancedProtectedRoute allowedRoles={['provider']} requireOnboarding={false}>
              <ProviderApplicationRejectedPage />
            </EnhancedProtectedRoute>
          } />
          
          {/* Founder routes */}
          <Route path="/founder/onboarding" element={
            <EnhancedProtectedRoute allowedRoles={['founder']} requireOnboarding={false}>
              <FounderOnboardingPage />
            </EnhancedProtectedRoute>
          } />
          <Route path="/founder/dashboard" element={
            <EnhancedProtectedRoute allowedRoles={['founder']} requireOnboarding={true}>
              <FounderDashboardPage />
            </EnhancedProtectedRoute>
          } />
          
          {/* Provider routes */}
          <Route path="/provider/onboarding" element={
            <EnhancedProtectedRoute allowedRoles={['provider']} requireOnboarding={false}>
              <ProviderOnboardingPage />
            </EnhancedProtectedRoute>
          } />
          <Route path="/provider/dashboard" element={
            <EnhancedProtectedRoute allowedRoles={['provider']} requireOnboarding={true}>
              <ProviderDashboardPage />
            </EnhancedProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={
            <EnhancedProtectedRoute allowedRoles={['admin']}>
              <AdminDashboardPage />
            </EnhancedProtectedRoute>
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
