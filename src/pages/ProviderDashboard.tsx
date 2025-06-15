
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, AlertCircle, XCircle, User, Mail, Calendar, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ProviderDashboard = () => {
  const { user, profile, loading, error } = useAuth();
  const navigate = useNavigate();
  const [applicationStatus, setApplicationStatus] = useState<any>(null);
  const [providerProfile, setProviderProfile] = useState<any>(null);
  const [statusLoading, setStatusLoading] = useState(true);

  // Fetch application status and provider profile
  useEffect(() => {
    const fetchProviderData = async () => {
      if (!user) return;

      try {
        // Fetch application status
        const { data: application } = await supabase
          .from('provider_applications')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        setApplicationStatus(application);

        // Fetch provider profile
        const { data: providerProfileData } = await supabase
          .from('provider_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        setProviderProfile(providerProfileData);
      } catch (error) {
        console.error('Error fetching provider data:', error);
      } finally {
        setStatusLoading(false);
      }
    };

    if (user && !loading) {
      fetchProviderData();
    }
  }, [user, loading]);

  // Protect this route
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/provider/signin");
        return;
      } 
      
      if (profile && profile.role !== "provider") {
        toast.error("Access denied. This dashboard is for providers only.");
        navigate("/");
      }
    }
  }, [user, profile, loading, navigate]);

  const handleCompleteApplication = () => {
    navigate("/provider/onboarding");
  };

  const getStatusInfo = () => {
    if (!profile) return null;

    switch (profile.account_status) {
      case 'pending_profile':
        return {
          icon: <User className="h-5 w-5" />,
          title: "Complete Your Application",
          description: "Please complete your provider application to get matched with clients.",
          color: "bg-blue-50 border-blue-200",
          titleColor: "text-blue-800",
          descColor: "text-blue-700",
          action: (
            <Button onClick={handleCompleteApplication} className="bg-blue-500 hover:bg-blue-600 text-white">
              Complete Application
            </Button>
          )
        };
      case 'pending_application':
        return {
          icon: <Clock className="h-5 w-5" />,
          title: "Application Under Review",
          description: "Your application is being reviewed. You'll receive an email update within 2-3 business days.",
          color: "bg-amber-50 border-amber-200",
          titleColor: "text-amber-800",
          descColor: "text-amber-700"
        };
      case 'active':
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          title: "Application Approved!",
          description: "Congratulations! You can now receive client matches and grow your business.",
          color: "bg-green-50 border-green-200",
          titleColor: "text-green-800",
          descColor: "text-green-700"
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-5 w-5" />,
          title: "Application Not Approved",
          description: "Unfortunately, your application was not approved at this time. You can reapply after addressing the feedback.",
          color: "bg-red-50 border-red-200",
          titleColor: "text-red-800",
          descColor: "text-red-700",
          action: (
            <Button onClick={handleCompleteApplication} variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              Reapply
            </Button>
          )
        };
      default:
        return null;
    }
  };

  if (loading || statusLoading) {
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
              onClick={() => navigate("/provider/signin")}
              className="mt-4"
            >
              Go to Login
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const statusInfo = getStatusInfo();

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
        </div>

        {/* Status Alert */}
        {statusInfo && (
          <Alert className={`mb-6 ${statusInfo.color}`}>
            <div className="flex items-start space-x-3">
              <div className={statusInfo.titleColor}>
                {statusInfo.icon}
              </div>
              <div className="flex-1">
                <AlertTitle className={statusInfo.titleColor}>
                  {statusInfo.title}
                </AlertTitle>
                <AlertDescription className={statusInfo.descColor}>
                  <p className="mb-3">{statusInfo.description}</p>
                  {statusInfo.action}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        {/* Application Details */}
        {applicationStatus && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Application Status
                <Badge variant={
                  applicationStatus.status === 'approved' ? 'default' :
                  applicationStatus.status === 'submitted' || applicationStatus.status === 'in_review' ? 'secondary' :
                  applicationStatus.status === 'rejected' ? 'destructive' : 'outline'
                }>
                  {applicationStatus.status?.replace('_', ' ').toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-medium">
                      {applicationStatus.submitted_at ? 
                        new Date(applicationStatus.submitted_at).toLocaleDateString() : 
                        'N/A'
                      }
                    </p>
                  </div>
                </div>
                
                {applicationStatus.reviewed_at && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Reviewed</p>
                      <p className="font-medium">
                        {new Date(applicationStatus.reviewed_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {applicationStatus.automated_score && (
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Score</p>
                      <p className="font-medium">{applicationStatus.automated_score}/100</p>
                    </div>
                  </div>
                )}
              </div>

              {applicationStatus.reviewer_notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Reviewer Notes:</p>
                  <p className="text-sm text-gray-600">{applicationStatus.reviewer_notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Provider Profile */}
        {providerProfile && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{providerProfile.headline}</h3>
                  <p className="text-gray-600">{providerProfile.years_experience} years experience</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Primary Platform:</p>
                  <p className="text-gray-600">{providerProfile.primary_esp}</p>
                </div>

                {providerProfile.industries_served && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Industries Served:</p>
                    <p className="text-gray-600">{providerProfile.industries_served.join(', ')}</p>
                  </div>
                )}

                {providerProfile.approach_description && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Approach:</p>
                    <p className="text-gray-600">{providerProfile.approach_description}</p>
                  </div>
                )}

                {providerProfile.portfolio_url && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Portfolio:</p>
                    <a 
                      href={providerProfile.portfolio_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <span>View Portfolio</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs for additional functionality */}
        {profile.account_status === 'active' && (
          <Tabs defaultValue="overview" className="mt-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="matches">Client Matches</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Welcome to your provider dashboard! Client matching features will be available here soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="matches">
              <Card>
                <CardHeader>
                  <CardTitle>Client Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Client matching is coming soon. You'll be able to view and respond to potential clients here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Messages with clients will appear here once the messaging system is implemented.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default ProviderDashboard;
