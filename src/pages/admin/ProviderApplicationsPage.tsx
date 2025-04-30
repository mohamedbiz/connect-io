
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProviderApplications } from "@/hooks/useProviderApplications";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import ApplicationsTable from "@/components/admin/provider-applications/ApplicationsTable";
import ReviewDialog from "@/components/admin/provider-applications/ReviewDialog";

const ProviderApplicationsPage = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<'submitted' | 'in_review' | 'approved' | 'rejected'>('submitted');
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [technicalScore, setTechnicalScore] = useState<number>(0);

  const { 
    allApplications, 
    isLoadingAllApplications, 
    updateApplicationStatus, 
    isUpdating, 
    loadAllApplications 
  } = useProviderApplications();
  
  // Load applications on mount if user is admin
  useEffect(() => {
    if (!loading && user && profile?.role === 'admin') {
      loadAllApplications();
    }
  }, [loading, user, profile?.role, loadAllApplications]);
  
  // Navigate away if not admin
  useEffect(() => {
    if (!loading && (!user || (profile && profile.role !== 'admin'))) {
      toast.error("Access denied. This page is for administrators only.");
      navigate("/");
    }
  }, [loading, user, profile, navigate]);

  const pendingApplications = allApplications.filter(app => app.status === 'submitted');
  const inReviewApplications = allApplications.filter(app => app.status === 'in_review');
  const approvedApplications = allApplications.filter(app => app.status === 'approved');
  const rejectedApplications = allApplications.filter(app => app.status === 'rejected');

  const handleReviewClick = (applicationId: string) => {
    const application = allApplications.find(app => app.id === applicationId);
    setSelectedApplicationId(applicationId);
    setReviewerNotes(application?.reviewer_notes || '');
    setTechnicalScore(application?.technical_assessment_score || 0);
    setReviewDialogOpen(true);
  };

  const handleUpdateStatus = (status: 'in_review' | 'approved' | 'rejected') => {
    if (!selectedApplicationId) return;
    
    updateApplicationStatus({
      applicationId: selectedApplicationId,
      status,
      reviewerNotes: reviewerNotes.trim() || undefined,
      technicalScore: technicalScore || undefined
    });
    
    setReviewDialogOpen(false);
  };

  if (loading || isLoadingAllApplications) {
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Provider Applications</h1>
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  // Protect this route
  if (!user || (profile && profile.role !== 'admin')) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Provider Applications</h1>
        
        <Tabs defaultValue="submitted" value={currentTab} onValueChange={(v) => setCurrentTab(v as any)}>
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
              onReviewClick={handleReviewClick}
            />
          </TabsContent>
          
          <TabsContent value="in_review" className="space-y-4">
            <ApplicationsTable 
              applications={inReviewApplications} 
              onReviewClick={handleReviewClick}
            />
          </TabsContent>
          
          <TabsContent value="approved" className="space-y-4">
            <ApplicationsTable 
              applications={approvedApplications} 
              onReviewClick={handleReviewClick}
            />
          </TabsContent>
          
          <TabsContent value="rejected" className="space-y-4">
            <ApplicationsTable 
              applications={rejectedApplications} 
              onReviewClick={handleReviewClick}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <ReviewDialog 
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
        reviewerNotes={reviewerNotes}
        setReviewerNotes={setReviewerNotes}
        technicalScore={technicalScore}
        setTechnicalScore={setTechnicalScore}
        onUpdateStatus={handleUpdateStatus}
        isUpdating={isUpdating}
      />
    </Layout>
  );
};

export default ProviderApplicationsPage;
