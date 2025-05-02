
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BarChart, Briefcase, Mail } from "lucide-react";

interface StatsProps {
  stats: {
    activeClients: number;
    totalRevenue: number;
    projectsCompleted: number;
    averageRating: number;
  };
}

const StatsOverview = ({ stats }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0A2342]">Active Clients</CardTitle>
          <Users className="h-4 w-4 text-[#2D82B7]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0A2342]">{stats.activeClients}</div>
        </CardContent>
      </Card>
      <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0A2342]">Total Revenue</CardTitle>
          <BarChart className="h-4 w-4 text-[#2D82B7]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0A2342]">
            ${stats.totalRevenue.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0A2342]">Projects Completed</CardTitle>
          <Briefcase className="h-4 w-4 text-[#2D82B7]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0A2342]">{stats.projectsCompleted}</div>
        </CardContent>
      </Card>
      <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#0A2342]">Average Rating</CardTitle>
          <Mail className="h-4 w-4 text-[#2D82B7]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0A2342]">{stats.averageRating.toFixed(1)}/5.0</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
