
import { useNewApplicationContext } from "./NewApplicationContext";
import { BasicInformationStep } from "../new-application-steps/BasicInformationStep";
import { ProfessionalPresenceStep } from "../new-application-steps/ProfessionalPresenceStep";
import { ExperienceFocusStep } from "../new-application-steps/ExperienceFocusStep";
import { CaseStudyStep } from "../new-application-steps/CaseStudyStep";
import { WorkStyleAgreementStep } from "../new-application-steps/WorkStyleAgreementStep";

export const NewApplicationStep = () => {
  const { currentStep, formData, updateFormData } = useNewApplicationContext();

  switch (currentStep) {
    case 0:
      return <BasicInformationStep formData={formData} updateFormData={updateFormData} />;
    case 1:
      return <ProfessionalPresenceStep formData={formData} updateFormData={updateFormData} />;
    case 2:
      return <ExperienceFocusStep formData={formData} updateFormData={updateFormData} />;
    case 3:
      return <CaseStudyStep formData={formData} updateFormData={updateFormData} />;
    case 4:
      return <WorkStyleAgreementStep formData={formData} updateFormData={updateFormData} />;
    default:
      return <BasicInformationStep formData={formData} updateFormData={updateFormData} />;
  }
};
