
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile } from '@/utils/auth/auth-operations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const FounderProfileForm = () => {
  const { profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    business_name: profile?.business_name || '',
    business_website: profile?.business_website || '',
    industry: profile?.industry || '',
    email_platform: profile?.email_platform || '',
    marketing_goal: profile?.marketing_goal || '',
    biggest_challenge: profile?.biggest_challenge || '',
    monthly_revenue: profile?.monthly_revenue || '',
  });

  const industries = [
    'Fashion',
    'Beauty',
    'Wellness',
    'Home Goods',
    'Food/Bev',
    'Other'
  ];

  const emailPlatforms = [
    'Klaviyo',
    'Mailchimp',
    'Omnisend',
    'ActiveCampaign',
    'Other'
  ];

  const revenueRanges = [
    '<$50K',
    '$50K-$100K',
    '$100K-$250K',
    '$250K-$500K',
    '$500K+'
  ];

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Founder Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                required
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
            <Label htmlFor="business_name">Business Name *</Label>
            <Input
              id="business_name"
              value={formData.business_name}
              onChange={(e) => handleInputChange('business_name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="business_website">Business Website *</Label>
            <Input
              id="business_website"
              type="url"
              value={formData.business_website}
              onChange={(e) => handleInputChange('business_website', e.target.value)}
              placeholder="https://"
              required
            />
          </div>

          <div>
            <Label htmlFor="industry">Industry/Niche *</Label>
            <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="email_platform">Current Email Platform *</Label>
            <Select value={formData.email_platform} onValueChange={(value) => handleInputChange('email_platform', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your email platform" />
              </SelectTrigger>
              <SelectContent>
                {emailPlatforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="marketing_goal">Primary Email Marketing Goal *</Label>
            <Textarea
              id="marketing_goal"
              value={formData.marketing_goal}
              onChange={(e) => handleInputChange('marketing_goal', e.target.value)}
              placeholder="Describe your main email marketing objectives..."
              required
            />
          </div>

          <div>
            <Label htmlFor="biggest_challenge">Biggest Email Marketing Challenge *</Label>
            <Textarea
              id="biggest_challenge"
              value={formData.biggest_challenge}
              onChange={(e) => handleInputChange('biggest_challenge', e.target.value)}
              placeholder="What's your biggest challenge with email marketing?"
              required
            />
          </div>

          <div>
            <Label htmlFor="monthly_revenue">Approx. Monthly Revenue</Label>
            <Select value={formData.monthly_revenue} onValueChange={(value) => handleInputChange('monthly_revenue', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select revenue range (optional)" />
              </SelectTrigger>
              <SelectContent>
                {revenueRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FounderProfileForm;
