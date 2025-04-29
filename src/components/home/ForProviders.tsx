
import { CheckCircle, Users, Coins, Folder, AlertTriangle, ArrowRight } from "lucide-react";
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

const ForProviders = () => {
  return (
    <section className="py-16 md:py-24 bg-white" id="for-providers">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* REALITY SECTION - Simplified & Cleaner */}
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

        {/* BRIDGE SECTION - Cleaner, Step-Based Design */}
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

        {/* SUMMARY AND JOIN SECTION - Cleaner design */}
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="md:w-1/2">
            <div className="bg-[#F5F9FF] rounded-lg border border-[#BFD7ED] p-8 transition-all duration-300 hover:border-[#2D82B7]">
              <h3 className="text-2xl font-bold mb-6 text-[#0A2342]">
                Join Our Provider Network
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#0A2342]">Application Process</h4>
                    <p className="text-[#0E3366] text-sm">
                      Submit your portfolio and credentials for expert review.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#0A2342]">Verification & Onboarding</h4>
                    <p className="text-[#0E3366] text-sm">
                      Complete a short platform training and verification.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#0A2342]">Profile Creation</h4>
                    <p className="text-[#0E3366] text-sm">
                      Build your public provider profile for clients to discover your work.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#0A2342]">Client Matching</h4>
                    <p className="text-[#0E3366] text-sm">
                      Get matched to eCommerce businesses ready to invest in your expertise.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#0A2342]">Results Certification</h4>
                    <p className="text-[#0E3366] text-sm">
                      Add verified results to your profile to attract more clients.
                    </p>
                  </div>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-[#2D82B7] hover:bg-[#3D9AD1] text-white" 
                asChild
              >
                <Link to="/provider-apply">
                  Apply as a Provider
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* SUMMARY CARD */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A2342]">
              For Service Providers
            </h2>
            <p className="text-xl text-[#0E3366] mb-8">
              Connect. Deliver. Grow. Join a trusted network of email marketing specialists and connect with eCommerce businesses that value your results.
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#2D82B7] text-[#2D82B7] hover:bg-[#F5F9FF]"
              asChild
            >
              <Link to="/for-providers">
                Learn More
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForProviders;
