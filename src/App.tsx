
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FounderDashboardPage from "./pages/founder/FounderDashboardPage";
import FounderOnboardingPage from "./pages/founder/FounderOnboardingPage";
import ProviderDashboardPage from "./pages/provider/ProviderDashboardPage";
import ProviderOnboardingPage from "./pages/provider/ProviderOnboardingPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        
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
    </QueryClientProvider>
  );
}

export default App;
