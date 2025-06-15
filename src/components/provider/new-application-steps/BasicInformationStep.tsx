
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface BasicInformationStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

export const BasicInformationStep = ({ formData, updateFormData }: BasicInformationStepProps) => {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailValid = !formData.email || validateEmail(formData.email);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Basic Information</h2>
        <p className="text-gray-600 mb-6">
          Let's start with your basic contact information. This information will be used to verify your identity and contact you about your application status.
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Why we need this:</strong> We use this information to verify your identity and ensure all communications reach you promptly during the review process.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="full_name" 
            value={formData.full_name}
            onChange={(e) => updateFormData({ full_name: e.target.value })}
            placeholder="Jane Smith"
            required
            className={!formData.full_name ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.full_name && (
            <p className="text-xs text-red-600">Full name is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="email" 
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="jane@example.com"
            required
            className={!isEmailValid ? "border-red-300 focus:border-red-500" : ""}
          />
          {formData.email && !isEmailValid && (
            <p className="text-xs text-red-600">Please enter a valid email address</p>
          )}
          {!formData.email && (
            <p className="text-xs text-red-600">Email address is required</p>
          )}
          <p className="text-xs text-gray-500">
            We'll use this email for all application communications
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location (Country/Timezone) <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="location" 
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="New York, USA (EST) or London, UK (GMT)"
            required
            className={!formData.location ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.location && (
            <p className="text-xs text-red-600">Location and timezone are required</p>
          )}
          <p className="text-xs text-gray-500">
            Include your country and timezone to help us understand your availability
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
        <p className="text-sm text-gray-700">
          After completing your basic information, we'll ask about your professional presence, 
          including your LinkedIn profile and portfolio website.
        </p>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
