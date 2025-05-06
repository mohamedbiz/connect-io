
import Layout from "@/components/layout/Layout";
import { ArrowRight, CheckCircle, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForFoundersPage = () => {
  const emailTypes = [
    {
      title: "Welcome Email Sequence",
      description: "Introduce new customers to your brand and encourage repeat purchases",
      results: "Average 120% sales increase from first-time buyers"
    },
    {
      title: "Abandoned Cart Recovery",
      description: "Win back customers who left items in their shopping cart",
      results: "Average 35% recovery rate and 80% increase in sales"
    },
    {
      title: "Post-Purchase Follow-ups",
      description: "Build relationships and encourage repeat purchases",
      results: "Average 90% increase in customer lifetime value"
    },
    {
      title: "Re-engagement Campaigns",
      description: "Win back dormant customers who haven't purchased recently",
      results: "Average 25% reduction in churn and 70% sales increase"
    }
  ];

  return (
    <Layout>
      {/* Hero Section - Redesigned to match the new blue style */}
      <div className="bg-[#0A2342] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Transform Your eCommerce Email Marketing
            </h1>
            <p className="text-xl text-[#BFD7ED] mb-8">
              Connect with specialized email marketing experts who guarantee to increase your 
              sales by 200%, reduce churn by 30%, and improve customer lifetime value by 200%
              within 30 days — or you don't pay.
            </p>
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
              asChild
            >
              <Link to="/auth?register=true&type=founder">
                Get Started
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section - Updated to match new design system */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-[#0A2342]">The Connect Advantage for Founders</h2>
            
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4 text-[#0A2342]">Guaranteed Results or You Don't Pay</h3>
                  <p className="text-[#0E3366] mb-6">
                    We understand the frustration of investing in marketing services with no measurable return.
                    That's why every provider on Connect guarantees specific, measurable results within 30 days.
                  </p>
                  <div className="flex items-center gap-2 text-[#2D82B7]">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="font-medium">Our Risk-Free Guarantee</span>
                  </div>
                </div>
                <div className="md:w-1/2 bg-[#F5F9FF] p-8 rounded-lg border border-[#BFD7ED] transition-all duration-300 hover:border-[#2D82B7]">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1" />
                      <div>
                        <h4 className="font-medium text-[#0A2342]">200% Sales Increase</h4>
                        <p className="text-[#0E3366]">
                          More revenue from your email marketing campaigns
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1" />
                      <div>
                        <h4 className="font-medium text-[#0A2342]">30% Churn Reduction</h4>
                        <p className="text-[#0E3366]">
                          Keep more customers coming back to purchase again
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1" />
                      <div>
                        <h4 className="font-medium text-[#0A2342]">200% LTV Improvement</h4>
                        <p className="text-[#0E3366]">
                          Dramatically increase how much each customer spends
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4 text-[#0A2342]">Pre-Vetted Email Marketing Specialists</h3>
                  <p className="text-[#0E3366] mb-6">
                    We rigorously vet all providers on our platform to ensure they have a proven 
                    track record of delivering results for eCommerce businesses. Only the top 5% of applicants
                    are accepted.
                  </p>
                  <div className="flex items-center gap-2 text-[#2D82B7]">
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">Email Marketing Expertise</span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="space-y-4">
                    {emailTypes.map((type, index) => (
                      <div key={index} className="bg-[#F5F9FF] border border-[#BFD7ED] p-4 rounded-lg transition-all duration-300 hover:border-[#2D82B7]">
                        <h4 className="font-medium text-[#0A2342]">{type.title}</h4>
                        <p className="text-[#0E3366] text-sm mb-2">{type.description}</p>
                        <div className="text-xs bg-white text-[#2D82B7] font-medium px-2 py-1 rounded inline-block border border-[#BFD7ED]">
                          {type.results}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4 text-[#0A2342]">Simple, Streamlined Process</h3>
                  <p className="text-[#0E3366] mb-6">
                    We've simplified the process of finding, vetting, and working with email marketing specialists.
                    Our platform handles everything from matching to project management and results verification.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-[#F5F9FF] border border-[#BFD7ED] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#2D82B7]">
                    <div className="p-4 border-b border-[#BFD7ED]">
                      <h4 className="font-medium text-[#0A2342]">How It Works</h4>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="flex gap-4">
                        <div className="bg-[#BFD7ED] text-[#0A2342] h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                          1
                        </div>
                        <div>
                          <h5 className="font-medium mb-1 text-[#0A2342]">Register & Connect</h5>
                          <p className="text-[#0E3366] text-sm">Connect your store and email platform</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-[#BFD7ED] text-[#0A2342] h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                          2
                        </div>
                        <div>
                          <h5 className="font-medium mb-1 text-[#0A2342]">Get Matched</h5>
                          <p className="text-[#0E3366] text-sm">We'll match you with the perfect specialist for your needs</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-[#BFD7ED] text-[#0A2342] h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                          3
                        </div>
                        <div>
                          <h5 className="font-medium mb-1 text-[#0A2342]">Review & Approve</h5>
                          <p className="text-[#0E3366] text-sm">Review the specialist's proposal and approve the project</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-[#BFD7ED] text-[#0A2342] h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                          4
                        </div>
                        <div>
                          <h5 className="font-medium mb-1 text-[#0A2342]">See Results</h5>
                          <p className="text-[#0E3366] text-sm">Watch your metrics improve and only pay for success</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Section - Matching the CTASection component styling */}
            <div className="mt-16 bg-[#0E3366] rounded-lg border border-[#2D82B7]/50 p-8 md:p-12 text-center transition-all duration-300 hover:border-[#2D82B7]">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Ready to transform your eCommerce business?</h3>
              <p className="text-xl max-w-3xl mx-auto mb-8 text-[#BFD7ED]">
                Join Connect today and get matched with specialized service providers who 
                guarantee results — or you don't pay a cent.
              </p>
              <Button 
                size="lg" 
                className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
                asChild
              >
                <Link to="/auth?register=true&type=founder">
                  Get Started Now
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForFoundersPage;
