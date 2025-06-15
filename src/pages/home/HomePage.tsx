
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import HowItWorks from "@/components/home/HowItWorks";
import BenefitsSection from "@/components/home/BenefitsSection";

const HomePage = () => {
  const navigate = useNavigate();

  // Navigation handler for role-specific CTAs
  const handleRoleSelection = (role: 'founder' | 'provider') => {
    // Navigate directly to the dedicated sign-in pages
    if (role === 'founder') {
      navigate('/founder/signin');
    } else {
      navigate('/provider/signin');
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
