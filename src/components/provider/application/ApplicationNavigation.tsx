
import { Button } from "@/components/ui/button";
import { useApplicationContext } from "./ApplicationContext";
import { STEPS } from "./ApplicationProgress";

interface ApplicationNavigationProps {
  handleSubmit: () => Promise<void>;
}

export const ApplicationNavigation = ({ handleSubmit }: ApplicationNavigationProps) => {
  const { currentStep, setCurrentStep, isSubmitting } = useApplicationContext();

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 0}
      >
        Previous
      </Button>

      {currentStep < STEPS.length - 1 ? (
        <Button onClick={nextStep}>Continue</Button>
      ) : (
        <Button onClick={handleSubmit} disabled={isSubmitting} className="min-w-[120px]">
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      )}
    </div>
  );
};
