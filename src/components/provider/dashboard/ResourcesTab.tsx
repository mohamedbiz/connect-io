
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProviderResources } from "@/components/provider/resources/ProviderResources";

const ResourcesTab = () => {
  return (
    <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-[#0A2342]">Client Acquisition Resources</CardTitle>
          <p className="text-sm text-[#0E3366] mt-1">
            Access templates and guides to help you acquire and onboard clients
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <ProviderResources />
      </CardContent>
    </Card>
  );
};

export default ResourcesTab;
