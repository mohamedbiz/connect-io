
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useQualificationStatus } from "@/hooks/useQualificationStatus";
import QualificationBanner from "@/components/dashboard/QualificationBanner";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import DashboardAccessControl from "@/components/dashboard/DashboardAccessControl";
import FounderDashboardContent from "@/components/dashboard/FounderDashboardContent";

const FounderDashboard = () => {
  const { user, profile, loading, error } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { isQualified, isLoading: qualificationLoading } = useQualificationStatus();

  // Log states for debugging
  console.log("FounderDashboard:", { 
    user: !!user, 
    profile: profile?.role,
    loading,
    error: error || 'none',
    path: location.pathname,
    isQualified
  });

  // Check if qualification is required and redirect if needed
  useEffect(() => {
    if (!loading && !qualificationLoading && user && profile?.role === "founder" && !isQualified) {
      console.log("User not qualified, redirecting to qualification page");
      navigate("/founder-qualification");
    }
  }, [user, profile, loading, qualificationLoading, isQualified, navigate]);

  const dashboardTabs = FounderDashboardContent();

  return (
    <DashboardAccessControl 
      user={user}
      profile={profile}
      loading={loading || qualificationLoading}
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
