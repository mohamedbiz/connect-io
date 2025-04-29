
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <div className="bg-[#0A2342] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Connect with providers who<br />
              <span className="text-[#2D82B7]">guarantee results</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-[#BFD7ED]">
              Our pre-vetted specialists guarantee to increase your sales by 200%, 
              reduce churn by 30%, and improve customer lifetime value by 200% 
              within 30 days — or you don't pay.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-[#2D82B7]" />
                <span className="text-[#BFD7ED]">200% increase in sales</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-[#2D82B7]" />
                <span className="text-[#BFD7ED]">30% reduction in customer churn</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-[#2D82B7]" />
                <span className="text-[#BFD7ED]">200% improvement in customer lifetime value</span>
              </div>
            </div>
            <div>
              <Button 
                size="lg" 
                className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
                asChild
              >
                <Link to="/register">
                  Get Started Now
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-[#0E3366] rounded-lg border border-[#2D82B7] p-8 relative transition-all duration-300 hover:border-[#BFD7ED]">
              <Badge 
                variant="default" 
                className="absolute -top-3 -left-1 bg-[#2D82B7] text-white text-sm font-medium py-1 px-3"
              >
                Proven Results
              </Badge>
              <div className="flex flex-col gap-6">
                <div className="bg-[#0A2342] rounded-lg p-5 transition-all duration-300 border border-[#2D82B7]/30 hover:border-[#2D82B7]">
                  <div className="text-4xl font-bold text-[#2D82B7] mb-1">200%</div>
                  <div className="text-sm text-[#BFD7ED]">Average Sales Increase</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0A2342] rounded-lg p-5 transition-all duration-300 border border-[#2D82B7]/30 hover:border-[#2D82B7]">
                    <div className="text-3xl font-bold text-[#2D82B7] mb-1">30%</div>
                    <div className="text-sm text-[#BFD7ED]">Churn Reduction</div>
                  </div>
                  <div className="bg-[#0A2342] rounded-lg p-5 transition-all duration-300 border border-[#2D82B7]/30 hover:border-[#2D82B7]">
                    <div className="text-3xl font-bold text-[#2D82B7] mb-1">200%</div>
                    <div className="text-sm text-[#BFD7ED]">LTV Improvement</div>
                  </div>
                </div>
                <div className="text-center text-[#BFD7ED]/70 text-sm">
                  Based on average results from our top providers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
