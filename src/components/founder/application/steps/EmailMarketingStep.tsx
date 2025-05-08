
import { useFounderApplicationContext } from '../ApplicationContext';
import { 
  EMAIL_PLATFORMS, 
  LIST_SIZE_OPTIONS, 
  EMAIL_STRATEGIES, 
  EMAIL_CHALLENGES 
} from '@/types/founder';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EmailMarketingStep = () => {
  const { formData, updateFormData } = useFounderApplicationContext();

  const handlePlatformChange = (value: string) => {
    updateFormData({ 
      current_email_platform: value,
      current_email_platform_other: value === 'other' 
        ? formData.current_email_platform_other 
        : ''
    });
  };

  const handleStrategyChange = (value: string, checked: boolean) => {
    const updatedStrategies = checked 
      ? [...formData.current_email_strategies, value]
      : formData.current_email_strategies.filter(s => s !== value);
    
    updateFormData({ current_email_strategies: updatedStrategies });
  };

  const handleChallengeChange = (value: string, checked: boolean) => {
    const updatedChallenges = checked
      ? [...formData.main_challenges, value]
      : formData.main_challenges.filter(c => c !== value);
    
    updateFormData({ main_challenges: updatedChallenges });
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold text-[#0A2342]">Email Marketing Needs</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="current_email_platform">Current Email Marketing Platform*</Label>
          <Select 
            value={formData.current_email_platform} 
            onValueChange={handlePlatformChange}
          >
            <SelectTrigger className="border-[#2D82B7]/30 focus:ring-[#2D82B7]">
              <SelectValue placeholder="Select your platform" />
            </SelectTrigger>
            <SelectContent>
              {EMAIL_PLATFORMS.map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {formData.current_email_platform === 'other' && (
            <div className="mt-2">
              <Input
                placeholder="Specify your email platform"
                name="current_email_platform_other"
                value={formData.current_email_platform_other}
                onChange={handleOtherChange}
                className="border-[#2D82B7]/30 focus-visible:ring-[#2D82B7]"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email_list_size">Email List Size*</Label>
          <Select 
            value={formData.email_list_size} 
            onValueChange={(value) => updateFormData({ email_list_size: value })}
          >
            <SelectTrigger className="border-[#2D82B7]/30 focus:ring-[#2D82B7]">
              <SelectValue placeholder="Select list size" />
            </SelectTrigger>
            <SelectContent>
              {LIST_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Current Email Marketing Strategies</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EMAIL_STRATEGIES.map((strategy) => (
              <div key={strategy.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`strategy-${strategy.value}`}
                  checked={formData.current_email_strategies.includes(strategy.value)}
                  onCheckedChange={(checked) => 
                    handleStrategyChange(strategy.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`strategy-${strategy.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {strategy.label}
                </label>
              </div>
            ))}
          </div>

          {formData.current_email_strategies.includes('other') && (
            <div className="mt-2">
              <Input
                placeholder="Specify other strategies"
                name="main_challenges_other"
                value={formData.main_challenges_other}
                onChange={handleOtherChange}
                className="border-[#2D82B7]/30 focus-visible:ring-[#2D82B7]"
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label>Main Email Marketing Challenges</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EMAIL_CHALLENGES.map((challenge) => (
              <div key={challenge.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`challenge-${challenge.value}`}
                  checked={formData.main_challenges.includes(challenge.value)}
                  onCheckedChange={(checked) => 
                    handleChallengeChange(challenge.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`challenge-${challenge.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {challenge.label}
                </label>
              </div>
            ))}
          </div>

          {formData.main_challenges.includes('other') && (
            <div className="mt-2">
              <Input
                placeholder="Specify other challenges"
                name="main_challenges_other"
                value={formData.main_challenges_other}
                onChange={handleOtherChange}
                className="border-[#2D82B7]/30 focus-visible:ring-[#2D82B7]"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailMarketingStep;
