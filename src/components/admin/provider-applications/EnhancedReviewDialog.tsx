
import { useState } from "react";
import { Clock, CheckCircle, XCircle, Star, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface EnhancedReviewDialogProps {
  application: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewerNotes: string;
  setReviewerNotes: (notes: string) => void;
  technicalScore: number;
  setTechnicalScore: (score: number) => void;
  isFeatured: boolean;
  setIsFeatured: (featured: boolean) => void;
  onUpdateStatus: (status: 'in_review' | 'approved' | 'rejected') => void;
  isUpdating: boolean;
}

const EnhancedReviewDialog = ({
  application,
  open,
  onOpenChange,
  reviewerNotes,
  setReviewerNotes,
  technicalScore,
  setTechnicalScore,
  isFeatured,
  setIsFeatured,
  onUpdateStatus,
  isUpdating
}: EnhancedReviewDialogProps) => {
  const [verificationChecklist, setVerificationChecklist] = useState({
    linkedinVerified: false,
    portfolioVerified: false,
    experienceVerified: false,
    klaviyoExpertise: false,
    caseStudyRealistic: false
  });

  if (!application) return null;

  const data = application.application_data || {};
  const profile = application.profiles;

  const getRecommendation = () => {
    const score = application.automated_score || 0;
    const checkedItems = Object.values(verificationChecklist).filter(Boolean).length;
    
    if (score >= 85 && checkedItems >= 4) {
      return { action: 'approve', color: 'text-green-600', message: 'Strong candidate - Recommended for approval' };
    } else if (score >= 70 && checkedItems >= 3) {
      return { action: 'review', color: 'text-yellow-600', message: 'Good candidate - Additional review recommended' };
    } else {
      return { action: 'reject', color: 'text-red-600', message: 'Needs improvement - Consider rejection or request more info' };
    }
  };

  const recommendation = getRecommendation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Review Application - {profile?.first_name} {profile?.last_name}
          </DialogTitle>
          <DialogDescription>
            Complete your review and update the application status
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Application Summary */}
          <div className="space-y-4">
            {/* Automated Score */}
            {application.automated_score && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Automated Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Score</span>
                    <span className="text-2xl font-bold text-primary">
                      {application.automated_score}/100
                    </span>
                  </div>
                  <Progress value={application.automated_score} className="h-2" />
                  {application.approval_tier && (
                    <Badge variant="outline">
                      {application.approval_tier} tier
                    </Badge>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Key Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email Marketing:</span>
                  <span className="font-medium">{data.years_email_marketing} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">eCommerce:</span>
                  <span className="font-medium">{data.years_ecommerce} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Klaviyo Expert:</span>
                  <Badge variant={data.email_platforms?.includes('Klaviyo') ? 'default' : 'destructive'}>
                    {data.email_platforms?.includes('Klaviyo') ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{data.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Verification Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => window.open(data.linkedin_url, '_blank')}
                >
                  View LinkedIn Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => window.open(data.portfolio_url, '_blank')}
                >
                  View Portfolio
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Review Form */}
          <div className="space-y-4">
            {/* Verification Checklist */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Verification Checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="linkedin"
                    checked={verificationChecklist.linkedinVerified}
                    onCheckedChange={(checked) => 
                      setVerificationChecklist(prev => ({ ...prev, linkedinVerified: checked as boolean }))
                    }
                  />
                  <label htmlFor="linkedin" className="text-sm">LinkedIn profile verified</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="portfolio"
                    checked={verificationChecklist.portfolioVerified}
                    onCheckedChange={(checked) => 
                      setVerificationChecklist(prev => ({ ...prev, portfolioVerified: checked as boolean }))
                    }
                  />
                  <label htmlFor="portfolio" className="text-sm">Portfolio quality verified</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="experience"
                    checked={verificationChecklist.experienceVerified}
                    onCheckedChange={(checked) => 
                      setVerificationChecklist(prev => ({ ...prev, experienceVerified: checked as boolean }))
                    }
                  />
                  <label htmlFor="experience" className="text-sm">Experience claims verified</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="klaviyo"
                    checked={verificationChecklist.klaviyoExpertise}
                    onCheckedChange={(checked) => 
                      setVerificationChecklist(prev => ({ ...prev, klaviyoExpertise: checked as boolean }))
                    }
                  />
                  <label htmlFor="klaviyo" className="text-sm">Klaviyo expertise confirmed</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="casestudy"
                    checked={verificationChecklist.caseStudyRealistic}
                    onCheckedChange={(checked) => 
                      setVerificationChecklist(prev => ({ ...prev, caseStudyRealistic: checked as boolean }))
                    }
                  />
                  <label htmlFor="casestudy" className="text-sm">Case study realistic</label>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-sm">Recommendation</span>
                </div>
                <p className={`text-sm ${recommendation.color} font-medium`}>
                  {recommendation.message}
                </p>
              </CardContent>
            </Card>

            {/* Review Form */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Review Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Technical Assessment Score</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={technicalScore}
                    onChange={(e) => setTechnicalScore(Number(e.target.value))}
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="0-100"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={isFeatured}
                    onCheckedChange={(checked) => setIsFeatured(checked as boolean)}
                  />
                  <label htmlFor="featured" className="text-sm font-medium">Mark as Featured Provider</label>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Reviewer Notes</label>
                  <Textarea
                    placeholder="Add your detailed review notes, feedback, or reasons for decision..."
                    value={reviewerNotes}
                    onChange={(e) => setReviewerNotes(e.target.value)}
                    className="min-h-[100px] text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button 
              variant="secondary"
              onClick={() => onUpdateStatus('in_review')}
              disabled={isUpdating}
            >
              <Clock className="mr-2 h-4 w-4" />
              Mark In Review
            </Button>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="destructive"
              onClick={() => onUpdateStatus('rejected')}
              disabled={isUpdating}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button 
              variant="default"
              onClick={() => onUpdateStatus('approved')}
              disabled={isUpdating}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedReviewDialog;
