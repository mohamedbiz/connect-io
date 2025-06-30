
import React from 'react';
import { useParams } from 'react-router-dom';
import FounderOnboardingPage from '../founder/FounderOnboardingPage';
import ProviderOnboardingPage from '../provider/ProviderOnboardingPage';

const OnboardingPage = () => {
  const { role } = useParams<{ role: string }>();

  if (role === 'founder') {
    return <FounderOnboardingPage />;
  }

  if (role === 'provider') {
    return <ProviderOnboardingPage />;
  }

  // Fallback to founder onboarding
  return <FounderOnboardingPage />;
};

export default OnboardingPage;
