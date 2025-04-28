
import { useApplicationContext } from "./ApplicationContext";

// Define the steps of the application process
export const STEPS = [
  "Personal Information",
  "Professional Experience",
  "Expertise & Specialization",
  "Case Studies",
  "Work Approach",
  "Review & Submit"
];

export const ApplicationProgress = () => {
  const { currentStep } = useApplicationContext();
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-500">
          Step {currentStep + 1} of {STEPS.length}
        </span>
        <span className="text-sm font-medium text-gray-500">
          {STEPS[currentStep]}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-primary rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
