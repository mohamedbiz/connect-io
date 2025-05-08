
import { useFounderApplicationContext } from './ApplicationContext';
import BusinessInformationStep from './steps/BusinessInformationStep';
import EmailMarketingStep from './steps/EmailMarketingStep';
import ProjectRequirementsStep from './steps/ProjectRequirementsStep';
import AdditionalInformationStep from './steps/AdditionalInformationStep';
import ReviewStep from './steps/ReviewStep';

const ApplicationStep = () => {
  const { currentStep } = useFounderApplicationContext();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BusinessInformationStep />;
      case 1:
        return <EmailMarketingStep />;
      case 2:
        return <ProjectRequirementsStep />;
      case 3:
        return <AdditionalInformationStep />;
      case 4:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  return <div className="py-4">{renderStep()}</div>;
};

export default ApplicationStep;
