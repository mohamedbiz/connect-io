
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Proof of Results (Case Study)</h2>
        <p className="text-gray-600 mb-6">
          Provide one detailed case study of your work with an eCommerce client to demonstrate your expertise and results.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="client_industry" className="text-sm font-medium">
            Client Industry <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="client_industry" 
            value={formData.case_study.client_industry}
            onChange={(e) => updateCaseStudy('client_industry', e.target.value)}
            placeholder="e.g., Fashion & Apparel, Beauty & Skincare, Home & Garden (anonymous if needed)"
            required
          />
          <p className="text-xs text-gray-500">You can keep this anonymous if needed</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="challenge_goal" className="text-sm font-medium">
            Primary Challenge/Goal <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="challenge_goal" 
            value={formData.case_study.challenge_goal}
            onChange={(e) => updateCaseStudy('challenge_goal', e.target.value)}
            placeholder="What was the main challenge or goal when you started working with this client?"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="strategy_solution" className="text-sm font-medium">
            Strategy/Solution Implemented <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="strategy_solution" 
            value={formData.case_study.strategy_solution}
            onChange={(e) => updateCaseStudy('strategy_solution', e.target.value)}
            placeholder="Describe the strategy and specific solutions you implemented"
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantifiable_results" className="text-sm font-medium">
            Quantifiable Results Achieved <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="quantifiable_results" 
            value={formData.case_study.quantifiable_results}
            onChange={(e) => updateCaseStudy('quantifiable_results', e.target.value)}
            placeholder="Provide specific, measurable results (e.g., 35% revenue lift from email, improved open rates from 18% to 28%, 250% increase in automation revenue)"
            rows={4}
            required
          />
          <p className="text-xs text-gray-500">
            Include specific metrics like revenue lift, conversion rates, list growth, automation performance, etc.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Case Study Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Focus on eCommerce-specific results (revenue, conversion rates, LTV indicators)</li>
          <li>• Include before/after metrics where possible</li>
          <li>• Be specific with percentages and concrete numbers</li>
          <li>• Highlight email marketing strategies that directly impacted business growth</li>
        </ul>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
