
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ResultsMetricsProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const ResultsMetrics = ({ formData, updateFormData }: ResultsMetricsProps) => {
  return (
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
  );
};
