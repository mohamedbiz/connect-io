
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
import FounderApplicationPage from "./pages/founder/FounderApplicationPage"
import ProviderApplicationPage from "./pages/provider/ProviderApplicationPage"
import ProviderApplicationsPage from "./pages/admin/ProviderApplicationsPage"
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage"
import PaymentCanceledPage from "./pages/payment/PaymentCanceledPage"
import PaymentsDashboardPage from "./pages/payment/PaymentsDashboardPage"
import FounderQualificationPage from "./pages/FounderQualificationPage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

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
  const { user, profile, loading, error, ensureProfile } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Preparing your account...");
  const [retryCount, setRetryCount] = useState(0);
  const [delayCompleted, setDelayCompleted] = useState(false);
  const [setupProgress, setSetupProgress] = useState(10);
  
  // Step 1: Add a safety delay to ensure auth state is stable
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayCompleted(true);
      setSetupProgress(30);
    }, 800); // Increased delay for better stability
    
    return () => clearTimeout(timer);
  }, []);

  // Step 2: Handle redirection with profile confirmation
  useEffect(() => {
    if (loading || !delayCompleted) return;
    
    const handleNavigation = async () => {
      if (isProcessing) return;
      setIsProcessing(true);
      
      try {
        if (!user) {
          console.log("No user found, redirecting to auth");
          navigate("/auth", { replace: true });
          return;
        }
        
        setSetupProgress(50);
        
        // Check if profile exists, if not, try to ensure it
        if (!profile && retryCount < 3) {
          setStatusMessage("Creating your profile...");
          console.log("Attempting to ensure profile exists...");
          
          try {
            const createdProfile = await ensureProfile();
            setSetupProgress(80);
            
            if (createdProfile) {
              console.log("Profile created successfully:", createdProfile);
              setSetupProgress(90);
              
              // Add a small delay after profile creation
              setTimeout(() => {
                if (createdProfile.role === "founder") {
                  setSetupProgress(100);
                  navigate("/founder-apply", { replace: true });
                } else if (createdProfile.role === "provider") {
                  setSetupProgress(100);
                  navigate("/provider-apply", { replace: true });
                }
              }, 500);
              
              return;
            } else {
              // Schedule a retry with exponential backoff
              setRetryCount(count => count + 1);
              setStatusMessage(`Retrying profile setup (${retryCount + 1}/3)...`);
              return;
            }
          } catch (err) {
            console.error("Error ensuring profile:", err);
            setStatusMessage("There was an issue setting up your profile. Redirecting...");
            
            // Still try to redirect based on user metadata as fallback
            setTimeout(() => {
              const role = user?.user_metadata?.role || "founder";
              if (role === "founder") {
                navigate("/founder-apply", { replace: true });
              } else {
                navigate("/provider-apply", { replace: true });
              }
            }, 1000);
            
            return;
          }
        }
        
        // Handle case where we have both user and profile
        if (user && profile) {
          console.log("User and profile available, redirecting based on role:", profile.role);
          setSetupProgress(100);
          
          if (profile.role === "founder") {
            navigate("/founder-apply", { replace: true });
          } else if (profile.role === "provider") {
            navigate("/provider-apply", { replace: true });
          }
          return;
        }
        
        // Fallback if we have user but no profile after retries
        if (user && !profile && retryCount >= 3) {
          console.log("Failed to get profile after retries, using fallback navigation");
          const role = user.user_metadata?.role || "founder";
          setSetupProgress(100);
          
          if (role === "founder") {
            navigate("/founder-apply", { replace: true });
          } else {
            navigate("/provider-apply", { replace: true });
          }
        }
      } finally {
        setIsProcessing(false);
      }
    };
    
    handleNavigation();
  }, [user, profile, loading, navigate, delayCompleted, retryCount, isProcessing, ensureProfile]);
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#2D82B7] mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-[#0A2342] mb-2">Setting Up Your Account</h2>
        <p className="text-[#0E3366] mb-4">{statusMessage}</p>
        
        <div className="w-full h-2 mb-4">
          <Progress value={setupProgress} className="w-full h-2" />
        </div>
        
        {retryCount > 0 && (
          <p className="text-sm text-[#0E3366]/70 mt-2">
            This is taking longer than expected. Please wait...
          </p>
        )}
        {error && (
          <p className="text-sm text-red-500 mt-2">
            {typeof error === 'string' ? error : "An error occurred during setup."}
          </p>
        )}
      </div>
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
            <Route path="/founder-apply" element={<FounderApplicationPage />} />
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
