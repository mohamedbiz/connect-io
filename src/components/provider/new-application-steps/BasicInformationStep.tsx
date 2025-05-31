
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface BasicInformationStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

export const BasicInformationStep = ({ formData, updateFormData }: BasicInformationStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Basic Information</h2>
        <p className="text-gray-600 mb-6">
          Let's start with your basic contact information.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="full_name" 
            value={formData.full_name}
            onChange={(e) => updateFormData({ full_name: e.target.value })}
            placeholder="Jane Smith"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="email" 
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="jane@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location (Country/Timezone) <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="location" 
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="New York, USA (EST)"
            required
          />
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
