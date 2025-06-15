
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, ExternalLink } from "lucide-react";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface ProfessionalPresenceStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

export const ProfessionalPresenceStep = ({ formData, updateFormData }: ProfessionalPresenceStepProps) => {
  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateLinkedInURL = (url: string) => {
    return url.includes('linkedin.com/in/') && validateURL(url);
  };

  const isLinkedInValid = !formData.linkedin_url || validateLinkedInURL(formData.linkedin_url);
  const isPortfolioValid = !formData.portfolio_url || validateURL(formData.portfolio_url);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Professional Presence</h2>
        <p className="text-gray-600 mb-6">
          Share your professional profiles so we can verify your experience and expertise. 
          These profiles help us assess your professional credibility and communication style.
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Professional Review Process:</strong> Our team will review your LinkedIn profile to verify your professional experience and check your portfolio to assess your expertise, work quality, and communication style.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="linkedin_url" className="text-sm font-medium flex items-center gap-2">
            LinkedIn Profile URL <span className="text-red-500">*</span>
            <ExternalLink className="h-3 w-3 text-gray-400" />
          </Label>
          <Input 
            id="linkedin_url" 
            type="url"
            value={formData.linkedin_url}
            onChange={(e) => updateFormData({ linkedin_url: e.target.value })}
            placeholder="https://linkedin.com/in/yourprofile"
            required
            className={!isLinkedInValid ? "border-red-300 focus:border-red-500" : ""}
          />
          {formData.linkedin_url && !isLinkedInValid && (
            <p className="text-xs text-red-600">
              Please enter a valid LinkedIn profile URL (format: https://linkedin.com/in/yourprofile)
            </p>
          )}
          {!formData.linkedin_url && (
            <p className="text-xs text-red-600">LinkedIn profile URL is required</p>
          )}
          <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
            <strong>What we look for:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Complete professional profile with clear work history</li>
              <li>• Evidence of email marketing and eCommerce experience</li>
              <li>• Professional recommendations or endorsements</li>
              <li>• Active engagement in relevant professional communities</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio_url" className="text-sm font-medium flex items-center gap-2">
            Personal Website or Portfolio URL <span className="text-red-500">*</span>
            <ExternalLink className="h-3 w-3 text-gray-400" />
          </Label>
          <Input 
            id="portfolio_url" 
            type="url"
            value={formData.portfolio_url}
            onChange={(e) => updateFormData({ portfolio_url: e.target.value })}
            placeholder="https://yourwebsite.com or https://yourportfolio.com"
            required
            className={!isPortfolioValid ? "border-red-300 focus:border-red-500" : ""}
          />
          {formData.portfolio_url && !isPortfolioValid && (
            <p className="text-xs text-red-600">
              Please enter a valid URL (must start with http:// or https://)
            </p>
          )}
          {!formData.portfolio_url && (
            <p className="text-xs text-red-600">Portfolio or website URL is required</p>
          )}
          <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
            <strong>What we look for:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Professional design and clear navigation</li>
              <li>• Case studies or examples of email marketing work</li>
              <li>• Clear service offerings and expertise areas</li>
              <li>• Client testimonials or results achieved</li>
              <li>• Professional communication style and branding</li>
            </ul>
          </div>
        </div>
      </div>

      <Alert className="border-yellow-200 bg-yellow-50">
        <InfoIcon className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Important:</strong> Make sure your profiles are public and accurately represent your current experience. Any discrepancies between your application and profiles may affect your approval.
        </AlertDescription>
      </Alert>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
