
import { useState } from 'react';
import { useFounderApplicationContext } from '../ApplicationContext';
import { INDUSTRIES } from '@/types/founder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BusinessInformationStep = () => {
  const { formData, updateFormData } = useFounderApplicationContext();
  const [otherIndustry, setOtherIndustry] = useState('');

  const handleIndustryChange = (value: string) => {
    updateFormData({ industry: value });
    if (value !== 'other') {
      setOtherIndustry('');
    }
  };

  const handleOtherIndustryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherIndustry(e.target.value);
    updateFormData({ industry: `other:${e.target.value}` });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold text-[#0A2342]">Business Information</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="business_name">Business/Store Name*</Label>
          <Input
            id="business_name"
            name="business_name"
            value={formData.business_name}
            onChange={handleInputChange}
            className="border-[#2D82B7]/30 focus-visible:ring-[#2D82B7]"
            placeholder="Your business name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry*</Label>
          <Select 
            value={formData.industry.startsWith('other:') ? 'other' : formData.industry} 
            onValueChange={handleIndustryChange}
          >
            <SelectTrigger className="border-[#2D82B7]/30 focus:ring-[#2D82B7]">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {formData.industry === 'other' && (
            <div className="mt-2">
              <Input
                placeholder="Specify industry"
                value={otherIndustry}
                onChange={handleOtherIndustryChange}
                className="border-[#2D82B7]/30 focus-visible:ring-[#2D82B7]"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthly_revenue">Monthly Revenue*</Label>
          <Select 
            value={formData.monthly_revenue} 
            onValueChange={(value) => updateFormData({ monthly_revenue: value })}
          >
            <SelectTrigger className="border-[#2D82B7]/30 focus:ring-[#2D82B7]">
              <SelectValue placeholder="Select revenue range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under_10k">Less than $10,000</SelectItem>
              <SelectItem value="10k_50k">$10,000 - $50,000</SelectItem>
              <SelectItem value="50k_100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k_500k">$100,000 - $500,000</SelectItem>
              <SelectItem value="over_500k">Over $500,000</SelectItem>
              <SelectItem value="not_yet">Not generating revenue yet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="number_of_employees">Number of Employees*</Label>
          <Select 
            value={formData.number_of_employees} 
            onValueChange={(value) => updateFormData({ number_of_employees: value })}
          >
            <SelectTrigger className="border-[#2D82B7]/30 focus:ring-[#2D82B7]">
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Just me</SelectItem>
              <SelectItem value="2_5">2-5 employees</SelectItem>
              <SelectItem value="6_10">6-10 employees</SelectItem>
              <SelectItem value="11_50">11-50 employees</SelectItem>
              <SelectItem value="over_50">Over 50 employees</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website_url">Website URL</Label>
          <Input
            id="website_url"
            name="website_url"
            type="url"
            value={formData.website_url}
            onChange={handleInputChange}
            className="border-[#2D82B7]/30 focus-visible:ring-[#2D82B7]"
            placeholder="https://example.com"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInformationStep;
