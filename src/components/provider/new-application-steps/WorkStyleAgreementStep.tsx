
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, MessageSquare, Clock, Shield } from "lucide-react";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface WorkStyleAgreementStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

export const WorkStyleAgreementStep = ({ formData, updateFormData }: WorkStyleAgreementStepProps) => {
  const validateWordCount = (text: string, minWords: number) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length >= minWords;
  };

  const communicationWordCount = formData.communication_process.trim().split(/\s+/).filter(w => w.length > 0).length;
  const availabilityWordCount = formData.availability_capacity.trim().split(/\s+/).filter(w => w.length > 0).length;

  const isReadyToSubmit = formData.terms_agreement && 
    validateWordCount(formData.communication_process, 15) && 
    validateWordCount(formData.availability_capacity, 10);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Work Style & Agreement</h2>
        <p className="text-gray-600 mb-6">
          Help us understand how you work with clients and confirm your agreement to our platform terms. 
          This helps founders know what to expect when working with you.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="communication_process" className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Communication Process & Frequency <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="communication_process" 
            value={formData.communication_process}
            onChange={(e) => updateFormData({ communication_process: e.target.value })}
            placeholder="Describe your typical communication style, frequency, and methods..."
            rows={4}
            required
            className={!validateWordCount(formData.communication_process, 15) ? "border-red-300" : ""}
          />
          <div className="flex justify-between text-xs">
            <span className={communicationWordCount < 15 ? "text-red-600" : "text-gray-500"}>
              {communicationWordCount}/15 words minimum
            </span>
            {!validateWordCount(formData.communication_process, 15) && communicationWordCount > 0 && (
              <span className="text-red-600">Please provide more detail (minimum 15 words)</span>
            )}
          </div>
          <div className="bg-blue-50 p-3 rounded text-xs text-gray-700">
            <strong>Good examples:</strong>
            <ul className="mt-1 space-y-1">
              <li>• "Weekly email updates every Friday with progress reports and next week's priorities..."</li>
              <li>• "Bi-weekly 30-minute strategy calls plus Slack for urgent questions..."</li>
              <li>• "Monthly performance reviews with detailed analytics and recommendations..."</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability_capacity" className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Availability & Capacity for New Projects <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="availability_capacity" 
            value={formData.availability_capacity}
            onChange={(e) => updateFormData({ availability_capacity: e.target.value })}
            placeholder="Describe your working hours, time zone, and project capacity..."
            rows={3}
            required
            className={!validateWordCount(formData.availability_capacity, 10) ? "border-red-300" : ""}
          />
          <div className="flex justify-between text-xs">
            <span className={availabilityWordCount < 10 ? "text-red-600" : "text-gray-500"}>
              {availabilityWordCount}/10 words minimum
            </span>
            {!validateWordCount(formData.availability_capacity, 10) && availabilityWordCount > 0 && (
              <span className="text-red-600">Please provide more detail (minimum 10 words)</span>
            )}
          </div>
          <div className="bg-green-50 p-3 rounded text-xs text-gray-700">
            <strong>Include information about:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Your typical working hours and time zone</li>
              <li>• How many clients you can take on simultaneously</li>
              <li>• Your preferred project duration and engagement type</li>
              <li>• Any seasonal availability changes</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Platform Agreement
          </h3>
          
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms_agreement"
              checked={formData.terms_agreement}
              onCheckedChange={(checked) => updateFormData({ terms_agreement: checked as boolean })}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="terms_agreement" className="text-sm font-medium">
                I acknowledge understanding of Connect's platform terms and focus on quality connections <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-gray-600">
                Connect facilitates connections between providers and eCommerce businesses. 
                We focus on quality matches, professional standards, and successful long-term partnerships.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="client_references_willing"
              checked={formData.client_references_willing}
              onCheckedChange={(checked) => updateFormData({ client_references_willing: checked as boolean })}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="client_references_willing" className="text-sm font-medium">
                Willing to provide client references upon request (Optional)
              </Label>
              <p className="text-xs text-gray-600">
                This adds credibility to your application but is not required for submission. 
                References may be requested during the review process for top-tier approval.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isReadyToSubmit ? (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Ready to Submit!</strong> Your application is complete and ready for review. 
            Our team will review it within 2-3 business days.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertDescription className="text-yellow-800">
            <strong>Almost Ready!</strong> Please complete all required fields and accept the platform terms to submit your application.
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">What Happens Next?</h3>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. Our team reviews your application and professional profiles</li>
          <li>2. We may reach out for clarification or additional information if needed</li>
          <li>3. You'll receive an email notification with our decision within 2-3 business days</li>
          <li>4. If approved, you'll be able to complete your public provider profile</li>
          <li>5. Once live, qualified founders can discover and connect with you</li>
        </ol>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
