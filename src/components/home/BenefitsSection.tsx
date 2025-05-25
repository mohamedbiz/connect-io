
import { ShieldCheck, Target, Clock, TrendingUp } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="h-12 w-12 text-[#2D82B7]" />,
      title: "Vetted Quality",
      description: "Access only pre-screened, top-tier email marketing experts with proven eCommerce track records."
    },
    {
      icon: <Target className="h-12 w-12 text-[#2D82B7]" />,
      title: "Qualified Opportunities",
      description: "Connect with serious eCommerce Founders ready to invest in results and long-term partnerships."
    },
    {
      icon: <Clock className="h-12 w-12 text-[#2D82B7]" />,
      title: "Efficient Process",
      description: "Save countless hours on searching, vetting, and lead qualification with our curated marketplace."
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-[#2D82B7]" />,
      title: "Focus on ROI",
      description: "A community dedicated to achieving measurable growth through expert email marketing strategies."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
            Why Choose Connect?
          </h2>
          <p className="text-lg text-[#0E3366] max-w-2xl mx-auto">
            Experience the difference of a curated marketplace built for success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="flex justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0A2342]">{benefit.title}</h3>
              <p className="text-[#0E3366] leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
