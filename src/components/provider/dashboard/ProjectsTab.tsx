
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, DollarSign, User, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Project {
  id: string;
  title: string;
  client: string;
  status: 'active' | 'pending' | 'completed' | 'on-hold';
  progress: number;
  budget: number;
  deadline: string;
  description: string;
  lastActivity: string;
}

const ProjectsTab = () => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Email Marketing Campaign Setup',
      client: 'TechStart Inc.',
      status: 'active',
      progress: 65,
      budget: 2500,
      deadline: '2024-02-15',
      description: 'Complete email marketing automation setup including welcome series and product launch sequences.',
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      title: 'Newsletter Optimization',
      client: 'FashionForward',
      status: 'pending',
      progress: 0,
      budget: 1800,
      deadline: '2024-02-28',
      description: 'Optimize existing newsletter for better engagement and conversion rates.',
      lastActivity: '1 day ago'
    }
  ]);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'on-hold': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: Project['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#0A2342]">Active Projects</h2>
          <p className="text-[#0E3366] mt-1">Manage your current client projects and deliverables</p>
        </div>
        <Button className="bg-[#2D82B7] hover:bg-[#1E5F8C]">
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Alert>
          <AlertDescription>
            No active projects at the moment. When you connect with clients, your projects will appear here.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="border border-[#2D82B7]/30 hover:border-[#2D82B7] transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-[#0A2342]">{project.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-[#0E3366]">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {project.client}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {project.lastActivity}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusLabel(project.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#0E3366]">{project.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#0E3366]">Progress</span>
                    <span className="font-medium text-[#0A2342]">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#2D82B7]/20">
                  <div className="flex gap-4 text-sm text-[#0E3366]">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      ${project.budget.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due {new Date(project.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message Client
                    </Button>
                    <Button size="sm" className="bg-[#2D82B7] hover:bg-[#1E5F8C]">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;
