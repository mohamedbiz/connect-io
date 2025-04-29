
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
  const { user, profile, loading, shouldRedirectToAcquisition } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Log states for debugging
  console.log("FounderDashboard:", { 
    user: !!user, 
    profile: profile?.role,
    loading,
    path: location.pathname,
    shouldRedirect: shouldRedirectToAcquisition(location.pathname)
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
      
      if (shouldRedirectToAcquisition(location.pathname)) {
        console.log("Founder needs to complete acquisition, redirecting");
        navigate("/client-acquisition");
        return;
      }
      
      console.log("Access check passed, showing founder dashboard");
    }
  }, [user, profile, loading, navigate, location.pathname, shouldRedirectToAcquisition]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-center text-lg">Loading your dashboard...</p>
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
            <p className="text-center text-lg">Please log in to access your dashboard</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Founder Dashboard</h1>
        
        <Tabs defaultValue="diagnostic" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="diagnostic">Email Diagnostic</TabsTrigger>
            <TabsTrigger value="cart-recovery">Cart Recovery</TabsTrigger>
            <TabsTrigger value="list-growth">List Growth</TabsTrigger>
            <TabsTrigger value="post-purchase">Post Purchase</TabsTrigger>
            <TabsTrigger value="providers">Find Providers</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
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
              <p className="text-muted-foreground">Project management coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FounderDashboard;
