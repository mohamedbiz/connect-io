
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, RefreshCw } from "lucide-react";
import { type PostPurchaseDiagnostic as DiagnosticType } from "@/types/post-purchase-diagnostics";
import SequenceAnalysis from "./SequenceAnalysis";
import ImpactMetrics from "./ImpactMetrics";
import { usePostPurchaseDiagnostics } from "@/hooks/useDiagnostics";
import { Skeleton } from "@/components/ui/skeleton";

const PostPurchaseDiagnostic = () => {
  const { user } = useAuth();
  const { 
    data: diagnostic, 
    isLoading, 
    error,
    saveDiagnostics,
    isSaving
  } = usePostPurchaseDiagnostics(user?.id);
  
  // Local state for diagnostic data (either from DB or sample)
  const [localDiagnostic, setLocalDiagnostic] = useState<DiagnosticType | null>(null);

  useEffect(() => {
    if (diagnostic) {
      setLocalDiagnostic(diagnostic);
    } else if (!isLoading && !error) {
      // If no diagnostic data exists yet, initialize with sample data
      setLocalDiagnostic({
        overallScore: 45,
        currentRepeatRate: 15,
        industryAverage: 25,
        potentialRepeatRate: 35,
        estimatedRevenueLift: 85000,
        sequences: [
          {
            id: "thank-you",
            name: "Thank You Sequence",
            status: "basic",
            impact: "medium",
            description: "Initial post-purchase communication to thank customers and set expectations",
            expectedLift: "10-15% increase in customer satisfaction",
            recommendations: [
              "Add personalized product recommendations",
              "Include order tracking information",
              "Request product reviews after delivery",
            ]
          },
          {
            id: "cross-sell",
            name: "Cross-sell Campaign",
            status: "missing",
            impact: "high",
            description: "Targeted product recommendations based on purchase history",
            expectedLift: "25-35% increase in repeat purchases",
            recommendations: [
              "Implement personalized product recommendations",
              "Add social proof from similar customers",
              "Include limited-time offers for complementary products",
            ]
          },
          {
            id: "feedback",
            name: "Review Request",
            status: "basic",
            impact: "medium",
            description: "Systematic approach to collecting customer feedback and reviews",
            expectedLift: "15-20% increase in product reviews",
            recommendations: [
              "Optimize timing of review requests",
              "Add incentives for leaving reviews",
              "Implement a follow-up sequence for non-responders",
            ]
          }
        ]
      });
    }
  }, [diagnostic, isLoading, error]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        Error loading diagnostic data: {error.message}
      </div>
    );
  }

  if (!localDiagnostic) {
    return (
      <div className="text-center p-6">
        No diagnostic data available
      </div>
    );
  }

  const handleSaveDiagnostics = () => {
    if (user && localDiagnostic) {
      saveDiagnostics(localDiagnostic);
    }
  };

  return (
    <div className="space-y-6">
      {!diagnostic && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-4">
          <p className="text-yellow-800 text-sm">
            This is sample diagnostic data. Save it to your account to keep track of your progress.
          </p>
          <Button 
            onClick={handleSaveDiagnostics} 
            className="mt-2"
            size="sm"
            disabled={isSaving || !user}
          >
            {isSaving ? (
              <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
            ) : (
              <><Check className="mr-2 h-4 w-4" /> Save to My Account</>
            )}
          </Button>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Post-Purchase Sequence Score</CardTitle>
          <CardDescription>
            Analysis of your post-purchase email marketing effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Score: {localDiagnostic.overallScore}/100</span>
              <span className="text-muted-foreground">Needs improvement</span>
            </div>
            <Progress value={localDiagnostic.overallScore} />
          </div>
        </CardContent>
      </Card>

      <ImpactMetrics diagnostic={localDiagnostic} />
      <SequenceAnalysis sequences={localDiagnostic.sequences} />
    </div>
  );
};

export default PostPurchaseDiagnostic;
