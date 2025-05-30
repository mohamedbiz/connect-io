
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useProviderApplications } from "@/hooks/useProviderApplications";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import ApplicationStatusTracker from "../application/ApplicationStatusTracker";
import { automationService } from '@/services/providerApplicationAutomation';
import { useAuth } from '@/contexts/AuthContext';

const ApplicationStatusTab = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { myApplication, isLoadingMyApplication } = useProviderApplications();
  const [realTimeStatus, setRealTimeStatus] = useState<any>(null);

  useEffect(() => {
    if (myApplication?.id && user) {
      // Subscribe to real-time updates
      const subscription = automationService.subscribeToApplicationUpdates(
        myApplication.id,
        (payload) => {
          console.log('Real-time update received:', payload);
          setRealTimeStatus(payload.new);
          
          // Show notification for status changes
          if (payload.eventType === 'UPDATE') {
            automationService.sendStatusNotification(
              payload.new.id,
              payload.new.status,
              user.email || ''
            );
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [myApplication?.id, user]);

  if (isLoadingMyApplication) {
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

  const currentStatus = realTimeStatus || myApplication;

  return (
    <div className="space-y-6">
      {currentStatus ? (
        <div className="space-y-6">
          {/* Enhanced Status Tracking */}
          <ApplicationStatusTracker 
            applicationId={currentStatus.id}
          />
          
          {/* Traditional Status Display */}
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="font-medium">Status:</div>
                  <ApplicationStatusBadge status={currentStatus.status} />
                </div>
                
                <div>
                  <div className="font-medium mb-2">Submission Date:</div>
                  <div>{new Date(currentStatus.submitted_at).toLocaleDateString()}</div>
                </div>
                
                {currentStatus.automated_score && (
                  <div>
                    <div className="font-medium mb-2">Automated Score:</div>
                    <div className="text-lg font-semibold text-primary">
                      {currentStatus.automated_score}/100
                    </div>
                  </div>
                )}
                
                {currentStatus.approval_tier && (
                  <div>
                    <div className="font-medium mb-2">Approval Tier:</div>
                    <div className="capitalize">{currentStatus.approval_tier}</div>
                  </div>
                )}
                
                {currentStatus.auto_approved && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="text-green-800 font-medium">✅ Auto-Approved</div>
                    <div className="text-green-700 text-sm mt-1">
                      Your application was automatically approved based on your excellent qualifications!
                    </div>
                  </div>
                )}
                
                {currentStatus.reviewed_at && (
                  <div>
                    <div className="font-medium mb-2">Reviewed Date:</div>
                    <div>{new Date(currentStatus.reviewed_at).toLocaleDateString()}</div>
                  </div>
                )}
                
                {currentStatus.reviewer_notes && (
                  <div>
                    <div className="font-medium mb-2">Reviewer Notes:</div>
                    <div className="bg-slate-50 p-3 rounded-md">{currentStatus.reviewer_notes}</div>
                  </div>
                )}
                
                {currentStatus.technical_assessment_score !== null && (
                  <div>
                    <div className="font-medium mb-2">Technical Assessment Score:</div>
                    <div>{currentStatus.technical_assessment_score}/100</div>
                  </div>
                )}

                {currentStatus.status === 'approved' && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h3 className="font-semibold text-blue-800 mb-2">🎉 Welcome to our Provider Network!</h3>
                    <p className="text-blue-700 text-sm mb-3">
                      Congratulations! You can now access all provider features and start connecting with clients.
                    </p>
                    <Button 
                      onClick={() => navigate('/provider-dashboard')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Go to Provider Dashboard
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You haven't submitted a provider application yet.
              </p>
              <Button onClick={() => navigate("/provider-apply")}>
                Apply as Provider
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationStatusTab;
