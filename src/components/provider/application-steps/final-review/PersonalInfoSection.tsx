
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";
import { isSectionComplete, SectionStatus } from "./reviewUtils";

interface PersonalInfoSectionProps {
  formData: ProviderApplicationFormData;
}

export const PersonalInfoSection = ({ formData }: PersonalInfoSectionProps) => {
  const isComplete = isSectionComplete("personal", formData);
  
  return (
    <div className="border rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">1. Personal Information</h3>
        <SectionStatus isComplete={isComplete} />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Full Name:</span>
          <div className="mt-1">{formData.full_name || "Not provided"}</div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Phone Number:</span>
          <div className="mt-1">{formData.phone_number || "Not provided"}</div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Location:</span>
          <div className="mt-1">{formData.location || "Not provided"}</div>
        </div>
        <div>
          <span className="font-medium text-gray-700">LinkedIn:</span>
          <div className="mt-1 truncate">
            {formData.linkedin_url ? (
              <a href={formData.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block">
                {formData.linkedin_url}
              </a>
            ) : (
              "Not provided"
            )}
          </div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Portfolio:</span>
          <div className="mt-1 truncate">
            {formData.portfolio_url ? (
              <a href={formData.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block">
                {formData.portfolio_url}
              </a>
            ) : (
              "Not provided"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
