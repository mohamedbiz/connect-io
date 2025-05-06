
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "@/contexts/AuthProvider"
import { useAuth } from "@/contexts/AuthContext"
import Index from "./pages/Index"
import ForFoundersPage from "./pages/ForFoundersPage"
import ForProvidersPage from "./pages/ForProvidersPage"
import FounderDashboard from "./pages/FounderDashboard"
import ProviderDashboard from "./pages/ProviderDashboard"
import NotFound from "./pages/NotFound"
import AuthPage from "./pages/AuthPage"
import ProviderApplicationPage from "./pages/provider/ProviderApplicationPage"
import ProviderApplicationsPage from "./pages/admin/ProviderApplicationsPage"
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage"
import PaymentCanceledPage from "./pages/payment/PaymentCanceledPage"
import PaymentsDashboardPage from "./pages/payment/PaymentsDashboardPage"
import FounderQualificationPage from "./pages/FounderQualificationPage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// Helper component for post-registration navigation
const PostRegisterNavigator = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    
    if (user && profile?.role === "founder") {
      // New user, direct them to qualification
      navigate("/founder-qualification?new=true", { replace: true });
    } else if (user && profile?.role === "provider") {
      navigate("/provider-dashboard", { replace: true });
    } else if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user, profile, loading, navigate]);
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse">Redirecting...</div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/post-register" element={<PostRegisterNavigator />} />
            <Route path="/for-founders" element={<ForFoundersPage />} />
            <Route path="/for-providers" element={<ForProvidersPage />} />
            <Route path="/founder-dashboard" element={<FounderDashboard />} />
            <Route path="/founder-qualification" element={<FounderQualificationPage />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/provider-apply" element={<ProviderApplicationPage />} />
            <Route path="/admin/provider-applications" element={<ProviderApplicationsPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-canceled" element={<PaymentCanceledPage />} />
            <Route path="/payments" element={<PaymentsDashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
)

export default App
