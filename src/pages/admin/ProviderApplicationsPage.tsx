
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProviderApplications } from "@/hooks/useProviderApplications";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import ReviewDialog from "@/components/admin/provider-applications/ReviewDialog";
import ApplicationTabs from "@/components/admin/provider-applications/ApplicationTabs";

const ProviderApplicationsPage = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<'submitted' | 'in_review' | 'approved' | 'rejected'>('submitted');
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [technicalScore, setTechnicalScore] = useState<number>(0);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

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
    setIsFeatured(application?.is_featured || false);
    setReviewDialogOpen(true);
  };

  const handleUpdateStatus = (status: 'in_review' | 'approved' | 'rejected') => {
    if (!selectedApplicationId) return;
    
    updateApplicationStatus({
      applicationId: selectedApplicationId,
      status,
      reviewerNotes: reviewerNotes.trim() || undefined,
      technicalScore: technicalScore || undefined,
      isFeatured: isFeatured
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
        
        <ApplicationTabs
          pendingApplications={pendingApplications}
          inReviewApplications={inReviewApplications}
          approvedApplications={approvedApplications}
          rejectedApplications={rejectedApplications}
          onReviewClick={handleReviewClick}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
      
      <ReviewDialog 
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
        reviewerNotes={reviewerNotes}
        setReviewerNotes={setReviewerNotes}
        technicalScore={technicalScore}
        setTechnicalScore={setTechnicalScore}
        isFeatured={isFeatured}
        setIsFeatured={setIsFeatured}
        onUpdateStatus={handleUpdateStatus}
        isUpdating={isUpdating}
      />
    </Layout>
  );
};

export default ProviderApplicationsPage;
