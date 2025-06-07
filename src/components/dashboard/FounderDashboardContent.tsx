import { DashboardTab } from "./DashboardTabs";
import EmailMarketingDiagnostic from "@/components/dashboard/EmailMarketingDiagnostic";
import EmailListGrowthDiagnostic from "@/components/dashboard/EmailListGrowthDiagnostic";
import PostPurchaseDiagnostic from "@/components/dashboard/post-purchase/PostPurchaseDiagnostic";
import AbandonedCartRecovery from "@/components/dashboard/AbandonedCartRecovery";
import ProvidersDirectory from "@/components/providers/ProvidersDirectory";
import MatchesList from "@/components/matches/MatchesList";
import ProvidersPaymentSection from "@/components/founder/ProvidersPaymentSection";
import PaymentAnalytics from "@/components/payment/PaymentAnalytics";
import RecommendedProviders from "@/components/founder/RecommendedProviders";

const FounderDashboardContent = () => {
  const dashboardTabs: DashboardTab[] = [
    {
      id: "diagnostic",
      label: "Email Diagnostic",
      content: (
        <div className="space-y-6">
          <RecommendedProviders />
          <EmailMarketingDiagnostic />
        </div>
      )
    },
    {
      id: "cart-recovery",
      label: "Cart Recovery",
      content: <AbandonedCartRecovery />
    },
    {
      id: "list-growth",
      label: "List Growth",
      content: <EmailListGrowthDiagnostic />
    },
    {
      id: "post-purchase",
      label: "Post Purchase",
      content: <PostPurchaseDiagnostic />
    },
    {
      id: "providers",
      label: "Find Providers",
      content: <ProvidersDirectory />
    },
    {
      id: "matches",
      label: "My Matches",
      content: (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">My Provider Matches</h2>
          <MatchesList />
        </div>
      )
    },
    {
      id: "payments",
      label: "Payments",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Payment Analytics</h2>
            <PaymentAnalytics />
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Quick Payment</h2>
            <p className="mb-4 text-[#0E3366]">
              Make a payment to one of our featured providers:
            </p>
            <ProvidersPaymentSection />
          </div>
        </div>
      )
    },
    {
      id: "projects",
      label: "Projects",
      content: (
        <div className="text-center py-10">
          <p className="text-[#0E3366]">Project management coming soon</p>
        </div>
      )
    }
  ];
  
  return dashboardTabs;
};

export default FounderDashboardContent;
