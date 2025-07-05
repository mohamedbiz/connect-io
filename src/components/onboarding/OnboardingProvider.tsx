import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingContextType, OnboardingData } from './config/stepTypes';
import { founderOnboardingConfig } from './config/founderSteps';
import { providerOnboardingConfig } from './config/providerSteps';
import { supabase } from '@/integrations/supabase/client';
import { completeOnboarding } from '@/utils/auth/profile-operations';
import { toast } from 'sonner';

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: React.ReactNode;
  role: 'founder' | 'provider';
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children, role }) => {
  const { user, refreshProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({});
  const [loading, setLoading] = useState(false);

  const config = role === 'founder' ? founderOnboardingConfig : providerOnboardingConfig;
  const totalSteps = config.totalSteps;

  // Load progress from localStorage
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`onboarding_${role}_${user.id}`);
      if (savedProgress) {
        const { step, data } = JSON.parse(savedProgress);
        setCurrentStep(step);
        setFormData(data);
      }
    }
  }, [user, role]);

  // Save progress to localStorage
  const saveProgress = (step: number, data: OnboardingData) => {
    if (user) {
      localStorage.setItem(`onboarding_${role}_${user.id}`, JSON.stringify({ step, data }));
    }
  };

  const updateFormData = (newData: Partial<OnboardingData>) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    saveProgress(currentStep, updatedData);
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveProgress(nextStep, formData);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      saveProgress(prevStep, formData);
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentStepConfig = config.steps[currentStep - 1];
    if (!currentStepConfig.validation) return true;

    for (const [field, rules] of Object.entries(currentStepConfig.validation)) {
      const value = formData[field as keyof OnboardingData];
      
      if (rules.required && (!value || (Array.isArray(value) && value.length === 0))) {
        return false;
      }
      
      if (rules.minItems && Array.isArray(value) && value.length < rules.minItems) {
        return false;
      }
    }
    
    return true;
  };

  const submitOnboarding = async () => {
    if (!user) return;

    setLoading(true);
    console.log('OnboardingProvider: Starting onboarding submission', { role, formData });
    
    try {
      if (role === 'founder') {
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

        // Complete onboarding
        await completeOnboarding(user.id, 'founder');
        
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
          })
          .eq('id', user.id);

        if (profileError) throw profileError;

        // Complete onboarding
        await completeOnboarding(user.id, 'provider');
      }

      console.log('OnboardingProvider: Onboarding completed successfully');
      
      // Clear saved progress
      if (user) {
        localStorage.removeItem(`onboarding_${role}_${user.id}`);
      }
      
      // Force refresh of profile
      await refreshProfile();
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success(`${role === 'founder' ? 'Onboarding' : 'Application'} completed successfully!`);
      
      // Force page reload to ensure auth context is fully refreshed
      window.location.href = `/${role}/dashboard`;
      
    } catch (error) {
      console.error(`OnboardingProvider: Error completing ${role === 'founder' ? 'onboarding' : 'application'}:`, error);
      toast.error(`Failed to complete ${role === 'founder' ? 'onboarding' : 'application'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const canGoNext = currentStep < totalSteps && validateCurrentStep();
  const canGoBack = currentStep > 1;
  const progress = (currentStep / totalSteps) * 100;

  const value: OnboardingContextType = {
    currentStep,
    totalSteps,
    formData,
    loading,
    role,
    progress,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    submitOnboarding,
    canGoNext,
    canGoBack
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};