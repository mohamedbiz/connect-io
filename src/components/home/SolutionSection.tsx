
import { ShieldCheck, Target, Users, TrendingUp } from "lucide-react";

const SolutionSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A2342]">
            Connect: The Curated Marketplace for eCommerce Email Marketing
          </h2>
          <p className="text-lg text-[#0E3366] max-w-3xl mx-auto mb-8">
            Connect bridges the gap. We are a dedicated marketplace built on trust, quality, and measurable results. 
            We rigorously pre-vet every email marketing provider for proven eCommerce expertise and a track record of success. 
            We ensure Founders are serious about growth and ready to collaborate.
          </p>
          <p className="text-xl font-semibold text-[#2D82B7]">
            No more guesswork. Just verified talent and qualified opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 rounded-full bg-[#BFD7ED] text-[#0A2342]">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#0A2342]">Rigorous Vetting</h3>
            <p className="text-[#0E3366] text-sm">
              Every provider manually screened for eCommerce expertise and proven results
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 rounded-full bg-[#BFD7ED] text-[#0A2342]">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#0A2342]">Quality Focus</h3>
            <p className="text-[#0E3366] text-sm">
              Dedicated to measurable growth through expert email marketing strategies
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 rounded-full bg-[#BFD7ED] text-[#0A2342]">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#0A2342]">Serious Clients</h3>
            <p className="text-[#0E3366] text-sm">
              Founders who are committed to growth and ready to invest in results
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 rounded-full bg-[#BFD7ED] text-[#0A2342]">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#0A2342]">Proven Results</h3>
            <p className="text-[#0E3366] text-sm">
              Track record of success with measurable ROI and revenue growth
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
