
import { AlertTriangle, Search, Clock } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
            Finding the Right Match Shouldn't Be This Hard
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* For eCommerce Founders */}
          <div className="bg-white rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Search className="h-8 w-8 text-[#2D82B7]" />
              <h3 className="text-xl font-semibold text-[#0A2342]">For eCommerce Founders</h3>
            </div>
            <p className="text-[#0E3366] leading-relaxed">
              Sifting through endless freelance profiles means wasted time, risky hires, and missed revenue targets. 
              You need proven experts, not just another applicant.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-[#0E3366]">Wasted time on unqualified candidates</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-[#0E3366]">Risky hires without proven track records</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-[#0E3366]">Missed revenue targets due to poor matches</span>
              </div>
            </div>
          </div>

          {/* For Email Marketing Experts */}
          <div className="bg-white rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-8 w-8 text-[#2D82B7]" />
              <h3 className="text-xl font-semibold text-[#0A2342]">For Email Marketing Experts</h3>
            </div>
            <p className="text-[#0E3366] leading-relaxed">
              Generic platforms mean competing on price, dealing with unqualified leads, and spending more time 
              selling than delivering results. You deserve clients who value your expertise.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-[#0E3366]">Race to the bottom on pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-[#0E3366]">Unqualified leads wasting your time</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-[#0E3366]">More time selling than delivering results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
