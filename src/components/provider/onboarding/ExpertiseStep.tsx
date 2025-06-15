
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ExpertiseStepProps {
  data: {
    headline?: string;
    yearsExperience?: string;
    primaryEsp?: string;
    approachDescription?: string;
  };
  updateData: (data: Partial<any>) => void;
  onNext: () => void;
}

const ExpertiseStep = ({ data, updateData, onNext }: ExpertiseStepProps) => {
  const [formData, setFormData] = useState({
    headline: data.headline || '',
    yearsExperience: data.yearsExperience || '',
    primaryEsp: data.primaryEsp || '',
    approachDescription: data.approachDescription || ''
  });

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData(newData);
  };

  const isValid = formData.headline && formData.yearsExperience && formData.primaryEsp && formData.approachDescription;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
          Tell us about your expertise
        </h3>
        <p className="text-gray-600">
          Help us understand your background and approach so we can match you with the right clients.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="headline">Professional Headline *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-sm">
                    A brief, compelling description of your specialty that clients will see first.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="headline"
            placeholder="e.g., Email Marketing Specialist for eCommerce Brands"
            value={formData.headline}
            onChange={(e) => handleInputChange('headline', e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="yearsExperience">Years of Experience *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-sm">
                    Your experience level helps us match you with appropriately sized projects.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={formData.yearsExperience} onValueChange={(value) => handleInputChange('yearsExperience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3">1-3 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="primaryEsp">Primary Platform Expertise *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-sm">
                    The email platform you're most experienced with. We'll match you with clients using this platform.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={formData.primaryEsp} onValueChange={(value) => handleInputChange('primaryEsp', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your primary platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="klaviyo">Klaviyo</SelectItem>
              <SelectItem value="mailchimp">Mailchimp</SelectItem>
              <SelectItem value="omnisend">Omnisend</SelectItem>
              <SelectItem value="activecampaign">ActiveCampaign</SelectItem>
              <SelectItem value="constantcontact">Constant Contact</SelectItem>
              <SelectItem value="sendgrid">SendGrid</SelectItem>
              <SelectItem value="campaignmonitor">Campaign Monitor</SelectItem>
              <SelectItem value="aweber">AWeber</SelectItem>
              <SelectItem value="convertkit">ConvertKit</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="approachDescription">Your Approach & Results *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-sm">
                    Describe your methodology and typical results. This helps clients understand your value proposition.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            id="approachDescription"
            placeholder="Describe your approach to email marketing and typical results you achieve for clients..."
            value={formData.approachDescription}
            onChange={(e) => handleInputChange('approachDescription', e.target.value)}
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end">
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

export default ExpertiseStep;
