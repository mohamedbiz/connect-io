
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NewApplicationProvider, useNewApplicationContext } from './NewApplicationContext';
import { NewApplicationStep } from './NewApplicationStep';

const ApplicationFlowContent = () => {
  const { 
    currentStep, 
    totalSteps, 
    nextStep, 
    prevStep, 
    isValid, 
    submitApplication, 
    isSubmitting 
  } = useNewApplicationContext();

  const stepTitles = [
    'Basic Information',
    'Professional Presence',
    'Experience & Focus',
    'Proof of Results',
    'Work Style & Agreement'
  ];

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep === totalSteps - 1) {
      submitApplication();
    } else {
      nextStep();
    }
  };

  const canProceed = isValid(currentStep);

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#0A2342] to-[#2D82B7] text-white">
          <CardTitle className="text-center text-2xl font-bold">
            Provider Application
          </CardTitle>
          <p className="text-center text-blue-100 mt-2">
            Join Connect's network of elite email marketing specialists
          </p>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-blue-200" />
            <p className="text-center text-sm text-blue-100 mt-2">
              {stepTitles[currentStep]}
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <NewApplicationStep />
          
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className="flex items-center gap-2 bg-[#2D82B7] hover:bg-[#1E5A8A]"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : currentStep === totalSteps - 1 ? (
                'Submit Application'
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const NewProviderApplicationFlow = () => {
  return (
    <NewApplicationProvider>
      <ApplicationFlowContent />
    </NewApplicationProvider>
  );
};

export default NewProviderApplicationFlow;
