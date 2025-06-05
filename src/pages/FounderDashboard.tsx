
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useFounderDashboard } from "@/hooks/useFounderDashboard";
import DashboardAccessControl from "@/components/dashboard/DashboardAccessControl";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import FounderDashboardContent from "@/components/dashboard/FounderDashboardContent";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FounderDashboard = () => {
  const { 
    user, 
    profile, 
    loading, 
    error
  } = useFounderDashboard();
  
  const navigate = useNavigate();
  const dashboardTabs = FounderDashboardContent();
  const [activeTab, setActiveTab] = useState("diagnostic");
  const [isNewUser, setIsNewUser] = useState(true);
  
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
    // Simple navigation to first tab
    setActiveTab("diagnostic");
  };

  const handleCompleteProfile = () => {
    navigate("/founder/onboarding");
  };

  return (
    <DashboardAccessControl 
      user={user}
      profile={profile}
      loading={loading}
      error={error}
      expectedRole="founder"
    >
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <DashboardHeader 
            title="Founder Dashboard" 
            firstName={profile?.first_name || ""}
            role="founder"
          />
          
          {isNewUser && (
            <WelcomeBanner 
              firstName={profile?.first_name} 
              onGetStarted={handleGetStarted}
            />
          )}
          
          {profile?.account_status === 'pending_profile' && (
            <Alert className="mb-6 bg-amber-50 border-amber-200">
              <AlertTitle className="text-amber-800">Complete Your Profile</AlertTitle>
              <AlertDescription className="text-amber-700">
                <p className="mb-4">
                  Welcome! Please complete your founder profile to unlock all dashboard features.
                </p>
                <Button 
                  onClick={handleCompleteProfile}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Complete Profile
                </Button>
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

export default FounderDashboard;
