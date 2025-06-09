
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface MarketingInfoStepProps {
  data: {
    currentEmailPlatform?: string;
    primaryGoal?: string;
    biggestChallenge?: string;
  };
  updateData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MarketingInfoStep = ({ data, updateData, onNext, onBack }: MarketingInfoStepProps) => {
  const [formData, setFormData] = useState(data);

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData(newData);
  };

  const isValid = formData.currentEmailPlatform && formData.primaryGoal && formData.biggestChallenge;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
          Your email marketing setup
        </h3>
        <p className="text-gray-600">
          Help us understand your current email marketing situation so we can find the perfect expert for you.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="currentEmailPlatform">Current Email Platform *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-sm">
                    We'll match you with experts who specialize in your platform for seamless collaboration.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={formData.currentEmailPlatform || ''} onValueChange={(value) => handleInputChange('currentEmailPlatform', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your current platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="klaviyo">Klaviyo</SelectItem>
              <SelectItem value="mailchimp">Mailchimp</SelectItem>
              <SelectItem value="constantcontact">Constant Contact</SelectItem>
              <SelectItem value="sendgrid">SendGrid</SelectItem>
              <SelectItem value="campaignmonitor">Campaign Monitor</SelectItem>
              <SelectItem value="aweber">AWeber</SelectItem>
              <SelectItem value="convertkit">ConvertKit</SelectItem>
              <SelectItem value="none">No current platform</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="primaryGoal">Primary Email Marketing Goal *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-sm">
                    This helps us match you with experts who specialize in achieving your specific objectives.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={formData.primaryGoal || ''} onValueChange={(value) => handleInputChange('primaryGoal', value)}>
            <SelectTrigger>
              <SelectValue placeholder="What's your main goal?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="increase-revenue">Increase revenue from email</SelectItem>
              <SelectItem value="grow-list">Grow email list</SelectItem>
              <SelectItem value="improve-automation">Improve email automation</SelectItem>
              <SelectItem value="better-segmentation">Better audience segmentation</SelectItem>
              <SelectItem value="reduce-unsubscribes">Reduce unsubscribe rates</SelectItem>
              <SelectItem value="setup-from-scratch">Set up email marketing from scratch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="biggestChallenge">Biggest Email Marketing Challenge *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-sm">
                    Share your specific pain points so we can find experts who have solved similar challenges.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            id="biggestChallenge"
            placeholder="Describe your biggest challenge with email marketing..."
            value={formData.biggestChallenge || ''}
            onChange={(e) => handleInputChange('biggestChallenge', e.target.value)}
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!isValid}
          className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MarketingInfoStep;
