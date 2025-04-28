
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";
import { isSectionComplete, SectionStatus } from "./reviewUtils";

interface ProfessionalExperienceSectionProps {
  formData: ProviderApplicationFormData;
}

export const ProfessionalExperienceSection = ({ formData }: ProfessionalExperienceSectionProps) => {
  const isComplete = isSectionComplete("professional", formData);
  
  return (
    <div className="border rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">2. Professional Experience</h3>
        <SectionStatus isComplete={isComplete} />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Years Experience:</span>
          <div className="mt-1">{formData.years_experience || "Not provided"}</div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Email Platforms:</span>
          <div className="mt-1">
            {formData.email_platforms.length > 0 ? 
              formData.email_platforms.join(", ") + 
              (formData.email_platforms.includes("Other") ? ` (${formData.email_platforms_other})` : "") 
              : "None selected"}
          </div>
        </div>
        <div>
          <span className="font-medium text-gray-700">eCommerce Platforms:</span>
          <div className="mt-1">
            {formData.ecommerce_platforms.length > 0 ? 
              formData.ecommerce_platforms.join(", ") + 
              (formData.ecommerce_platforms.includes("Other") ? ` (${formData.ecommerce_platforms_other})` : "") 
              : "None selected"}
          </div>
        </div>
      </div>
    </div>
  );
};
