
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface IndustrySelectorProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const IndustrySelector = ({ formData, updateFormData }: IndustrySelectorProps) => {
  const industryTypes = [
    "Fashion/Apparel",
    "Beauty/Cosmetics",
    "Health/Wellness",
    "Food/Beverage",
    "Home/Furniture",
    "Electronics/Gadgets",
    "Subscription Products",
    "Luxury Goods",
    "Other"
  ];

  const handleIndustryChange = (industry: string, isChecked: boolean) => {
    if (isChecked) {
      updateFormData({ industries: [...formData.industries, industry] });
    } else {
      updateFormData({
        industries: formData.industries.filter(i => i !== industry)
      });
    }
  };

  return (
    <div className="space-y-3">
      <Label className="required">Industry/Niche Experience</Label>
      
      <div className="grid grid-cols-2 gap-2">
        {industryTypes.map((industry) => (
          <div className="flex items-center space-x-2" key={industry}>
            <Checkbox 
              id={`industry-${industry}`}
              checked={formData.industries.includes(industry)}
              onCheckedChange={(checked) => 
                handleIndustryChange(industry, checked === true)
              }
            />
            <Label 
              htmlFor={`industry-${industry}`}
              className="text-sm font-normal cursor-pointer"
            >
              {industry}
            </Label>
          </div>
        ))}
      </div>
      
      {formData.industries.includes("Other") && (
        <div className="mt-2">
          <Label htmlFor="industries_other" className="text-sm">Please specify</Label>
          <Input
            id="industries_other"
            value={formData.industries_other}
            onChange={(e) => updateFormData({ industries_other: e.target.value })}
            placeholder="Other industries"
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
};
