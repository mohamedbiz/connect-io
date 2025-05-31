
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface ExperienceFocusStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

const EXPERTISE_AREAS = [
  "Strategy",
  "Automation Setup", 
  "Copywriting",
  "Design",
  "Deliverability",
  "List Management",
  "Analytics & Reporting"
];

const EMAIL_PLATFORMS = [
  "Klaviyo",
  "Omnisend",
  "Mailchimp",
  "ActiveCampaign",
  "ConvertKit",
  "Constant Contact",
  "Other"
];

const YEARS_OPTIONS = [
  "1-2 years",
  "3-4 years", 
  "5-7 years",
  "8+ years"
];

export const ExperienceFocusStep = ({ formData, updateFormData }: ExperienceFocusStepProps) => {
  const handleExpertiseChange = (area: string, checked: boolean) => {
    const updated = checked 
      ? [...formData.expertise_areas, area]
      : formData.expertise_areas.filter(a => a !== area);
    updateFormData({ expertise_areas: updated });
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    const updated = checked 
      ? [...formData.email_platforms, platform]
      : formData.email_platforms.filter(p => p !== platform);
    updateFormData({ email_platforms: updated });
    
    // Update Klaviyo required status
    if (platform === "Klaviyo") {
      updateFormData({ klaviyo_required: checked });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Experience & Focus</h2>
        <p className="text-gray-600 mb-6">
          Tell us about your email marketing experience and areas of expertise.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="years_email_marketing" className="text-sm font-medium">
              Years of Email Marketing Experience <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.years_email_marketing} onValueChange={(value) => updateFormData({ years_email_marketing: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select years" />
              </SelectTrigger>
              <SelectContent>
                {YEARS_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="years_ecommerce" className="text-sm font-medium">
              Years Working with eCommerce/DTC Brands <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.years_ecommerce} onValueChange={(value) => updateFormData({ years_ecommerce: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select years" />
              </SelectTrigger>
              <SelectContent>
                {YEARS_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Primary Areas of Email Marketing Expertise <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {EXPERTISE_AREAS.map(area => (
              <div key={area} className="flex items-center space-x-2">
                <Checkbox
                  id={area}
                  checked={formData.expertise_areas.includes(area)}
                  onCheckedChange={(checked) => handleExpertiseChange(area, checked as boolean)}
                />
                <Label htmlFor={area} className="text-sm">{area}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Key Email Platform Expertise <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {EMAIL_PLATFORMS.map(platform => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  id={platform}
                  checked={formData.email_platforms.includes(platform)}
                  onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
                />
                <Label htmlFor={platform} className="text-sm">
                  {platform}
                  {platform === "Klaviyo" && <span className="text-red-500 ml-1">(Required)</span>}
                </Label>
              </div>
            ))}
          </div>
          
          {formData.email_platforms.includes("Klaviyo") ? (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">✓ Klaviyo expertise confirmed</p>
            </div>
          ) : (
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <p className="text-sm text-red-800">⚠ Klaviyo expertise is required for all providers</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
