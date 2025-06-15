
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface OnboardingData {
  profileCompleted: boolean;
  dashboardViewed: boolean;
}

const ProviderOnboardingFlow = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    profileCompleted: false,
    dashboardViewed: false
  });

  const totalSteps = 3;

  useEffect(() => {
    if (!user || !profile || profile.role !== 'provider') {
      navigate('/');
      return;
    }

    // Check if already completed onboarding
    if (profile.account_status === 'active') {
      navigate('/provider/dashboard');
      return;
    }
  }, [user, profile, navigate]);

  const completeOnboarding = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Update profile to active status
      const { error } = await supabase
        .from('profiles')
        .update({
          account_status: 'active',
          onboarding_complete: true
        })
        .eq('id', user.id);

      if (error) throw error;

      // Refresh profile to get updated status
      await refreshProfile();
      
      toast.success('Onboarding completed! Welcome to Connect.');
      navigate('/provider/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to complete onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#0A2342] mb-2">
                Congratulations! You've been approved!
              </h2>
              <p className="text-gray-600">
                Welcome to Connect's network of elite email marketing specialists. 
                Let's get you set up to start connecting with eCommerce founders.
              </p>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0A2342] mb-4">
              How Connect Works
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🎯 Quality Connections</h3>
                <p className="text-blue-700 text-sm">
                  Connect carefully vets both providers and founders to ensure high-quality matches.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">📈 Your Dashboard</h3>
                <p className="text-green-700 text-sm">
                  Track potential client matches, manage conversations, and monitor your performance.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">💼 Professional Network</h3>
                <p className="text-purple-700 text-sm">
                  Join a network of vetted professionals focused on email marketing excellence.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0A2342] mb-4">
              Ready to Get Started?
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Next Steps:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Access your provider dashboard</li>
                  <li>• Review potential client matches</li>
                  <li>• Complete your public profile if needed</li>
                  <li>• Start connecting with eCommerce founders</li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
            Provider Onboarding
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
          {getStepContent()}
          
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={loading}
              className="bg-[#2D82B7] hover:bg-[#1E5A8A]"
            >
              {loading ? (
                'Completing...'
              ) : currentStep === totalSteps ? (
                'Complete Onboarding'
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderOnboardingFlow;
