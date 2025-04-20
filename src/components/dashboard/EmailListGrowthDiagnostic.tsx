import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EmailListGrowthData } from "@/types/email-diagnostics";
import ScoreOverview from "./email-growth/ScoreOverview";
import FormAnalysis from "./email-growth/FormAnalysis";
import ImprovementRecommendations from "./email-growth/ImprovementRecommendations";

const EmailListGrowthDiagnostic = () => {
  const [selectedForm, setSelectedForm] = useState("popup");

  const { data: diagnostic } = useQuery<EmailListGrowthData>({
    queryKey: ["emailListGrowth"],
    queryFn: async () => ({
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
    }),
  });

  if (!diagnostic) {
    return null;
  }

  const selectedFormData = diagnostic.forms.find(form => form.id === selectedForm) || diagnostic.forms[0];

  return (
    <div className="space-y-6">
      <ScoreOverview data={diagnostic} />
      <FormAnalysis 
        forms={diagnostic.forms}
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
