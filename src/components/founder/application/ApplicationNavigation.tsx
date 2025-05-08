
import { Button } from '@/components/ui/button';
import { useFounderApplicationContext } from './ApplicationContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ApplicationNavigationProps {
  handleSubmit: () => Promise<void>;
}

const ApplicationNavigation = ({ handleSubmit }: ApplicationNavigationProps) => {
  const { 
    currentStep, 
    totalSteps, 
    nextStep, 
    prevStep, 
    formData, 
    isSubmitting,
    isComplete
  } = useFounderApplicationContext();
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;
  const isReviewStep = currentStep === 4;

  const validate = () => {
    // Basic validation for required fields based on current step
    switch (currentStep) {
      case 0: // Business Information
        if (!formData.business_name || !formData.industry) {
          setValidationError("Please fill in all required fields");
          return false;
        }
        break;
      case 1: // Email Marketing
        if (!formData.current_email_platform) {
          setValidationError("Please select your current email platform");
          return false;
        }
        if (formData.current_email_platform === 'other' && !formData.current_email_platform_other) {
          setValidationError("Please specify your email platform");
          return false;
        }
        break;
      case 2: // Project Requirements
        if (!formData.project_timeline || !formData.budget_range) {
          setValidationError("Please fill in project timeline and budget range");
          return false;
        }
        break;
      default:
        // No required fields for other steps
        break;
    }
    setValidationError(null);
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  const handleSubmitClick = async () => {
    if (validate()) {
      try {
        await handleSubmit();
      } catch (error) {
        console.error("Error submitting application:", error);
        setValidationError("Error submitting application. Please try again.");
      }
    }
  };

  const handleSkip = () => {
    if (window.confirm("Are you sure you want to skip the application? You can complete it later from your dashboard.")) {
      navigate("/founder-dashboard");
    }
  };

  if (isComplete) {
    return null; // Don't show navigation if process is complete
  }

  return (
    <div className="mt-8">
      {validationError && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {validationError}
        </div>
      )}
      
      <div className="flex justify-between">
        <div>
          {!isFirstStep ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          ) : (
            <Button 
              type="button" 
              variant="ghost" 
              onClick={handleSkip}
              className="text-[#0E3366]/80"
            >
              Skip for now
            </Button>
          )}
        </div>
        
        <div>
          {isReviewStep ? (
            <Button 
              type="button"
              onClick={handleSubmitClick}
              disabled={isSubmitting}
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          ) : (
            <Button 
              type="button"
              onClick={handleNext}
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationNavigation;
