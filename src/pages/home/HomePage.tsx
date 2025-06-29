
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProviderNavigation } from '@/hooks/useProviderNavigation';
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import HowItWorks from "@/components/home/HowItWorks";
import BenefitsSection from "@/components/home/BenefitsSection";
import ProviderFlowTester from "@/components/dev/ProviderFlowTester";

const HomePage = () => {
  const navigate = useNavigate();
  const { navigateToProviderFlow } = useProviderNavigation();

  // Navigation handler for role-specific CTAs
  const handleRoleSelection = (role: 'founder' | 'provider') => {
    console.log('HomePage: Role selection clicked', { role });
    
    if (role === 'founder') {
      console.log('HomePage: Navigating to founder signin');
      navigate('/founder/signin');
    } else {
      console.log('HomePage: Initiating provider navigation flow');
      // Use smart navigation for providers
      navigateToProviderFlow();
    }
  };

  // Show development tools in development environment
  const isDevelopment = import.meta.env.DEV;

  return (
    <Layout>
      <Hero onRoleSelection={handleRoleSelection} />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <BenefitsSection />
      
      {isDevelopment && (
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
              Development Tools
            </h2>
            <ProviderFlowTester />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
