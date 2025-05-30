
import { Users, Target, Award, TrendingUp, Shield } from "lucide-react";

const BenefitsSection = () => {
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
      icon: <Award className="h-8 w-8 text-[#2D82B7]" />,
      title: "Predictable Opportunities",
      description: "Gain access to a more consistent stream of high-potential projects."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#2D82B7]" />,
      title: "Maximize Billable Hours",
      description: "Drastically reduce unpaid time spent on sales and lead filtering."
    },
    {
      icon: <Shield className="h-8 w-8 text-[#2D82B7]" />,
      title: "Join an Elite Network",
      description: "Position yourself among the best in eCommerce email marketing."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
            Focus on Results, Not Chasing Leads
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
  );
};

export default BenefitsSection;
