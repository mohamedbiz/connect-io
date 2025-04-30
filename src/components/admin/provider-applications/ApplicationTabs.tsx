
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderApplication } from "@/types/supabase-custom-types";
import ApplicationsTable from "./ApplicationsTable";

interface ApplicationTabsProps {
  pendingApplications: ProviderApplication[];
  inReviewApplications: ProviderApplication[];
  approvedApplications: ProviderApplication[];
  rejectedApplications: ProviderApplication[];
  onReviewClick: (applicationId: string) => void;
  currentTab: 'submitted' | 'in_review' | 'approved' | 'rejected';
  setCurrentTab: (tab: 'submitted' | 'in_review' | 'approved' | 'rejected') => void;
}

const ApplicationTabs = ({
  pendingApplications,
  inReviewApplications,
  approvedApplications,
  rejectedApplications,
  onReviewClick,
  currentTab,
  setCurrentTab
}: ApplicationTabsProps) => {
  return (
    <Tabs 
      defaultValue="submitted" 
      value={currentTab} 
      onValueChange={(v) => setCurrentTab(v as any)}
    >
      <TabsList className="mb-6">
        <TabsTrigger value="submitted">
          New <Badge variant="outline" className="ml-2">{pendingApplications.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="in_review">
          In Review <Badge variant="outline" className="ml-2">{inReviewApplications.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="approved">
          Approved <Badge variant="outline" className="ml-2">{approvedApplications.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="rejected">
          Rejected <Badge variant="outline" className="ml-2">{rejectedApplications.length}</Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="submitted" className="space-y-4">
        <ApplicationsTable 
          applications={pendingApplications} 
          onReviewClick={onReviewClick}
        />
      </TabsContent>
      
      <TabsContent value="in_review" className="space-y-4">
        <ApplicationsTable 
          applications={inReviewApplications} 
          onReviewClick={onReviewClick}
        />
      </TabsContent>
      
      <TabsContent value="approved" className="space-y-4">
        <ApplicationsTable 
          applications={approvedApplications} 
          onReviewClick={onReviewClick}
        />
      </TabsContent>
      
      <TabsContent value="rejected" className="space-y-4">
        <ApplicationsTable 
          applications={rejectedApplications} 
          onReviewClick={onReviewClick}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ApplicationTabs;
