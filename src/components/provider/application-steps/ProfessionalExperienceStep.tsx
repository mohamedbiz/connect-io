
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProviderApplicationFormData } from "../ProviderApplicationForm";
import { Checkbox } from "@/components/ui/checkbox";

interface ProfessionalExperienceStepProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const ProfessionalExperienceStep = ({ formData, updateFormData }: ProfessionalExperienceStepProps) => {
  const emailPlatforms = [
    "Klaviyo",
    "Omnisend",
    "Mailchimp",
    "ActiveCampaign",
    "Drip",
    "Other"
  ];

  const ecommercePlatforms = [
    "Shopify",
    "WooCommerce",
    "BigCommerce",
    "Magento",
    "Other"
  ];

  const handleEmailPlatformChange = (platform: string, isChecked: boolean) => {
    if (isChecked) {
      updateFormData({ email_platforms: [...formData.email_platforms, platform] });
    } else {
      updateFormData({
        email_platforms: formData.email_platforms.filter(p => p !== platform)
      });
    }
  };

  const handleEcommercePlatformChange = (platform: string, isChecked: boolean) => {
    if (isChecked) {
      updateFormData({ ecommerce_platforms: [...formData.ecommerce_platforms, platform] });
    } else {
      updateFormData({
        ecommerce_platforms: formData.ecommerce_platforms.filter(p => p !== platform)
      });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold mb-4">Professional Experience</h2>
        <p className="text-gray-600 mb-6">
          Tell us about your experience with email marketing and eCommerce platforms.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="years_experience" className="required">Years of Email Marketing Experience</Label>
          <Input 
            id="years_experience" 
            type="number"
            value={formData.years_experience}
            onChange={(e) => updateFormData({ years_experience: e.target.value })}
            placeholder="5"
            min="0"
            required
          />
        </div>

        <div className="space-y-3">
          <Label className="required">Primary Email Marketing Platforms</Label>
          <div className="grid grid-cols-2 gap-2">
            {emailPlatforms.map((platform) => (
              <div className="flex items-center space-x-2" key={platform}>
                <Checkbox 
                  id={`email-platform-${platform}`}
                  checked={formData.email_platforms.includes(platform)}
                  onCheckedChange={(checked) => 
                    handleEmailPlatformChange(platform, checked === true)
                  }
                />
                <Label 
                  htmlFor={`email-platform-${platform}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {platform}
                </Label>
              </div>
            ))}
          </div>
          {formData.email_platforms.includes("Other") && (
            <div className="mt-2">
              <Label htmlFor="email_platforms_other" className="text-sm">Please specify</Label>
              <Input
                id="email_platforms_other"
                value={formData.email_platforms_other}
                onChange={(e) => updateFormData({ email_platforms_other: e.target.value })}
                placeholder="Other email platforms"
                className="mt-1"
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label className="required">eCommerce Platforms Experience</Label>
          <div className="grid grid-cols-2 gap-2">
            {ecommercePlatforms.map((platform) => (
              <div className="flex items-center space-x-2" key={platform}>
                <Checkbox 
                  id={`ecommerce-platform-${platform}`}
                  checked={formData.ecommerce_platforms.includes(platform)}
                  onCheckedChange={(checked) => 
                    handleEcommercePlatformChange(platform, checked === true)
                  }
                />
                <Label 
                  htmlFor={`ecommerce-platform-${platform}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {platform}
                </Label>
              </div>
            ))}
          </div>
          {formData.ecommerce_platforms.includes("Other") && (
            <div className="mt-2">
              <Label htmlFor="ecommerce_platforms_other" className="text-sm">Please specify</Label>
              <Input
                id="ecommerce_platforms_other"
                value={formData.ecommerce_platforms_other}
                onChange={(e) => updateFormData({ ecommerce_platforms_other: e.target.value })}
                placeholder="Other eCommerce platforms"
                className="mt-1"
              />
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
