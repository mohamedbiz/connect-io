
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/contexts/AuthContext"
import Index from "./pages/Index"
import Login from "./pages/Login"
import RegisterPage from "./pages/register/RegisterPage"
import ForFoundersPage from "./pages/ForFoundersPage"
import ForProvidersPage from "./pages/ForProvidersPage"
import FounderDashboard from "./pages/FounderDashboard"
import ProviderDashboard from "./pages/ProviderDashboard"
import NotFound from "./pages/NotFound"
import AuthPage from "./pages/AuthPage"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

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
            <Route path="/for-founders" element={<ForFoundersPage />} />
            <Route path="/for-providers" element={<ForProvidersPage />} />
            <Route path="/founder-dashboard" element={<FounderDashboard />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
)

export default App
