
import { useApplicationContext } from "./ApplicationContext";
import { PersonalInfoStep } from "../application-steps/PersonalInfoStep";
import { ProfessionalExperienceStep } from "../application-steps/ProfessionalExperienceStep";
import { ExpertiseSpecializationStep } from "../application-steps/ExpertiseSpecializationStep";
import { CaseStudiesStep } from "../application-steps/CaseStudiesStep";
import { WorkApproachStep } from "../application-steps/WorkApproachStep";
import { FinalStepReview } from "../application-steps/FinalStepReview";

export const ApplicationStep = () => {
  const { currentStep, formData, updateFormData } = useApplicationContext();

  // Render the current step
  switch (currentStep) {
    case 0:
      return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
    case 1:
      return <ProfessionalExperienceStep formData={formData} updateFormData={updateFormData} />;
    case 2:
      return <ExpertiseSpecializationStep formData={formData} updateFormData={updateFormData} />;
    case 3:
      return <CaseStudiesStep formData={formData} updateFormData={updateFormData} />;
    case 4:
      return <WorkApproachStep formData={formData} updateFormData={updateFormData} />;
    case 5:
      return <FinalStepReview formData={formData} />;
    default:
      return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
  }
};
