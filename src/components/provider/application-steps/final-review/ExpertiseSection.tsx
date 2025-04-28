
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";
import { isSectionComplete, SectionStatus } from "./reviewUtils";

interface ExpertiseSectionProps {
  formData: ProviderApplicationFormData;
}

export const ExpertiseSection = ({ formData }: ExpertiseSectionProps) => {
  const isComplete = isSectionComplete("expertise", formData);
  
  return (
    <div className="border rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">3. Expertise & Specialization</h3>
        <SectionStatus isComplete={isComplete} />
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Areas of Expertise:</span>
          <div className="mt-1">
            {formData.expertise_areas.length > 0 ? 
              formData.expertise_areas.join(", ") + 
              (formData.expertise_areas.includes("Other") ? ` (${formData.expertise_other})` : "") 
              : "None selected"}
          </div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Industry Experience:</span>
          <div className="mt-1">
            {formData.industries.length > 0 ? 
              formData.industries.join(", ") + 
              (formData.industries.includes("Other") ? ` (${formData.industries_other})` : "") 
              : "None selected"}
          </div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Average Results:</span>
          <div className="grid grid-cols-3 gap-4 mt-1">
            <div>
              <span className="text-xs text-gray-500">Email Revenue Increase</span>
              <div className="font-semibold">{formData.average_revenue_increase}%</div>
            </div>
            <div>
              <span className="text-xs text-gray-500">Conversion Rate Improvement</span>
              <div className="font-semibold">{formData.average_conversion_increase}%</div>
            </div>
            <div>
              <span className="text-xs text-gray-500">Churn Rate Reduction</span>
              <div className="font-semibold">{formData.average_churn_reduction}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
