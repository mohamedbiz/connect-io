
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useFounderDashboard } from "@/hooks/useFounderDashboard";
import DashboardAccessControl from "@/components/dashboard/DashboardAccessControl";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QualificationBanner from "@/components/dashboard/QualificationBanner";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import FounderDashboardContent from "@/components/dashboard/FounderDashboardContent";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";

const FounderDashboard = () => {
  const { 
    user, 
    profile, 
    loading, 
    error, 
    isQualified, 
    qualificationLoading 
  } = useFounderDashboard();
  
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
    if (!isQualified) {
      // If the user isn't qualified yet, take them to qualification
      window.location.href = "/founder-qualification";
    }
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
          
          <QualificationBanner 
            isQualified={isQualified} 
            isLoading={qualificationLoading} 
          />
          
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
