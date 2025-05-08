
import { useFounderApplicationContext } from '../ApplicationContext';
import { 
  PROJECT_TIMELINES, 
  BUDGET_RANGES, 
  PROJECT_GOALS, 
  COMMUNICATION_PREFERENCES
} from '@/types/founder';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectRequirementsStep = () => {
  const { formData, updateFormData } = useFounderApplicationContext();

  const handleGoalChange = (value: string, checked: boolean) => {
    const updatedGoals = checked 
      ? [...formData.specific_goals, value]
      : formData.specific_goals.filter(g => g !== value);
    
    updateFormData({ specific_goals: updatedGoals });
  };

  const handleCommunicationChange = (value: string, checked: boolean) => {
    const updatedPreferences = checked
      ? [...formData.preferred_communication, value]
      : formData.preferred_communication.filter(p => p !== value);
    
    updateFormData({ preferred_communication: updatedPreferences });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold text-[#0A2342]">Project Requirements</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="project_timeline">Project Timeline*</Label>
          <Select 
            value={formData.project_timeline} 
            onValueChange={(value) => updateFormData({ project_timeline: value })}
          >
            <SelectTrigger className="border-[#2D82B7]/30 focus:ring-[#2D82B7]">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_TIMELINES.map((timeline) => (
                <SelectItem key={timeline.value} value={timeline.value}>
                  {timeline.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget_range">Budget Range*</Label>
          <Select 
            value={formData.budget_range} 
            onValueChange={(value) => updateFormData({ budget_range: value })}
          >
            <SelectTrigger className="border-[#2D82B7]/30 focus:ring-[#2D82B7]">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_RANGES.map((budget) => (
                <SelectItem key={budget.value} value={budget.value}>
                  {budget.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Specific Goals</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECT_GOALS.map((goal) => (
              <div key={goal.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`goal-${goal.value}`}
                  checked={formData.specific_goals.includes(goal.value)}
                  onCheckedChange={(checked) => 
                    handleGoalChange(goal.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`goal-${goal.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {goal.label}
                </label>
              </div>
            ))}
          </div>

          {formData.specific_goals.includes('other') && (
            <div className="mt-2">
              <Input
                placeholder="Specify other goals"
                name="specific_goals_other"
                value={formData.specific_goals_other}
                onChange={handleChange}
                className="border-[#2D82B7]/30 focus-visible:ring-[#2D82B7]"
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label>Preferred Communication Methods</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COMMUNICATION_PREFERENCES.map((pref) => (
              <div key={pref.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`communication-${pref.value}`}
                  checked={formData.preferred_communication.includes(pref.value)}
                  onCheckedChange={(checked) => 
                    handleCommunicationChange(pref.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`communication-${pref.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {pref.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectations">Your Expectations</Label>
          <Textarea
            id="expectations"
            name="expectations"
            value={formData.expectations}
            onChange={handleChange}
            placeholder="What are your expectations from the email marketing service provider?"
            className="min-h-[100px] border-[#2D82B7]/30 focus-visible:ring-[#2D82B7]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectRequirementsStep;
