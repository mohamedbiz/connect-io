
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Mail, Briefcase } from "lucide-react";

const ProviderDashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeClients: 0,
    totalRevenue: 0,
    projectsCompleted: 0,
    averageRating: 0,
  });

  // Protect this route
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
      } else if (profile && profile.role !== "provider") {
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Provider Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {profile?.first_name || user?.email?.split('@')[0]}
            </p>
          </div>
          <Button>View Profile</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeClients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalRevenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Projects Completed</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.projectsCompleted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}/5.0</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No active projects at the moment.</p>
              <Button variant="link" className="mt-4 px-0">
                Browse Available Projects
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No new messages.</p>
              <Button variant="link" className="mt-4 px-0">
                Open Inbox
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderDashboard;
