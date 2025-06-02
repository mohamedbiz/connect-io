
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface IndustriesStepProps {
  data: {
    industriesServed: string[];
    approachDescription: string;
  };
  updateData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

const industries = [
  'Fashion & Apparel',
  'Beauty & Cosmetics',
  'Health & Wellness',
  'Food & Beverage',
  'Home & Garden',
  'Electronics',
  'Sports & Outdoors',
  'Toys & Games',
  'Automotive',
  'Other'
];

const IndustriesStep = ({ data, updateData, onNext, onBack }: IndustriesStepProps) => {
  const [formData, setFormData] = useState(data);

  const handleIndustryChange = (industry: string, checked: boolean) => {
    const newIndustries = checked 
      ? [...formData.industriesServed, industry]
      : formData.industriesServed.filter(i => i !== industry);
    
    const newData = { ...formData, industriesServed: newIndustries };
    setFormData(newData);
    updateData(newData);
  };

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData(newData);
  };

  const isValid = formData.industriesServed.length > 0 && formData.approachDescription;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
          Industries & approach
        </h3>
        <p className="text-gray-600">
          Which industries do you work with and what's your approach?
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Industries You Work With *</Label>
          <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
          <div className="grid grid-cols-2 gap-2">
            {industries.map((industry) => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox
                  id={industry}
                  checked={formData.industriesServed.includes(industry)}
                  onCheckedChange={(checked) => handleIndustryChange(industry, !!checked)}
                />
                <Label htmlFor={industry} className="text-sm">{industry}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="approachDescription">Your Email Marketing Approach *</Label>
          <Textarea
            id="approachDescription"
            placeholder="Describe your approach to email marketing for eCommerce brands..."
            value={formData.approachDescription}
            onChange={(e) => handleInputChange('approachDescription', e.target.value)}
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

export default IndustriesStep;
