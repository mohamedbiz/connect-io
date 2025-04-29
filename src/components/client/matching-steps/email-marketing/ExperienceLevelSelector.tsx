
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ExperienceLevelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const ExperienceLevelSelector = ({ value, onChange }: ExperienceLevelSelectorProps) => {
  return (
    <div>
      <Label htmlFor="experience_level">Your Email Marketing Experience Level</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="experience_level" className="mt-1">
          <SelectValue placeholder="Select your experience level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="beginner">Beginner - Just getting started</SelectItem>
          <SelectItem value="intermediate">Intermediate - Have some campaigns running</SelectItem>
          <SelectItem value="advanced">Advanced - Good understanding but want to improve</SelectItem>
          <SelectItem value="expert">Expert - Looking for specialized help only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
