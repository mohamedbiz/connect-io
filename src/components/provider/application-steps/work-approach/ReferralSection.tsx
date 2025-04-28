
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";

interface ReferralSectionProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const ReferralSection = ({ formData, updateFormData }: ReferralSectionProps) => {
  const referralSources = [
    "LinkedIn",
    "Referral",
    "Job Board",
    "Other"
  ];

  const handleReferralSourceChange = (source: string, isChecked: boolean) => {
    if (isChecked) {
      updateFormData({ referral_source: source });
    } else if (formData.referral_source === source) {
      updateFormData({ referral_source: "" });
    }
  };

  return (
    <div className="space-y-3">
      <Label className="required">How did you hear about Connect?</Label>
      <div className="grid grid-cols-2 gap-2">
        {referralSources.map((source) => (
          <div className="flex items-center space-x-2" key={source}>
            <Checkbox 
              id={`referral-${source}`}
              checked={formData.referral_source === source}
              onCheckedChange={(checked) => 
                handleReferralSourceChange(source, checked === true)
              }
            />
            <Label 
              htmlFor={`referral-${source}`}
              className="text-sm font-normal cursor-pointer"
            >
              {source}
            </Label>
          </div>
        ))}
      </div>
      
      {formData.referral_source && formData.referral_source !== "LinkedIn" && (
        <div className="mt-2">
          <Label htmlFor="referral_details" className="text-sm">Please specify</Label>
          <Input
            id="referral_details"
            value={formData.referral_details}
            onChange={(e) => updateFormData({ referral_details: e.target.value })}
            placeholder={`Please specify the ${formData.referral_source.toLowerCase()}`}
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
};
