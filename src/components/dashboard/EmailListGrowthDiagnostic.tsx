
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { EmailListGrowthData } from "@/types/email-diagnostics";
import ScoreOverview from "./email-growth/ScoreOverview";
import FormAnalysis from "./email-growth/FormAnalysis";
import ImprovementRecommendations from "./email-growth/ImprovementRecommendations";
import { useEmailDiagnostics } from "@/hooks/useDiagnostics";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Check, RefreshCw } from "lucide-react";

const EmailListGrowthDiagnostic = () => {
  const [selectedForm, setSelectedForm] = useState("popup");
  const { user } = useAuth();
  
  // Fetch diagnostic data from the database
  const { 
    data: diagnostic, 
    isLoading, 
    error, 
    saveDiagnostics,
    isSaving 
  } = useEmailDiagnostics(user?.id);

  // If we don't have diagnostics data yet, provide initial sample data to allow creating
  const [localDiagnostic, setLocalDiagnostic] = useState<EmailListGrowthData | null>(null);

  useEffect(() => {
    if (diagnostic) {
      setLocalDiagnostic(diagnostic);
    } else if (!isLoading && !error) {
      // If no diagnostic data exists yet, initialize with sample data
      setLocalDiagnostic({
        overallScore: 65,
        currentConversionRate: 1.8,
        industryAverage: 3.5,
        potentialConversionRate: 8.5,
        estimatedListGrowth: 370,
        forms: [
          {
            id: "popup",
            name: "Popup Form",
            score: 65,
            currentRate: 1.8,
            industryAverage: 3.5,
            potentialRate: 8.5,
            description: "Your main popup form that appears on the homepage after 5 seconds.",
            improvementTips: [
              "Add a more compelling lead magnet (discount, guide, etc.)",
              "Simplify to collect only email (no name field)",
              "Add social proof ('Join 10,000+ subscribers')",
              "Test exit-intent trigger instead of time-based",
              "Improve visual design and contrast"
            ]
          },
          {
            id: "footer",
            name: "Footer Signup",
            score: 45,
            currentRate: 0.4,
            industryAverage: 1.2,
            potentialRate: 3.0,
            description: "Footer signup form that appears on all pages.",
            improvementTips: [
              "Add a specific benefit statement",
              "Use a more action-oriented CTA than 'Subscribe'",
              "Test different incentives (e.g., 'Get free shipping')",
              "Improve visual hierarchy to draw attention",
              "Add a testimonial about newsletter value"
            ]
          },
          {
            id: "checkout",
            name: "Post-Checkout Opt-in",
            score: 78,
            currentRate: 45.2,
            industryAverage: 40.0,
            potentialRate: 65.0,
            description: "Email opt-in checkbox during checkout process.",
            improvementTips: [
              "Pre-check the opt-in box (if legally allowed in your region)",
              "Highlight specific benefits of subscribing",
              "Mention exclusive offers for subscribers",
              "Add urgency ('Be the first to know')",
              "Separate marketing consent from transactional emails"
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

  const selectedFormData = localDiagnostic.forms.find(form => form.id === selectedForm) || localDiagnostic.forms[0];

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
      
      <ScoreOverview data={localDiagnostic} />
      <FormAnalysis 
        forms={localDiagnostic.forms}
        selectedForm={selectedForm}
        onFormChange={setSelectedForm}
      />
      <ImprovementRecommendations 
        formName={selectedFormData.name}
        tips={selectedFormData.improvementTips}
      />
    </div>
  );
};

export default EmailListGrowthDiagnostic;
