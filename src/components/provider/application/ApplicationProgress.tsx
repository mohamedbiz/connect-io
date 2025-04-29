
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
        <span className="text-sm font-medium text-[#0E3366]">
          Step {currentStep + 1} of {STEPS.length}
        </span>
        <span className="text-sm font-medium text-[#0E3366]">
          {STEPS[currentStep]}
        </span>
      </div>
      <div className="h-2 bg-[#BFD7ED]/30 rounded-full">
        <div
          className="h-2 bg-[#2D82B7] rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
