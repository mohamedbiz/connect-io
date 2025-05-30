
import { UserPlus, Check, Users, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="h-8 w-8 text-[#2D82B7]" />,
      title: "Join & Qualify",
      description: "Founders define needs; Providers apply & pass our vetting."
    },
    {
      icon: <Check className="h-8 w-8 text-[#2D82B7]" />,
      title: "Discover Quality",
      description: "Founders browse vetted experts; Providers access qualified leads."
    },
    {
      icon: <Users className="h-8 w-8 text-[#2D82B7]" />,
      title: "Connect Directly",
      description: "Initiate secure conversations via the platform."
    },
    {
      icon: <ArrowRight className="h-8 w-8 text-[#2D82B7]" />,
      title: "Achieve Mutual Success",
      description: "Collaborate effectively to drive measurable eCommerce growth."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F9FF]" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
            A Smarter Path to Partnership
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-2 max-w-6xl mx-auto">
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
      </div>
    </section>
  );
};

export default HowItWorks;
