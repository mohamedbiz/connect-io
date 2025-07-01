
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Inbox, Users, Calendar, TrendingUp, Star, Award } from "lucide-react";

interface OverviewTabProps {
  setActiveTab: (tab: string) => void;
}

const OverviewTab = ({ setActiveTab }: OverviewTabProps) => {
  const quickStats = [
    {
      title: "Active Clients",
      value: "8",
      change: "+2 this month",
      icon: <Users className="h-5 w-5 text-[#2D82B7]" />,
      positive: true
    },
    {
      title: "This Month Revenue",
      value: "$3,800",
      change: "+15% from last month",
      icon: <TrendingUp className="h-5 w-5 text-[#2D82B7]" />,
      positive: true
    },
    {
      title: "Client Rating",
      value: "4.8",
      change: "Based on 23 reviews",
      icon: <Star className="h-5 w-5 text-[#2D82B7]" />,
      positive: true
    },
    {
      title: "Completion Rate",
      value: "92%",
      change: "On-time delivery",
      icon: <Award className="h-5 w-5 text-[#2D82B7]" />,
      positive: true
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0A2342] mb-2">Dashboard Overview</h2>
        <p className="text-[#0E3366]">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border border-[#2D82B7]/30 hover:border-[#2D82B7] transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="rounded-full bg-[#BFD7ED]/20 p-2">
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#0A2342]">{stat.value}</div>
                  <div className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-[#0E3366]">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7] hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#0A2342] flex items-center gap-2">
              <Users className="h-5 w-5 text-[#2D82B7]" />
              New Client Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#0E3366] mb-4">
              You have 3 new potential clients interested in your services. Review their requirements and send proposals.
            </p>
            <Button 
              variant="default" 
              className="w-full bg-[#2D82B7] hover:bg-[#1E5F8C] transition-colors"
              onClick={() => setActiveTab("matches")}
            >
              View Client Matches
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7] hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#0A2342] flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#2D82B7]" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#0E3366] mb-4">
              You have 2 active projects with upcoming deadlines. Stay on track with your deliverables.
            </p>
            <Button 
              variant="outline" 
              className="w-full border-[#2D82B7] text-[#2D82B7] hover:bg-[#2D82B7] hover:text-white transition-colors"
              onClick={() => setActiveTab("projects")}
            >
              Manage Projects
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7] hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#0A2342] flex items-center gap-2">
              <Inbox className="h-5 w-5 text-[#2D82B7]" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#0E3366] mb-4">
              2 unread messages from clients. Quick response times help build trust and win more projects.
            </p>
            <Button 
              variant="outline" 
              className="w-full border-[#2D82B7] text-[#2D82B7] hover:bg-[#2D82B7] hover:text-white transition-colors"
            >
              <Inbox className="h-4 w-4 mr-2" />
              Open Messages
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7] hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#0A2342] flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#2D82B7]" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#0E3366] mb-4">
              Your response rate is 95% and client satisfaction is 4.8/5. Keep up the excellent work!
            </p>
            <Button 
              variant="outline" 
              className="w-full border-[#2D82B7] text-[#2D82B7] hover:bg-[#2D82B7] hover:text-white transition-colors"
              onClick={() => setActiveTab("analytics")}
            >
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border border-[#2D82B7]/30">
        <CardHeader>
          <CardTitle className="text-[#0A2342]">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" className="bg-[#2D82B7] hover:bg-[#1E5F8C]">
              Update Profile
            </Button>
            <Button size="sm" variant="outline" className="border-[#2D82B7] text-[#2D82B7] hover:bg-[#2D82B7] hover:text-white">
              Upload Portfolio
            </Button>
            <Button size="sm" variant="outline" className="border-[#2D82B7] text-[#2D82B7] hover:bg-[#2D82B7] hover:text-white">
              Request Payout
            </Button>
            <Button size="sm" variant="outline" className="border-[#2D82B7] text-[#2D82B7] hover:bg-[#2D82B7] hover:text-white">
              View Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
