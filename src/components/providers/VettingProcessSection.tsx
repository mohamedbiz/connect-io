
import { CheckCircle } from "lucide-react";

const VettingProcessSection = () => {
  const vettingCriteria = [
    "Technical Proficiency: Deep expertise in platforms like Klaviyo and eCommerce integrations.",
    "Strategic Acumen: Ability to develop and execute revenue-driving email strategies.",
    "Proven Results: Verifiable case studies demonstrating significant client impact.",
    "Professionalism: Strong communication and reliable collaboration skills."
  ];

  return (
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
  );
};

export default VettingProcessSection;
