
import { useNewApplicationContext } from "./index";

export const STEPS = [
  "Basic Information",
  "Professional Presence", 
  "Experience & Focus",
  "Case Study",
  "Work Style & Agreement"
];

export const NewApplicationProgress = () => {
  const { currentStep } = useNewApplicationContext();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {STEPS.map((step, index) => (
          <div key={step} className="flex flex-col items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              index === currentStep ? 
              "bg-[#2D82B7] text-white" : 
              index < currentStep ? 
              "bg-green-500 text-white" : 
              "bg-gray-200 text-gray-500"
            }`}>
              {index < currentStep ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg> : 
                index + 1
              }
            </div>
            <span className="text-xs text-center text-[#0E3366] font-medium hidden md:block">{step}</span>
            <span className="text-xs text-center text-[#0E3366] font-medium md:hidden">Step {index + 1}</span>
            {index < STEPS.length - 1 && (
              <div className={`hidden md:block absolute h-0.5 w-full ${
                index < currentStep ? "bg-green-500" : "bg-gray-200"
              }`} style={{
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: -1
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
