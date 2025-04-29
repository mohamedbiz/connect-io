
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import ForFounders from "@/components/home/ForFounders";
import ForProviders from "@/components/home/ForProviders";
import CTASection from "@/components/home/CTASection";
import EmailMarketingInsights from "@/components/home/EmailMarketingInsights";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <EmailMarketingInsights />
      <ForFounders />
      <ForProviders />
      <CTASection />
    </Layout>
  );
};

export default Index;
