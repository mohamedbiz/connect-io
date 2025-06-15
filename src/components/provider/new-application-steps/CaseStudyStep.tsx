
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Upload } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Results Verification & Case Study</h2>
        <p className="text-gray-600 mb-6">
          Provide ONE detailed case study that demonstrates your email marketing impact for an eCommerce client.
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Case Study Requirements:</strong> Include client industry, your specific approach, baseline metrics, and results achieved with timeframe. You can complete this form or attach a document.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="client_industry" className="text-sm font-medium">
            Client Industry and Challenge <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="client_industry" 
            value={formData.case_study.client_industry}
            onChange={(e) => updateCaseStudy('client_industry', e.target.value)}
            placeholder="Describe the client's industry and the specific challenge they faced"
            required
            rows={3}
            className={!formData.case_study.client_industry ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.case_study.client_industry && (
            <p className="text-xs text-red-600">Client industry and challenge is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="approach_implementation" className="text-sm font-medium">
            Your Specific Approach and Implementations <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="approach_implementation" 
            value={formData.case_study.approach_implementation}
            onChange={(e) => updateCaseStudy('approach_implementation', e.target.value)}
            placeholder="Detail the specific strategies, automations, campaigns, and tactics you implemented"
            required
            rows={4}
            className={!formData.case_study.approach_implementation ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.case_study.approach_implementation && (
            <p className="text-xs text-red-600">Your approach and implementation details are required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="baseline_metrics" className="text-sm font-medium">
            Baseline Metrics Before Your Work <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="baseline_metrics" 
            value={formData.case_study.baseline_metrics}
            onChange={(e) => updateCaseStudy('baseline_metrics', e.target.value)}
            placeholder="What were the starting metrics (revenue, open rates, conversion rates, etc.)?"
            required
            rows={2}
            className={!formData.case_study.baseline_metrics ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.case_study.baseline_metrics && (
            <p className="text-xs text-red-600">Baseline metrics are required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="results_achieved" className="text-sm font-medium">
            Results Achieved (with timeframe) <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="results_achieved" 
            value={formData.case_study.results_achieved}
            onChange={(e) => updateCaseStudy('results_achieved', e.target.value)}
            placeholder="Specific results with timeframe (e.g., 40% revenue increase in 6 months, improved open rates from 20% to 35%)"
            required
            rows={3}
            className={!formData.case_study.results_achieved ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.case_study.results_achieved && (
            <p className="text-xs text-red-600">Results achieved are required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="esp_platform_used" className="text-sm font-medium">
            ESP Platform Used <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="esp_platform_used" 
            value={formData.case_study.esp_platform_used}
            onChange={(e) => updateCaseStudy('esp_platform_used', e.target.value)}
            placeholder="e.g., Klaviyo, Mailchimp, Omnisend"
            required
            className={!formData.case_study.esp_platform_used ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.case_study.esp_platform_used && (
            <p className="text-xs text-red-600">ESP platform used is required</p>
          )}
        </div>
      </div>

      <Alert className="border-yellow-200 bg-yellow-50">
        <Upload className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Alternative Option:</strong> If you have a detailed case study document, you can attach it instead of filling out the form above. However, ensure it includes all the required elements.
        </AlertDescription>
      </Alert>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Case Study Tips</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Include specific percentages and dollar amounts where possible</li>
          <li>• Mention the timeframe for achieving results</li>
          <li>• You can anonymize client details for confidentiality</li>
          <li>• Focus on email marketing specific results (not broader marketing efforts)</li>
        </ul>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields - Maximum 300 words total if completing here
      </div>
    </div>
  );
};
