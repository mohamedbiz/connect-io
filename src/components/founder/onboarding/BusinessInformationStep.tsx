
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BusinessInformationStepProps {
  data: {
    businessWebsite: string;
    industry: string;
    monthlyRevenueRange: string;
  };
  updateData: (data: Partial<any>) => void;
  onNext: () => void;
}

const BusinessInformationStep = ({ data, updateData, onNext }: BusinessInformationStepProps) => {
  const [formData, setFormData] = useState(data);

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData(newData);
  };

  const isValid = formData.businessWebsite && formData.industry && formData.monthlyRevenueRange;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
          Tell us about your business
        </h3>
        <p className="text-gray-600">
          Help us understand your eCommerce business better
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="businessWebsite">Business Website *</Label>
          <Input
            id="businessWebsite"
            type="url"
            placeholder="https://yourstore.com"
            value={formData.businessWebsite}
            onChange={(e) => handleInputChange('businessWebsite', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="industry">Industry *</Label>
          <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fashion">Fashion & Apparel</SelectItem>
              <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
              <SelectItem value="food">Food & Beverage</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="sports">Sports & Outdoors</SelectItem>
              <SelectItem value="toys">Toys & Games</SelectItem>
              <SelectItem value="automotive">Automotive</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="monthlyRevenue">Monthly Revenue Range *</Label>
          <Select value={formData.monthlyRevenueRange} onValueChange={(value) => handleInputChange('monthlyRevenueRange', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your monthly revenue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-10k">$0 - $10,000</SelectItem>
              <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
              <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
              <SelectItem value="500k+">$500,000+</SelectItem>
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

export default BusinessInformationStep;
