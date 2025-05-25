
import React from 'react';
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import HowItWorks from "@/components/home/HowItWorks";
import BenefitsSection from "@/components/home/BenefitsSection";
import CTASection from "@/components/home/CTASection";

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <BenefitsSection />
      <CTASection />
    </Layout>
  );
};

export default HomePage;
