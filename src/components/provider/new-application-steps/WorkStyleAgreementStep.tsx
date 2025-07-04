
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, InfoIcon } from "lucide-react";
import { NewProviderApplicationData } from "../application/index";

interface WorkStyleAgreementStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

const COMMUNICATION_CHANNELS = [
  "Email",
  "Slack", 
  "Video calls",
  "Other"
];

const PROJECT_MANAGEMENT_TOOLS = [
  "Asana",
  "Trello",
  "Monday",
  "ClickUp",
  "Other"
];

export const WorkStyleAgreementStep = ({ formData, updateFormData }: WorkStyleAgreementStepProps) => {
  const handleCommunicationChannelChange = (channel: string, checked: boolean) => {
    const updated = checked 
      ? [...(formData.communication_channels || []), channel]
      : (formData.communication_channels || []).filter(c => c !== channel);
    updateFormData({ communication_channels: updated });
  };

  const handleProjectToolChange = (tool: string, checked: boolean) => {
    const updated = checked 
      ? [...(formData.project_management_tools || []), tool]
      : (formData.project_management_tools || []).filter(t => t !== tool);
    updateFormData({ project_management_tools: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Work Style & Collaboration</h2>
        <p className="text-gray-600 mb-6">
          Help us understand your work preferences and availability for Connect clients.
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Professional Collaboration:</strong> Connect clients expect responsive, professional communication and reliable project delivery.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="communication_frequency" className="text-sm font-medium">
            Preferred Communication Frequency <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.communication_frequency} 
            onValueChange={(value) => updateFormData({ communication_frequency: value })}
          >
            <SelectTrigger className={!formData.communication_frequency ? "border-red-300" : ""}>
              <SelectValue placeholder="Select preferred communication frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="2-3x weekly">2-3x weekly</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
          {!formData.communication_frequency && (
            <p className="text-xs text-red-600">Please select your preferred communication frequency</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Preferred Communication Channels <span className="text-red-500">*</span>
          </Label>
          <p className="text-xs text-gray-600 mb-3">Select all that apply</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COMMUNICATION_CHANNELS.map(channel => (
              <div key={channel} className="flex items-center space-x-2">
                <Checkbox
                  id={channel}
                  checked={(formData.communication_channels || []).includes(channel)}
                  onCheckedChange={(checked) => handleCommunicationChannelChange(channel, checked as boolean)}
                />
                <Label htmlFor={channel} className="text-sm">{channel}</Label>
              </div>
            ))}
          </div>
          
          {(!formData.communication_channels || formData.communication_channels.length === 0) && (
            <p className="text-xs text-red-600">Please select at least one communication channel</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Project Management Tools Experience
          </Label>
          <p className="text-xs text-gray-600 mb-3">Select all tools you have experience with</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECT_MANAGEMENT_TOOLS.map(tool => (
              <div key={tool} className="flex items-center space-x-2">
                <Checkbox
                  id={tool}
                  checked={(formData.project_management_tools || []).includes(tool)}
                  onCheckedChange={(checked) => handleProjectToolChange(tool, checked as boolean)}
                />
                <Label htmlFor={tool} className="text-sm">{tool}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hours_available" className="text-sm font-medium">
            Hours Available per Week for Connect Clients <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.hours_available} 
            onValueChange={(value) => updateFormData({ hours_available: value })}
          >
            <SelectTrigger className={!formData.hours_available ? "border-red-300" : ""}>
              <SelectValue placeholder="Select hours available per week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5-10">5-10 hours</SelectItem>
              <SelectItem value="10-20">10-20 hours</SelectItem>
              <SelectItem value="20-30">20-30 hours</SelectItem>
              <SelectItem value="30+">30+ hours</SelectItem>
            </SelectContent>
          </Select>
          {!formData.hours_available && (
            <p className="text-xs text-red-600">Please select your available hours per week</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="response_time" className="text-sm font-medium">
            Typical Response Time to Client Requests <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.response_time} 
            onValueChange={(value) => updateFormData({ response_time: value })}
          >
            <SelectTrigger className={!formData.response_time ? "border-red-300" : ""}>
              <SelectValue placeholder="Select typical response time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Same day">Same day</SelectItem>
              <SelectItem value="Within 24 hours">Within 24 hours</SelectItem>
              <SelectItem value="Within 48 hours">Within 48 hours</SelectItem>
            </SelectContent>
          </Select>
          {!formData.response_time && (
            <p className="text-xs text-red-600">Please select your typical response time</p>
          )}
        </div>
      </div>

      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          ✓ Ready to submit! Your application will be reviewed within 2 business days.
        </AlertDescription>
      </Alert>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">What Happens Next?</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Your application will be reviewed by our team</li>
          <li>• We'll evaluate your experience, case study, and fit for our client base</li>
          <li>• You'll receive an email notification about your application status</li>
          <li>• If approved, you'll gain access to the Connect provider platform</li>
        </ul>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};
