
import { useFounderApplicationContext } from './ApplicationContext';

const ApplicationProgress = () => {
  const { currentStep, totalSteps } = useFounderApplicationContext();
  
  const steps = [
    "Business Information",
    "Email Marketing Needs",
    "Project Requirements",
    "Additional Information",
    "Review & Submit"
  ];

  return (
    <div className="relative mb-8">
      <div className="flex justify-between mb-2">
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
            <span className="text-xs text-center hidden md:block text-[#0E3366] font-medium">{step}</span>
          </div>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="hidden md:block h-1 bg-gray-200 absolute left-0 right-0 top-4 -z-10">
        <div 
          className="h-1 bg-[#2D82B7]" 
          style={{ 
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
            transition: 'width 0.3s ease-in-out'
          }}
        ></div>
      </div>
    </div>
  );
};

export default ApplicationProgress;
