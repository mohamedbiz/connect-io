
import { useAcquisitionContext } from "./AcquisitionContext";
import { InitialOutreachStep } from "../acquisition-steps/InitialOutreachStep";
import { DiscoveryCallStep } from "../acquisition-steps/DiscoveryCallStep";
import { StoreAnalysisStep } from "../acquisition-steps/StoreAnalysisStep";
import { OpportunityIdentificationStep } from "../acquisition-steps/OpportunityIdentificationStep";
import { ProposalGenerationStep } from "../acquisition-steps/ProposalGenerationStep";
import { ObjectionHandlingStep } from "../acquisition-steps/ObjectionHandlingStep";

export const AcquisitionStep = () => {
  const { currentStep, formData, updateFormData } = useAcquisitionContext();

  // Render the current step
  switch (currentStep) {
    case 0:
      return <InitialOutreachStep formData={formData} updateFormData={updateFormData} />;
    case 1:
      return <DiscoveryCallStep formData={formData} updateFormData={updateFormData} />;
    case 2:
      return <StoreAnalysisStep formData={formData} updateFormData={updateFormData} />;
    case 3:
      return <OpportunityIdentificationStep formData={formData} updateFormData={updateFormData} />;
    case 4:
      return <ProposalGenerationStep formData={formData} updateFormData={updateFormData} />;
    case 5:
      return <ObjectionHandlingStep formData={formData} updateFormData={updateFormData} />;
    default:
      return <InitialOutreachStep formData={formData} updateFormData={updateFormData} />;
  }
};
