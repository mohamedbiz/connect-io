
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProviderApplications } from "@/hooks/useProviderApplications";
import { useMatches } from "@/hooks/useMatches";
import { toast } from "sonner";
import ErrorFallback from "@/components/ErrorFallback";

// Import refactored components
import StatsOverview from "@/components/provider/dashboard/StatsOverview";
import OverviewTab from "@/components/provider/dashboard/OverviewTab";
import MatchesTab from "@/components/provider/dashboard/MatchesTab";
import PaymentsTab from "@/components/provider/dashboard/PaymentsTab";
import ResourcesTab from "@/components/provider/dashboard/ResourcesTab";
import ApplicationStatusTab from "@/components/provider/dashboard/ApplicationStatusTab";

const ProviderDashboard = () => {
  const { user, profile, loading, error } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeClients: 0,
    totalRevenue: 0,
    projectsCompleted: 0,
    averageRating: 0,
  });
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  const { matches } = useMatches();
  const { myApplication } = useProviderApplications();

  // Compute some real stats from matches
  useEffect(() => {
    if (matches) {
      setStats(prev => ({
        ...prev,
        activeClients: matches.filter(m => m.status === 'accepted').length
      }));
    }
  }, [matches]);

  // Protect this route
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
        return;
      } 
      
      if (profile && profile.role !== "provider") {
        toast.error("Access denied. This dashboard is for providers only.");
        navigate("/");
      }
    }
  }, [user, profile, loading, navigate]);

  // Show notification if application is pending
  useEffect(() => {
    if (myApplication && myApplication.status === 'submitted') {
      toast.info("Your provider application is under review", {
        duration: 5000,
      });
    }
  }, [myApplication]);

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
            <p className="text-center text-lg text-[#0E3366]">Loading...</p>
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0A2342]">Provider Dashboard</h1>
            <p className="text-[#0E3366]">
              Welcome back, {profile?.first_name || profile?.email?.split('@')[0]}
            </p>
          </div>
          <div className="space-x-2">
            <Button 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
              onClick={() => navigate("/payments")}
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Payments
            </Button>
            <Button className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors">
              View Profile
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsOverview stats={stats} />

        {/* Tabs */}
        <Tabs 
          defaultValue="overview" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="matches">Client Matches</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="application">Application Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab setActiveTab={setActiveTab} />
          </TabsContent>
          
          <TabsContent value="matches">
            <MatchesTab />
          </TabsContent>
          
          <TabsContent value="payments">
            <PaymentsTab />
          </TabsContent>
          
          <TabsContent value="resources">
            <ResourcesTab />
          </TabsContent>
          
          <TabsContent value="application">
            <ApplicationStatusTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProviderDashboard;
