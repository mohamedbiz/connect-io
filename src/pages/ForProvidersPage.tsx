
import Layout from "@/components/layout/Layout";
import { ArrowRight, Users, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForProvidersPage = () => {
  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-[#2D82B7]" />,
      title: "Quality Client Flow",
      description: "Receive direct introductions to vetted Founders actively seeking expert help."
    },
    {
      icon: <Target className="h-8 w-8 text-[#2D82B7]" />,
      title: "Command Your Value", 
      description: "Connect with clients who respect expertise and are focused on ROI, not just the lowest price."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#2D82B7]" />,
      title: "Predictable Opportunities",
      description: "Gain access to a more consistent stream of high-potential projects."
    }
  ];

  const howItWorksSteps = [
    {
      number: 1,
      title: "Apply & Get Vetted",
      description: "Submit your portfolio and pass our expert review process."
    },
    {
      number: 2,
      title: "Receive Quality Matches",
      description: "Get connected directly with pre-qualified, growth-focused Founders."
    },
    {
      number: 3,
      title: "Deliver Results & Earn",
      description: "Focus on exceptional work with clients who value your expertise."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#0D1F3F] via-[#18427A] to-[#B0D4F1] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Finally. A Steady Stream of Qualified eCommerce Clients
              <span className="text-[#2D82B7]"> Who Value Your Expertise</span>
            </h1>
            <p className="text-xl text-[#BFD7ED] mb-8 max-w-3xl mx-auto">
              Stop wasting hours filtering low-quality leads on generic platforms. Connect delivers 
              pre-vetted, growth-focused DTC Founders directly to you, so you can focus on 
              delivering results, not endless selling.
            </p>
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
              asChild
            >
              <Link to="/provider-application">
                Apply for Qualified Leads
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
              Stop Competing on Price. Start Connecting with Premium Clients.
            </h2>
            <div className="bg-white rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors mb-8">
              <p className="text-lg text-[#0E3366] leading-relaxed mb-6">
                As a skilled email marketer, you know the frustration. Competing on price against 
                beginners on crowded platforms? Spending half your week writing proposals for clients 
                who disappear or haggle over every dollar? Juggling unpredictable project flow?
              </p>
              <p className="text-xl font-semibold text-[#2D82B7] mb-6">
                Your talent deserves a better platform.
              </p>
              <p className="text-lg text-[#0E3366] leading-relaxed">
                Connect is the exclusive marketplace for elite eCommerce email specialists. 
                We attract serious DTC Founders (typically $50K-$500K+ monthly revenue) who understand 
                the value of strategic email marketing and are ready to invest in achieving significant results.
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
              Focus on Results, Not Chasing Leads
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
              Your Simple Path to Better Clients
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
              Ready to Work With Better Clients and Earn What You Deserve?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-[#BFD7ED]">
              Stop competing, start connecting. Apply to join the exclusive Connect network today 
              and gain access to qualified eCommerce Founders seeking your expertise.
            </p>
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
              asChild
            >
              <Link to="/provider-application">
                Apply to Join Connect Now
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForProvidersPage;
