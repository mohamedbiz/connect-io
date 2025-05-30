
import { CheckCircle } from "lucide-react";

const VettingProcessSection = () => {
  const vettingCriteria = [
    "eCommerce & ESP Mastery: Deep skill in platforms like Klaviyo and DTC strategy.",
    "Proven ROI: Verifiable results and case studies.",
    "Professionalism: Communication and reliability."
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
              Maintaining the Standard That Attracts Premium Clients
            </h2>
            <p className="text-lg text-[#0E3366] mb-8">
              Our selective vetting process benefits you. By ensuring only highly skilled and 
              professional specialists are on the platform, we attract higher-caliber Founders 
              who trust the Connect network. We verify:
            </p>
          </div>
          <div className="grid md:grid-cols-1 gap-6">
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
