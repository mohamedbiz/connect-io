
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmailMarketingDiagnostic from "@/components/dashboard/EmailMarketingDiagnostic";
import EmailListGrowthDiagnostic from "@/components/dashboard/EmailListGrowthDiagnostic";
import PostPurchaseDiagnostic from "@/components/dashboard/post-purchase/PostPurchaseDiagnostic";
import AbandonedCartRecovery from "@/components/dashboard/AbandonedCartRecovery";
import ProvidersDirectory from "@/components/providers/ProvidersDirectory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FounderDashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  // Protect this route - redirect if not authenticated or not a founder
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
      } else if (profile && profile.role !== "founder") {
        navigate("/");
      }
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <p className="text-center">Loading...</p>
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
            <TabsTrigger value="results">Results</TabsTrigger>
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
          
          <TabsContent value="results">
            <div className="text-center py-10">
              <p className="text-muted-foreground">Results tracking coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FounderDashboard;
