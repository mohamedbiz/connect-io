
import { Users, Target, Award, TrendingUp, Shield } from "lucide-react";

const BenefitsSection = () => {
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

  return (
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
  );
};

export default BenefitsSection;
