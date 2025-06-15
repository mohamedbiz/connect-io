
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, TrendingUp, Target, BarChart } from "lucide-react";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface CaseStudyStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

export const CaseStudyStep = ({ formData, updateFormData }: CaseStudyStepProps) => {
  const updateCaseStudy = (field: keyof NewProviderApplicationData['case_study'], value: string) => {
    updateFormData({
      case_study: {
        ...formData.case_study,
        [field]: value
      }
    });
  };

  const validateWordCount = (text: string, minWords: number) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length >= minWords;
  };

  const challengeWordCount = formData.case_study.challenge_goal.trim().split(/\s+/).filter(w => w.length > 0).length;
  const solutionWordCount = formData.case_study.strategy_solution.trim().split(/\s+/).filter(w => w.length > 0).length;
  const resultsWordCount = formData.case_study.quantifiable_results.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Proof of Results (Case Study)</h2>
        <p className="text-gray-600 mb-6">
          Provide one detailed case study of your work with an eCommerce client to demonstrate your expertise and results. 
          This is the most important part of your application.
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Case Study Importance:</strong> This section demonstrates your ability to drive real business results for eCommerce clients. Focus on specific, measurable outcomes that show clear business impact.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="client_industry" className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4" />
            Client Industry <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="client_industry" 
            value={formData.case_study.client_industry}
            onChange={(e) => updateCaseStudy('client_industry', e.target.value)}
            placeholder="e.g., Fashion & Apparel, Beauty & Skincare, Home & Garden"
            required
            className={!formData.case_study.client_industry ? "border-red-300" : ""}
          />
          {!formData.case_study.client_industry && (
            <p className="text-xs text-red-600">Please specify the client's industry</p>
          )}
          <p className="text-xs text-gray-500">
            You can keep this anonymous if needed (e.g., "Mid-size Fashion Brand" instead of the company name)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="challenge_goal" className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Primary Challenge/Goal <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="challenge_goal" 
            value={formData.case_study.challenge_goal}
            onChange={(e) => updateCaseStudy('challenge_goal', e.target.value)}
            placeholder="Describe the main challenge or goal when you started working with this client..."
            rows={4}
            required
            className={!validateWordCount(formData.case_study.challenge_goal, 20) ? "border-red-300" : ""}
          />
          <div className="flex justify-between text-xs">
            <span className={challengeWordCount < 20 ? "text-red-600" : "text-gray-500"}>
              {challengeWordCount}/20 words minimum
            </span>
            {!validateWordCount(formData.case_study.challenge_goal, 20) && challengeWordCount > 0 && (
              <span className="text-red-600">Please provide more detail (minimum 20 words)</span>
            )}
          </div>
          <div className="bg-blue-50 p-3 rounded text-xs text-gray-700">
            <strong>Good examples:</strong>
            <ul className="mt-1 space-y-1">
              <li>• "Email revenue was only 15% of total sales despite having 50k subscribers..."</li>
              <li>• "Cart abandonment rate was 75% with no automated recovery system..."</li>
              <li>• "Welcome series had 8% conversion rate, significantly below industry benchmarks..."</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="strategy_solution" className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Strategy/Solution Implemented <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="strategy_solution" 
            value={formData.case_study.strategy_solution}
            onChange={(e) => updateCaseStudy('strategy_solution', e.target.value)}
            placeholder="Describe the specific strategy and solutions you implemented..."
            rows={5}
            required
            className={!validateWordCount(formData.case_study.strategy_solution, 50) ? "border-red-300" : ""}
          />
          <div className="flex justify-between text-xs">
            <span className={solutionWordCount < 50 ? "text-red-600" : "text-gray-500"}>
              {solutionWordCount}/50 words minimum
            </span>
            {!validateWordCount(formData.case_study.strategy_solution, 50) && solutionWordCount > 0 && (
              <span className="text-red-600">Please provide more detail (minimum 50 words)</span>
            )}
          </div>
          <div className="bg-green-50 p-3 rounded text-xs text-gray-700">
            <strong>Include specific details about:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Email automation flows you created or optimized</li>
              <li>• Segmentation strategies you implemented</li>
              <li>• A/B tests you conducted and insights gained</li>
              <li>• Design or copy improvements you made</li>
              <li>• Technical implementations or integrations</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantifiable_results" className="text-sm font-medium flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Quantifiable Results Achieved <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="quantifiable_results" 
            value={formData.case_study.quantifiable_results}
            onChange={(e) => updateCaseStudy('quantifiable_results', e.target.value)}
            placeholder="Provide specific, measurable results with before/after metrics..."
            rows={4}
            required
            className={!validateWordCount(formData.case_study.quantifiable_results, 30) ? "border-red-300" : ""}
          />
          <div className="flex justify-between text-xs">
            <span className={resultsWordCount < 30 ? "text-red-600" : "text-gray-500"}>
              {resultsWordCount}/30 words minimum
            </span>
            {!validateWordCount(formData.case_study.quantifiable_results, 30) && resultsWordCount > 0 && (
              <span className="text-red-600">Please provide more detail (minimum 30 words)</span>
            )}
          </div>
          <div className="bg-yellow-50 p-3 rounded text-xs text-gray-700">
            <strong>Include specific metrics like:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Revenue increase: "Email revenue grew from $50k to $85k per month (70% increase)"</li>
              <li>• Conversion rates: "Welcome series conversion improved from 8% to 18%"</li>
              <li>• Engagement: "Average open rates increased from 22% to 35%"</li>
              <li>• List growth: "Subscriber list grew 150% while maintaining engagement"</li>
              <li>• ROI: "Email marketing ROI improved from 25:1 to 42:1"</li>
            </ul>
          </div>
        </div>
      </div>

      <Alert className="border-green-200 bg-green-50">
        <TrendingUp className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Pro Tip:</strong> The best case studies show clear before/after metrics with specific percentages, dollar amounts, or other quantifiable improvements. Focus on business impact, not just email metrics.
        </AlertDescription>
      </Alert>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields with minimum word counts for detailed responses
      </div>
    </div>
  );
};
