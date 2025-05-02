
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProviderResources } from "@/components/provider/resources/ProviderResources";
import { Download, BookOpen, PenTool, Video } from "lucide-react";

const ResourcesTab = () => {
  // Resource categories for better organization
  const resourceCategories = [
    {
      title: "Marketing Templates",
      description: "Ready-to-use templates for client outreach and proposals",
      icon: <Download className="h-5 w-5 text-[#2D82B7]" />,
      className: "bg-[#BFD7ED]/20"
    },
    {
      title: "Best Practices",
      description: "Industry standards and effective email marketing strategies",
      icon: <BookOpen className="h-5 w-5 text-[#2D82B7]" />,
      className: "bg-[#BFD7ED]/20"
    },
    {
      title: "Case Studies",
      description: "Success stories and examples from other providers",
      icon: <PenTool className="h-5 w-5 text-[#2D82B7]" />,
      className: "bg-[#BFD7ED]/20"
    },
    {
      title: "Training Videos",
      description: "Educational content to improve your service offerings",
      icon: <Video className="h-5 w-5 text-[#2D82B7]" />,
      className: "bg-[#BFD7ED]/20"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-[#0A2342]">Provider Resources</CardTitle>
            <p className="text-sm text-[#0E3366] mt-1">
              Access templates, guides, and resources to help grow your business
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {resourceCategories.map((category, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg flex items-start space-x-4 ${category.className} transition-all hover:shadow-md cursor-pointer`}
              >
                <div className="rounded-full bg-white p-2 shadow-sm">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium text-[#0A2342]">{category.title}</h3>
                  <p className="text-sm text-[#0E3366]">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-[#BFD7ED]/10 rounded-lg p-4 border border-[#2D82B7]/20">
            <h3 className="text-lg font-medium text-[#0A2342] mb-4">Featured Resources</h3>
            <ProviderResources />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
