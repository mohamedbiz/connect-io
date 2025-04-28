
import { Button } from "@/components/ui/button";
import { useAcquisitionContext } from "../acquisition/AcquisitionContext";
import { STEPS } from "./MatchingProgress";

interface MatchingNavigationProps {
  handleSubmit: () => Promise<void>;
}

export const MatchingNavigation = ({ handleSubmit }: MatchingNavigationProps) => {
  const { currentStep, setCurrentStep, isSubmitting } = useAcquisitionContext();

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
          {isSubmitting ? "Submitting..." : "Find Matching Providers"}
        </Button>
      )}
    </div>
  );
};
