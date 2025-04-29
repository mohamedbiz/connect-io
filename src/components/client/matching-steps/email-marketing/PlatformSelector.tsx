
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface PlatformSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const PlatformSelector = ({ value, onChange }: PlatformSelectorProps) => {
  return (
    <div>
      <Label htmlFor="platform">Current Email Marketing Platform</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="platform" className="mt-1">
          <SelectValue placeholder="Select your current platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="klaviyo">Klaviyo</SelectItem>
          <SelectItem value="mailchimp">Mailchimp</SelectItem>
          <SelectItem value="omnisend">Omnisend</SelectItem>
          <SelectItem value="active_campaign">Active Campaign</SelectItem>
          <SelectItem value="hubspot">HubSpot</SelectItem>
          <SelectItem value="none">Not using any</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
