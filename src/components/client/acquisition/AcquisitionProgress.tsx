
import { useAcquisitionContext } from "./AcquisitionContext";

// Define the steps of the client acquisition process
export const STEPS = [
  "Initial Outreach",
  "Discovery Call",
  "Store Analysis",
  "Opportunity Identification",
  "Proposal Generation",
  "Objection Handling"
];

export const AcquisitionProgress = () => {
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
