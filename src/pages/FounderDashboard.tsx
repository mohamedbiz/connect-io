
import Layout from "@/components/layout/Layout";
import { useFounderDashboard } from "@/hooks/useFounderDashboard";
import DashboardAccessControl from "@/components/dashboard/DashboardAccessControl";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QualificationBanner from "@/components/dashboard/QualificationBanner";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import FounderDashboardContent from "@/components/dashboard/FounderDashboardContent";

const FounderDashboard = () => {
  const { user, profile, loading, error, isQualified, qualificationLoading } = useFounderDashboard();
  const dashboardTabs = FounderDashboardContent();

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
          <DashboardHeader title="Founder Dashboard" />
          <QualificationBanner isQualified={isQualified} isLoading={qualificationLoading} />
          <DashboardTabs tabs={dashboardTabs} defaultTab="diagnostic" />
        </div>
      </Layout>
    </DashboardAccessControl>
  );
};

export default FounderDashboard;
