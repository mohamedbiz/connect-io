
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsOverview from "./StatsOverview";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Star, MessageSquare } from 'lucide-react';

const AnalyticsTab = () => {
  // Mock data for charts
  const monthlyRevenue = [
    { month: 'Jan', revenue: 2400 },
    { month: 'Feb', revenue: 1398 },
    { month: 'Mar', revenue: 9800 },
    { month: 'Apr', revenue: 3908 },
    { month: 'May', revenue: 4800 },
    { month: 'Jun', revenue: 3800 },
  ];

  const projectTypes = [
    { name: 'Email Campaigns', value: 35, color: '#2D82B7' },
    { name: 'Automation Setup', value: 25, color: '#3D9AD1' },
    { name: 'List Building', value: 20, color: '#BFD7ED' },
    { name: 'Strategy Consulting', value: 20, color: '#0A2342' },
  ];

  const clientSatisfaction = [
    { month: 'Jan', rating: 4.2 },
    { month: 'Feb', rating: 4.5 },
    { month: 'Mar', rating: 4.8 },
    { month: 'Apr', rating: 4.6 },
    { month: 'May', rating: 4.9 },
    { month: 'Jun', rating: 4.7 },
  ];

  const stats = {
    activeClients: 8,
    totalRevenue: 24500,
    projectsCompleted: 23,
    averageRating: 4.7
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0A2342] mb-2">Performance Analytics</h2>
        <p className="text-[#0E3366]">Track your business metrics and client satisfaction</p>
      </div>

      <StatsOverview stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card className="border border-[#2D82B7]/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0A2342]">
              <TrendingUp className="h-5 w-5 text-[#2D82B7]" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#BFD7ED" />
                <XAxis dataKey="month" stroke="#0E3366" />
                <YAxis stroke="#0E3366" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #2D82B7',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2D82B7" 
                  strokeWidth={3}
                  dot={{ fill: '#2D82B7', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Client Satisfaction Chart */}
        <Card className="border border-[#2D82B7]/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0A2342]">
              <Star className="h-5 w-5 text-[#2D82B7]" />
              Client Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={clientSatisfaction}>
                <CartesianGrid strokeDasharray="3 3" stroke="#BFD7ED" />
                <XAxis dataKey="month" stroke="#0E3366" />
                <YAxis domain={[0, 5]} stroke="#0E3366" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #2D82B7',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rating" 
                  stroke="#2D82B7" 
                  strokeWidth={3}
                  dot={{ fill: '#2D82B7', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Types Distribution */}
        <Card className="border border-[#2D82B7]/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0A2342]">
              <MessageSquare className="h-5 w-5 text-[#2D82B7]" />
              Project Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                >
                  {projectTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border border-[#2D82B7]/30">
          <CardHeader>
            <CardTitle className="text-[#0A2342]">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-[#BFD7ED]/20 rounded-lg">
              <span className="text-[#0E3366] font-medium">Average Project Value</span>
              <span className="text-[#0A2342] font-bold">$1,065</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#BFD7ED]/20 rounded-lg">
              <span className="text-[#0E3366] font-medium">Response Time</span>
              <span className="text-[#0A2342] font-bold">< 2 hours</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#BFD7ED]/20 rounded-lg">
              <span className="text-[#0E3366] font-medium">Client Retention</span>
              <span className="text-[#0A2342] font-bold">85%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#BFD7ED]/20 rounded-lg">
              <span className="text-[#0E3366] font-medium">Project Success Rate</span>
              <span className="text-[#0A2342] font-bold">92%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;
