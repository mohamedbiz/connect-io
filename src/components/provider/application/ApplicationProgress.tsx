
import React from 'react';
import { useApplicationContext } from './ApplicationContext';
import ApplicationScoreIndicator from './ApplicationScoreIndicator';

const steps = [
  'Personal Information',
  'Professional Experience', 
  'Expertise & Specialization',
  'Case Studies',
  'Work Approach',
  'Review & Submit'
];

export const ApplicationProgress = () => {
  const { currentStep, applicationScore } = useApplicationContext();

  return (
    <div className="space-y-6 mb-8">
      {/* Step Progress */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-[#2D82B7] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-2 text-center max-w-20 text-[#0E3366]">
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  index < currentStep ? 'bg-[#2D82B7]' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Application Score Indicator */}
      {applicationScore && currentStep > 1 && (
        <ApplicationScoreIndicator 
          score={applicationScore}
          className="max-w-md mx-auto"
        />
      )}
    </div>
  );
};
