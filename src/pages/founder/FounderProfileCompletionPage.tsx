import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const FounderProfileCompletionPage = () => {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessWebsite: '',
    monthlyRevenue: '',
    primaryGoal: '',
    biggestChallenge: '',
    currentPlatform: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to continue');
      return;
    }

    setLoading(true);

    try {
      // Update main profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          business_name: formData.businessName,
          business_website: formData.businessWebsite,
          monthly_revenue: formData.monthlyRevenue,
          marketing_goal: formData.primaryGoal,
          biggest_challenge: formData.biggestChallenge,
          email_platform: formData.currentPlatform,
          onboarding_complete: true,
          account_status: 'active'
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Create founder profile
      const { error: founderError } = await supabase
        .from('founder_profiles')
        .upsert({
          user_id: user.id,
          business_website: formData.businessWebsite,
          monthly_revenue_range: formData.monthlyRevenue,
          primary_goal: formData.primaryGoal,
          biggest_challenge: formData.biggestChallenge,
          current_email_platform: formData.currentPlatform
        }, {
          onConflict: 'user_id'
        });

      if (founderError) throw founderError;

      await refreshProfile();
      toast.success('Profile completed! Welcome to Connect!');
      navigate('/founder/dashboard');

    } catch (error: any) {
      console.error('Profile completion error:', error);
      toast.error('Failed to complete profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-[#0A2342]">
              Tell us about your business
            </CardTitle>
            <p className="text-center text-[#0E3366]">
              Help us match you with the perfect email marketing experts
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-[#0A2342]">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Your business name"
                    required
                    className="border-[#2D82B7]/30 focus:border-[#2D82B7]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessWebsite" className="text-[#0A2342]">Website URL</Label>
                  <Input
                    id="businessWebsite"
                    type="url"
                    value={formData.businessWebsite}
                    onChange={(e) => handleInputChange('businessWebsite', e.target.value)}
                    placeholder="https://yourbusiness.com"
                    className="border-[#2D82B7]/30 focus:border-[#2D82B7]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#0A2342]">Monthly Revenue Range *</Label>
                <Select value={formData.monthlyRevenue} onValueChange={(value) => handleInputChange('monthlyRevenue', value)}>
                  <SelectTrigger className="border-[#2D82B7]/30 focus:border-[#2D82B7]">
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-10k">$0 - $10K</SelectItem>
                    <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                    <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                    <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                    <SelectItem value="500k+">$500K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[#0A2342]">Current Email Platform</Label>
                <Select value={formData.currentPlatform} onValueChange={(value) => handleInputChange('currentPlatform', value)}>
                  <SelectTrigger className="border-[#2D82B7]/30 focus:border-[#2D82B7]">
                    <SelectValue placeholder="Select your current platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="klaviyo">Klaviyo</SelectItem>
                    <SelectItem value="mailchimp">Mailchimp</SelectItem>
                    <SelectItem value="shopify-email">Shopify Email</SelectItem>
                    <SelectItem value="constant-contact">Constant Contact</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="none">No current platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryGoal" className="text-[#0A2342]">Primary Marketing Goal *</Label>
                <Textarea
                  id="primaryGoal"
                  value={formData.primaryGoal}
                  onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
                  placeholder="What do you want to achieve with email marketing?"
                  required
                  className="border-[#2D82B7]/30 focus:border-[#2D82B7] min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="biggestChallenge" className="text-[#0A2342]">Biggest Email Marketing Challenge *</Label>
                <Textarea
                  id="biggestChallenge"
                  value={formData.biggestChallenge}
                  onChange={(e) => handleInputChange('biggestChallenge', e.target.value)}
                  placeholder="What's your biggest challenge with email marketing?"
                  required
                  className="border-[#2D82B7]/30 focus:border-[#2D82B7] min-h-[80px]"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2D82B7] hover:bg-[#3D9AD1] text-white py-3 text-lg"
              >
                {loading ? 'Creating Your Profile...' : 'Complete Profile & Browse Providers'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FounderProfileCompletionPage;