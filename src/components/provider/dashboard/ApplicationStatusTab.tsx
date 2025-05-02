
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useProviderApplications } from "@/hooks/useProviderApplications";
import ApplicationStatusBadge from "./ApplicationStatusBadge";

const ApplicationStatusTab = () => {
  const navigate = useNavigate();
  const { myApplication } = useProviderApplications();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
      </CardHeader>
      <CardContent>
        {myApplication ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="font-medium">Status:</div>
              <ApplicationStatusBadge status={myApplication.status} />
            </div>
            
            <div>
              <div className="font-medium mb-2">Submission Date:</div>
              <div>{new Date(myApplication.submitted_at).toLocaleDateString()}</div>
            </div>
            
            {myApplication.reviewed_at && (
              <div>
                <div className="font-medium mb-2">Reviewed Date:</div>
                <div>{new Date(myApplication.reviewed_at).toLocaleDateString()}</div>
              </div>
            )}
            
            {myApplication.reviewer_notes && (
              <div>
                <div className="font-medium mb-2">Reviewer Notes:</div>
                <div className="bg-slate-50 p-3 rounded-md">{myApplication.reviewer_notes}</div>
              </div>
            )}
            
            {myApplication.technical_assessment_score !== null && (
              <div>
                <div className="font-medium mb-2">Technical Assessment Score:</div>
                <div>{myApplication.technical_assessment_score}/100</div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              You haven't submitted a provider application yet.
            </p>
            <Button onClick={() => navigate("/provider-apply")}>
              Apply as Provider
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationStatusTab;
