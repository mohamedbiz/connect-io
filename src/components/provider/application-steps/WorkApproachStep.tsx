
import { ProviderApplicationFormData } from "../ProviderApplicationForm";
import { AvailabilitySection } from "./work-approach/AvailabilitySection";
import { PerformanceGuaranteeSection } from "./work-approach/PerformanceGuaranteeSection";
import { TechnicalAssessmentSection } from "./work-approach/TechnicalAssessmentSection";
import { AdditionalInfoSection } from "./work-approach/AdditionalInfoSection";
import { ReferralSection } from "./work-approach/ReferralSection";

interface WorkApproachStepProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const WorkApproachStep = ({ formData, updateFormData }: WorkApproachStepProps) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold mb-4">Work Approach</h2>
        <p className="text-gray-600 mb-6">
          Tell us about how you work with clients and manage projects.
        </p>
      </div>

      <AvailabilitySection formData={formData} updateFormData={updateFormData} />
      <PerformanceGuaranteeSection formData={formData} updateFormData={updateFormData} />
      <TechnicalAssessmentSection formData={formData} updateFormData={updateFormData} />
      <AdditionalInfoSection formData={formData} updateFormData={updateFormData} />
      <ReferralSection formData={formData} updateFormData={updateFormData} />

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
