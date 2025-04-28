
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";

interface PerformanceGuaranteeSectionProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const PerformanceGuaranteeSection = ({ formData, updateFormData }: PerformanceGuaranteeSectionProps) => {
  return (
    <div className="space-y-4 bg-gray-50 p-5 rounded-lg border">
      <div>
        <h3 className="font-medium text-base">Performance Guarantee</h3>
        <p className="text-sm text-gray-600 mt-1">
          Connect guarantees clients a 200% increase in email-generated sales, 30% reduction in churn, and 200% improvement in LTV within 30 days.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label className="required">Are you comfortable working under this performance guarantee?</Label>
        <RadioGroup 
          value={formData.performance_guarantee} 
          onValueChange={(value) => updateFormData({ performance_guarantee: value as "yes" | "no" | "conditional" })}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="guarantee-yes" />
            <Label htmlFor="guarantee-yes" className="font-normal text-sm cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="guarantee-no" />
            <Label htmlFor="guarantee-no" className="font-normal text-sm cursor-pointer">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="conditional" id="guarantee-conditional" />
            <Label htmlFor="guarantee-conditional" className="font-normal text-sm cursor-pointer">Yes, with conditions</Label>
          </div>
        </RadioGroup>
        
        {formData.performance_guarantee === "conditional" && (
          <div className="ml-6 mt-2">
            <Label htmlFor="performance_guarantee_conditions" className="text-sm">Please explain your conditions</Label>
            <Textarea 
              id="performance_guarantee_conditions" 
              value={formData.performance_guarantee_conditions}
              onChange={(e) => updateFormData({ performance_guarantee_conditions: e.target.value })}
              placeholder="Please explain your conditions"
              className="mt-1"
              rows={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};
