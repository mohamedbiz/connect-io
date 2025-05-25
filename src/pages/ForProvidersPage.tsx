
import Layout from "@/components/layout/Layout";
import { ArrowRight, CheckCircle, Users, Coins, Target, Shield, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForProvidersPage = () => {
  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-[#2D82B7]" />,
      title: "Qualified Client Flow",
      description: "Gain access to a steady stream of pre-vetted eCommerce Founders actively seeking your expertise."
    },
    {
      icon: <Target className="h-8 w-8 text-[#2D82B7]" />,
      title: "Reduce Sales Overhead",
      description: "Minimize unpaid time spent on lead generation, filtering, and proposal writing."
    },
    {
      icon: <Award className="h-8 w-8 text-[#2D82B7]" />,
      title: "Premium Positioning",
      description: "Join a curated network where expertise is valued over low cost."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#2D82B7]" />,
      title: "High-Value Engagements",
      description: "Connect with businesses ready to invest in strategies that drive significant ROI."
    },
    {
      icon: <Shield className="h-8 w-8 text-[#2D82B7]" />,
      title: "Focus on Your Craft",
      description: "Spend your valuable time delivering exceptional results for clients who appreciate it."
    }
  ];

  const howItWorksSteps = [
    {
      number: 1,
      title: "Apply & Showcase Expertise",
      description: "Submit your application detailing your experience, skills (especially Klaviyo), and results."
    },
    {
      number: 2,
      title: "Pass Our Vetting",
      description: "Our team reviews your application, case studies, and may conduct an interview to verify your expertise."
    },
    {
      number: 3,
      title: "Create Your Profile",
      description: "Once approved, build your detailed profile to attract ideal clients."
    },
    {
      number: 4,
      title: "Receive Direct Connections",
      description: "Get notified when qualified Founders initiate contact via our platform."
    },
    {
      number: 5,
      title: "Deliver & Grow",
      description: "Focus on delivering outstanding results and building long-term client relationships."
    }
  ];

  const vettingCriteria = [
    "Technical Proficiency: Deep expertise in platforms like Klaviyo and eCommerce integrations.",
    "Strategic Acumen: Ability to develop and execute revenue-driving email strategies.",
    "Proven Results: Verifiable case studies demonstrating significant client impact.",
    "Professionalism: Strong communication and reliable collaboration skills."
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-[#0A2342] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Access Qualified eCommerce Founders
              <span className="text-[#2D82B7]"> Ready to Invest in Results</span>
            </h1>
            <p className="text-xl text-[#BFD7ED] mb-8 max-w-3xl mx-auto">
              Stop wasting time on low-quality leads and endless proposals. Connect delivers 
              pre-vetted, growth-focused DTC brands directly to your inbox, allowing you to 
              focus on what you do best – driving revenue.
            </p>
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
              asChild
            >
              <Link to="/provider-application">
                Apply to Join Connect
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
              Tired of the Platform Grind?
            </h2>
            <div className="bg-white rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors">
              <p className="text-lg text-[#0E3366] leading-relaxed mb-6">
                Are you an expert email marketer drowning in unqualified leads from platforms like Upwork? 
                Frustrated competing with low-ball offers that undervalue your skills? Spending more time 
                crafting proposals than executing winning strategies?
              </p>
              <p className="text-xl font-semibold text-[#2D82B7]">
                Your expertise deserves better clients and a platform that recognizes your value.
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
              Connect: Your Direct Channel to High-Value eCommerce Clients
            </h2>
            <p className="text-lg text-[#0E3366] mb-8 leading-relaxed">
              Connect is an exclusive, curated marketplace designed for elite email marketing specialists like you. 
              We partner with growth-focused eCommerce Founders who understand the power of expert email marketing 
              and are ready to invest in achieving significant results. We handle the initial qualification, 
              so you only connect with serious prospects.
            </p>
            <div className="bg-[#F5F9FF] rounded-lg p-8 border border-[#BFD7ED]">
              <p className="text-xl font-bold text-[#2D82B7]">
                Spend less time selling, more time delivering impactful results.
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
              Why Top Email Experts Choose Connect
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

      {/* Ideal Client Profile Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
                Work With Brands Ready for Growth
              </h2>
            </div>
            <div className="bg-[#F5F9FF] rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors">
              <p className="text-lg text-[#0E3366] leading-relaxed mb-6">
                The Founders on Connect typically run established DTC brands with significant growth potential 
                (often in the $50K - $500K+ monthly revenue range). They are knowledgeable, committed to the process, 
                and understand that expert email marketing is an investment, not an expense.
              </p>
              <p className="text-xl font-semibold text-[#2D82B7]">
                They are looking for partners, not just order-takers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-[#F5F9FF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
              Join Our Network of Vetted Experts
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

      {/* Vetting Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
                Upholding the Standard of Excellence
              </h2>
              <p className="text-lg text-[#0E3366] mb-8">
                Entry into Connect is selective. Our vetting process ensures we maintain a network 
                of truly exceptional eCommerce email marketers. We assess:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {vettingCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start gap-3 bg-[#F5F9FF] rounded-lg p-6 border border-[#BFD7ED]">
                  <CheckCircle className="h-6 w-6 text-[#2D82B7] flex-shrink-0 mt-1" />
                  <p className="text-[#0E3366]">{criteria}</p>
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
              Ready to Connect with Better eCommerce Clients?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-[#BFD7ED]">
              If you are a results-driven email marketing expert specializing in eCommerce, 
              apply to join the exclusive Connect network today and start receiving qualified client opportunities.
            </p>
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
              asChild
            >
              <Link to="/provider-application">
                Apply Now
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
