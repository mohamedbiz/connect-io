
import React from 'react';
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import ForFounders from "@/components/home/ForFounders";
import ForProviders from "@/components/home/ForProviders";
import CTASection from "@/components/home/CTASection";

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <ForFounders />
      <ForProviders />
      <CTASection />
    </Layout>
  );
};

export default HomePage;
