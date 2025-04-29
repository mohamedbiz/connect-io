
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ChallengesInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ChallengesInput = ({ value, onChange }: ChallengesInputProps) => {
  return (
    <div>
      <Label htmlFor="current_challenges">Current Email Marketing Challenges</Label>
      <Textarea
        id="current_challenges"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What are your biggest challenges with email marketing right now?"
        className="mt-1"
        rows={3}
      />
    </div>
  );
};
