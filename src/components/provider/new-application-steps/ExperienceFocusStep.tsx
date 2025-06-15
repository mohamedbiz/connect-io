
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, InfoIcon } from "lucide-react";
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
  { value: "1-2 years", label: "1-2 years" },
  { value: "3-4 years", label: "3-4 years" },
  { value: "5-7 years", label: "5-7 years" },
  { value: "8+ years", label: "8+ years" }
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
    updateFormData({ 
      email_platforms: updated,
      klaviyo_required: updated.includes("Klaviyo")
    });
  };

  const hasKlaviyoExpertise = formData.email_platforms.includes("Klaviyo");
  const hasMinimumExpertise = formData.expertise_areas.length >= 2;
  const hasValidExperience = formData.years_email_marketing && formData.years_ecommerce;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Experience & Focus</h2>
        <p className="text-gray-600 mb-6">
          Tell us about your email marketing experience and areas of expertise. 
          We prioritize specialists with deep eCommerce experience and Klaviyo expertise.
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Minimum Requirements:</strong> We require at least 1-2 years of email marketing experience, direct eCommerce/DTC experience, and Klaviyo expertise.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="years_email_marketing" className="text-sm font-medium">
              Years of Email Marketing Experience <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.years_email_marketing} 
              onValueChange={(value) => updateFormData({ years_email_marketing: value })}
            >
              <SelectTrigger className={!formData.years_email_marketing ? "border-red-300" : ""}>
                <SelectValue placeholder="Select years of experience" />
              </SelectTrigger>
              <SelectContent>
                {YEARS_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!formData.years_email_marketing && (
              <p className="text-xs text-red-600">Please select your email marketing experience</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="years_ecommerce" className="text-sm font-medium">
              Years Working with eCommerce/DTC Brands <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.years_ecommerce} 
              onValueChange={(value) => updateFormData({ years_ecommerce: value })}
            >
              <SelectTrigger className={!formData.years_ecommerce ? "border-red-300" : ""}>
                <SelectValue placeholder="Select eCommerce experience" />
              </SelectTrigger>
              <SelectContent>
                {YEARS_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!formData.years_ecommerce && (
              <p className="text-xs text-red-600">Please select your eCommerce experience</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Primary Areas of Email Marketing Expertise <span className="text-red-500">*</span>
          </Label>
          <p className="text-xs text-gray-600 mb-3">Select at least 2 areas where you have strong expertise</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          
          {formData.expertise_areas.length > 0 && !hasMinimumExpertise && (
            <p className="text-xs text-red-600">Please select at least 2 areas of expertise</p>
          )}
          {formData.expertise_areas.length === 0 && (
            <p className="text-xs text-red-600">Please select your areas of expertise</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Key Email Platform Expertise <span className="text-red-500">*</span>
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
                ⚠ Klaviyo expertise is required for all Connect providers. Please select Klaviyo if you have experience with this platform.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Why These Requirements Matter</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• <strong>Klaviyo expertise:</strong> Most of our founder clients use Klaviyo as their primary platform</li>
          <li>• <strong>eCommerce experience:</strong> DTC brands have unique needs different from other industries</li>
          <li>• <strong>Multiple expertise areas:</strong> Demonstrates depth and ability to handle complex projects</li>
        </ul>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
