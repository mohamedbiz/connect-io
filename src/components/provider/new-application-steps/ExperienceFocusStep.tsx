
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, InfoIcon } from "lucide-react";
import { NewProviderApplicationData } from "../application/index";

interface ExperienceFocusStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

const PRIMARY_INDUSTRIES = [
  "Fashion/Apparel",
  "Beauty/Cosmetics", 
  "Health/Wellness",
  "Home/Decor",
  "Food/Beverage",
  "Other"
];

const EMAIL_PLATFORMS = [
  "Klaviyo",
  "Mailchimp",
  "Omnisend",
  "ActiveCampaign",
  "Other"
];

export const ExperienceFocusStep = ({ formData, updateFormData }: ExperienceFocusStepProps) => {
  const handleIndustryChange = (industry: string, checked: boolean) => {
    const updated = checked 
      ? [...(formData.primary_industries || []), industry]
      : (formData.primary_industries || []).filter(i => i !== industry);
    updateFormData({ primary_industries: updated });
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    const updated = checked 
      ? [...formData.email_platforms, platform]
      : formData.email_platforms.filter(p => p !== platform);
    updateFormData({ 
      email_platforms: updated,
      klaviyo_required: updated.includes("Klaviyo")
    });
  };

  const hasKlaviyoExpertise = formData.email_platforms.includes("Klaviyo");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Technical Skills Assessment</h2>
        <p className="text-gray-600 mb-6">
          Tell us about your platform expertise and industry experience.
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Requirements:</strong> We prioritize specialists with Klaviyo expertise and proven eCommerce experience.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Primary ESP Platforms Used <span className="text-red-500">*</span>
          </Label>
          <p className="text-xs text-gray-600 mb-3">Select all platforms where you have hands-on experience</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EMAIL_PLATFORMS.map(platform => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  id={platform}
                  checked={formData.email_platforms.includes(platform)}
                  onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
                />
                <Label htmlFor={platform} className="text-sm flex items-center gap-2">
                  {platform}
                  {platform === "Klaviyo" && (
                    <span className="text-red-500 text-xs font-medium">(Required)</span>
                  )}
                </Label>
              </div>
            ))}
          </div>
          
          {hasKlaviyoExpertise ? (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                ✓ Klaviyo expertise confirmed - you meet our platform requirement!
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                ⚠ Klaviyo expertise is required for all Connect providers.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="klaviyo_proficiency" className="text-sm font-medium">
            Proficiency Level with Klaviyo <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.klaviyo_proficiency} 
            onValueChange={(value) => updateFormData({ klaviyo_proficiency: value })}
          >
            <SelectTrigger className={!formData.klaviyo_proficiency ? "border-red-300" : ""}>
              <SelectValue placeholder="Rate your Klaviyo proficiency (1=Beginner, 5=Expert)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 - Beginner</SelectItem>
              <SelectItem value="2">2 - Basic</SelectItem>
              <SelectItem value="3">3 - Intermediate</SelectItem>
              <SelectItem value="4">4 - Advanced</SelectItem>
              <SelectItem value="5">5 - Expert</SelectItem>
            </SelectContent>
          </Select>
          {!formData.klaviyo_proficiency && (
            <p className="text-xs text-red-600">Please rate your Klaviyo proficiency</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Primary Industries Served <span className="text-red-500">*</span>
          </Label>
          <p className="text-xs text-gray-600 mb-3">Select all industries where you have experience</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PRIMARY_INDUSTRIES.map(industry => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox
                  id={industry}
                  checked={(formData.primary_industries || []).includes(industry)}
                  onCheckedChange={(checked) => handleIndustryChange(industry, checked as boolean)}
                />
                <Label htmlFor={industry} className="text-sm">{industry}</Label>
              </div>
            ))}
          </div>
          
          {(!formData.primary_industries || formData.primary_industries.length === 0) && (
            <p className="text-xs text-red-600">Please select at least one industry</p>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Why This Matters</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• <strong>Klaviyo expertise:</strong> Most of our founder clients use Klaviyo as their primary platform</li>
          <li>• <strong>Industry experience:</strong> Different verticals have unique email marketing needs and best practices</li>
        </ul>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
