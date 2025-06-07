
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import BusinessInfoStep from './steps/BusinessInfoStep';
import MarketingInfoStep from './steps/MarketingInfoStep';
import ExpertiseStep from './steps/ExpertiseStep';
import PortfolioStep from './steps/PortfolioStep';
import SuccessStep from './steps/SuccessStep';

interface UnifiedOnboardingFlowProps {
  role: 'founder' | 'provider';
}

interface OnboardingData {
  // Founder fields
  businessWebsite?: string;
  industry?: string;
  monthlyRevenueRange?: string;
  currentEmailPlatform?: string;
  primaryGoal?: string;
  biggestChallenge?: string;
  profilePictureUrl?: string;
  
  // Provider fields
  headline?: string;
  yearsExperience?: string;
  primaryEsp?: string;
  industriesServed?: string[];
  approachDescription?: string;
  portfolioUrl?: string;
}

const UnifiedOnboardingFlow = ({ role }: UnifiedOnboardingFlowProps) => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({});

  const totalSteps = 3;
  const isFounder = role === 'founder';
  const pageTitle = isFounder ? 'Complete Your Founder Profile' : 'Submit Your Provider Application';

  useEffect(() => {
    if (!user || !profile) {
      navigate('/login');
      return;
    }

    if (profile.role !== role) {
      toast.error(`Access denied. This page is for ${role}s only.`);
      navigate('/');
      return;
    }

    if (profile.account_status === 'active') {
      toast.info(`You have already completed ${isFounder ? 'onboarding' : 'your application'}.`);
      navigate(`/${role}/dashboard`);
      return;
    }
  }, [user, profile, navigate, role, isFounder]);

  const updateFormData = (stepData: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
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
      if (isFounder) {
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

        if (founderProfileError) throw founderProfileError;

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

        if (profileError) throw profileError;

        toast.success('Onboarding completed successfully!');
      } else {
        // Create provider profile
        const { error: providerProfileError } = await supabase
          .from('provider_profiles')
          .insert({
            user_id: user.id,
            headline: formData.headline,
            years_experience: formData.yearsExperience,
            primary_esp: formData.primaryEsp,
            industries_served: formData.industriesServed,
            approach_description: formData.approachDescription,
            portfolio_url: formData.portfolioUrl,
            profile_picture_url: formData.profilePictureUrl
          });

        if (providerProfileError) throw providerProfileError;

        // Create provider application
        const { error: applicationError } = await supabase
          .from('provider_applications')
          .insert({
            user_id: user.id,
            application_data: formData,
            status: 'submitted'
          });

        if (applicationError) throw applicationError;

        // Update main profile
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            profile_picture_url: formData.profilePictureUrl,
            account_status: 'pending_application'
          })
          .eq('id', user.id);

        if (profileError) throw profileError;

        toast.success('Application submitted successfully!');
      }

      navigate(`/${role}/dashboard`);
    } catch (error) {
      console.error(`Error completing ${isFounder ? 'onboarding' : 'application'}:`, error);
      toast.error(`Failed to complete ${isFounder ? 'onboarding' : 'application'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const getStepComponent = () => {
    if (isFounder) {
      switch (currentStep) {
        case 1:
          return (
            <BusinessInfoStep
              data={formData}
              updateData={updateFormData}
              onNext={goToNextStep}
            />
          );
        case 2:
          return (
            <MarketingInfoStep
              data={formData}
              updateData={updateFormData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          );
        case 3:
          return (
            <SuccessStep
              role="founder"
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
    } else {
      switch (currentStep) {
        case 1:
          return (
            <ExpertiseStep
              data={formData}
              updateData={updateFormData}
              onNext={goToNextStep}
            />
          );
        case 2:
          return (
            <PortfolioStep
              data={formData}
              updateData={updateFormData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          );
        case 3:
          return (
            <SuccessStep
              role="provider"
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
    }
  };

  if (!user || !profile) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl text-[#0A2342]">
            {pageTitle}
          </CardTitle>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          {getStepComponent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default UnifiedOnboardingFlow;
