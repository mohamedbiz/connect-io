
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";
import { isSectionComplete, SectionStatus } from "./reviewUtils";

interface WorkApproachSectionProps {
  formData: ProviderApplicationFormData;
}

export const WorkApproachSection = ({ formData }: WorkApproachSectionProps) => {
  const isComplete = isSectionComplete("workApproach", formData);
  
  return (
    <div className="border rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">5. Work Approach</h3>
        <SectionStatus isComplete={isComplete} />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Availability:</span>
          <div className="mt-1">{formData.availability || "Not provided"} hours/week</div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Typical Timeline:</span>
          <div className="mt-1">{formData.typical_timeline || "Not provided"}</div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Communication:</span>
          <div className="mt-1">{formData.communication_preferences || "Not provided"}</div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Project Management Tools:</span>
          <div className="mt-1">{formData.project_management_tools || "Not provided"}</div>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-700">Performance Guarantee:</span>
          <div className="mt-1">
            {formData.performance_guarantee === "yes" && "Yes, I can work under this guarantee"}
            {formData.performance_guarantee === "no" && "No, I cannot work under this guarantee"}
            {formData.performance_guarantee === "conditional" && 
              `Yes, with conditions: ${formData.performance_guarantee_conditions}`}
          </div>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-700">Referral Source:</span>
          <div className="mt-1">
            {formData.referral_source || "Not provided"} 
            {formData.referral_source && formData.referral_source !== "LinkedIn" && formData.referral_details ? 
              ` (${formData.referral_details})` : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
