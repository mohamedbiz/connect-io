
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import HowItWorks from "@/components/home/HowItWorks";
import BenefitsSection from "@/components/home/BenefitsSection";
import CTASection from "@/components/home/CTASection";

const IndexPage = () => {
  const navigate = useNavigate();

  // Navigation handler for role-specific CTAs
  const handleRoleSelection = (role: 'founder' | 'provider') => {
    // Store the selected role in session storage for persistence
    sessionStorage.setItem('selectedRole', role);
    // Navigate to signup page with role parameter
    navigate(`/signup?role=${role}`);
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
