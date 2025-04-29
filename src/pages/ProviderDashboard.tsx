
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Mail, Briefcase, BookOpen } from "lucide-react";
import { ProviderResources } from "@/components/provider/resources/ProviderResources";
import { toast } from "sonner";

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
              Welcome back, {profile?.first_name || user?.email?.split('@')[0]}
            </p>
          </div>
          <Button className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors">
            View Profile
          </Button>
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
            <CardHeader>
              <CardTitle className="text-[#0A2342]">Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#0E3366]">No active projects at the moment.</p>
              <Button 
                variant="link" 
                className="mt-4 px-0 text-[#2D82B7] hover:text-[#3D9AD1] transition-colors"
              >
                Browse Available Projects
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
                Open Inbox
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Resources Section */}
        <Card className="mb-8 border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-[#0A2342]">Client Acquisition Resources</CardTitle>
              <p className="text-sm text-[#0E3366] mt-1">
                Access templates and guides to help you acquire and onboard clients
              </p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setShowResources(!showResources)}
              className="flex items-center gap-2 text-[#2D82B7] hover:bg-[#BFD7ED]/20 hover:text-[#3D9AD1] transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              {showResources ? "Hide Resources" : "View Resources"}
            </Button>
          </CardHeader>
          {showResources && (
            <CardContent>
              <ProviderResources />
            </CardContent>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default ProviderDashboard;
