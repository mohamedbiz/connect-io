
import { useAcquisitionContext } from "../acquisition/AcquisitionContext";

// Define the steps of the matching assessment process
export const STEPS = [
  "Business Information",
  "Email Marketing Needs",
  "Provider Preferences"
];

export const MatchingProgress = () => {
  const { currentStep } = useAcquisitionContext();
  
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
