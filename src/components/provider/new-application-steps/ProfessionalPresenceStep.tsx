
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface ProfessionalPresenceStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

export const ProfessionalPresenceStep = ({ formData, updateFormData }: ProfessionalPresenceStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Professional Presence</h2>
        <p className="text-gray-600 mb-6">
          Share your professional profiles so we can verify your experience and expertise.
        </p>
      </div>

      <div className="space-y-4">
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
          />
          <p className="text-xs text-gray-500">
            We'll review your LinkedIn profile to verify your professional experience
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio_url" className="text-sm font-medium">
            Personal Website or Portfolio URL <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="portfolio_url" 
            type="url"
            value={formData.portfolio_url}
            onChange={(e) => updateFormData({ portfolio_url: e.target.value })}
            placeholder="https://yourwebsite.com"
            required
          />
          <p className="text-xs text-gray-500">
            This helps us assess your branding, communication style, and work examples
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Why we need this information</h3>
        <p className="text-sm text-blue-800">
          Your professional profiles help us verify your experience and ensure you meet our quality standards. 
          We look for completeness, professionalism, and relevant eCommerce email marketing experience.
        </p>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
