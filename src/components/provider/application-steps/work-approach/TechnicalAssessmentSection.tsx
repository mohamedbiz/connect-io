
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";

interface TechnicalAssessmentSectionProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const TechnicalAssessmentSection = ({ formData, updateFormData }: TechnicalAssessmentSectionProps) => {
  return (
    <div className="space-y-3 bg-gray-50 p-5 rounded-lg border">
      <div className="space-y-2">
        <Label htmlFor="technical_assessment" className="required">Technical Assessment</Label>
        <p className="text-sm text-gray-600">
          As part of the application process, you'll be asked to complete a technical assessment. 
          This will involve analyzing a sample store and providing recommendations.
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox 
            id="technical_assessment"
            checked={formData.technical_assessment}
            onCheckedChange={(checked) => updateFormData({ technical_assessment: checked === true })}
          />
          <Label 
            htmlFor="technical_assessment"
            className="text-sm font-normal cursor-pointer"
          >
            I am willing to complete this assessment
          </Label>
        </div>
      </div>
    </div>
  );
};
