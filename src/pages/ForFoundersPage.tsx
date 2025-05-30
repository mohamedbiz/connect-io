
import Layout from "@/components/layout/Layout";
import { ArrowRight, CheckCircle, Clock, ShieldCheck, Target, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForFoundersPage = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-[#2D82B7]" />,
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
    },
    {
      icon: <Target className="h-8 w-8 text-[#2D82B7]" />,
      title: "Access Elite Strategists",
      description: "Connect with top-tier talent dedicated to eCommerce email success."
    },
    {
      icon: <Zap className="h-8 w-8 text-[#2D82B7]" />,
      title: "Achieve Scalable Growth",
      description: "Implement strategies designed to consistently increase sales, LTV, and profitability."
    }
  ];

  const howItWorksSteps = [
    {
      number: 1,
      title: "Define Your Growth Goals (Free)",
      description: "Tell us what success looks like for your brand."
    },
    {
      number: 2,
      title: "Browse Matched Experts",
      description: "Review profiles of vetted specialists aligned with your needs."
    },
    {
      number: 3,
      title: "Connect & Strategize",
      description: "Initiate direct conversations and outline your path to results."
    },
    {
      number: 4,
      title: "Execute & Scale",
      description: "Collaborate with your expert partner and achieve predictable email revenue."
    }
  ];

  const qualityPoints = [
    "Driving Revenue: Deep understanding of DTC funnels and conversion strategies.",
    "Mastering Technology: Proven expertise in platforms like Klaviyo.",
    "Delivering ROI: Track record of measurable results for brands like yours.",
    "Clear Communication: Professional, reliable collaboration."
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-[#0A2342] py-16 md:py-24">
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

      {/* Pain Point Section */}
      <section className="py-16 md:py-24 bg-[#F5F9FF]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#0A2342]">
              Chasing Growth Shouldn't Feel Like Burning Cash
            </h2>
            <div className="bg-white rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors">
              <p className="text-lg text-[#0E3366] leading-relaxed mb-6">
                You know email should be a major revenue driver, but finding the right talent feels impossible. 
                Are you tired of pouring money into campaigns that flop? Frustrated by generic freelancers 
                who don't understand DTC? Wasting precious hours vetting candidates instead of scaling your brand?
              </p>
              <p className="text-xl font-semibold text-[#2D82B7]">
                That struggle ends here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#0A2342]">
              Connect: Your Bridge to Vetted Experts & Measurable Results
            </h2>
            <p className="text-lg text-[#0E3366] mb-8 leading-relaxed">
              Connect isn't another crowded freelance platform. We are a curated network built for Founders 
              like you who demand results. We meticulously vet every provider for deep eCommerce email expertise 
              (especially Klaviyo), strategic thinking, and a verifiable history of driving significant growth. 
              We filter out the noise, so you only connect with specialists capable of transforming your email channel.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-[#F5F9FF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
              Gain Control, Confidence, and Freedom
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors">
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
      <section className="py-16 md:py-24 bg-white">
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

      {/* Provider Quality Section */}
      <section className="py-16 md:py-24 bg-[#F5F9FF]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
                Partners Invested in Your Success
              </h2>
              <p className="text-lg text-[#0E3366] mb-8">
                Connect providers are verified strategic partners focused on:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {qualityPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-6 border border-[#BFD7ED]">
                  <CheckCircle className="h-6 w-6 text-[#2D82B7] flex-shrink-0 mt-1" />
                  <p className="text-[#0E3366]">{point}</p>
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
              expert who will help you achieve predictable growth and reclaim your time.
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
