
import { ClientAcquisitionFormData } from "../acquisition/AcquisitionContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ProviderPreferencesStepProps {
  formData: ClientAcquisitionFormData;
  updateFormData: (data: Partial<ClientAcquisitionFormData>) => void;
}

export const ProviderPreferencesStep = ({ formData, updateFormData }: ProviderPreferencesStepProps) => {
  const handlePreferenceUpdate = (field: string, value: any) => {
    updateFormData({
      provider_preferences: {
        ...formData.provider_preferences,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Provider Preferences</h2>
        <p className="text-gray-600 mb-6">
          Help us match you with the right email marketing specialist based on your preferences.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="budget_range">Monthly Budget Range</Label>
          <Select 
            value={formData.provider_preferences?.budget_range || ""} 
            onValueChange={(value) => handlePreferenceUpdate("budget_range", value)}
          >
            <SelectTrigger id="budget_range" className="mt-1">
              <SelectValue placeholder="Select your monthly budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under_1000">Under $1,000</SelectItem>
              <SelectItem value="1000_2500">$1,000 - $2,500</SelectItem>
              <SelectItem value="2500_5000">$2,500 - $5,000</SelectItem>
              <SelectItem value="5000_10000">$5,000 - $10,000</SelectItem>
              <SelectItem value="over_10000">Over $10,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="mb-2 block">Communication Preference</Label>
          <RadioGroup 
            value={formData.provider_preferences?.communication_preference || ""}
            onValueChange={(value) => handlePreferenceUpdate("communication_preference", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly_calls" id="weekly_calls" />
              <Label htmlFor="weekly_calls">Regular weekly calls</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="biweekly_calls" id="biweekly_calls" />
              <Label htmlFor="biweekly_calls">Bi-weekly calls</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly_calls" id="monthly_calls" />
              <Label htmlFor="monthly_calls">Monthly strategy calls</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="async_communication" id="async_communication" />
              <Label htmlFor="async_communication">Primarily async communication (email/Slack)</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="mb-2 block">Level of Support Needed</Label>
          <RadioGroup 
            value={formData.provider_preferences?.support_level || ""}
            onValueChange={(value) => handlePreferenceUpdate("support_level", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="strategy_only" id="strategy_only" />
              <Label htmlFor="strategy_only">Strategy only - We'll handle implementation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full_service" id="full_service" />
              <Label htmlFor="full_service">Full service - Strategy and implementation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="implementation_only" id="implementation_only" />
              <Label htmlFor="implementation_only">Implementation only - We have the strategy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="audit_only" id="audit_only" />
              <Label htmlFor="audit_only">One-time audit and recommendations</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="industry_experience">Preferred Industry Experience</Label>
          <Textarea
            id="industry_experience"
            value={formData.provider_preferences?.industry_experience || ""}
            onChange={(e) => handlePreferenceUpdate("industry_experience", e.target.value)}
            placeholder="Any specific industry experience you're looking for in a provider?"
            className="mt-1"
            rows={2}
          />
        </div>
        
        <div>
          <Label htmlFor="additional_notes">Additional Notes or Requirements</Label>
          <Textarea
            id="additional_notes"
            value={formData.provider_preferences?.additional_notes || ""}
            onChange={(e) => handlePreferenceUpdate("additional_notes", e.target.value)}
            placeholder="Anything else that would help us match you with the right provider?"
            className="mt-1"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};
