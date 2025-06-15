
import { Check, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BenefitsSection = () => {
  const navigate = useNavigate();

  const handleFoundersClick = () => {
    navigate('/for-founders');
  };

  const handleProvidersClick = () => {
    navigate('/for-providers');
  };

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
            {/* For Founders - Clickable */}
            <div 
              onClick={handleFoundersClick}
              className="bg-[#F5F9FF] rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 hover:bg-[#EBF4FF] group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFoundersClick();
                }
              }}
              aria-label="Learn more about Connect for Founders"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-[#2D82B7] group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-[#0A2342]">For Founders</h3>
                <ArrowRight className="h-5 w-5 text-[#2D82B7] ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <p className="text-lg text-[#0E3366] font-medium mb-2">
                Access Vetted, Results-Driven Email Experts
              </p>
              <p className="text-sm text-[#2D82B7] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to explore founder solutions →
              </p>
            </div>

            {/* For Providers - Clickable */}
            <div 
              onClick={handleProvidersClick}
              className="bg-[#F5F9FF] rounded-lg p-8 border border-[#BFD7ED] hover:border-[#2D82B7] transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 hover:bg-[#EBF4FF] group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProvidersClick();
                }
              }}
              aria-label="Learn more about Connect for Providers"
            >
              <div className="flex items-center gap-3 mb-4">
                <Check className="h-8 w-8 text-[#2D82B7] group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-[#0A2342]">For Providers</h3>
                <ArrowRight className="h-5 w-5 text-[#2D82B7] ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <p className="text-lg text-[#0E3366] font-medium mb-2">
                Connect with Qualified, Growth-Focused Clients
              </p>
              <p className="text-sm text-[#2D82B7] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to explore provider opportunities →
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
