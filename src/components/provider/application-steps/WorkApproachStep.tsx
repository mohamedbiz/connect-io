
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProviderApplicationFormData } from "../ProviderApplicationForm";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface WorkApproachStepProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const WorkApproachStep = ({ formData, updateFormData }: WorkApproachStepProps) => {
  const referralSources = [
    "LinkedIn",
    "Referral",
    "Job Board",
    "Other"
  ];

  const handleReferralSourceChange = (source: string, isChecked: boolean) => {
    if (isChecked) {
      updateFormData({ referral_source: source });
    } else if (formData.referral_source === source) {
      updateFormData({ referral_source: "" });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold mb-4">Work Approach</h2>
        <p className="text-gray-600 mb-6">
          Tell us about how you work with clients and manage projects.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="availability" className="required">Availability (hours per week)</Label>
          <Input 
            id="availability" 
            value={formData.availability}
            onChange={(e) => updateFormData({ availability: e.target.value })}
            placeholder="e.g. 20-30"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="typical_timeline" className="required">Typical Project Timeline</Label>
          <Input 
            id="typical_timeline" 
            value={formData.typical_timeline}
            onChange={(e) => updateFormData({ typical_timeline: e.target.value })}
            placeholder="e.g. 4-6 weeks for setup, ongoing maintenance after"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="communication_preferences" className="required">Communication Preferences</Label>
          <Input 
            id="communication_preferences" 
            value={formData.communication_preferences}
            onChange={(e) => updateFormData({ communication_preferences: e.target.value })}
            placeholder="e.g. Weekly video calls, daily Slack updates"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project_management_tools" className="required">Tools Used for Project Management</Label>
          <Input 
            id="project_management_tools" 
            value={formData.project_management_tools}
            onChange={(e) => updateFormData({ project_management_tools: e.target.value })}
            placeholder="e.g. Asana, Trello, Notion"
            required
          />
        </div>

        <div className="space-y-4 bg-gray-50 p-5 rounded-lg border">
          <div>
            <h3 className="font-medium text-base">Performance Guarantee</h3>
            <p className="text-sm text-gray-600 mt-1">
              Connect guarantees clients a 200% increase in email-generated sales, 30% reduction in churn, and 200% improvement in LTV within 30 days.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label className="required">Are you comfortable working under this performance guarantee?</Label>
            <RadioGroup 
              value={formData.performance_guarantee} 
              onValueChange={(value) => updateFormData({ performance_guarantee: value as "yes" | "no" | "conditional" })}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="guarantee-yes" />
                <Label htmlFor="guarantee-yes" className="font-normal text-sm cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="guarantee-no" />
                <Label htmlFor="guarantee-no" className="font-normal text-sm cursor-pointer">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conditional" id="guarantee-conditional" />
                <Label htmlFor="guarantee-conditional" className="font-normal text-sm cursor-pointer">Yes, with conditions</Label>
              </div>
            </RadioGroup>
            
            {formData.performance_guarantee === "conditional" && (
              <div className="ml-6 mt-2">
                <Label htmlFor="performance_guarantee_conditions" className="text-sm">Please explain your conditions</Label>
                <Textarea 
                  id="performance_guarantee_conditions" 
                  value={formData.performance_guarantee_conditions}
                  onChange={(e) => updateFormData({ performance_guarantee_conditions: e.target.value })}
                  placeholder="Please explain your conditions"
                  className="mt-1"
                  rows={3}
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 bg-gray-50 p-5 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="technical_assessment" className="required">Technical Assessment</Label>
            <p className="text-sm text-gray-600">
              As part of the application process, you'll be asked to complete a technical assessment. 
              This will involve analyzing a sample store and providing recommendations.
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox 
                id="technical_assessment"
                checked={formData.technical_assessment}
                onCheckedChange={(checked) => updateFormData({ technical_assessment: checked === true })}
              />
              <Label 
                htmlFor="technical_assessment"
                className="text-sm font-normal cursor-pointer"
              >
                I am willing to complete this assessment
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additional_information">Additional Information</Label>
          <Textarea 
            id="additional_information" 
            value={formData.additional_information}
            onChange={(e) => updateFormData({ additional_information: e.target.value })}
            placeholder="Is there anything else you'd like us to know about your experience or approach?"
            rows={3}
          />
        </div>

        <div className="space-y-3">
          <Label className="required">How did you hear about Connect?</Label>
          <div className="grid grid-cols-2 gap-2">
            {referralSources.map((source) => (
              <div className="flex items-center space-x-2" key={source}>
                <Checkbox 
                  id={`referral-${source}`}
                  checked={formData.referral_source === source}
                  onCheckedChange={(checked) => 
                    handleReferralSourceChange(source, checked === true)
                  }
                />
                <Label 
                  htmlFor={`referral-${source}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {source}
                </Label>
              </div>
            ))}
          </div>
          
          {formData.referral_source && formData.referral_source !== "LinkedIn" && (
            <div className="mt-2">
              <Label htmlFor="referral_details" className="text-sm">Please specify</Label>
              <Input
                id="referral_details"
                value={formData.referral_details}
                onChange={(e) => updateFormData({ referral_details: e.target.value })}
                placeholder={`Please specify the ${formData.referral_source.toLowerCase()}`}
                className="mt-1"
              />
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
