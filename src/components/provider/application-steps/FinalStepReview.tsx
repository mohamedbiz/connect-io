
import { ProviderApplicationFormData } from "../ProviderApplicationForm";
import { PersonalInfoSection } from "./final-review/PersonalInfoSection";
import { ProfessionalExperienceSection } from "./final-review/ProfessionalExperienceSection";
import { ExpertiseSection } from "./final-review/ExpertiseSection";
import { CaseStudiesSection } from "./final-review/CaseStudiesSection";
import { WorkApproachSection } from "./final-review/WorkApproachSection";
import { ApplicationAlert } from "./final-review/ApplicationAlert";
import { NextStepsSection } from "./final-review/NextStepsSection";

interface FinalStepReviewProps {
  formData: ProviderApplicationFormData;
}

export const FinalStepReview = ({ formData }: FinalStepReviewProps) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold mb-4">Review Your Application</h2>
        <p className="text-gray-600 mb-6">
          Please review your information before submitting. You can go back to any section to make changes.
        </p>
      </div>

      <div className="space-y-6">
        <PersonalInfoSection formData={formData} />
        <ProfessionalExperienceSection formData={formData} />
        <ExpertiseSection formData={formData} />
        <CaseStudiesSection formData={formData} />
        <WorkApproachSection formData={formData} />
      </div>

      <ApplicationAlert formData={formData} />
      <NextStepsSection />
    </div>
  );
};
