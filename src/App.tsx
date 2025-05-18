
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthProvider";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import HomePage from "./pages/home/HomePage";
import FounderApplicationPage from "./pages/founder/FounderApplicationPage";
import FounderDashboardPage from "./pages/founder/FounderDashboardPage";
import ProviderApplicationPage from "./pages/provider/ProviderApplicationPage";
import ProviderDashboardPage from "./pages/provider/ProviderDashboardPage";
import ForFoundersPage from "./pages/ForFoundersPage";
import ForProvidersPage from "./pages/ForProvidersPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import AuthPage from "./pages/auth/AuthPage"; // Using the correct auth page
import ProviderApplyRedirect from "./pages/provider/ProviderApplyRedirect";
import PostRegisterPage from "./pages/PostRegisterPage";
import FounderQualificationPage from "./pages/FounderQualificationPage";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";
import PaymentCanceledPage from "./pages/payment/PaymentCanceledPage";
import PaymentsDashboardPage from "./pages/payment/PaymentsDashboardPage";
import ProviderApplicationsPage from "./pages/admin/ProviderApplicationsPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/for-founders" element={<ForFoundersPage />} />
            <Route path="/for-providers" element={<ForProvidersPage />} />
            <Route path="/post-register" element={<PostRegisterPage />} />
            <Route path="/apply" element={<ProviderApplyRedirect />} />
            <Route path="/founder-application" element={<FounderApplicationPage />} />
            <Route path="/provider-application" element={<ProviderApplicationPage />} />
            <Route path="/founder-qualification" element={<FounderQualificationPage />} />
            
            {/* Protected routes */}
            <Route path="/founder-dashboard" element={
              <ProtectedRoute>
                <FounderDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/provider-dashboard" element={
              <ProtectedRoute>
                <ProviderDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/payments" element={
              <ProtectedRoute>
                <PaymentsDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-canceled" element={<PaymentCanceledPage />} />
            
            {/* Admin routes */}
            <Route path="/admin/provider-applications" element={
              <ProtectedRoute adminOnly>
                <ProviderApplicationsPage />
              </ProtectedRoute>
            } />
            
            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
          <SonnerToaster position="top-right" />
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
