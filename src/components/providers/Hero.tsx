
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-[#0A2342] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Access Qualified eCommerce Founders
            <span className="text-[#2D82B7]"> Ready to Invest in Results</span>
          </h1>
          <p className="text-xl text-[#BFD7ED] mb-8 max-w-3xl mx-auto">
            Stop wasting time on low-quality leads and endless proposals. Connect delivers 
            pre-vetted, growth-focused DTC brands directly to your inbox, allowing you to 
            focus on what you do best – driving revenue.
          </p>
          <Button 
            size="lg" 
            className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
            asChild
          >
            <Link to="/provider-application">
              Apply to Join Connect
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
