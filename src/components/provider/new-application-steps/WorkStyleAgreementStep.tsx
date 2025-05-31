
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface WorkStyleAgreementStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

export const WorkStyleAgreementStep = ({ formData, updateFormData }: WorkStyleAgreementStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Work Style & Agreement</h2>
        <p className="text-gray-600 mb-6">
          Help us understand how you work with clients and confirm your agreement to our terms.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="communication_process" className="text-sm font-medium">
            Communication Process & Frequency <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="communication_process" 
            value={formData.communication_process}
            onChange={(e) => updateFormData({ communication_process: e.target.value })}
            placeholder="e.g., Weekly email updates with progress reports, bi-weekly strategy calls, monthly performance reviews, available via Slack for urgent questions"
            rows={3}
            required
          />
          <p className="text-xs text-gray-500">
            Describe how you typically communicate with clients and how often
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability_capacity" className="text-sm font-medium">
            Availability & Capacity for New Projects <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="availability_capacity" 
            value={formData.availability_capacity}
            onChange={(e) => updateFormData({ availability_capacity: e.target.value })}
            placeholder="e.g., 20-30 hours per week, can take on 2-3 new clients at a time, typically available 9am-5pm EST"
            rows={3}
            required
          />
          <p className="text-xs text-gray-500">
            Help clients understand your working hours and project capacity
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms_agreement"
              checked={formData.terms_agreement}
              onCheckedChange={(checked) => updateFormData({ terms_agreement: checked as boolean })}
            />
            <div className="space-y-1">
              <Label htmlFor="terms_agreement" className="text-sm font-medium">
                I acknowledge understanding of Connect's platform terms and focus on quality connections <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-gray-500">
                Connect facilitates connections between providers and eCommerce businesses. We focus on quality matches and professional standards.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="client_references_willing"
              checked={formData.client_references_willing}
              onCheckedChange={(checked) => updateFormData({ client_references_willing: checked as boolean })}
            />
            <div className="space-y-1">
              <Label htmlFor="client_references_willing" className="text-sm font-medium">
                Willing to provide client references upon request (Optional)
              </Label>
              <p className="text-xs text-gray-500">
                This adds an additional layer of verification but is not required for application submission
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-900 mb-2">Final Step</h3>
        <p className="text-sm text-green-800">
          Once you submit your application, our team will review it within 2-3 business days. 
          We may reach out for clarification or schedule a brief verification call if needed.
        </p>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
