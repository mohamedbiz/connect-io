
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProviderApplicationFormData } from "../ProviderApplicationForm";

interface PersonalInfoStepProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const PersonalInfoStep = ({ formData, updateFormData }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <p className="text-gray-600 mb-6">
          Tell us about yourself so we can create your professional profile.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="required">Full Name</Label>
          <Input 
            id="full_name" 
            value={formData.full_name}
            onChange={(e) => updateFormData({ full_name: e.target.value })}
            placeholder="Jane Smith"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone_number" className="required">Phone Number</Label>
          <Input 
            id="phone_number" 
            value={formData.phone_number}
            onChange={(e) => updateFormData({ phone_number: e.target.value })}
            placeholder="+1 234 567 8900"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="required">Location (City/Country)</Label>
          <Input 
            id="location" 
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="New York, USA"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin_url" className="required">LinkedIn Profile URL</Label>
          <Input 
            id="linkedin_url" 
            type="url"
            value={formData.linkedin_url}
            onChange={(e) => updateFormData({ linkedin_url: e.target.value })}
            placeholder="https://linkedin.com/in/yourprofile"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio_url">Portfolio/Website URL</Label>
          <Input 
            id="portfolio_url" 
            type="url"
            value={formData.portfolio_url}
            onChange={(e) => updateFormData({ portfolio_url: e.target.value })}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
