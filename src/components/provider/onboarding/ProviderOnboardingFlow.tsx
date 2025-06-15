
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ExpertiseStep from './ExpertiseStep';
import IndustriesStep from './IndustriesStep';
import ApplicationSubmissionStep from './ApplicationSubmissionStep';

interface ApplicationData {
  headline?: string;
  yearsExperience?: string;
  primaryEsp?: string;
  approachDescription?: string;
  portfolioUrl?: string;
  industriesServed?: string[];
}

const ProviderOnboardingFlow = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({});

  const totalSteps = 3;

  const updateApplicationData = (data: Partial<ApplicationData>) => {
    setApplicationData(prev => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitApplication = async () => {
    if (!user) {
      toast.error('You must be logged in to submit an application');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Submitting provider application:', applicationData);

      // Create provider profile
      const { error: profileError } = await supabase
        .from('provider_profiles')
        .upsert({
          user_id: user.id,
          headline: applicationData.headline,
          years_experience: applicationData.yearsExperience,
          primary_esp: applicationData.primaryEsp,
          industries_served: applicationData.industriesServed,
          approach_description: applicationData.approachDescription,
          portfolio_url: applicationData.portfolioUrl
        }, {
          onConflict: 'user_id'
        });

      if (profileError) {
        console.error('Error creating provider profile:', profileError);
        throw profileError;
      }

      // Create provider application
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

      if (applicationError) {
        console.error('Error creating provider application:', applicationError);
        throw applicationError;
      }

      // Update main profile status
      const { error: statusError } = await supabase
        .from('profiles')
        .update({
          account_status: 'pending_application',
          onboarding_complete: true
        })
        .eq('id', user.id);

      if (statusError) {
        console.error('Error updating profile status:', statusError);
        throw statusError;
      }

      // Refresh profile to get updated status
      await refreshProfile();
      
      toast.success('Application submitted successfully! You will receive an email update within 2-3 business days.');
      
      // Navigate to dashboard to show application status
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
            data={applicationData}
            updateData={updateApplicationData}
            onNext={goToNextStep}
          />
        );
      case 2:
        return (
          <IndustriesStep
            data={applicationData}
            updateData={updateApplicationData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 3:
        return (
          <ApplicationSubmissionStep
            data={applicationData}
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
            Provider Application
          </CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Join Connect's network of elite email marketing specialists
          </p>
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

export default ProviderOnboardingFlow;
