
import { Check, Users } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
            The Connect Advantage
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Founders */}
            <div className="bg-[#F5F9FF] rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-[#2D82B7]" />
                <h3 className="text-xl font-semibold text-[#0A2342]">For Founders</h3>
              </div>
              <p className="text-lg text-[#0E3366] font-medium mb-2">
                Access Vetted, Results-Driven Email Experts
              </p>
            </div>

            {/* For Providers */}
            <div className="bg-[#F5F9FF] rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Check className="h-8 w-8 text-[#2D82B7]" />
                <h3 className="text-xl font-semibold text-[#0A2342]">For Providers</h3>
              </div>
              <p className="text-lg text-[#0E3366] font-medium mb-2">
                Connect with Qualified, Growth-Focused Clients
              </p>
            </div>
          </div>

          {/* For Everyone */}
          <div className="bg-[#0E3366] rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">For Everyone</h3>
            <p className="text-lg text-[#BFD7ED] font-medium">
              Save Time, Reduce Risk, Increase Efficiency, Focus on ROI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
