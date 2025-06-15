
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProviderNavigation } from '@/hooks/useProviderNavigation';
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import HowItWorks from "@/components/home/HowItWorks";
import BenefitsSection from "@/components/home/BenefitsSection";
import CTASection from "@/components/home/CTASection";

const IndexPage = () => {
  const navigate = useNavigate();
  const { navigateToProviderFlow } = useProviderNavigation();

  // Navigation handler for role-specific CTAs
  const handleRoleSelection = (role: 'founder' | 'provider') => {
    if (role === 'founder') {
      navigate('/founder/signin');
    } else {
      // Use smart navigation for providers
      navigateToProviderFlow();
    }
  };

  return (
    <Layout>
      <Hero onRoleSelection={handleRoleSelection} />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <BenefitsSection />
      <CTASection />
    </Layout>
  );
};

export default IndexPage;
