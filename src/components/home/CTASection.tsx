
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-[#0A2342]">
      <div className="container mx-auto px-4">
        <div className="bg-[#0E3366] rounded-lg border border-[#2D82B7]/50 p-8 md:p-12 text-center transition-all duration-300 hover:border-[#2D82B7]">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Elevate Your eCommerce Growth or Find Your Next High-Value Client?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-[#BFD7ED]">
            Choose your path and join the curated Connect marketplace today.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="default" 
              className="bg-[#2D82B7] text-white hover:bg-[#3D9AD1] transition-colors" 
              asChild
            >
              <Link to="/auth?register=true&type=founder">
                I'm an eCommerce Founder
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#BFD7ED] text-[#BFD7ED] hover:bg-[#0E3366]/80 hover:border-white transition-colors" 
              asChild
            >
              <Link to="/provider-application">
                I'm an Email Expert
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
