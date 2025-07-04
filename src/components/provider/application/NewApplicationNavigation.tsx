
import { Button } from "@/components/ui/button";
import { useNewApplicationContext } from "./index";
import { STEPS } from "./NewApplicationProgress";
import { toast } from "sonner";

interface NewApplicationNavigationProps {
  handleSubmit: (formData: any) => Promise<void>;
}

export const NewApplicationNavigation = ({ handleSubmit }: NewApplicationNavigationProps) => {
  const { currentStep, setCurrentStep, isSubmitting, formData, validateCurrentStep } = useNewApplicationContext();

  const nextStep = () => {
    const validation = validateCurrentStep();
    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }

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
  
  const handleFinalSubmit = async () => {
    const validation = validateCurrentStep();
    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }
    await handleSubmit(formData);
  };
  
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 0}
        className="border-[#2D82B7]/50 hover:bg-[#BFD7ED]/10 hover:border-[#2D82B7] transition-colors"
      >
        Previous
      </Button>

      {currentStep < STEPS.length - 1 ? (
        <Button 
          onClick={nextStep}
          className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
        >
          Continue
        </Button>
      ) : (
        <Button 
          onClick={handleFinalSubmit} 
          disabled={isSubmitting} 
          className="min-w-[120px] bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      )}
    </div>
  );
};
