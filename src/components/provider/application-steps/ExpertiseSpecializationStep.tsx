
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProviderApplicationFormData } from "../ProviderApplicationForm";
import { Checkbox } from "@/components/ui/checkbox";

interface ExpertiseSpecializationStepProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const ExpertiseSpecializationStep = ({ formData, updateFormData }: ExpertiseSpecializationStepProps) => {
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
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold mb-4">Expertise & Specialization</h2>
        <p className="text-gray-600 mb-6">
          Tell us about your areas of expertise and industry specializations.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="required">Primary Area(s) of Expertise <span className="font-normal text-sm text-gray-500">(select up to 3)</span></Label>
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

        <div className="space-y-5">
          <h3 className="font-medium text-lg">Average Results Achieved for Clients</h3>
          
          <div className="space-y-2">
            <Label htmlFor="average_revenue_increase" className="required">
              Average increase in email revenue (%)
            </Label>
            <Input 
              id="average_revenue_increase" 
              value={formData.average_revenue_increase}
              onChange={(e) => updateFormData({ average_revenue_increase: e.target.value })}
              placeholder="e.g. 150"
              type="number"
              min="0"
              max="1000"
              required
              className="w-1/3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="average_conversion_increase" className="required">
              Average improvement in conversion rate (%)
            </Label>
            <Input 
              id="average_conversion_increase" 
              value={formData.average_conversion_increase}
              onChange={(e) => updateFormData({ average_conversion_increase: e.target.value })}
              placeholder="e.g. 25"
              type="number"
              min="0"
              max="500"
              required
              className="w-1/3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="average_churn_reduction" className="required">
              Average reduction in churn rate (%)
            </Label>
            <Input 
              id="average_churn_reduction" 
              value={formData.average_churn_reduction}
              onChange={(e) => updateFormData({ average_churn_reduction: e.target.value })}
              placeholder="e.g. 30"
              type="number"
              min="0"
              max="100"
              required
              className="w-1/3"
            />
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
