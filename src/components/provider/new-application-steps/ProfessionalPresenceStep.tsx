
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface ProfessionalPresenceStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

export const ProfessionalPresenceStep = ({ formData, updateFormData }: ProfessionalPresenceStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Key Achievements & Portfolio</h2>
        <p className="text-gray-600 mb-6">
          Share your most significant results and provide links to your professional presence.
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Provide specific, quantifiable results that demonstrate your expertise in email marketing for eCommerce.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="significant_revenue_increase" className="text-sm font-medium">
            Most Significant Revenue Increase <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="significant_revenue_increase" 
            value={formData.significant_revenue_increase}
            onChange={(e) => updateFormData({ significant_revenue_increase: e.target.value })}
            placeholder="What's the most significant revenue increase you've achieved for a client through email marketing? Include timeframe and specific tactics used. (150 words max)"
            required
            rows={4}
            maxLength={750}
            className={!formData.significant_revenue_increase ? "border-red-300 focus:border-red-500" : ""}
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {formData.significant_revenue_increase?.length || 0}/750 characters (≈150 words max)
            </div>
          </div>
          {!formData.significant_revenue_increase && (
            <p className="text-xs text-red-600">Please describe your most significant revenue increase</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="best_results_achieved" className="text-sm font-medium">
            Best Results Generated <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="best_results_achieved" 
            value={formData.best_results_achieved}
            onChange={(e) => updateFormData({ best_results_achieved: e.target.value })}
            placeholder="What are the best results you generated so far? Briefly describe how. (150 words max)"
            required
            rows={4}
            maxLength={750}
            className={!formData.best_results_achieved ? "border-red-300 focus:border-red-500" : ""}
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {formData.best_results_achieved?.length || 0}/750 characters (≈150 words max)
            </div>
          </div>
          {!formData.best_results_achieved && (
            <p className="text-xs text-red-600">Please describe your best results</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin_url" className="text-sm font-medium">
            LinkedIn Profile URL <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="linkedin_url" 
            type="url"
            value={formData.linkedin_url}
            onChange={(e) => updateFormData({ linkedin_url: e.target.value })}
            placeholder="https://linkedin.com/in/yourprofile"
            required
            className={!formData.linkedin_url ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.linkedin_url && (
            <p className="text-xs text-red-600">LinkedIn profile URL is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio_url" className="text-sm font-medium">
            Portfolio/Website URL (Optional)
          </Label>
          <Input 
            id="portfolio_url" 
            type="url"
            value={formData.portfolio_url}
            onChange={(e) => updateFormData({ portfolio_url: e.target.value })}
            placeholder="https://yourportfolio.com or additional work examples"
          />
          <p className="text-xs text-gray-500">
            Website, portfolio, or additional profile where we can see more examples of your work
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
        <p className="text-sm text-gray-700">
          Next, we'll assess your technical skills and platform expertise in detail.
        </p>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
