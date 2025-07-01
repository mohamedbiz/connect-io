
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import ProviderDashboardContent from "@/components/provider/dashboard/ProviderDashboardContent";
import DashboardAccessControl from "@/components/dashboard/DashboardAccessControl";

const EnhancedProviderDashboard = () => {
  const { user, profile, loading, error } = useAuth();
  const navigate = useNavigate();
  const dashboardTabs = ProviderDashboardContent();
  const [activeTab, setActiveTab] = useState("overview");
  const [isNewUser, setIsNewUser] = useState(true);
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

  useEffect(() => {
    // Check if user is new (has been registered within the last 24 hours)
    if (user) {
      const userCreatedAt = new Date(user.created_at!);
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
      
      setIsNewUser(userCreatedAt > twentyFourHoursAgo);
    }
  }, [user]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleGetStarted = () => {
    setActiveTab("matches");
  };

  const handleCompleteApplication = () => {
    navigate("/provider/application");
  };

  const getStatusInfo = () => {
    if (!profile) return null;

    switch (profile.account_status) {
      case 'pending_profile':
        return {
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
          title: "Application Under Review",
          description: "Your application is being reviewed. You'll receive an email update within 2-3 business days.",
          color: "bg-amber-50 border-amber-200",
          titleColor: "text-amber-800",
          descColor: "text-amber-700"
        };
      case 'active':
        return {
          title: "Welcome to the Provider Network!",
          description: "Your application has been approved. Start connecting with clients and growing your business.",
          color: "bg-green-50 border-green-200",
          titleColor: "text-green-800",
          descColor: "text-green-700"
        };
      case 'rejected':
        return {
          title: "Application Status Update",
          description: "Your application needs some updates. Please review the feedback and resubmit.",
          color: "bg-red-50 border-red-200",
          titleColor: "text-red-800",
          descColor: "text-red-700",
          action: (
            <Button onClick={handleCompleteApplication} variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              Update Application
            </Button>
          )
        };
      default:
        return null;
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <DashboardAccessControl 
      user={user}
      profile={profile}
      loading={loading || statusLoading}
      error={error}
      expectedRole="provider"
    >
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <DashboardHeader 
            title="Provider Dashboard" 
            firstName={profile?.first_name || ""}
            role="provider"
          />
          
          {isNewUser && (
            <WelcomeBanner 
              firstName={profile?.first_name} 
              onGetStarted={handleGetStarted}
            />
          )}
          
          {statusInfo && (
            <Alert className={`mb-6 ${statusInfo.color}`}>
              <AlertTitle className={statusInfo.titleColor}>
                {statusInfo.title}
              </AlertTitle>
              <AlertDescription className={statusInfo.descColor}>
                <p className="mb-4">{statusInfo.description}</p>
                {statusInfo.action}
              </AlertDescription>
            </Alert>
          )}
          
          <DashboardNavigation 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
          
          <DashboardTabs 
            tabs={dashboardTabs} 
            defaultTab={activeTab}
            onTabChange={handleTabChange} 
          />
        </div>
      </Layout>
    </DashboardAccessControl>
  );
};

export default EnhancedProviderDashboard;
