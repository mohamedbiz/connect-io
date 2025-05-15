
import React from "react";
import { PasswordValidation } from "@/utils/password-utils";

interface PasswordStrengthIndicatorProps {
  validation: PasswordValidation;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  validation
}) => {
  const { strength, messages, color } = validation;
  
  // Map strength levels to segment counts
  const segmentCount = 
    strength === 'weak' ? 1 :
    strength === 'medium' ? 2 :
    strength === 'strong' ? 3 : 4;
  
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((segment) => (
          <div
            key={segment}
            className={`h-1 flex-1 rounded-full ${
              segment <= segmentCount 
                ? `bg-${color}-500` 
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="space-y-1">
        {messages.map((message, index) => (
          <p 
            key={index} 
            className={`text-xs ${strength === 'weak' ? 'text-red-500' : 
                                strength === 'medium' ? 'text-amber-500' : 
                                'text-green-500'}`}
          >
            {message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
