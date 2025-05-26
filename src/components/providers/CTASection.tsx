
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-[#0A2342]">
      <div className="container mx-auto px-4">
        <div className="bg-[#0E3366] rounded-lg border border-[#2D82B7]/50 p-8 md:p-12 text-center transition-all duration-300 hover:border-[#2D82B7] max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Connect with Better eCommerce Clients?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-[#BFD7ED]">
            If you are a results-driven email marketing expert specializing in eCommerce, 
            apply to join the exclusive Connect network today and start receiving qualified client opportunities.
          </p>
          <Button 
            size="lg" 
            className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
            asChild
          >
            <Link to="/provider-application">
              Apply Now
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
