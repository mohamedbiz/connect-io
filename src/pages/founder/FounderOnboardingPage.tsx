
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import BusinessInformationStep from '@/components/founder/onboarding/BusinessInformationStep';
import EmailMarketingStep from '@/components/founder/onboarding/EmailMarketingStep';
import ProfilePictureStep from '@/components/founder/onboarding/ProfilePictureStep';

interface OnboardingData {
  businessWebsite: string;
  industry: string;
  monthlyRevenueRange: string;
  currentEmailPlatform: string;
  primaryGoal: string;
  biggestChallenge: string;
  profilePictureUrl?: string;
}

const FounderOnboardingPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    businessWebsite: '',
    industry: '',
    monthlyRevenueRange: '',
    currentEmailPlatform: '',
    primaryGoal: '',
    biggestChallenge: '',
    profilePictureUrl: ''
  });

  useEffect(() => {
    if (!user || !profile) {
      navigate('/login');
      return;
    }

    if (profile.role !== 'founder') {
      toast.error('Access denied. This page is for founders only.');
      navigate('/');
      return;
    }

    if (profile.account_status === 'active') {
      toast.info('You have already completed onboarding.');
      navigate('/founder/dashboard');
      return;
    }
  }, [user, profile, navigate]);

  const updateFormData = (stepData: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitOnboarding = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Create founder profile
      const { error: founderProfileError } = await supabase
        .from('founder_profiles')
        .insert({
          user_id: user.id,
          business_website: formData.businessWebsite,
          current_email_platform: formData.currentEmailPlatform,
          primary_goal: formData.primaryGoal,
          biggest_challenge: formData.biggestChallenge,
          monthly_revenue_range: formData.monthlyRevenueRange,
          profile_picture_url: formData.profilePictureUrl
        });

      if (founderProfileError) {
        throw founderProfileError;
      }

      // Update main profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          industry: formData.industry,
          profile_picture_url: formData.profilePictureUrl,
          account_status: 'active',
          onboarding_complete: true
        })
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      toast.success('Onboarding completed successfully!');
      navigate('/founder/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to complete onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessInformationStep
            data={formData}
            updateData={updateFormData}
            onNext={goToNextStep}
          />
        );
      case 2:
        return (
          <EmailMarketingStep
            data={formData}
            updateData={updateFormData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 3:
        return (
          <ProfilePictureStep
            data={formData}
            updateData={updateFormData}
            onBack={goToPreviousStep}
            onComplete={submitOnboarding}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  if (!user || !profile) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl text-[#0A2342]">
              Complete Your Founder Profile
            </CardTitle>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Step {currentStep} of 3</span>
                <span>{Math.round((currentStep / 3) * 100)}%</span>
              </div>
              <Progress value={(currentStep / 3) * 100} className="h-2" />
            </div>
          </CardHeader>
          <CardContent>
            {getStepComponent()}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FounderOnboardingPage;
