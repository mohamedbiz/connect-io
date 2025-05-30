
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-[#0A2342] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Where Vetted Email Experts &<br />
            <span className="text-[#2D82B7]">Growth-Ready eCommerce Brands Connect</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[#BFD7ED] max-w-3xl mx-auto">
            Stop the endless search and risky hires. Connect is the curated marketplace 
            delivering qualified opportunities for experts and proven talent for Founders, 
            focused on measurable results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
              asChild
            >
              <Link to="/auth?register=true&type=founder">
                Grow My eCommerce Brand
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
                Access Quality Clients
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="bg-[#0E3366] rounded-lg border border-[#2D82B7] p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Check className="h-5 w-5 text-[#2D82B7]" />
                <span className="text-[#BFD7ED]">Vetted Quality - Pre-screened experts only</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Check className="h-5 w-5 text-[#2D82B7]" />
                <span className="text-[#BFD7ED]">Qualified Opportunities - Serious clients ready to invest</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Check className="h-5 w-5 text-[#2D82B7]" />
                <span className="text-[#BFD7ED]">Efficient Process - No more endless searching</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
