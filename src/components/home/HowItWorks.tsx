
import { ArrowRight, LineChart, MessageSquare, Search, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-[#2D82B7]" />,
      title: "Discover Specialists",
      description: "Browse pre-vetted email marketing experts with proven results."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-[#2D82B7]" />,
      title: "Connect & Plan",
      description: "Define your project scope with clear deliverables."
    },
    {
      icon: <Users className="h-8 w-8 text-[#2D82B7]" />,
      title: "Collaborate",
      description: "Work together with milestone tracking."
    },
    {
      icon: <LineChart className="h-8 w-8 text-[#2D82B7]" />,
      title: "Measure Results",
      description: "Track your improvement metrics in real-time."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F9FF]" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">How Connect Works</h2>
          <p className="text-lg text-[#0E3366] max-w-2xl mx-auto">
            Our streamlined process connects you with specialized service providers
            for guaranteed results.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-2 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 relative group">
              {/* Step content */}
              <div className="flex flex-col items-center text-center transition-all duration-300 group-hover:translate-y-[-5px]">
                <div className="flex items-center justify-center h-16 w-16 mb-4 rounded-full bg-[#BFD7ED] text-[#0A2342] font-bold text-xl">
                  {index + 1}
                </div>
                <div className="mb-3">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#0A2342]">{step.title}</h3>
                <p className="text-[#0E3366]">{step.description}</p>
              </div>
              
              {/* Connector line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#BFD7ED] -translate-x-1/2 transform">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                    <div className="h-3 w-3 rotate-45 border-t-2 border-r-2 border-[#2D82B7]"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full text-center border border-[#BFD7ED]">
            <ShieldCheck className="h-12 w-12 text-[#2D82B7] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-[#0A2342]">Guaranteed Results or You Don't Pay</h3>
            <p className="text-[#0E3366] mb-6">
              Every service provider guarantees specific, measurable results within 30 days or you don't pay.
            </p>
            <Button 
              asChild
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white"
            >
              <Link to="/register">
                Get Started Now
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
