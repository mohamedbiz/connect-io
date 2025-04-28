
import { ProviderApplicationFormData } from "../ProviderApplicationForm";
import { ExpertiseSelector } from "./expertise-specialization/ExpertiseSelector";
import { IndustrySelector } from "./expertise-specialization/IndustrySelector";
import { ResultsMetrics } from "./expertise-specialization/ResultsMetrics";

interface ExpertiseSpecializationStepProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const ExpertiseSpecializationStep = ({ formData, updateFormData }: ExpertiseSpecializationStepProps) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold mb-4">Expertise & Specialization</h2>
        <p className="text-gray-600 mb-6">
          Tell us about your areas of expertise and industry specializations.
        </p>
      </div>

      <div className="space-y-6">
        <ExpertiseSelector formData={formData} updateFormData={updateFormData} />
        <IndustrySelector formData={formData} updateFormData={updateFormData} />
        <ResultsMetrics formData={formData} updateFormData={updateFormData} />
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
