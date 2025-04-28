
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface ExpertiseSelectorProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const ExpertiseSelector = ({ formData, updateFormData }: ExpertiseSelectorProps) => {
  const expertiseAreas = [
    "Abandoned Cart Recovery",
    "Post-Purchase Sequences",
    "Customer Winback Campaigns",
    "Welcome Series Optimization",
    "List Growth Strategies",
    "Email Design",
    "Deliverability Improvement",
    "Segmentation Strategy",
    "A/B Testing & Optimization",
    "Other"
  ];

  const handleExpertiseChange = (expertise: string, isChecked: boolean) => {
    // Limit to 3 selections, unless unchecking
    if (isChecked && formData.expertise_areas.length >= 3 && !formData.expertise_areas.includes(expertise)) {
      return;
    }
    
    if (isChecked) {
      updateFormData({ expertise_areas: [...formData.expertise_areas, expertise] });
    } else {
      updateFormData({
        expertise_areas: formData.expertise_areas.filter(e => e !== expertise)
      });
    }
  };

  return (
    <div className="space-y-3">
      <Label className="required">
        Primary Area(s) of Expertise <span className="font-normal text-sm text-gray-500">(select up to 3)</span>
      </Label>
      
      <div className="grid grid-cols-2 gap-2">
        {expertiseAreas.map((area) => (
          <div className="flex items-center space-x-2" key={area}>
            <Checkbox 
              id={`expertise-${area}`}
              checked={formData.expertise_areas.includes(area)}
              onCheckedChange={(checked) => 
                handleExpertiseChange(area, checked === true)
              }
              disabled={
                !formData.expertise_areas.includes(area) && 
                formData.expertise_areas.length >= 3
              }
            />
            <Label 
              htmlFor={`expertise-${area}`}
              className={`text-sm font-normal cursor-pointer ${
                !formData.expertise_areas.includes(area) && 
                formData.expertise_areas.length >= 3 ? 'text-gray-400' : ''
              }`}
            >
              {area}
            </Label>
          </div>
        ))}
      </div>
      
      {formData.expertise_areas.includes("Other") && (
        <div className="mt-2">
          <Label htmlFor="expertise_other" className="text-sm">Please specify</Label>
          <Input
            id="expertise_other"
            value={formData.expertise_other}
            onChange={(e) => updateFormData({ expertise_other: e.target.value })}
            placeholder="Other expertise areas"
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
};
