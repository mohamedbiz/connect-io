
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuthNavigation } from "./hooks/useAuthNavigation";
import HomePage from "./pages/home/HomePage";
import AuthCallback from "./pages/AuthCallback";
import FounderDashboardPage from "./pages/founder/FounderDashboardPage";
import ProviderDashboardPage from "./pages/provider/ProviderDashboardPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import ForFoundersPage from "./pages/ForFoundersPage";
import ForProvidersPage from "./pages/ForProvidersPage";
import ProfilePage from "./pages/ProfilePage";
import ProviderDirectoryPage from "./pages/ProviderDirectoryPage";
import QuickRegistrationPage from "./pages/QuickRegistrationPage";
import FounderProfileCompletionPage from "./pages/founder/FounderProfileCompletionPage";
import ProviderApplicationQuestionsPage from "./pages/provider/ProviderApplicationQuestionsPage";
import RouteGuard from "./components/auth/RouteGuard";

// App content component that uses the auth navigation hook
const AppContent = () => {
  useAuthNavigation(); // This will handle all automatic navigation based on auth state
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/for-founders" element={<ForFoundersPage />} />
      <Route path="/for-providers" element={<ForProvidersPage />} />
      
      {/* Smart dashboard redirect */}
      <Route path="/dashboard" element={
        <RouteGuard type="dashboard-redirect">
          <div />
        </RouteGuard>
      } />
      
      <Route path="/auth-callback" element={<AuthCallback />} />
      
      {/* Quick Registration Flow */}
      <Route path="/quick-register/:userType" element={<QuickRegistrationPage />} />
      
      {/* Profile completion flows */}
      <Route path="/founder/profile-completion" element={
        <RouteGuard type="protected" allowedRoles={['founder']}>
          <FounderProfileCompletionPage />
        </RouteGuard>
      } />
      
      <Route path="/provider/application-questions" element={
        <RouteGuard type="protected" allowedRoles={['provider']}>
          <ProviderApplicationQuestionsPage />
        </RouteGuard>
      } />

      {/* Profile and directory pages */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/providers" element={<ProviderDirectoryPage />} />
      
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
  );
};

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
        <Toaster />
        <SonnerToaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
