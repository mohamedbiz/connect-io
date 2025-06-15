
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, AlertTriangleIcon } from "lucide-react";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface CaseStudyStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

export const CaseStudyStep = ({ formData, updateFormData }: CaseStudyStepProps) => {
  const updateCaseStudy = (field: string, value: string) => {
    updateFormData({
      case_study: {
        ...formData.case_study,
        [field]: value
      }
    });
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const challengeWordCount = getWordCount(formData.case_study.challenge_goal);
  const solutionWordCount = getWordCount(formData.case_study.strategy_solution);
  const resultsWordCount = getWordCount(formData.case_study.quantifiable_results);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Proof of Results (Case Study)</h2>
        <p className="text-gray-600 mb-6">
          Provide one detailed case study that demonstrates your expertise and the results you've achieved for an eCommerce client. This is your opportunity to showcase your impact.
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Case Study Guidelines:</strong> Choose your most impressive eCommerce email marketing project. Be specific about metrics and results. You can anonymize client details for confidentiality.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="client_industry" className="text-sm font-medium">
            Client Industry <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="client_industry" 
            value={formData.case_study.client_industry}
            onChange={(e) => updateCaseStudy('client_industry', e.target.value)}
            placeholder="e.g., Fashion, Beauty, Home Goods, Supplements"
            required
            className={!formData.case_study.client_industry ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.case_study.client_industry && (
            <p className="text-xs text-red-600">Client industry is required</p>
          )}
          <p className="text-xs text-gray-500">
            You can keep this general for client confidentiality
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="challenge_goal" className="text-sm font-medium">
            Primary Challenge/Goal <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="challenge_goal" 
            value={formData.case_study.challenge_goal}
            onChange={(e) => updateCaseStudy('challenge_goal', e.target.value)}
            placeholder="What specific challenge were you hired to solve? What was the primary goal? Be specific about the business problem."
            required
            rows={4}
            className={!formData.case_study.challenge_goal ? "border-red-300 focus:border-red-500" : ""}
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {challengeWordCount < 50 && (
                <span className="text-amber-600 flex items-center gap-1">
                  <AlertTriangleIcon className="h-3 w-3" />
                  Minimum 50 words recommended for detailed explanation
                </span>
              )}
              {challengeWordCount >= 50 && (
                <span className="text-green-600">Good detail level</span>
              )}
            </div>
            <span className="text-xs text-gray-400">{challengeWordCount} words</span>
          </div>
          {!formData.case_study.challenge_goal && (
            <p className="text-xs text-red-600">Challenge/goal description is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="strategy_solution" className="text-sm font-medium">
            Strategy/Solution Implemented <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="strategy_solution" 
            value={formData.case_study.strategy_solution}
            onChange={(e) => updateCaseStudy('strategy_solution', e.target.value)}
            placeholder="Describe the specific email marketing strategy and tactics you implemented. Include details about campaigns, automation, segmentation, etc."
            required
            rows={6}
            className={!formData.case_study.strategy_solution ? "border-red-300 focus:border-red-500" : ""}
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {solutionWordCount < 100 && (
                <span className="text-amber-600 flex items-center gap-1">
                  <AlertTriangleIcon className="h-3 w-3" />
                  Minimum 100 words recommended for comprehensive explanation
                </span>
              )}
              {solutionWordCount >= 100 && (
                <span className="text-green-600">Comprehensive detail level</span>
              )}
            </div>
            <span className="text-xs text-gray-400">{solutionWordCount} words</span>
          </div>
          {!formData.case_study.strategy_solution && (
            <p className="text-xs text-red-600">Strategy/solution description is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantifiable_results" className="text-sm font-medium">
            Quantifiable Results Achieved <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="quantifiable_results" 
            value={formData.case_study.quantifiable_results}
            onChange={(e) => updateCaseStudy('quantifiable_results', e.target.value)}
            placeholder="Provide specific metrics: revenue increase (% or $), email performance improvements (open rates, click rates), list growth, conversion improvements, etc."
            required
            rows={4}
            className={!formData.case_study.quantifiable_results ? "border-red-300 focus:border-red-500" : ""}
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {resultsWordCount < 30 && (
                <span className="text-amber-600 flex items-center gap-1">
                  <AlertTriangleIcon className="h-3 w-3" />
                  Include specific metrics and percentages
                </span>
              )}
              {resultsWordCount >= 30 && (
                <span className="text-green-600">Good metrics detail</span>
              )}
            </div>
            <span className="text-xs text-gray-400">{resultsWordCount} words</span>
          </div>
          {!formData.case_study.quantifiable_results && (
            <p className="text-xs text-red-600">Quantifiable results are required</p>
          )}
        </div>
      </div>

      <Alert className="border-green-200 bg-green-50">
        <InfoIcon className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Success Examples:</strong> "Increased email revenue by 40% ($15K additional monthly revenue)", "Improved email deliverability from 85% to 96%", "Grew email list by 250% in 6 months while maintaining quality"
        </AlertDescription>
      </Alert>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
        <p className="text-sm text-gray-700">
          After completing your case study, we'll ask about your work style, communication preferences, and agreement to our platform terms.
        </p>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
