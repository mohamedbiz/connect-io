
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExpertiseStepProps {
  data: {
    headline: string;
    yearsExperience: string;
    primaryEsp: string;
  };
  updateData: (data: Partial<any>) => void;
  onNext: () => void;
}

const ExpertiseStep = ({ data, updateData, onNext }: ExpertiseStepProps) => {
  const [formData, setFormData] = useState(data);

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData(newData);
  };

  const isValid = formData.headline && formData.yearsExperience && formData.primaryEsp;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
          Tell us about your expertise
        </h3>
        <p className="text-gray-600">
          Help us understand your email marketing experience and specializations
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="headline">Professional Headline *</Label>
          <Input
            id="headline"
            placeholder="e.g., Email Marketing Specialist for eCommerce Brands"
            value={formData.headline}
            onChange={(e) => handleInputChange('headline', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="yearsExperience">Years of Email Marketing Experience *</Label>
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
          <Label htmlFor="primaryEsp">Primary Email Service Provider (ESP) *</Label>
          <Select value={formData.primaryEsp} onValueChange={(value) => handleInputChange('primaryEsp', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your primary ESP" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="klaviyo">Klaviyo</SelectItem>
              <SelectItem value="mailchimp">Mailchimp</SelectItem>
              <SelectItem value="constantcontact">Constant Contact</SelectItem>
              <SelectItem value="sendgrid">SendGrid</SelectItem>
              <SelectItem value="campaignmonitor">Campaign Monitor</SelectItem>
              <SelectItem value="aweber">AWeber</SelectItem>
              <SelectItem value="convertkit">ConvertKit</SelectItem>
              <SelectItem value="omnisend">Omnisend</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
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
