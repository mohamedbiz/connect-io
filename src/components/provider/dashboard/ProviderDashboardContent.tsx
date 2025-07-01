
import { DashboardTab } from "@/components/dashboard/DashboardTabs";
import OverviewTab from "./OverviewTab";
import MatchesTab from "./MatchesTab";
import PaymentsTab from "./PaymentsTab";
import ResourcesTab from "./ResourcesTab";
import ApplicationStatusTab from "./ApplicationStatusTab";
import ProjectsTab from "./ProjectsTab";
import AnalyticsTab from "./AnalyticsTab";

const ProviderDashboardContent = () => {
  const dashboardTabs: DashboardTab[] = [
    {
      id: "overview",
      label: "Overview",
      content: <OverviewTab setActiveTab={(tab) => {}} />
    },
    {
      id: "matches",
      label: "Client Matches",
      content: <MatchesTab />
    },
    {
      id: "projects",
      label: "Active Projects",
      content: <ProjectsTab />
    },
    {
      id: "analytics",
      label: "Performance",
      content: <AnalyticsTab />
    },
    {
      id: "payments",
      label: "Payments",
      content: <PaymentsTab />
    },
    {
      id: "resources",
      label: "Resources",
      content: <ResourcesTab />
    },
    {
      id: "application",
      label: "Application Status",
      content: <ApplicationStatusTab />
    }
  ];
  
  return dashboardTabs;
};

export default ProviderDashboardContent;
