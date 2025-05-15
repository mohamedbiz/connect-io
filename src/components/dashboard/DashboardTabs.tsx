
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface DashboardTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface DashboardTabsProps {
  tabs: DashboardTab[];
  defaultTab: string;
  onTabChange?: (tabId: string) => void;
}

const DashboardTabs = ({ tabs, defaultTab = "diagnostic", onTabChange }: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Effect to sync external tab state
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };
  
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-6 border-b w-full justify-start rounded-none bg-transparent p-0 h-auto flex flex-wrap gap-2">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#2D82B7] data-[state=active]:text-[#0A2342] data-[state=active]:shadow-none data-[state=active]:rounded-none rounded-none border-b-2 border-transparent pb-2 text-[#0E3366]/80 transition-all"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(tab => (
        <TabsContent
          key={tab.id}
          value={tab.id}
          className="mt-0"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DashboardTabs;
