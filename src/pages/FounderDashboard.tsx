
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
import { toast } from "sonner";

const FounderDashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Log states for debugging
  console.log("FounderDashboard:", { 
    user: !!user, 
    profile: profile?.role,
    loading,
    path: location.pathname
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
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-[#0A2342]">Founder Dashboard</h1>
        
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
