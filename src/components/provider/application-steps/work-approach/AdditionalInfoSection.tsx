
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";

interface AdditionalInfoSectionProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const AdditionalInfoSection = ({ formData, updateFormData }: AdditionalInfoSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="additional_information">Additional Information</Label>
      <Textarea 
        id="additional_information" 
        value={formData.additional_information}
        onChange={(e) => updateFormData({ additional_information: e.target.value })}
        placeholder="Is there anything else you'd like us to know about your experience or approach?"
        rows={3}
      />
    </div>
  );
};
