
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { completeOnboarding } from '@/utils/auth/profile-operations';
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
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({});

  const totalSteps = 3;
  const isFounder = role === 'founder';
  const pageTitle = isFounder ? 'Complete Your Founder Profile' : 'Submit Your Provider Application';

  useEffect(() => {
    console.log('UnifiedOnboardingFlow: Checking user access', { user: !!user, profile, role });
    
    if (!user || !profile) {
      console.log('UnifiedOnboardingFlow: No user or profile, redirecting to login');
      navigate('/login');
      return;
    }

    if (profile.role !== role) {
      toast.error(`Access denied. This page is for ${role}s only.`);
      console.log('UnifiedOnboardingFlow: Role mismatch, redirecting to home');
      navigate('/');
      return;
    }

    // Check if onboarding is already complete
    if ((profile.account_status === 'active' && isFounder) || 
        (profile.account_status === 'pending_application' && !isFounder) ||
        (profile.account_status === 'active' && !isFounder)) {
      toast.info(`You have already completed ${isFounder ? 'onboarding' : 'your application'}.`);
      console.log('UnifiedOnboardingFlow: Onboarding already complete, redirecting to dashboard');
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
    console.log('UnifiedOnboardingFlow: Starting onboarding submission', { role, formData });
    
    try {
      if (isFounder) {
        console.log('UnifiedOnboardingFlow: Creating founder profile');
        
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
          })
          .eq('id', user.id);

        if (profileError) throw profileError;

        // Complete onboarding with proper status transition
        await completeOnboarding(user.id, 'founder');
        
      } else {
        console.log('UnifiedOnboardingFlow: Creating provider profile');
        
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
          })
          .eq('id', user.id);

        if (profileError) throw profileError;

        // Complete onboarding with proper status transition
        await completeOnboarding(user.id, 'provider');
      }

      console.log('UnifiedOnboardingFlow: Onboarding completed successfully');
      
      // Force refresh of profile to get updated status
      await refreshProfile();
      
      // Small delay to ensure profile refresh completes
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success(`${isFounder ? 'Onboarding' : 'Application'} completed successfully!`);
      
      // Force page reload to ensure auth context is fully refreshed
      window.location.href = `/${role}/dashboard`;
      
    } catch (error) {
      console.error(`UnifiedOnboardingFlow: Error completing ${isFounder ? 'onboarding' : 'application'}:`, error);
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
