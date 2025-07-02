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
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const ProviderApplicationQuestionsPage = () => {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    headline: '',
    yearsExperience: '',
    primaryEsp: '',
    approachDescription: '',
    portfolioUrl: '',
    industriesServed: [] as string[],
    linkedinUrl: '',
    caseStudyResults: ''
  });

  const industries = [
    'Fashion & Apparel',
    'Beauty & Cosmetics',
    'Health & Wellness',
    'Food & Beverage',
    'Home & Garden',
    'Electronics & Tech',
    'Sports & Fitness',
    'Pet Care',
    'Baby & Kids',
    'Automotive'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to continue');
      return;
    }

    setLoading(true);

    try {
      // Create provider profile
      const { error: profileError } = await supabase
        .from('provider_profiles')
        .upsert({
          user_id: user.id,
          headline: formData.headline,
          years_experience: formData.yearsExperience,
          primary_esp: formData.primaryEsp,
          industries_served: formData.industriesServed,
          approach_description: formData.approachDescription,
          portfolio_url: formData.portfolioUrl
        }, {
          onConflict: 'user_id'
        });

      if (profileError) throw profileError;

      // Create provider application
      const applicationData = {
        ...formData,
        linkedin_url: formData.linkedinUrl,
        case_study_results: formData.caseStudyResults
      };

      const { error: applicationError } = await supabase
        .from('provider_applications')
        .upsert({
          user_id: user.id,
          application_data: applicationData,
          status: 'submitted',
          submitted_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (applicationError) throw applicationError;

      // Update main profile
      const { error: mainProfileError } = await supabase
        .from('profiles')
        .update({
          headline: formData.headline,
          years_experience: formData.yearsExperience,
          primary_esp: formData.primaryEsp,
          industries_served: formData.industriesServed,
          approach_description: formData.approachDescription,
          portfolio_url: formData.portfolioUrl,
          account_status: 'pending_application',
          onboarding_complete: true
        })
        .eq('id', user.id);

      if (mainProfileError) throw mainProfileError;

      await refreshProfile();
      toast.success('Application submitted! You will hear back within 2-3 business days.');
      navigate('/provider/dashboard');

    } catch (error: any) {
      console.error('Application submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIndustryChange = (industry: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      industriesServed: checked 
        ? [...prev.industriesServed, industry]
        : prev.industriesServed.filter(i => i !== industry)
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-[#0A2342]">
              Tell us about your expertise
            </CardTitle>
            <p className="text-center text-[#0E3366]">
              Help us showcase your skills to potential clients
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="headline" className="text-[#0A2342]">Professional Headline *</Label>
                <Input
                  id="headline"
                  value={formData.headline}
                  onChange={(e) => handleInputChange('headline', e.target.value)}
                  placeholder="e.g., Email Marketing Specialist for eCommerce Brands"
                  required
                  className="border-[#2D82B7]/30 focus:border-[#2D82B7]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#0A2342]">Years of Experience *</Label>
                  <Select value={formData.yearsExperience} onValueChange={(value) => handleInputChange('yearsExperience', value)}>
                    <SelectTrigger className="border-[#2D82B7]/30 focus:border-[#2D82B7]">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#0A2342]">Primary Email Platform *</Label>
                  <Select value={formData.primaryEsp} onValueChange={(value) => handleInputChange('primaryEsp', value)}>
                    <SelectTrigger className="border-[#2D82B7]/30 focus:border-[#2D82B7]">
                      <SelectValue placeholder="Select primary platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="klaviyo">Klaviyo</SelectItem>
                      <SelectItem value="mailchimp">Mailchimp</SelectItem>
                      <SelectItem value="hubspot">HubSpot</SelectItem>
                      <SelectItem value="constant-contact">Constant Contact</SelectItem>
                      <SelectItem value="convertkit">ConvertKit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[#0A2342]">Industries You Serve *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {industries.map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox
                        id={industry}
                        checked={formData.industriesServed.includes(industry)}
                        onCheckedChange={(checked) => handleIndustryChange(industry, checked as boolean)}
                      />
                      <Label htmlFor={industry} className="text-sm text-[#0E3366]">
                        {industry}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="approachDescription" className="text-[#0A2342]">Your Approach & Methodology *</Label>
                <Textarea
                  id="approachDescription"
                  value={formData.approachDescription}
                  onChange={(e) => handleInputChange('approachDescription', e.target.value)}
                  placeholder="Describe your approach to email marketing and what makes you unique..."
                  required
                  className="border-[#2D82B7]/30 focus:border-[#2D82B7] min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl" className="text-[#0A2342]">Portfolio/Website URL</Label>
                  <Input
                    id="portfolioUrl"
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                    placeholder="https://yourportfolio.com"
                    className="border-[#2D82B7]/30 focus:border-[#2D82B7]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl" className="text-[#0A2342]">LinkedIn Profile</Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="border-[#2D82B7]/30 focus:border-[#2D82B7]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="caseStudyResults" className="text-[#0A2342]">Best Case Study Results</Label>
                <Textarea
                  id="caseStudyResults"
                  value={formData.caseStudyResults}
                  onChange={(e) => handleInputChange('caseStudyResults', e.target.value)}
                  placeholder="Share specific results you've achieved for clients (e.g., increased revenue, open rates, etc.)"
                  className="border-[#2D82B7]/30 focus:border-[#2D82B7] min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2D82B7] hover:bg-[#3D9AD1] text-white py-3 text-lg"
              >
                {loading ? 'Submitting Application...' : 'Submit Application & Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProviderApplicationQuestionsPage;