
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";

interface AvailabilitySectionProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const AvailabilitySection = ({ formData, updateFormData }: AvailabilitySectionProps) => {
  return (
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
    </div>
  );
};
