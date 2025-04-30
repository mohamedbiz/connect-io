
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProviderApplications } from "@/hooks/useProviderApplications";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { CheckCircle, Clock, XCircle, Clipboard, ClipboardCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

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
      
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Provider Application</DialogTitle>
            <DialogDescription>
              Review the application details and update the status
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Technical Assessment Score</h4>
              <input 
                type="number" 
                min="0" 
                max="100" 
                value={technicalScore}
                onChange={(e) => setTechnicalScore(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Reviewer Notes</h4>
              <Textarea
                placeholder="Add your review notes here..."
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setReviewDialogOpen(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button 
                variant="secondary"
                onClick={() => handleUpdateStatus('in_review')}
                disabled={isUpdating}
              >
                <Clock className="mr-2 h-4 w-4" />
                Mark In Review
              </Button>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="destructive"
                onClick={() => handleUpdateStatus('rejected')}
                disabled={isUpdating}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button 
                variant="default"
                onClick={() => handleUpdateStatus('approved')}
                disabled={isUpdating}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

interface ApplicationsTableProps {
  applications: any[];
  onReviewClick: (applicationId: string) => void;
}

const ApplicationsTable = ({ applications, onReviewClick }: ApplicationsTableProps) => {
  const [viewJson, setViewJson] = useState<string | null>(null);
  
  const handleViewJson = (data: any) => {
    setViewJson(JSON.stringify(data, null, 2));
  };
  
  if (applications.length === 0) {
    return (
      <Card className="text-center py-6">
        <CardContent>
          <p className="text-muted-foreground">No applications in this category</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
        <CardDescription>
          Review and manage provider applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => {
              const applicantName = 
                (app.profiles?.first_name && app.profiles?.last_name) 
                  ? `${app.profiles.first_name} ${app.profiles.last_name}` 
                  : (app.profiles?.email || "Unknown");
                  
              const experienceYears = app.application_data?.years_experience || "N/A";
              const expertiseAreas = app.application_data?.expertise_areas || [];
                
              return (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <img 
                          src={app.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(applicantName)}`} 
                          alt={applicantName} 
                        />
                      </Avatar>
                      <div>
                        <div className="font-medium">{applicantName}</div>
                        <div className="text-sm text-muted-foreground">{app.profiles?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(app.submitted_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>{experienceYears} years</span>
                      <div className="flex flex-wrap gap-1">
                        {expertiseAreas.slice(0, 2).map((area: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                        {expertiseAreas.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{expertiseAreas.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewJson(app.application_data)}
                      >
                        <Clipboard className="h-4 w-4 mr-1" />
                        Data
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => onReviewClick(app.id)}
                      >
                        <ClipboardCheck className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        {/* JSON Viewer Dialog */}
        <Dialog open={viewJson !== null} onOpenChange={(open) => !open && setViewJson(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Application Data</DialogTitle>
            </DialogHeader>
            <pre className="bg-slate-50 p-4 rounded-md overflow-auto text-sm">
              {viewJson}
            </pre>
            <Button onClick={() => setViewJson(null)}>Close</Button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'submitted':
      return (
        <Badge variant="outline" className="flex gap-1 items-center">
          <Clock className="h-3 w-3" />
          Submitted
        </Badge>
      );
    case 'in_review':
      return (
        <Badge variant="secondary" className="flex gap-1 items-center">
          <Clipboard className="h-3 w-3" />
          In Review
        </Badge>
      );
    case 'approved':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex gap-1 items-center">
          <CheckCircle className="h-3 w-3" />
          Approved
        </Badge>
      );
    case 'rejected':
      return (
        <Badge variant="destructive" className="flex gap-1 items-center">
          <XCircle className="h-3 w-3" />
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default ProviderApplicationsPage;
