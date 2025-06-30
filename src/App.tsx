
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/home/HomePage";
import AuthCallback from "./pages/AuthCallback";
import FounderAuthPage from "./pages/auth/FounderAuthPage";
import ProviderAuthPage from "./pages/auth/ProviderAuthPage";
import FounderDashboardPage from "./pages/founder/FounderDashboardPage";
import ProviderDashboardPage from "./pages/provider/ProviderDashboardPage";
import ProviderApplicationStatusPage from "./pages/provider/ProviderApplicationStatusPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import RouteGuard from "./components/auth/RouteGuard";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Smart dashboard redirect */}
          <Route path="/dashboard" element={
            <RouteGuard type="dashboard-redirect">
              <div />
            </RouteGuard>
          } />
          
          {/* Unified auth pages */}
          <Route path="/auth/founder" element={
            <RouteGuard type="public-only">
              <FounderAuthPage />
            </RouteGuard>
          } />
          <Route path="/auth/provider" element={
            <RouteGuard type="public-only">
              <ProviderAuthPage />
            </RouteGuard>
          } />
          
          <Route path="/auth-callback" element={<AuthCallback />} />
          
          {/* Dynamic provider application routes */}
          <Route path="/provider/application/:status?" element={
            <RouteGuard type="protected" allowedRoles={['provider']}>
              <ProviderApplicationStatusPage />
            </RouteGuard>
          } />
          
          {/* Dynamic onboarding routes */}
          <Route path="/onboarding/:role" element={
            <RouteGuard type="protected" allowedRoles={['founder', 'provider']}>
              <OnboardingPage />
            </RouteGuard>
          } />
          
          {/* Dashboard routes */}
          <Route path="/founder/dashboard" element={
            <RouteGuard type="protected" allowedRoles={['founder']} requireOnboarding={true}>
              <FounderDashboardPage />
            </RouteGuard>
          } />
          
          <Route path="/provider/dashboard" element={
            <RouteGuard type="protected" allowedRoles={['provider']} requireOnboarding={true}>
              <ProviderDashboardPage />
            </RouteGuard>
          } />
          
          <Route path="/admin/dashboard" element={
            <RouteGuard type="protected" allowedRoles={['admin']}>
              <AdminDashboardPage />
            </RouteGuard>
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
