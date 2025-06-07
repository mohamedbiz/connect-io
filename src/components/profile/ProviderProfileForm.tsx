import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile } from '@/utils/auth/profile-operations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

const ProviderProfileForm = () => {
  const { profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    headline: profile?.headline || '',
    years_experience: profile?.years_experience || '',
    primary_esp: profile?.primary_esp || '',
    industries_served: profile?.industries_served || [],
    approach_description: profile?.approach_description || '',
    portfolio_url: profile?.portfolio_url || '',
  });

  const experienceOptions = ['1-3', '3-5', '5+'];
  const espOptions = ['Klaviyo', 'Mailchimp', 'Omnisend', 'ActiveCampaign'];
  const industryOptions = ['Fashion', 'Beauty', 'Wellness', 'Home Goods', 'Food/Bev', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    try {
      const updated = await updateProfile(profile.id, {
        ...formData,
        onboarding_complete: true
      });

      if (updated) {
        await refreshProfile();
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleIndustryChange = (industry: string, checked: boolean) => {
    const currentIndustries = formData.industries_served || [];
    if (checked) {
      handleInputChange('industries_served', [...currentIndustries, industry]);
    } else {
      handleInputChange('industries_served', currentIndustries.filter(i => i !== industry));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Provider Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {!profile?.approved && (
          <Alert className="mb-6">
            <AlertDescription>
              Your profile is pending approval. You can edit your information, but it won't be visible in the directory until approved by an admin.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                required
                disabled={!profile?.approved}
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                required
                disabled={!profile?.approved}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile?.email || ''}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div>
            <Label htmlFor="headline">Headline/Specialty *</Label>
            <Input
              id="headline"
              value={formData.headline}
              onChange={(e) => handleInputChange('headline', e.target.value)}
              placeholder="e.g., Email Marketing Specialist for eCommerce"
              required
              disabled={!profile?.approved}
            />
          </div>

          <div>
            <Label htmlFor="years_experience">Years of eCommerce Email Experience *</Label>
            <Select 
              value={formData.years_experience} 
              onValueChange={(value) => handleInputChange('years_experience', value)}
              disabled={!profile?.approved}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option} years
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="primary_esp">Primary ESP Expertise *</Label>
            <Select 
              value={formData.primary_esp} 
              onValueChange={(value) => handleInputChange('primary_esp', value)}
              disabled={!profile?.approved}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select primary platform" />
              </SelectTrigger>
              <SelectContent>
                {espOptions.map((esp) => (
                  <SelectItem key={esp} value={esp}>
                    {esp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Industries Served *</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {industryOptions.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={industry}
                    checked={formData.industries_served?.includes(industry) || false}
                    onCheckedChange={(checked) => handleIndustryChange(industry, checked as boolean)}
                    disabled={!profile?.approved}
                  />
                  <Label htmlFor={industry} className="text-sm">
                    {industry}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="approach_description">Brief Description of Approach/Results *</Label>
            <Textarea
              id="approach_description"
              value={formData.approach_description}
              onChange={(e) => handleInputChange('approach_description', e.target.value)}
              placeholder="Describe your approach and typical results you achieve for clients..."
              rows={4}
              required
              disabled={!profile?.approved}
            />
          </div>

          <div>
            <Label htmlFor="portfolio_url">Link to Portfolio / Case Study *</Label>
            <Input
              id="portfolio_url"
              type="url"
              value={formData.portfolio_url}
              onChange={(e) => handleInputChange('portfolio_url', e.target.value)}
              placeholder="https://"
              required
              disabled={!profile?.approved}
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading || !profile?.approved} 
            className="w-full"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProviderProfileForm;
