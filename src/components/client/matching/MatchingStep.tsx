
import { useAcquisitionContext } from "../acquisition/AcquisitionContext";
import { BusinessInformationStep } from "../matching-steps/BusinessInformationStep";
import { EmailMarketingNeedsStep } from "../matching-steps/email-marketing";
import { ProviderPreferencesStep } from "../matching-steps/ProviderPreferencesStep";

export const MatchingStep = () => {
  const { currentStep, formData, updateFormData } = useAcquisitionContext();

  // Render the current step
  switch (currentStep) {
    case 0:
      return <BusinessInformationStep formData={formData} updateFormData={updateFormData} />;
    case 1:
      return <EmailMarketingNeedsStep formData={formData} updateFormData={updateFormData} />;
    case 2:
      return <ProviderPreferencesStep formData={formData} updateFormData={updateFormData} />;
    default:
      return <BusinessInformationStep formData={formData} updateFormData={updateFormData} />;
  }
};
