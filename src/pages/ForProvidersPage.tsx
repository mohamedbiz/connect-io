
import Layout from "@/components/layout/Layout";
import Hero from "@/components/providers/Hero";
import PainPointSection from "@/components/providers/PainPointSection";
import SolutionSection from "@/components/providers/SolutionSection";
import BenefitsSection from "@/components/providers/BenefitsSection";
import IdealClientSection from "@/components/providers/IdealClientSection";
import HowItWorksSection from "@/components/providers/HowItWorksSection";
import VettingProcessSection from "@/components/providers/VettingProcessSection";
import CTASection from "@/components/providers/CTASection";

const ForProvidersPage = () => {
  return (
    <Layout>
      <Hero />
      <PainPointSection />
      <SolutionSection />
      <BenefitsSection />
      <IdealClientSection />
      <HowItWorksSection />
      <VettingProcessSection />
      <CTASection />
    </Layout>
  );
};

export default ForProvidersPage;
