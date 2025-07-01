
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProviderNavigation } from '@/hooks/useProviderNavigation';
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import HowItWorks from "@/components/home/HowItWorks";
import BenefitsSection from "@/components/home/BenefitsSection";

const HomePage = () => {
  const navigate = useNavigate();
  const { navigateToProviderFlow } = useProviderNavigation();

  // Navigation handler for role-specific CTAs
  const handleRoleSelection = (role: 'founder' | 'provider') => {
    console.log('HomePage: Role selection clicked', { role });
    
    if (role === 'founder') {
      console.log('HomePage: Navigating to founder auth');
      navigate('/auth/founder');
    } else {
      console.log('HomePage: Initiating provider navigation flow');
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
    </Layout>
  );
};

export default HomePage;
