
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BusinessQualification from "./BusinessQualification";
import ProjectQualification from "./ProjectQualification";
import QualificationSummary from "./QualificationSummary";
import { useQualification } from "@/hooks/useQualification";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FounderQualificationFormProps {
  isNewUser?: boolean;
}

const FounderQualificationForm = ({ isNewUser = false }: FounderQualificationFormProps) => {
  const navigate = useNavigate();
  const { formData, updateFormData, loading, submitQualification } = useQualification();
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    "Business Qualification",
    "Project Qualification",
    "Review & Submit"
  ];

  const handleNext = () => {
    setCurrentStep(prev => Math.min(steps.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleSkip = () => {
    if (isNewUser) {
      // For new users, show a confirmation alert
      if (window.confirm("Are you sure you want to skip qualification? Your provider matches will be less accurate.")) {
        navigate("/founder-dashboard");
      }
    } else {
      // For returning users, just navigate
      navigate("/founder-dashboard");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BusinessQualification formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <ProjectQualification formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <QualificationSummary formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0A2342]">Business Qualification</h2>
        <p className="text-[#0E3366]">
          Help us find the right email marketing providers for your business by completing this qualification form.
        </p>
      </div>

      {!isNewUser && (
        <Alert className="mb-6">
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            This qualification helps us match you with the most suitable providers. While recommended, 
            you can skip this step and complete it later.
          </AlertDescription>
        </Alert>
      )}
      
      {isNewUser && (
        <Alert className="mb-6" variant="default">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Required Step</AlertTitle>
          <AlertDescription>
            This qualification is required to access your dashboard. It helps us understand your business 
            needs and provide you with the best possible service.
          </AlertDescription>
        </Alert>
      )}

      <Card className="border border-[#2D82B7]/30">
        <CardContent className="pt-6">
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div 
                key={step} 
                className="flex flex-col items-center"
                style={{ width: `${100 / steps.length}%` }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index === currentStep ? 
                  "bg-[#2D82B7] text-white" : 
                  index < currentStep ? 
                  "bg-green-500 text-white" : 
                  "bg-gray-200 text-gray-500"
                }`}>
                  {index < currentStep ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg> : 
                    index + 1
                  }
                </div>
                <span className="text-xs text-center text-[#0E3366] font-medium">{step}</span>
              </div>
            ))}
          </div>

          {renderStepContent()}

          <div className="flex justify-between mt-8">
            <div>
              {currentStep > 0 ? (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handlePrev}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
              ) : (
                isNewUser ? (
                  <div></div> // Empty div to maintain layout
                ) : (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={handleSkip}
                    className="text-[#0E3366]/80"
                  >
                    Skip for now
                  </Button>
                )
              )}
            </div>
            <div>
              {currentStep < steps.length - 1 ? (
                <Button 
                  type="button" 
                  onClick={handleNext}
                  className="bg-[#2D82B7] hover:bg-[#3D9AD1] flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  type="button" 
                  onClick={submitQualification}
                  disabled={loading}
                  className="bg-[#2D82B7] hover:bg-[#3D9AD1]"
                >
                  {loading ? "Submitting..." : "Complete Qualification"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FounderQualificationForm;
