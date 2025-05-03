
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EmailMarketingDiagnostic from "@/components/dashboard/EmailMarketingDiagnostic";
import EmailListGrowthDiagnostic from "@/components/dashboard/EmailListGrowthDiagnostic";
import PostPurchaseDiagnostic from "@/components/dashboard/post-purchase/PostPurchaseDiagnostic";
import AbandonedCartRecovery from "@/components/dashboard/AbandonedCartRecovery";
import ProvidersDirectory from "@/components/providers/ProvidersDirectory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchesList from "@/components/matches/MatchesList";
import { toast } from "sonner";
import ProvidersPaymentSection from "@/components/founder/ProvidersPaymentSection";
import PaymentAnalytics from "@/components/payment/PaymentAnalytics";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import ErrorFallback from "@/components/ErrorFallback";
import { useQualificationStatus } from "@/hooks/useQualificationStatus";
import QualificationBanner from "@/components/dashboard/QualificationBanner";

const FounderDashboard = () => {
  const { user, profile, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isQualified, isLoading: qualificationLoading } = useQualificationStatus();

  // Log states for debugging
  console.log("FounderDashboard:", { 
    user: !!user, 
    profile: profile?.role,
    loading,
    error: error || 'none',
    path: location.pathname,
    isQualified
  });

  // Protect this route - redirect if not authenticated or not a founder
  useEffect(() => {
    if (!loading) {
      console.log("Auth loading completed, checking access");
      
      if (!user) {
        console.log("No user found, redirecting to auth");
        navigate("/auth");
        return;
      } 
      
      if (profile && profile.role !== "founder") {
        console.log("User is not a founder, redirecting to home");
        toast.error("Access denied. This dashboard is for founders only.");
        navigate("/");
        return;
      }
      
      console.log("Access check passed, showing founder dashboard");
    }
  }, [user, profile, loading, navigate, location.pathname]);

  // Authentication error case
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <ErrorFallback 
            error={new Error(error)}
            message="There was a problem with authentication. Please try refreshing the page."
            resetErrorBoundary={() => window.location.reload()}
          />
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-center text-lg text-[#0E3366]">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !profile) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-center text-lg text-[#0E3366]">Please log in to access your dashboard</p>
            <Button 
              variant="default"
              onClick={() => navigate("/auth")}
              className="mt-4"
            >
              Go to Login
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0A2342]">Founder Dashboard</h1>
          <Button 
            className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
            onClick={() => navigate("/payments")}
          >
            <DollarSign className="h-4 w-4 mr-1" />
            Payments Dashboard
          </Button>
        </div>

        <QualificationBanner isQualified={isQualified} isLoading={qualificationLoading} />
        
        <Tabs defaultValue="diagnostic" className="w-full">
          <TabsList className="mb-6 bg-[#BFD7ED]/30">
            <TabsTrigger 
              value="diagnostic" 
              className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
            >
              Email Diagnostic
            </TabsTrigger>
            <TabsTrigger 
              value="cart-recovery"
              className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
            >
              Cart Recovery
            </TabsTrigger>
            <TabsTrigger 
              value="list-growth"
              className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
            >
              List Growth
            </TabsTrigger>
            <TabsTrigger 
              value="post-purchase"
              className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
            >
              Post Purchase
            </TabsTrigger>
            <TabsTrigger 
              value="providers"
              className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
            >
              Find Providers
            </TabsTrigger>
            <TabsTrigger 
              value="matches"
              className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
            >
              My Matches
            </TabsTrigger>
            <TabsTrigger 
              value="payments"
              className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
            >
              Payments
            </TabsTrigger>
            <TabsTrigger 
              value="projects"
              className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
            >
              Projects
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="diagnostic">
            <EmailMarketingDiagnostic />
          </TabsContent>

          <TabsContent value="cart-recovery">
            <AbandonedCartRecovery />
          </TabsContent>
          
          <TabsContent value="list-growth">
            <EmailListGrowthDiagnostic />
          </TabsContent>
          
          <TabsContent value="post-purchase">
            <PostPurchaseDiagnostic />
          </TabsContent>
          
          <TabsContent value="providers">
            <ProvidersDirectory />
          </TabsContent>
          
          <TabsContent value="matches">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">My Provider Matches</h2>
              <MatchesList />
            </div>
          </TabsContent>
          
          <TabsContent value="payments">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Payment Analytics</h2>
                <PaymentAnalytics />
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Quick Payment</h2>
                <p className="mb-4 text-[#0E3366]">
                  Make a payment to one of our featured providers:
                </p>
                <ProvidersPaymentSection />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="projects">
            <div className="text-center py-10">
              <p className="text-[#0E3366]">Project management coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FounderDashboard;
