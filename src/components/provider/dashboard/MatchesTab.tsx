
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MatchesList from "@/components/matches/MatchesList";
import { Bell } from "lucide-react";

const MatchesTab = () => {
  return (
    <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-[#0A2342]">Client Connection Requests</CardTitle>
          <p className="text-sm text-[#0E3366] mt-1">
            Manage and respond to clients interested in your services
          </p>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 text-[#2D82B7]" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <MatchesList />
      </CardContent>
    </Card>
  );
};

export default MatchesTab;
