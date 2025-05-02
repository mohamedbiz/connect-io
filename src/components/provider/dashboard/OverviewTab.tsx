
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Inbox } from "lucide-react";

interface OverviewTabProps {
  setActiveTab: (tab: string) => void;
}

const OverviewTab = ({ setActiveTab }: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
        <CardHeader>
          <CardTitle className="text-[#0A2342]">Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#0E3366]">No active projects at the moment.</p>
          <Button 
            variant="link" 
            className="mt-4 px-0 text-[#2D82B7] hover:text-[#3D9AD1] transition-colors"
            onClick={() => setActiveTab("matches")}
          >
            Check Client Matches
          </Button>
        </CardContent>
      </Card>

      <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
        <CardHeader>
          <CardTitle className="text-[#0A2342]">Client Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#0E3366]">No new messages.</p>
          <Button 
            variant="link" 
            className="mt-4 px-0 text-[#2D82B7] hover:text-[#3D9AD1] transition-colors"
          >
            <Inbox className="h-4 w-4 mr-1" />
            Open Inbox
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
