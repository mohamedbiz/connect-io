
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Mail, Briefcase, BookOpen, Inbox, DollarSign } from "lucide-react";
import { ProviderResources } from "@/components/provider/resources/ProviderResources";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProviderApplications } from "@/hooks/useProviderApplications";
import { useMatches } from "@/hooks/useMatches";
import MatchesList from "@/components/matches/MatchesList";
import { toast } from "sonner";
import PaymentAnalytics from "@/components/payment/PaymentAnalytics";
import PayoutRequestForm from "@/components/payment/PayoutRequestForm";
import PayoutRequestsList from "@/components/payment/PayoutRequestsList";

const ProviderDashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeClients: 0,
    totalRevenue: 0,
    projectsCompleted: 0,
    averageRating: 0,
  });
  const [showResources, setShowResources] = useState(false);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#0A2342]">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-[#2D82B7]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A2342]">{stats.activeClients}</div>
            </CardContent>
          </Card>
          <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#0A2342]">Total Revenue</CardTitle>
              <BarChart className="h-4 w-4 text-[#2D82B7]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A2342]">
                ${stats.totalRevenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#0A2342]">Projects Completed</CardTitle>
              <Briefcase className="h-4 w-4 text-[#2D82B7]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A2342]">{stats.projectsCompleted}</div>
            </CardContent>
          </Card>
          <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#0A2342]">Average Rating</CardTitle>
              <Mail className="h-4 w-4 text-[#2D82B7]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A2342]">{stats.averageRating.toFixed(1)}/5.0</div>
            </CardContent>
          </Card>
        </div>

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
          
          <TabsContent value="overview" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
              <CardHeader>
                <CardTitle className="text-[#0A2342]">Recent Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#0E3366]">No active projects at the moment.</p>
                <Button 
                  variant="link" 
                  className="mt-4 px-0 text-[#2D82B7] hover:text-[#3D9AD1] transition-colors"
                  onClick={() => setActiveTab("matches")}
                >
                  Check Client Matches
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
              <CardHeader>
                <CardTitle className="text-[#0A2342]">Client Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#0E3366]">No new messages.</p>
                <Button 
                  variant="link" 
                  className="mt-4 px-0 text-[#2D82B7] hover:text-[#3D9AD1] transition-colors"
                >
                  <Inbox className="h-4 w-4 mr-1" />
                  Open Inbox
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0A2342]">Client Connection Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <MatchesList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#2D82B7]/30">
                <h3 className="text-xl font-semibold mb-4 text-[#0A2342]">Request Payout</h3>
                <PayoutRequestForm />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#2D82B7]/30">
                <h3 className="text-xl font-semibold mb-4 text-[#0A2342]">Payment Analytics</h3>
                <PaymentAnalytics />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#2D82B7]/30 lg:col-span-2">
                <h3 className="text-xl font-semibold mb-4 text-[#0A2342]">Your Payout Requests</h3>
                <PayoutRequestsList />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-[#0A2342]">Client Acquisition Resources</CardTitle>
                  <p className="text-sm text-[#0E3366] mt-1">
                    Access templates and guides to help you acquire and onboard clients
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <ProviderResources />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="application">
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                {myApplication ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Status:</div>
                      <ApplicationStatusBadge status={myApplication.status} />
                    </div>
                    
                    <div>
                      <div className="font-medium mb-2">Submission Date:</div>
                      <div>{new Date(myApplication.submitted_at).toLocaleDateString()}</div>
                    </div>
                    
                    {myApplication.reviewed_at && (
                      <div>
                        <div className="font-medium mb-2">Reviewed Date:</div>
                        <div>{new Date(myApplication.reviewed_at).toLocaleDateString()}</div>
                      </div>
                    )}
                    
                    {myApplication.reviewer_notes && (
                      <div>
                        <div className="font-medium mb-2">Reviewer Notes:</div>
                        <div className="bg-slate-50 p-3 rounded-md">{myApplication.reviewer_notes}</div>
                      </div>
                    )}
                    
                    {myApplication.technical_assessment_score !== null && (
                      <div>
                        <div className="font-medium mb-2">Technical Assessment Score:</div>
                        <div>{myApplication.technical_assessment_score}/100</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      You haven't submitted a provider application yet.
                    </p>
                    <Button onClick={() => navigate("/provider-apply")}>
                      Apply as Provider
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const ApplicationStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'submitted':
      return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Under Review</span>;
    case 'in_review':
      return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">In Review</span>;
    case 'approved':
      return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Approved</span>;
    case 'rejected':
      return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Rejected</span>;
    default:
      return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{status}</span>;
  }
};

export default ProviderDashboard;
