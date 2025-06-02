
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ExpertiseStep from '@/components/provider/onboarding/ExpertiseStep';
import IndustriesStep from '@/components/provider/onboarding/IndustriesStep';
import PortfolioStep from '@/components/provider/onboarding/PortfolioStep';

interface OnboardingData {
  headline: string;
  yearsExperience: string;
  primaryEsp: string;
  industriesServed: string[];
  approachDescription: string;
  portfolioUrl: string;
  profilePictureUrl?: string;
}

const ProviderOnboardingPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    headline: '',
    yearsExperience: '',
    primaryEsp: '',
    industriesServed: [],
    approachDescription: '',
    portfolioUrl: '',
    profilePictureUrl: ''
  });

  useEffect(() => {
    if (!user || !profile) {
      navigate('/login');
      return;
    }

    if (profile.role !== 'provider') {
      toast.error('Access denied. This page is for providers only.');
      navigate('/');
      return;
    }

    if (profile.account_status === 'active') {
      toast.info('You have already completed your application.');
      navigate('/provider/dashboard');
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

  const submitApplication = async () => {
    if (!user) return;

    setLoading(true);
    try {
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

      if (providerProfileError) {
        throw providerProfileError;
      }

      // Create provider application
      const { error: applicationError } = await supabase
        .from('provider_applications')
        .insert({
          user_id: user.id,
          application_data: formData,
          status: 'submitted'
        });

      if (applicationError) {
        throw applicationError;
      }

      // Update main profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          profile_picture_url: formData.profilePictureUrl,
          account_status: 'pending_application'
        })
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      toast.success('Application submitted successfully!');
      navigate('/provider/dashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepComponent = () => {
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
          <IndustriesStep
            data={formData}
            updateData={updateFormData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 3:
        return (
          <PortfolioStep
            data={formData}
            updateData={updateFormData}
            onBack={goToPreviousStep}
            onComplete={submitApplication}
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
              Submit Your Provider Application
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

export default ProviderOnboardingPage;
