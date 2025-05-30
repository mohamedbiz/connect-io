
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, Star, Trophy, Award } from 'lucide-react';
import { automationService, ApplicationScore } from '@/services/providerApplicationAutomation';
import { useAuth } from '@/contexts/AuthContext';

interface ApplicationStatusTrackerProps {
  applicationData?: any;
  applicationId?: string;
}

const ApplicationStatusTracker = ({ applicationData, applicationId }: ApplicationStatusTrackerProps) => {
  const { user } = useAuth();
  const [score, setScore] = useState<ApplicationScore | null>(null);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (applicationData) {
      const calculatedScore = automationService.calculateScore(applicationData);
      setScore(calculatedScore);
      setLoading(false);
    }
  }, [applicationData]);

  useEffect(() => {
    if (applicationId) {
      loadApplicationStatus();
      
      // Subscribe to real-time updates
      const subscription = automationService.subscribeToApplicationUpdates(
        applicationId,
        handleStatusUpdate
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [applicationId]);

  const loadApplicationStatus = async () => {
    if (!applicationId) return;
    
    const statusData = await automationService.getApplicationStatus(applicationId);
    setStatus(statusData);
    setLoading(false);
  };

  const handleStatusUpdate = (payload: any) => {
    console.log('Application status updated:', payload);
    if (payload.table === 'provider_applications') {
      setStatus(payload.new);
      
      // Show notification for status changes
      if (payload.eventType === 'UPDATE' && user) {
        automationService.sendStatusNotification(
          payload.new.id,
          payload.new.status,
          user.email || ''
        );
      }
    }
  };

  const getStatusIcon = (currentStatus: string) => {
    switch (currentStatus) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium':
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 'verified':
        return <Award className="h-4 w-4 text-blue-500" />;
      default:
        return <Star className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'in_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Score Preview (for application in progress) */}
      {score && !status && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Application Score Preview
              {getTierIcon(score.tier)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Score</span>
              <span className="text-2xl font-bold text-primary">{score.score}/100</span>
            </div>
            
            <Progress value={score.score} className="h-2" />
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                {getTierIcon(score.tier)}
                {score.tier.charAt(0).toUpperCase() + score.tier.slice(1)} Tier
              </Badge>
              
              {score.autoApproved && (
                <Badge className="bg-green-100 text-green-800">
                  Auto-Approval Eligible
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Score Breakdown:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span>{score.breakdown.experience}pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Expertise:</span>
                  <span>{score.breakdown.expertise}pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Case Studies:</span>
                  <span>{score.breakdown.caseStudies}pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Portfolio:</span>
                  <span>{score.breakdown.portfolio}pts</span>
                </div>
                <div className="flex justify-between">
                  <span>LinkedIn:</span>
                  <span>{score.breakdown.linkedin}pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Guarantee:</span>
                  <span>{score.breakdown.guarantee}pts</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Application Status (for submitted applications) */}
      {status && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Application Status
              {getStatusIcon(status.status)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Status</span>
              <Badge className={getStatusColor(status.status)}>
                {status.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>

            {status.automated_score && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Automated Score</span>
                  <span className="text-lg font-semibold">{status.automated_score}/100</span>
                </div>
                <Progress value={status.automated_score} className="h-2" />
              </div>
            )}

            {status.approval_tier && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  {getTierIcon(status.approval_tier)}
                  {status.approval_tier.charAt(0).toUpperCase() + status.approval_tier.slice(1)} Tier
                </Badge>
                
                {status.auto_approved && (
                  <Badge className="bg-green-100 text-green-800">
                    Auto-Approved
                  </Badge>
                )}
              </div>
            )}

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Submitted:</span>
                <span>{new Date(status.submitted_at).toLocaleDateString()}</span>
              </div>
              
              {status.reviewed_at && (
                <div className="flex justify-between">
                  <span>Reviewed:</span>
                  <span>{new Date(status.reviewed_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {status.reviewer_notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <h4 className="font-medium text-sm mb-2">Reviewer Notes:</h4>
                <p className="text-sm text-gray-700">{status.reviewer_notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationStatusTracker;
