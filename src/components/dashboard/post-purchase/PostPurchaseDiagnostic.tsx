import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type PostPurchaseDiagnostic as DiagnosticType } from "@/types/post-purchase-diagnostics";
import SequenceAnalysis from "./SequenceAnalysis";
import ImpactMetrics from "./ImpactMetrics";

const PostPurchaseDiagnostic = () => {
  const { data: diagnostic } = useQuery<DiagnosticType>({
    queryKey: ["postPurchaseDiagnostic"],
    queryFn: async () => ({
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
    })
  });

  if (!diagnostic) {
    return null;
  }

  return (
    <div className="space-y-6">
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
              <span>Score: {diagnostic.overallScore}/100</span>
              <span className="text-muted-foreground">Needs improvement</span>
            </div>
            <Progress value={diagnostic.overallScore} />
          </div>
        </CardContent>
      </Card>

      <ImpactMetrics diagnostic={diagnostic} />
      <SequenceAnalysis sequences={diagnostic.sequences} />
    </div>
  );
};

export default PostPurchaseDiagnostic;
