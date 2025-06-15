
import Layout from "@/components/layout/Layout";
import { ArrowRight, CheckCircle, Clock, ShieldCheck, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForFoundersPage = () => {
  const benefits = [
    {
      icon: <Target className="h-8 w-8 text-[#2D82B7]" />,
      title: "Predictable Performance",
      description: "Hire experts focused on delivering measurable ROI, not just completing tasks."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-[#2D82B7]" />,
      title: "Hire with Confidence",
      description: "Eliminate risk with access only to pre-vetted, proven professionals."
    },
    {
      icon: <Clock className="h-8 w-8 text-[#2D82B7]" />,
      title: "Reclaim Your Time",
      description: "Drastically cut hiring time and focus on strategic growth, not endless interviews."
    }
  ];

  const howItWorksSteps = [
    {
      number: 1,
      title: "Define Your Growth Goals",
      description: "Tell us what success looks like for your brand."
    },
    {
      number: 2,
      title: "Browse & Connect with Experts",
      description: "Review vetted specialists and initiate direct conversations."
    },
    {
      number: 3,
      title: "Execute & Scale",
      description: "Collaborate with your expert partner and achieve predictable email revenue."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#0D1F3F] via-[#18427A] to-[#B0D4F1] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Finally. Predictable eCommerce Growth Fueled by
              <span className="text-[#2D82B7]"> Vetted Email Experts</span>
            </h1>
            <p className="text-xl text-[#BFD7ED] mb-8 max-w-3xl mx-auto">
              Stop gambling with freelancers and agencies. Connect delivers pre-vetted email marketing 
              specialists focused only on scaling your revenue, boosting LTV, and giving you back your time.
            </p>
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
              asChild
            >
              <Link to="/auth?register=true&type=founder">
                Find Your Growth Partner Now
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Problem → Solution Section */}
      <section className="py-16 md:py-24 bg-[#F5F9FF]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#0A2342]">
              Stop Burning Cash on Email Marketing That Doesn't Deliver
            </h2>
            <div className="bg-white rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors mb-8">
              <p className="text-lg text-[#0E3366] leading-relaxed mb-6">
                You know email should be a major revenue driver, but finding the right talent feels impossible. 
                Tired of pouring money into campaigns that flop? Frustrated by generic freelancers 
                who don't understand DTC? Wasting precious hours vetting candidates instead of scaling your brand?
              </p>
              <p className="text-xl font-semibold text-[#2D82B7] mb-6">
                That struggle ends here.
              </p>
              <p className="text-lg text-[#0E3366] leading-relaxed">
                Connect is the curated network built for Founders like you who demand results. We meticulously 
                vet every provider for deep eCommerce email expertise (especially Klaviyo), strategic thinking, 
                and a verifiable history of driving significant growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
              Gain Control, Confidence, and Freedom
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-[#F5F9FF] rounded-lg p-6 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A2342]">{benefit.title}</h3>
                </div>
                <p className="text-[#0E3366] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-[#F5F9FF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
              Your Simple Path to Stress-Free Email Growth
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2D82B7] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-[#0A2342]">{step.title}</h3>
                    <p className="text-[#0E3366] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 bg-[#0A2342]">
        <div className="container mx-auto px-4">
          <div className="bg-[#0E3366] rounded-lg border border-[#2D82B7]/50 p-8 md:p-12 text-center transition-all duration-300 hover:border-[#2D82B7] max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Turn Email Into Your Most Profitable Channel?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-[#BFD7ED]">
              Stop searching, start scaling. Sign up free today and connect with the vetted email marketing 
              expert who will help you achieve predictable growth.
            </p>
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
              asChild
            >
              <Link to="/auth?register=true&type=founder">
                Find My Expert & Grow
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForFoundersPage;
