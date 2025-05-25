
import Layout from "@/components/layout/Layout";
import { ArrowRight, CheckCircle, Clock, Search, ShieldCheck, Target, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForFoundersPage = () => {
  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-[#2D82B7]" />,
      title: "Hire Faster, Smarter",
      description: "Connect with vetted experts in days, not weeks or months. Skip the endless interviews and screening calls."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-[#2D82B7]" />,
      title: "Reduce Hiring Risk",
      description: "Eliminate the fear of bad hires. Our vetting process ensures you only engage with proven professionals."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#2D82B7]" />,
      title: "Results-Driven Providers",
      description: "Our experts are focused on achieving tangible outcomes – like the 200% revenue & LTV increases Connect aims for."
    },
    {
      icon: <Target className="h-8 w-8 text-[#2D82B7]" />,
      title: "Access Elite Talent",
      description: "Gain access to specialists you won't find wading through generic freelance pools."
    },
    {
      icon: <Zap className="h-8 w-8 text-[#2D82B7]" />,
      title: "Save Valuable Time",
      description: "Focus on running your business while we handle the expert sourcing and initial vetting."
    }
  ];

  const howItWorksSteps = [
    {
      number: 1,
      title: "Sign Up Free & Share Your Goals",
      description: "Briefly tell us about your business, challenges, and what you want to achieve with email."
    },
    {
      number: 2,
      title: "Browse Vetted Profiles",
      description: "Explore detailed profiles of pre-screened experts whose skills and experience match your needs."
    },
    {
      number: 3,
      title: "Connect Directly",
      description: "Initiate a conversation instantly through our secure messaging platform."
    },
    {
      number: 4,
      title: "Collaborate & Grow",
      description: "Work with your chosen expert and watch your email channel transform into a major revenue driver."
    }
  ];

  const qualityPoints = [
    "Deep eCommerce Acumen: They understand DTC metrics, funnels, and growth levers.",
    "Platform Mastery: Expertise in key ESPs like Klaviyo is standard.",
    "Proven Results: Demonstrated ability to increase sales, LTV, and retention via email.",
    "Professionalism: Strong communication and reliable collaboration."
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-[#0A2342] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Hire Vetted Email Experts Who Drive
              <span className="text-[#2D82B7]"> Real eCommerce Revenue</span>
            </h1>
            <p className="text-xl text-[#BFD7ED] mb-8 max-w-3xl mx-auto">
              Stop wasting time and money on guesswork. Connect provides exclusive access to 
              pre-vetted email marketers laser-focused on increasing your sales, boosting customer LTV, and slashing churn.
            </p>
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
              asChild
            >
              <Link to="/auth?register=true&type=founder">
                Find Your Expert Now
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
              Tired of the Freelancer Gamble?
            </h2>
            <div className="bg-white rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors">
              <p className="text-lg text-[#0E3366] leading-relaxed mb-6">
                Does this sound familiar? You spend weeks searching platforms like Upwork or Fiverr, interviewing 
                candidates who talk a good game, only to hire someone who disappears, delivers mediocre results, 
                or doesn't truly understand eCommerce email strategy. You've wasted precious time and budget, 
                and your email revenue is still flat.
              </p>
              <p className="text-xl font-semibold text-[#2D82B7]">
                You need reliable experts, not just hopeful applicants.
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
              Connect Eliminates the Risk & Delivers the Experts
            </h2>
            <p className="text-lg text-[#0E3366] mb-8 leading-relaxed">
              We built Connect because we know the struggle. We rigorously vet every single provider on our platform. 
              Our multi-step process evaluates their technical skills (especially Klaviyo), strategic thinking for eCommerce, 
              communication abilities, and most importantly, their proven track record of delivering measurable results 
              for businesses like yours.
            </p>
            <div className="bg-[#F5F9FF] rounded-lg p-8 border border-[#BFD7ED]">
              <p className="text-xl font-bold text-[#2D82B7] mb-2">
                Only the top ~5% of applicants make it through.
              </p>
              <p className="text-lg text-[#0A2342]">
                You get direct access to the best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-[#F5F9FF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
              Why Founders Choose Connect
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
              Your Simple Path to Email Marketing ROI
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
                Meet Your Growth Partner, Not Just Another Freelancer
              </h2>
              <p className="text-lg text-[#0E3366] mb-8">
                Connect providers are more than just task-doers. They are strategic partners verified for:
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
              Ready to Unlock Predictable Growth From Your Email List?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-[#BFD7ED]">
              Stop leaving money on the table. Sign up free today and connect with the vetted email marketing 
              expert who can take your eCommerce brand to the next level.
            </p>
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
              asChild
            >
              <Link to="/auth?register=true&type=founder">
                Sign Up & Find Your Expert
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
