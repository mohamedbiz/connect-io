
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface DashboardTab {
  id: string;
  label: string;
  content: ReactNode;
}

interface DashboardTabsProps {
  tabs: DashboardTab[];
  defaultTab?: string;
}

const DashboardTabs = ({ tabs, defaultTab }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue={defaultTab || tabs[0]?.id} className="w-full">
      <TabsList className="mb-6 bg-[#BFD7ED]/30">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.id}
            value={tab.id} 
            className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DashboardTabs;
