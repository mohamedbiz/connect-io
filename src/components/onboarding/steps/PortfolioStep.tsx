
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface PortfolioStepProps {
  data: {
    portfolioUrl?: string;
    industriesServed?: string[];
  };
  updateData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PortfolioStep = ({ data, updateData, onNext, onBack }: PortfolioStepProps) => {
  const [formData, setFormData] = useState({
    portfolioUrl: data.portfolioUrl || '',
    industriesServed: data.industriesServed || []
  });

  const industryOptions = [
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

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData(newData);
  };

  const handleIndustryChange = (industry: string, checked: boolean) => {
    const currentIndustries = formData.industriesServed || [];
    const newIndustries = checked 
      ? [...currentIndustries, industry]
      : currentIndustries.filter(i => i !== industry);
    
    const newData = { ...formData, industriesServed: newIndustries };
    setFormData(newData);
    updateData(newData);
  };

  const isValid = formData.portfolioUrl && formData.industriesServed && formData.industriesServed.length > 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
          Portfolio & Industries
        </h3>
        <p className="text-gray-600">
          Share your work and industry experience to complete your application.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="portfolioUrl">Portfolio / Case Study URL *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-sm">
                    Link to your portfolio, case studies, or examples of your work. This helps clients evaluate your expertise.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="portfolioUrl"
            type="url"
            placeholder="https://your-portfolio.com"
            value={formData.portfolioUrl}
            onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <Label>Industries You Serve *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-sm">
                    Select all industries where you have experience. We'll match you with relevant clients.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {industryOptions.map((industry) => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox
                  id={industry}
                  checked={formData.industriesServed?.includes(industry) || false}
                  onCheckedChange={(checked) => handleIndustryChange(industry, checked as boolean)}
                />
                <Label htmlFor={industry} className="text-sm leading-none cursor-pointer">
                  {industry}
                </Label>
              </div>
            ))}
          </div>
          {formData.industriesServed && formData.industriesServed.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">Please select at least one industry.</p>
          )}
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

export default PortfolioStep;
