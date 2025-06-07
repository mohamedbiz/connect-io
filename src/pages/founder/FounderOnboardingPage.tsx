
import React from 'react';
import Layout from '@/components/layout/Layout';
import UnifiedOnboardingFlow from '@/components/onboarding/UnifiedOnboardingFlow';

const FounderOnboardingPage = () => {
  return (
    <Layout>
      <UnifiedOnboardingFlow role="founder" />
    </Layout>
  );
};

export default FounderOnboardingPage;
