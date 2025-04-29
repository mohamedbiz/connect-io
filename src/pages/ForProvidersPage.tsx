
import Layout from "@/components/layout/Layout";
import { ArrowRight, CheckCircle, Users, Coins, Folder, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PAIN_POINTS = [
  "Spending countless hours searching for quality clients.",
  "Constantly negotiating and justifying your rates.",
  "Getting paid less by clients who don't understand the ROI of great email marketing.",
  "Struggling to stand out in a crowded market.",
  "Wasting energy on sales calls instead of doing expert work.",
];

const BRIDGE_BENEFITS = [
  {
    icon: <Users className="h-6 w-6 text-[#2D82B7]" />,
    title: "Qualified Leads Delivered",
    desc: "We'll connect you directly with eCommerce founders who are eager and ready to invest.",
  },
  {
    icon: <Coins className="h-6 w-6 text-[#2D82B7]" />,
    title: "Premium Rates",
    desc: "Work with serious clients who value results, so you can charge based on your impact.",
  },
  {
    icon: <Folder className="h-6 w-6 text-[#2D82B7]" />,
    title: "Portfolio Growth",
    desc: "Showcase real, verified outcomes to attract even more top-tier projects.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-[#2D82B7]" />,
    title: "Unmatched Support",
    desc: "Our team ensures every collaboration is smooth, so you can focus on what you do best.",
  },
];

const ForProvidersPage = () => {
  return (
    <Layout>
      {/* Hero Section - Using blue color scheme */}
      <div className="bg-[#0A2342] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              For Email Marketing Specialists
            </h1>
            <p className="text-xl text-[#BFD7ED] mb-8">
              Join our network of specialized service providers and connect with pre-qualified 
              eCommerce businesses looking for your expertise. Spend less time chasing leads 
              and more time delivering results.
            </p>
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
              asChild
            >
              <Link to="/provider-apply">
                Apply as a Provider
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* "The Reality for Most Service Providers" - Redesigned */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-[#F5F9FF] rounded-lg border border-[#BFD7ED] p-8 mb-16 transition-all duration-300 hover:border-[#2D82B7]">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#BFD7ED] text-[#0A2342]">
                <AlertTriangle className="text-[#2D82B7] h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A2342]">
                The Reality for Most Service Providers
              </h3>
            </div>
            
            <p className="text-lg text-[#0E3366] mb-6">
              Doing great work used to be enough. Today, email marketing specialists face growing challenges:
            </p>
            
            <ul className="space-y-3">
              {PAIN_POINTS.map((pain, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2D82B7] group-hover:scale-110 transition-transform" />
                  <span className="text-[#0E3366]">{pain}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* "What if you could focus only on delivering results..." - Redesigned */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="block w-12 h-1 rounded-full bg-[#BFD7ED]"></span>
                <span className="text-[#2D82B7] font-semibold uppercase text-xs tracking-wide">
                  There's a better way
                </span>
                <span className="block w-12 h-1 rounded-full bg-[#BFD7ED]"></span>
              </div>
              <h3 className="text-3xl font-bold text-[#0A2342] mb-4">
                What if you could focus only on delivering results?
              </h3>
              <p className="text-lg text-[#0E3366] max-w-2xl mx-auto">
                Our platform bridges the gap—so you spend your time where it matters: delivering value, not chasing leads.
              </p>
            </div>
            
            {/* Benefits - Using the same step design as HowItWorks */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-2">
              {BRIDGE_BENEFITS.map((benefit, index) => (
                <div key={index} className="flex-1 relative group">
                  {/* Step content */}
                  <div className="flex flex-col items-center text-center transition-all duration-300 group-hover:translate-y-[-5px]">
                    <div className="flex items-center justify-center h-16 w-16 mb-4 rounded-full bg-[#BFD7ED] text-[#0A2342] font-bold text-xl">
                      {index + 1}
                    </div>
                    <div className="mb-3">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-[#0A2342]">{benefit.title}</h3>
                    <p className="text-[#0E3366]">{benefit.desc}</p>
                  </div>
                  
                  {/* Connector line (except for last item) */}
                  {index < BRIDGE_BENEFITS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#BFD7ED] -translate-x-1/2 transform">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                        <div className="h-3 w-3 rotate-45 border-t-2 border-r-2 border-[#2D82B7]"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* "Why Email Marketing Specialists Choose Connect" - Redesigned */}
          <h2 className="text-3xl font-bold mb-12 text-center text-[#0A2342]">Why Email Marketing Specialists Choose Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#F5F9FF] border border-[#BFD7ED] rounded-lg p-6 transition-all duration-300 hover:border-[#2D82B7]">
              <h3 className="text-xl font-bold mb-3 text-[#0A2342]">Pre-qualified Clients</h3>
              <p className="text-[#0E3366]">Connect with eCommerce founders who are ready to invest in email marketing and understand the value of expertise.</p>
            </div>
            <div className="bg-[#F5F9FF] border border-[#BFD7ED] rounded-lg p-6 transition-all duration-300 hover:border-[#2D82B7]">
              <h3 className="text-xl font-bold mb-3 text-[#0A2342]">No Client Acquisition Costs</h3>
              <p className="text-[#0E3366]">We handle the marketing, lead generation, and initial qualification so you can focus on what you do best.</p>
            </div>
            <div className="bg-[#F5F9FF] border border-[#BFD7ED] rounded-lg p-6 transition-all duration-300 hover:border-[#2D82B7]">
              <h3 className="text-xl font-bold mb-3 text-[#0A2342]">Premium Rates</h3>
              <p className="text-[#0E3366]">Command higher rates for your services with clients who value results and understand the ROI of effective email marketing.</p>
            </div>
            <div className="bg-[#F5F9FF] border border-[#BFD7ED] rounded-lg p-6 transition-all duration-300 hover:border-[#2D82B7]">
              <h3 className="text-xl font-bold mb-3 text-[#0A2342]">Verified Results</h3>
              <p className="text-[#0E3366]">Build your reputation with verified case studies and success metrics that attract more premium clients.</p>
            </div>
          </div>

          {/* "Focus on Results, Not Sales" and other sections - Redesigned */}
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-[#0A2342]">Focus on Results, Not Sales</h3>
                <p className="text-[#0E3366] mb-6">
                  Stop wasting time and money on client acquisition. We bring pre-qualified 
                  eCommerce founders directly to you, so you can focus on delivering results 
                  rather than constantly chasing new business.
                </p>
                <div className="flex items-center gap-2 text-[#2D82B7]">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Pre-qualified Clients</span>
                </div>
              </div>
              <div className="md:w-1/2 bg-[#F5F9FF] p-6 border border-[#BFD7ED] rounded-lg transition-all duration-300 hover:border-[#2D82B7]">
                <h4 className="font-bold text-xl mb-4 text-[#0A2342]">Our Client Requirements</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1" />
                    <div>
                      <h5 className="font-medium text-[#0A2342]">Established eCommerce Business</h5>
                      <p className="text-[#0E3366] text-sm">
                        $10K+ monthly revenue with existing email list
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1" />
                    <div>
                      <h5 className="font-medium text-[#0A2342]">Ready to Invest</h5>
                      <p className="text-[#0E3366] text-sm">
                        Understand the value of professional email marketing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1" />
                    <div>
                      <h5 className="font-medium text-[#0A2342]">Connected Platforms</h5>
                      <p className="text-[#0E3366] text-sm">
                        Using major eCommerce platforms and email marketing tools
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1" />
                    <div>
                      <h5 className="font-medium text-[#0A2342]">Growth Mindset</h5>
                      <p className="text-[#0E3366] text-sm">
                        Looking for long-term relationships with service providers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-[#0A2342]">Earn Premium Rates</h3>
                <p className="text-[#0E3366] mb-6">
                  Our platform enables you to command higher rates by focusing on value and 
                  guaranteed results. Clients are pre-qualified and understand the ROI of 
                  effective email marketing.
                </p>
                <div className="flex items-center gap-2 text-[#2D82B7]">
                  <Coins className="h-5 w-5" />
                  <span className="font-medium">Value-Based Pricing</span>
                </div>
              </div>
              <div className="md:w-1/2 bg-[#F5F9FF] border border-[#BFD7ED] rounded-lg p-6 transition-all duration-300 hover:border-[#2D82B7]">
                <h4 className="font-bold text-xl mb-4 text-[#0A2342]">Average Project Values</h4>
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded border border-[#BFD7ED]">
                    <div className="text-lg font-bold text-[#2D82B7]">$2,500 - $5,000</div>
                    <div className="text-sm text-[#0E3366]">Initial Setup & Optimization Projects</div>
                  </div>
                  <div className="bg-white p-4 rounded border border-[#BFD7ED]">
                    <div className="text-lg font-bold text-[#2D82B7]">$1,500 - $3,000</div>
                    <div className="text-sm text-[#0E3366]">Monthly Retainers</div>
                  </div>
                  <div className="bg-white p-4 rounded border border-[#BFD7ED]">
                    <div className="text-lg font-bold text-[#2D82B7]">$10,000+</div>
                    <div className="text-sm text-[#0E3366]">Advanced Strategy & Implementation</div>
                  </div>
                  <div className="text-center text-sm text-[#0E3366] mt-2">
                    * Based on average provider earnings on Connect
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-[#0A2342]">Simple Application Process</h3>
                <p className="text-[#0E3366] mb-6">
                  Our thorough vetting process ensures only the best email marketing 
                  specialists join our platform, maintaining high quality and trustworthiness 
                  for our clients.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="bg-[#F5F9FF] border border-[#BFD7ED] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#2D82B7]">
                  <div className="p-4 border-b border-[#BFD7ED]">
                    <h4 className="font-medium text-[#0A2342]">Application Steps</h4>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex gap-4">
                      <div className="bg-[#2D82B7] text-white h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        1
                      </div>
                      <div>
                        <h5 className="font-medium mb-1 text-[#0A2342]">Submit Application</h5>
                        <p className="text-[#0E3366] text-sm">Share your experience, portfolio, and case studies</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-[#2D82B7] text-white h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        2
                      </div>
                      <div>
                        <h5 className="font-medium mb-1 text-[#0A2342]">Skills Assessment</h5>
                        <p className="text-[#0E3366] text-sm">Demonstrate your email marketing expertise</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-[#2D82B7] text-white h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        3
                      </div>
                      <div>
                        <h5 className="font-medium mb-1 text-[#0A2342]">Interview</h5>
                        <p className="text-[#0E3366] text-sm">Discuss your approach and results with our team</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-[#2D82B7] text-white h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        4
                      </div>
                      <div>
                        <h5 className="font-medium mb-1 text-[#0A2342]">Onboarding</h5>
                        <p className="text-[#0E3366] text-sm">Get set up on the platform and start connecting with clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Matching the CTASection component styling */}
          <div className="mt-16 bg-[#0E3366] rounded-lg border border-[#2D82B7]/50 p-8 md:p-12 text-center transition-all duration-300 hover:border-[#2D82B7]">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Ready to grow your email marketing business?</h3>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-[#BFD7ED]">
              Join Connect today and get matched with eCommerce businesses that 
              value results and are ready to invest in your expertise.
            </p>
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
              asChild
            >
              <Link to="/provider-apply">
                Apply as a Provider
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
