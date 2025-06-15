
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, User, Briefcase, Star, Award } from "lucide-react";

interface ApplicationDetailsModalProps {
  application: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReviewClick: () => void;
}

const ApplicationDetailsModal = ({
  application,
  open,
  onOpenChange,
  onReviewClick
}: ApplicationDetailsModalProps) => {
  if (!application) return null;

  const data = application.application_data || {};
  const profile = application.profiles;

  const renderScoreCard = () => {
    if (!application.automated_score) return null;

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Automated Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Overall Score</span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">{application.automated_score}/100</span>
              {application.approval_tier && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {application.approval_tier}
                </Badge>
              )}
            </div>
          </div>
          {application.auto_approved && (
            <Badge className="bg-green-100 text-green-800">
              Auto-Approved
            </Badge>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Application Details - {profile?.first_name} {profile?.last_name}
          </DialogTitle>
          <DialogDescription>
            Submitted {formatDistanceToNow(new Date(application.submitted_at), { addSuffix: true })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {renderScoreCard()}

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="font-medium">{data.full_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="font-medium">{data.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="font-medium">{data.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Presence */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Presence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">LinkedIn URL</label>
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{data.linkedin_url}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(data.linkedin_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Portfolio URL</label>
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{data.portfolio_url}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(data.portfolio_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience & Focus */}
          <Card>
            <CardHeader>
              <CardTitle>Experience & Focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Marketing Experience</label>
                  <p className="font-medium">{data.years_email_marketing} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">eCommerce Experience</label>
                  <p className="font-medium">{data.years_ecommerce} years</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Expertise Areas</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.expertise_areas?.map((area: string, index: number) => (
                    <Badge key={index} variant="secondary">{area}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Platforms</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.email_platforms?.map((platform: string, index: number) => (
                    <Badge 
                      key={index} 
                      variant={platform === 'Klaviyo' ? 'default' : 'outline'}
                      className={platform === 'Klaviyo' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Case Study */}
          <Card>
            <CardHeader>
              <CardTitle>Case Study</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Client Industry</label>
                <p className="font-medium">{data.case_study?.client_industry}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Challenge/Goal</label>
                <p className="text-sm leading-relaxed">{data.case_study?.challenge_goal}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Strategy/Solution</label>
                <p className="text-sm leading-relaxed">{data.case_study?.strategy_solution}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Quantifiable Results</label>
                <p className="text-sm leading-relaxed">{data.case_study?.quantifiable_results}</p>
              </div>
            </CardContent>
          </Card>

          {/* Work Style & Agreement */}
          <Card>
            <CardHeader>
              <CardTitle>Work Style & Communication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Communication Process</label>
                <p className="text-sm leading-relaxed">{data.communication_process}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Availability & Capacity</label>
                <p className="text-sm leading-relaxed">{data.availability_capacity}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Terms Agreement:</span>
                  <Badge variant={data.terms_agreement ? 'default' : 'destructive'}>
                    {data.terms_agreement ? 'Accepted' : 'Not Accepted'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Client References:</span>
                  <Badge variant={data.client_references_willing ? 'default' : 'secondary'}>
                    {data.client_references_willing ? 'Willing' : 'Not Willing'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review History */}
          {(application.reviewer_notes || application.technical_assessment_score) && (
            <Card>
              <CardHeader>
                <CardTitle>Review Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {application.technical_assessment_score && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Technical Assessment Score</label>
                    <p className="font-medium">{application.technical_assessment_score}/100</p>
                  </div>
                )}
                {application.reviewer_notes && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Reviewer Notes</label>
                    <p className="text-sm leading-relaxed bg-slate-50 p-3 rounded-md">
                      {application.reviewer_notes}
                    </p>
                  </div>
                )}
                {application.reviewed_at && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Reviewed Date</label>
                    <p className="font-medium">
                      {formatDistanceToNow(new Date(application.reviewed_at), { addSuffix: true })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <Separator className="my-6" />

        <div className="flex justify-end">
          <Button onClick={onReviewClick}>
            <Briefcase className="h-4 w-4 mr-2" />
            Review Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsModal;
