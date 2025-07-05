import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { OnboardingProvider, useOnboarding } from './OnboardingProvider';
import { founderOnboardingConfig } from './config/founderSteps';
import { providerOnboardingConfig } from './config/providerSteps';
import { toast } from 'sonner';

// Import existing step components
import BusinessInfoStep from './steps/BusinessInfoStep';
import MarketingInfoStep from './steps/MarketingInfoStep';
import ExpertiseStep from './steps/ExpertiseStep';
import PortfolioStep from './steps/PortfolioStep';
import SuccessStep from './steps/SuccessStep';

interface OnboardingFlowProps {
  role: 'founder' | 'provider';
}

const OnboardingContent: React.FC = () => {
  const { 
    currentStep, 
    totalSteps, 
    formData, 
    loading, 
    role, 
    progress,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    submitOnboarding
  } = useOnboarding();

  const config = role === 'founder' ? founderOnboardingConfig : providerOnboardingConfig;
  const currentStepConfig = config.steps[currentStep - 1];
  const pageTitle = role === 'founder' ? 'Complete Your Founder Profile' : 'Submit Your Provider Application';

  const getStepComponent = () => {
    const componentName = currentStepConfig.component;
    
    switch (componentName) {
      case 'BusinessInfoStep':
        return (
          <BusinessInfoStep
            data={formData}
            updateData={updateFormData}
            onNext={goToNextStep}
          />
        );
      case 'MarketingInfoStep':
        return (
          <MarketingInfoStep
            data={formData}
            updateData={updateFormData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 'ExpertiseStep':
        return (
          <ExpertiseStep
            data={formData}
            updateData={updateFormData}
            onNext={goToNextStep}
          />
        );
      case 'PortfolioStep':
        return (
          <PortfolioStep
            data={formData}
            updateData={updateFormData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 'SuccessStep':
        return (
          <SuccessStep
            role={role}
            data={formData}
            updateData={updateFormData}
            onBack={goToPreviousStep}
            onComplete={submitOnboarding}
            loading={loading}
          />
        );
      default:
        return <div>Step not found</div>;
    }
  };

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
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          {currentStepConfig.description && (
            <p className="text-center text-gray-600 mt-2">
              {currentStepConfig.description}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {getStepComponent()}
        </CardContent>
      </Card>
    </div>
  );
};

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ role }) => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // Access control checks
  React.useEffect(() => {
    console.log('OnboardingFlow: Checking user access', { user: !!user, profile, role });
    
    if (!user || !profile) {
      console.log('OnboardingFlow: No user or profile, redirecting to login');
      navigate('/');
      return;
    }

    if (profile.role !== role) {
      toast.error(`Access denied. This page is for ${role}s only.`);
      console.log('OnboardingFlow: Role mismatch, redirecting to home');
      navigate('/');
      return;
    }

    // Check if onboarding is already complete
    if ((profile.account_status === 'active' && role === 'founder') || 
        (profile.account_status === 'pending_application' && role === 'provider') ||
        (profile.account_status === 'active' && role === 'provider')) {
      toast.info(`You have already completed ${role === 'founder' ? 'onboarding' : 'your application'}.`);
      console.log('OnboardingFlow: Onboarding already complete, redirecting to dashboard');
      navigate(`/${role}/dashboard`);
      return;
    }
  }, [user, profile, navigate, role]);

  if (!user || !profile) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <OnboardingProvider role={role}>
      <OnboardingContent />
    </OnboardingProvider>
  );
};

export default OnboardingFlow;