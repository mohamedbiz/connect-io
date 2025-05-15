
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useFounderDashboard } from "@/hooks/useFounderDashboard";
import DashboardAccessControl from "@/components/dashboard/DashboardAccessControl";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QualificationBanner from "@/components/dashboard/QualificationBanner";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import FounderDashboardContent from "@/components/dashboard/FounderDashboardContent";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";

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
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
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
          />
          
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
